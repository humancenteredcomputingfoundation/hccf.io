import { promises as fs } from 'node:fs';
import path from 'node:path';
import { createServer } from 'vite';

const SITE = 'https://hccf.onmy.cloud';
const SITE_NAME = 'Human-Centered Computing Foundation';
const WP_API = 'https://wordpress.hccf.onmy.cloud/wp-json/wp/v2/posts';
const DIST = path.resolve('dist');

// Add an optional `description` to any entry to emit a meta description.
const STATIC_ROUTES = [
  { path: '/mission/', title: 'Our Mission: Human-Centered Computing | HCCF', description: 'Explore HCCF’s mission to advance people-first technology, privacy, data sovereignty, and digital autonomy.' },
  { path: '/what-we-build/', title: 'Human-Centered Infrastructure and Initiatives | HCCF', description: 'Explore HCCF initiatives for human-centered infrastructure, technical standards, certification, and nonprofit support.' },
  { path: '/about/', title: 'About HCCF', description: 'Learn about the Human-Centered Computing Foundation and its nonprofit mission to advance technology that serves people.' },
  { path: '/blog/', title: 'Blog & News' },
  { path: '/get-involved/', title: 'Partner With or Support HCCF', description: 'Discover how to support or partner with HCCF in advancing human-centered technology.' },
  { path: '/self-gtld/', title: '.self TLD Status and Application Journey | HCCF', description: 'Follow the application milestones and published status of HCCF’s proposed .self top-level domain.' },
  { path: '/self/', title: '.self: A Proposed TLD for Self-Hosting | HCCF', description: 'Learn about HCCF’s proposed .self top-level domain for human-centered computing, self-hosting, and digital autonomy.' },
  { path: '/human-centered-computing/', title: 'What Is Human-Centered Computing? | HCCF', description: 'Learn how human-centered computing puts people, privacy, data sovereignty, and autonomy first.' },
];

// ---------- helpers ----------

const NAMED = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  hellip: '…', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“',
  ndash: '–', mdash: '—',
};

const decode = (s) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, n) => NAMED[n] ?? m);

const toPlain = (html = '') =>
  decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

const esc = (s) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const truncate = (s, n = 160) => (s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s);

