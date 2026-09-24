import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBlogPosts } from '../services/wordpress';
import { WPPost } from '../types/wordpress';
import NotFound from './NotFound';

const FALLBACK_POSTS = [
  {
    id: 1,
    slug: "the-weight-of-assumptions",
    title: "The Weight of Assumptions",
    author: "Riley O'Donnell",
    date: "July 9, 2026",
    excerpt: "Since the assertions of any given protocol are declarations emanating from some kind of entity, the nature of such entities...",
    content: "<p>Since the assertions of any given protocol are declarations emanating from some kind of entity, the nature of such entities determines how those assertions function in real-world systems.</p><p>When assumptions are built into core abstractions, they carry significant weight across all dependent layers.</p>"
  },
  {
    id: 2,
    slug: "the-peculiarities-of-human-interfaces",
    title: "The Peculiarities of Human Interfaces",
    author: "Riley O'Donnell",
    date: "July 8, 2026",
    excerpt: "Aside from purely functional protocols that operate at a particular layer in the stack and are primarily used by the...",
    content: "<p>Aside from purely functional protocols that operate at a particular layer in the stack, human interfaces require specialized design principles prioritizing clarity and user autonomy.</p>"
  },
  {
    id: 3,
    slug: "protocols-become-principles-assertions-become-assumptions",
    title: "Protocols Become Principles, Assertions Become Assumptions",
    author: "Riley O'Donnell",
    date: "July 7, 2026",
    excerpt: "Technology is often described in terms of layers, from hardware up to software, in whole comprising a stack of abstractions...",
    content: "<p>Technology is often described in terms of layers, from hardware up to software. Over time, rigid protocols evolve into foundational principles.</p>"
  },
  {
    id: 4,
    slug: "towards-a-more-human-centered-future",
    title: "Towards a More Human-Centered Future",
    author: "Riley O'Donnell",
    date: "July 6, 2026",
    excerpt: "The Current State of the Consumer Software Industry Most consumer software products today take advantage of the humans that use...",
    content: "<p>Most consumer software products today take advantage of human attention. A human-centered paradigm shifts control back to the end user.</p>"
  },
  {
    id: 5,
    slug: "reclaiming-our-digital-selves-hccfs-vision-for-a-human-centered-top-level-domain",
    title: "Reclaiming Our Digital Selves: HCCF's Vision for a Human-Centered Top-Level Domain",
    author: "Riley O'Donnell",
    date: "June 21, 2026",
    excerpt: "The Internet is the most powerful communication tool ever created, yet the infrastructure underpinning it has been leveraged by the...",
    content: "<p>The Internet is the most powerful communication tool ever created. Establishing digital sovereignty requires reimagining public core infrastructure like top-level domains.</p>"
  }
];

const calculateReadingTime = (text: string): number => {
  const plainText = text.replace(/<[^>]+>/g, '');
  const words = plainText.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      setLoading(true);

      try {
        const cmsPosts = await fetchBlogPosts();
        if (isMounted) {
          const loadedPosts = cmsPosts && cmsPosts.length > 0 ? cmsPosts : FALLBACK_POSTS;
          setPosts(loadedPosts);
        }
      } catch (error) {
        if (isMounted) setPosts(FALLBACK_POSTS);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();
    return () => { isMounted = false; };
  }, [slug]);

  // Format posts to standard internal shape
  const formattedPosts = posts.map((post: any) => {
    const rawContent = typeof post.content === 'object' ? post.content?.rendered : (post.content || post.excerpt);
    const rawExcerpt = typeof post.excerpt === 'object' ? post.excerpt?.rendered : post.excerpt;
    const computedSlug = post.slug || (typeof post.title === 'string' ? post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : '');

    return {
      id: post.id,
      slug: computedSlug,
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

  const currentIndex = formattedPosts.findIndex(
    (p) => p.slug.toLowerCase() === slug?.toLowerCase()
  );

  const currentPost = currentIndex !== -1 ? formattedPosts[currentIndex] : null;
  const prevPost = currentIndex > 0 ? formattedPosts[currentIndex - 1] : null;
  const nextPost = currentIndex !== -1 && currentIndex < formattedPosts.length - 1 ? formattedPosts[currentIndex + 1] : null;

  // Render Single Article Skeleton Screen
  if (loading) {
    return (
      <div className="blog-page">
        <section className="blog-hero-section">
          <div className="section-container">
            <span className="blog-tag">Blog & News</span>
            <div className="skeleton-box skeleton-title" style={{ width: '70%', height: '48px', marginTop: '0.5rem' }} />
          </div>
        </section>

        <section className="blog-feed-section">
          <div className="section-container">
            <div className="single-post-container">
              <div className="skeleton-box skeleton-button" style={{ width: '140px', height: '36px', marginBottom: '2.5rem' }} />
              <div className="skeleton-box skeleton-line" style={{ height: '20px', marginBottom: '1rem' }} />
              <div className="skeleton-box skeleton-line" style={{ height: '20px', marginBottom: '1rem' }} />
              <div className="skeleton-box skeleton-line-short" style={{ height: '20px', marginBottom: '2.5rem' }} />
              <div className="skeleton-box skeleton-line" style={{ height: '20px', marginBottom: '1rem' }} />
              <div className="skeleton-box skeleton-line" style={{ height: '20px', marginBottom: '1rem' }} />
              <div className="skeleton-box skeleton-line-short" style={{ height: '20px', marginBottom: '1rem' }} />
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Render 404 page if no article matches the URL slug
  if (!currentPost) {
    return <NotFound />;
  }

  return (
    <div className="blog-page">
      <section className="blog-hero-section">
        <div className="section-container">
          <span className="blog-tag">Blog & News</span>
          <h1 className="blog-hero-title">{currentPost.title}</h1>
          <span className="blog-meta">
            By {currentPost.author} • {currentPost.date} • {currentPost.readTime} min read
          </span>
        </div>
      </section>

      <section className="blog-feed-section">
        <div className="section-container">
          <div className="single-post-container">
            <button onClick={() => navigate('/blog')} className="blog-back-btn">
              &larr; Back to Articles
            </button>

            <article
              className="single-post-content"
              dangerouslySetInnerHTML={{ __html: currentPost.content }}
            />

            {/* Previous & Next Post Navigation */}
            <div className="post-nav-container">
              {prevPost ? (
                <button
                  onClick={() => navigate(`/blog/${prevPost.slug}`)}
                  className="post-nav-btn prev"
                >
                  <span className="post-nav-label">&larr; Previous Article</span>
                  <span className="post-nav-title">{prevPost.title}</span>
                </button>
              ) : <div />}

              {nextPost ? (
                <button
                  onClick={() => navigate(`/blog/${nextPost.slug}`)}
                  className="post-nav-btn next"
                >
                  <span className="post-nav-label">Next Article &rarr;</span>
                  <span className="post-nav-title">{nextPost.title}</span>
                </button>
              ) : <div />}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPostPage;