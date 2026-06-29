import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/blogData';

interface BlogProps {
  onNavigateToBlog: (id: string) => void;
}

export default function Blog({ onNavigateToBlog }: BlogProps) {
  return (
    <section id="blog" className="py-24 bg-[var(--card-color)] border-b border-[var(--border-color)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs font-bold text-[var(--primary-color)] uppercase tracking-wider mb-2 block">
            Inside the Engine
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[var(--text-color)] font-semibold tracking-tight mb-4">
            The Commit+ Journal
          </h2>
          <p className="text-base text-[var(--text-muted-color)] font-sans">
            Reflections on native software design, system mechanics, and modern Git workflows.
          </p>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              onClick={() => onNavigateToBlog(post.id)}
              whileHover={{ y: -4 }}
              className="bg-[var(--bg-color)] border border-[var(--border-color)] rounded-2xl p-6 shadow-2xs hover:shadow-sm cursor-pointer flex flex-col justify-between text-left group transition-all"
            >
              <div>
                {/* Meta Row */}
                <div className="flex items-center space-x-2 text-[10px] font-mono text-neutral-400 mb-4">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3 text-[var(--primary-color)]" />
                    <span>{post.date}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-[var(--primary-color)]" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-lg font-bold text-[var(--text-color)] mb-3 group-hover:text-[var(--primary-color)] transition-colors leading-snug">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs text-[var(--text-muted-color)] font-sans leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="border-t border-dashed border-[var(--border-color)] pt-4 mt-auto">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-mono bg-[var(--neutral-light-color)] text-[var(--text-muted-color)] px-1.5 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs">
                  {/* Author */}
                  <div className="flex items-center space-x-2">
                    <img src={post.author.avatar} alt={post.author.name} className="w-5 h-5 rounded-full object-cover" />
                    <span className="font-sans font-medium text-[11px] text-[var(--text-color)]">{post.author.name}</span>
                  </div>

                  {/* Expand button */}
                  <span className="flex items-center space-x-1 text-[11px] font-mono font-bold text-[var(--primary-color)] group-hover:translate-x-1 transition-transform">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