function renderPage(template, { urlPath, title, description, noindex = false, content = null }) {
  const fullTitle = title === SITE_NAME || title.endsWith(' | HCCF') ? title : `${title} | HCCF`;
  let html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(fullTitle)}</title>`);

  const extra = [];
  if (!noindex) {
    const canonical = `<link rel="canonical" href="${SITE}${urlPath}" />`;
    if (/<link rel="canonical"[^>]*>/.test(html)) {
      html = html.replace(/<link rel="canonical"[^>]*>/, canonical);
    } else {
      extra.push(canonical);
    }
  } else {
    html = html.replace(/<link rel="canonical"[^>]*>\s*/, '');
    extra.push('<meta name="robots" content="noindex" />');
  }
  if (description) {
    extra.push(`<meta name="description" content="${esc(truncate(description))}" />`);
  }
  if (extra.length) html = html.replace('</head>', `    ${extra.join('\n    ')}\n  </head>`);
  if (content !== null) {
    html = html.replace('<div id="root"></div>', `<div id="root">${content}</div>`);
    // React uses createRoot, not hydrateRoot: remove the server snapshot before client mount.
    // The initial HTML remains fully crawlable even without JavaScript.
    html = html.replace('<script type="module"', '<script>document.getElementById("root").replaceChildren();</script>\n    <script type="module"');
  }
  return html;
}

async function writePage(urlPath, html) {
  const dir = path.join(DIST, urlPath);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, 'index.html'), html);
}

async function fetchAllPosts() {
  const posts = [];
  let page = 1;
  let totalPages = 1;
  do {
    const url = `${WP_API}?per_page=100&page=${page}&_fields=slug,date,modified,title,excerpt`;
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`WordPress API returned ${res.status} for ${url}`);
    totalPages = Number(res.headers.get('x-wp-totalpages') || 1);
    posts.push(...(await res.json()));
    page += 1;
  } while (page <= totalPages);
  return posts;
}

// Matches the WordPress permalink structure: /YYYY/MM/DD/slug/
const postPath = (post) => {
  const d = post.date; // e.g. "2026-07-09T00:00:00" (site-local time)
  return `/${d.slice(0, 4)}/${d.slice(5, 7)}/${d.slice(8, 10)}/${post.slug}/`;
};

// ---------- main ----------

const template = await fs.readFile(path.join(DIST, 'index.html'), 'utf8');
const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
let renderStaticPage;
try {
  ({ renderStaticPage } = await vite.ssrLoadModule('/src/entry-server.jsx'));
} finally {
  await vite.close();
}
const homepage = renderStaticPage('/');
if (!homepage || !homepage.includes('Reclaiming Our')) throw new Error('Homepage prerender returned empty content');
await fs.writeFile(path.join(DIST, 'index.html'), renderPage(template, { urlPath: '/', title: `${SITE_NAME} | HCCF`, description: 'HCCF is a nonprofit advancing human-centered computing, digital autonomy, privacy, and technology that serves people.', content: homepage }));

const posts = await fetchAllPosts();
if (posts.length === 0) {
  throw new Error('WordPress returned 0 posts; refusing to deploy without blog pages.');
}

const sitemapEntries = [{ loc: `${SITE}/`, lastmod: null }];

// Static routes
for (const route of STATIC_ROUTES) {
  const content = renderStaticPage(route.path);
  if (!content || !content.trim()) {
    throw new Error(`Cannot publish ${route.path}: prerender returned empty content`);
  }
  await writePage(
    route.path,
    renderPage(template, { urlPath: route.path, title: route.title, description: route.description, content })
  );
  sitemapEntries.push({ loc: `${SITE}${route.path}`, lastmod: null });
}

// Blog posts
for (const post of posts) {
  const urlPath = postPath(post);
  const title = toPlain(post.title.rendered);
  const description = toPlain(post.excerpt?.rendered);
  await writePage(urlPath, renderPage(template, { urlPath, title, description }));
  sitemapEntries.push({ loc: `${SITE}${urlPath}`, lastmod: post.modified?.slice(0, 10) ?? null });
}

// A canonical + immediate HTML redirect
// preserves old inbound links, but the server status remains 200 (not a true 301).
const legacy = renderPage(template, { urlPath: '/about/', title: 'About HCCF', noindex: true });
await writePage('/about-us/', legacy.replace('</head>', '<meta http-equiv="refresh" content="0;url=/about/" /><script>location.replace("/about/")</script></head>'));

// Preserve legacy inbound links
// with an immediate client-side redirect and noindex on the old path.
const oldGtld = renderPage(template, { urlPath: '/self-gtld/', title: '.self TLD Status and Application Journey | HCCF', noindex: true });
await writePage('/gtld-journey/', oldGtld.replace('</head>', '<meta http-equiv="refresh" content="0;url=/self-gtld/" /><script>location.replace("/self-gtld/")</script></head>'));

// 404.html: app shell, no redirect, noindex.
await fs.writeFile(
  path.join(DIST, '404.html'),
  renderPage(template, { urlPath: '/404.html', title: 'Page not found', noindex: true })
);

// sitemap.xml
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  sitemapEntries
    .map(
      (e) =>
        `  <url><loc>${esc(e.loc)}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ''}</url>`
    )
    .join('\n') +
  `\n</urlset>\n`;
await fs.writeFile(path.join(DIST, 'sitemap.xml'), sitemap);

console.log(
  `Prerendered homepage, ${STATIC_ROUTES.length} static routes, ${posts.length} posts, 404.html and sitemap.xml`
);
