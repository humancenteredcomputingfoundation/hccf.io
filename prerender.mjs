// scripts/prerender.mjs
// Runs automatically after `vite build` via the "postbuild" npm script.
//
// GitHub Pages returns HTTP 404 for any path that isn't a real file, even if a
// 404.html redirect makes the page render in a browser. Google sees the 404.
// This script writes a real index.html for every route so they return 200,
// sets a per-page <title>/canonical/description, and generates sitemap.xml.
// It also replaces 404.html with the app shell (no redirect), so unknown URLs
// return a true 404 and React renders <NotFound />.

import { promises as fs } from 'node:fs';
import path from 'node:path';

const SITE = 'https://hccf.onmy.cloud';
const SITE_NAME = 'Human-Centered Computing Foundation';
const WP_API = 'https://wordpress.hccf.onmy.cloud/wp-json/wp/v2/posts';
const DIST = path.resolve('dist');

// Add an optional `description` to any entry to emit a meta description.
const STATIC_ROUTES = [
  { path: '/mission/', title: 'Mission' },
  { path: '/what-we-build/', title: 'What We Build' },
  { path: '/about/', title: 'About' },
  { path: '/blog/', title: 'Blog & News' },
  { path: '/get-involved/', title: 'Get Involved' },
  { path: '/gtld-journey/', title: 'gTLD Journey' },
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

function renderPage(template, { urlPath, title, description, noindex = false }) {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
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

const posts = await fetchAllPosts();
if (posts.length === 0) {
  throw new Error('WordPress returned 0 posts; refusing to deploy without blog pages.');
}

const sitemapEntries = [{ loc: `${SITE}/`, lastmod: null }];

// Static routes
for (const route of STATIC_ROUTES) {
  await writePage(
    route.path,
    renderPage(template, { urlPath: route.path, title: route.title, description: route.description })
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

// 404.html: app shell, no redirect, noindex. GitHub Pages serves it with a real 404 status.
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
  `Prerendered ${STATIC_ROUTES.length} static routes, ${posts.length} posts, 404.html and sitemap.xml`
);
