import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBlogPosts } from '../services/wordpress';
import { WPPost } from '../types/wordpress';

// Skeleton Component for the Feed Grid
const BlogGridSkeleton: React.FC = () => {
  return (
    <div className="skeleton-grid">
      {[1, 2, 3, 4, 5, 6].map((key) => (
        <div key={key} className="skeleton-card">
          <div>
            <div className="skeleton-box skeleton-meta" />
            <div className="skeleton-box skeleton-title" />
            <div className="skeleton-box skeleton-title-short" />
            <div className="skeleton-box skeleton-line" />
            <div className="skeleton-box skeleton-line" />
            <div className="skeleton-box skeleton-line-short" />
          </div>
          <div className="skeleton-box skeleton-button" />
        </div>
      ))}
    </div>
  );
};

const FALLBACK_POSTS = [
  {
    id: 1,
    slug: "the-weight-of-assumptions",
    title: "The Weight of Assumptions",
    author: "Riley O'Donnell",
    date: "2026-07-09T00:00:00",
    excerpt: "Since the assertions of any given protocol are declarations emanating from some kind of entity, the nature of such entities...",
    content: "<p>Since the assertions of any given protocol are declarations emanating from some kind of entity, the nature of such entities determines how those assertions function in real-world systems.</p><p>When assumptions are built into core abstractions, they carry significant weight across all dependent layers.</p>"
  },
  {
    id: 2,
    slug: "the-peculiarities-of-human-interfaces",
    title: "The Peculiarities of Human Interfaces",
    author: "Riley O'Donnell",
    date: "2026-07-08T00:00:00",
    excerpt: "Aside from purely functional protocols that operate at a particular layer in the stack and are primarily used by the...",
    content: "<p>Aside from purely functional protocols that operate at a particular layer in the stack, human interfaces require specialized design principles prioritizing clarity and user autonomy.</p>"
  },
  {
    id: 3,
    slug: "protocols-become-principles-assertions-become-assumptions",
    title: "Protocols Become Principles, Assertions Become Assumptions",
    author: "Riley O'Donnell",
    date: "2026-07-07T00:00:00",
    excerpt: "Technology is often described in terms of layers, from hardware up to software, in whole comprising a stack of abstractions...",
    content: "<p>Technology is often described in terms of layers, from hardware up to software. Over time, rigid protocols evolve into foundational principles.</p>"
  },
  {
    id: 4,
    slug: "towards-a-more-human-centered-future",
    title: "Towards a More Human-Centered Future",
    author: "Riley O'Donnell",
    date: "2026-07-06T00:00:00",
    excerpt: "The Current State of the Consumer Software Industry Most consumer software products today take advantage of the humans that use...",
    content: "<p>Most consumer software products today take advantage of human attention. A human-centered paradigm shifts control back to the end user.</p>"
  },
  {
    id: 5,
    slug: "reclaiming-our-digital-selves-hccfs-vision-for-a-human-centered-top-level-domain",
    title: "Reclaiming Our Digital Selves: HCCF's Vision for a Human-Centered Top-Level Domain",
    author: "Riley O'Donnell",
    date: "2026-06-21T00:00:00",
    excerpt: "The Internet is the most powerful communication tool ever created, yet the infrastructure underpinning it has been leveraged by the...",
    content: "<p>The Internet is the most powerful communication tool ever created. Establishing digital sovereignty requires reimagining public core infrastructure like top-level domains.</p>"
  }
];

const calculateReadingTime = (text: string): number => {
  const plainText = text.replace(/<[^>]+>/g, '');
  const words = plainText.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

// Formats post date to /YYYY/MM/DD/slug
const formatPostPath = (postDate: string, slug: string): string => {
  const dateObj = new Date(postDate);
  if (isNaN(dateObj.getTime())) {
    return `/blog/${slug}`;
  }
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `/${year}/${month}/${day}/${slug}`;
};

export const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const loadPosts = async () => {
      try {
        const cmsPosts = await fetchBlogPosts();
        if (isMounted && cmsPosts && cmsPosts.length > 0) {
          setPosts(cmsPosts);
        }
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadPosts();
    return () => { isMounted = false; };
  }, []);

  const displayPosts = (posts.length > 0 ? posts : FALLBACK_POSTS).map((post: any) => {
    const rawContent = typeof post.content === 'object' ? post.content?.rendered : (post.content || post.excerpt);
    const rawExcerpt = typeof post.excerpt === 'object' ? post.excerpt?.rendered : post.excerpt;
    const computedSlug = post.slug || (typeof post.title === 'string' ? post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : '');
    const fullPath = formatPostPath(post.date, computedSlug);

    return {
      id: post.id,
      slug: computedSlug,
      path: fullPath,
      title: typeof post.title === 'object' ? post.title?.rendered : post.title,
      excerpt: rawExcerpt,
      content: rawContent,
      author: post._embedded?.author?.[0]?.name || post.author || "Riley O'Donnell",
      date: post.date?.includes('T')
        ? new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        : post.date,
      readTime: calculateReadingTime(rawContent || rawExcerpt),
    };
  });

  return (
    <div className="blog-page">
      <section className="blog-hero-section">
        <div className="section-container">
          <span className="blog-tag">Blog & News</span>
          <h1 className="blog-hero-title">Latest Updates & Perspectives</h1>
        </div>
      </section>

      <section className="blog-feed-section">
        <div className="section-container">
          {loading ? (
            <BlogGridSkeleton />
          ) : (
            <div className="blog-grid">
              {displayPosts.map((post) => (
                <article 
                  key={post.id} 
                  onClick={() => navigate(post.path)}
                  className="blog-card"
                >
                  <div>
                    <span className="blog-meta">{post.author} • {post.date} • {post.readTime} min read</span>
                    <h2 className="blog-card-title">{post.title}</h2>
                    <div 
                      className="blog-excerpt"
                      dangerouslySetInnerHTML={{ __html: post.excerpt }} 
                    />
                  </div>
                  <span className="blog-read-more">Read Full Article &rarr;</span>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};