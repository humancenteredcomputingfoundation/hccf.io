import React, { useEffect, useState } from 'react';
import { fetchBlogPosts } from '../services/wordpress';
import { WPPost } from '../types/wordpress';

export const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fallback posts matching PDF content if CMS fails/is unconfigured
  const fallbackPosts = [
    {
      id: 1,
      title: "The Weight of Assumptions",
      author: "Riley O'Donnell",
      date: "July 9, 2026",
      excerpt: "Since the assertions of any given protocol are declarations emanating from some kind of entity, the nature of such entities..."
    },
    {
      id: 2,
      title: "The Peculiarities of Human Interfaces",
      author: "Riley O'Donnell",
      date: "July 8, 2026",
      excerpt: "Aside from purely functional protocols that operate at a particular layer in the stack and are primarily used by the..."
    },
    {
      id: 3,
      title: "Protocols Become Principles, Assertions Become Assumptions",
      author: "Riley O'Donnell",
      date: "July 7, 2026",
      excerpt: "Technology is often described in terms of layers, from hardware up to software, in whole comprising a stack of abstractions..."
    },
    {
      id: 4,
      title: "Towards a More Human-Centered Future",
      author: "Riley O'Donnell",
      date: "July 6, 2026",
      excerpt: "The Current State of the Consumer Software Industry Most consumer software products today take advantage of the humans that use..."
    },
    {
      id: 5,
      title: "Reclaiming Our Digital Selves: HCCF's Vision for a Human-Centered Top-Level Domain",
      author: "Riley O'Donnell",
      date: "June 21, 2026",
      excerpt: "The Internet is the most powerful communication tool ever created, yet the infrastructure underpinning it has been leveraged by the..."
    }
  ];

  useEffect(() => {
    const loadPosts = async () => {
      const cmsPosts = await fetchBlogPosts();
      if (cmsPosts && cmsPosts.length > 0) {
        setPosts(cmsPosts);
      }
      setLoading(false);
    };
    loadPosts();
  }, []);

  return (
    <section className="max-w-5xl mx-auto px-6 py-20 space-y-12">
      <div className="space-y-2">
        <span className="text-teal-400 text-sm font-bold tracking-widest uppercase">Blog & News</span>
        <h2 className="text-4xl font-bold text-white">Towards a More Human-Centered Future</h2>
      </div>

      {loading ? (
        <div className="text-teal-300 animate-pulse">Loading WordPress articles...</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {(posts.length > 0 ? posts : fallbackPosts).map((post: any) => (
            <article key={post.id} className="bg-[#03343d]/40 border border-[#0e4b56] p-6 rounded-xl flex flex-col justify-between hover:border-teal-500/50 transition-all">
              <div className="space-y-3">
                <span className="text-xs text-teal-400 font-semibold uppercase tracking-wider">
                  {post.author || post._embedded?.author?.[0]?.name || "Riley O'Donnell"} • {post.date}
                </span>
                <h3 className="text-xl font-bold text-white hover:text-teal-300 cursor-pointer">
                  {post.title?.rendered || post.title}
                </h3>
                <p 
                  className="text-slate-300 text-sm leading-relaxed" 
                  dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered || post.excerpt }} 
                />
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};