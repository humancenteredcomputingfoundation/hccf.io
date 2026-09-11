import React, { useEffect, useState } from 'react';
import { fetchBlogPosts } from '../services/wordpress';
import { WPPost } from '../types/wordpress';

const FALLBACK_POSTS = [
  {
    id: 1,
    title: "The Weight of Assumptions",
    author: "Riley O'Donnell",
    date: "July 9, 2026",
    excerpt: "Since the assertions of any given protocol are declarations emanating from some kind of entity, the nature of such entities...",
    content: "<p>Since the assertions of any given protocol are declarations emanating from some kind of entity, the nature of such entities determines how those assertions function in real-world systems.</p><p>When assumptions are built into core abstractions, they carry significant weight across all dependent layers.</p>"
  },
  {
    id: 2,
    title: "The Peculiarities of Human Interfaces",
    author: "Riley O'Donnell",
    date: "July 8, 2026",
    excerpt: "Aside from purely functional protocols that operate at a particular layer in the stack and are primarily used by the...",
    content: "<p>Aside from purely functional protocols that operate at a particular layer in the stack, human interfaces require specialized design principles prioritizing clarity and user autonomy.</p>"
  },
  {
    id: 3,
    title: "Protocols Become Principles, Assertions Become Assumptions",
    author: "Riley O'Donnell",
    date: "July 7, 2026",
    excerpt: "Technology is often described in terms of layers, from hardware up to software, in whole comprising a stack of abstractions...",
    content: "<p>Technology is often described in terms of layers, from hardware up to software. Over time, rigid protocols evolve into foundational principles.</p>"
  },
  {
    id: 4,
    title: "Towards a More Human-Centered Future",
    author: "Riley O'Donnell",
    date: "July 6, 2026",
    excerpt: "The Current State of the Consumer Software Industry Most consumer software products today take advantage of the humans that use...",
    content: "<p>Most consumer software products today take advantage of human attention. A human-centered paradigm shifts control back to the end user.</p>"
  },
  {
    id: 5,
    title: "Reclaiming Our Digital Selves: HCCF's Vision for a Human-Centered Top-Level Domain",
    author: "Riley O'Donnell",
    date: "June 21, 2026",
    excerpt: "The Internet is the most powerful communication tool ever created, yet the infrastructure underpinning it has been leveraged by the...",
    content: "<p>The Internet is the most powerful communication tool ever created. Establishing digital sovereignty requires reimagining public core infrastructure like top-level domains.</p>"
  }
];

// Helper to calculate reading time based on 200 words per minute
const calculateReadingTime = (text: string): number => {
  const plainText = text.replace(/<[^>]+>/g, ''); // Strip HTML tags
  const words = plainText.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

export const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

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

    return {
      id: post.id,
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

  const currentIndex = displayPosts.findIndex((p) => p.id === selectedPostId);
  const selectedPost = currentIndex !== -1 ? displayPosts[currentIndex] : null;
  const prevPost = currentIndex > 0 ? displayPosts[currentIndex - 1] : null;
  const nextPost = currentIndex !== -1 && currentIndex < displayPosts.length - 1 ? displayPosts[currentIndex + 1] : null;

  const handleSelectPost = (id: number) => {
    setSelectedPostId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedPostId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="blog-page">
      <section className="blog-hero-section">
        <div className="section-container">
          <span className="blog-tag">Blog & News</span>
          <h1 className="blog-hero-title">
            {selectedPost ? selectedPost.title : "Towards a More Human-Centered Future"}
          </h1>
          {selectedPost && (
            <span className="blog-meta">
              By {selectedPost.author} • {selectedPost.date} • {selectedPost.readTime} min read
            </span>
          )}
        </div>
      </section>

      <section className="blog-feed-section">
        <div className="section-container">
          {loading ? (
            <div className="blog-loading">Loading articles...</div>
          ) : selectedPost ? (
            /* Full Single Post Viewer */
            <div className="single-post-container">
              <button onClick={handleBackToList} className="blog-back-btn">
                &larr; Back to Articles
              </button>

              <article 
                className="single-post-content"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />

              {/* Next and Previous Controls */}
              <div className="post-nav-container">
                {prevPost ? (
                  <button 
                    onClick={() => handleSelectPost(prevPost.id)} 
                    className="post-nav-btn prev"
                  >
                    <span className="post-nav-label">&larr; Previous Article</span>
                    <span className="post-nav-title">{prevPost.title}</span>
                  </button>
                ) : <div />}

                {nextPost ? (
                  <button 
                    onClick={() => handleSelectPost(nextPost.id)} 
                    className="post-nav-btn next"
                  >
                    <span className="post-nav-label">Next Article &rarr;</span>
                    <span className="post-nav-title">{nextPost.title}</span>
                  </button>
                ) : <div />}
              </div>
            </div>
          ) : (
            /* Post Grid */
            <div className="blog-grid">
              {displayPosts.map((post) => (
                <article 
                  key={post.id} 
                  onClick={() => handleSelectPost(post.id)}
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