import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Calendar, Clock, Heart, Share2, Bookmark, 
  MessageSquare, Send, ThumbsUp, ChevronRight, CornerDownRight, Check
} from 'lucide-react';
import { blogPosts, BlogPost } from '../data/blogData';

interface BlogDetailProps {
  blogId: string;
  onNavigateHome: () => void;
  onNavigateToBlog: (id: string) => void;
}

interface Comment {
  id: string;
  author: string;
  avatar: string;
  role: string;
  timestamp: string;
  content: string;
  likes: number;
  hasLiked?: boolean;
}

export default function BlogDetail({ blogId, onNavigateHome, onNavigateToBlog }: BlogDetailProps) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Find current post
  const post = blogPosts.find(p => p.id === blogId) || blogPosts[0];

  // Dummy comment engine state
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: 'Alex Mercer',
      role: 'macOS Developer',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80',
      timestamp: 'Yesterday at 3:14 PM',
      content: 'Using standard git CLI subprocess pipes is such an elegant design decision. It guarantees all local git configs and SSH hooks run exactly as they should. Can’t wait to download the release candidate!',
      likes: 12
    },
    {
      id: '2',
      author: 'Sophia Chen',
      role: 'UI Engineer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
      timestamp: '2 days ago',
      content: 'The memory footprint of 18MB is an absolute dream. Electron has ruined desktop software, so seeing native SwiftUI tools makes me incredibly happy.',
      likes: 8
    }
  ]);
  const [newComment, setNewComment] = useState('');

  // Reset likes/bookmarks state when post changes
  useEffect(() => {
    setLiked(false);
    setBookmarked(false);
    setCopied(false);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [blogId]);

  const handleLikeComment = (commentId: string) => {
    setComments(prev => prev.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          likes: c.hasLiked ? c.likes - 1 : c.likes + 1,
          hasLiked: !c.hasLiked
        };
      }
      return c;
    }));
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const added: Comment = {
      id: Date.now().toString(),
      author: 'You (Contributor)',
      role: 'Developer',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80',
      timestamp: 'Just now',
      content: newComment.trim(),
      likes: 0
    };

    setComments(prev => [...prev, added]);
    setNewComment('');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Filter out the current post to recommend other articles
  const recommendations = blogPosts.filter(p => p.id !== post.id);

  return (
    <div className="py-16 sm:py-24 bg-[var(--bg-color)] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center space-x-2 text-xs font-mono text-neutral-400 mb-8 border-b border-[var(--border-color)] pb-4">
          <button 
            onClick={onNavigateHome} 
            className="hover:text-[var(--primary-color)] transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[var(--text-muted-color)]">Blog</span>
          <span>/</span>
          <span className="text-[var(--primary-color)] truncate max-w-[150px] sm:max-w-none">{post.title}</span>
        </div>

        {/* Back Button */}
        <div className="mb-8 text-left">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-[var(--border-color)] rounded-xl text-xs font-mono font-bold text-[var(--text-muted-color)] hover:text-[var(--text-color)] hover:border-[var(--primary-color)] hover:shadow-2xs transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[var(--primary-color)]" />
            <span>Back to Journal Overview</span>
          </button>
        </div>

        {/* Main Article Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Article Column (8 cols) */}
          <article className="lg:col-span-8 bg-white border border-[var(--border-color)] rounded-3xl p-6 sm:p-10 md:p-12 shadow-3xs space-y-8 text-left">
            
            {/* Post Header Meta */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="text-[10px] font-mono font-bold uppercase bg-[var(--primary-color)]/10 text-[var(--primary-color)] px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--text-color)] tracking-tight leading-tight">
                {post.title}
              </h1>

              {/* Author & Read stats */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 pt-4 border-t border-b border-[var(--bg-color)] py-4">
                <div className="flex items-center space-x-2.5">
                  <img 
                    src={post.author.avatar} 
                    alt={post.author.name} 
                    className="w-10 h-10 rounded-full object-cover border border-[var(--border-color)]" 
                  />
                  <div>
                    <span className="block font-bold text-[var(--text-color)]">{post.author.name}</span>
                    <span className="text-[10px] text-neutral-400">{post.author.role}</span>
                  </div>
                </div>

                <span className="text-[var(--border-color)] hidden sm:inline-block">|</span>

                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4 text-[var(--primary-color)]" />
                    <span>{post.date}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-[var(--primary-color)]" />
                    <span>{post.readTime}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Post Content Details */}
            <div className="space-y-6 text-base sm:text-lg text-[var(--text-color)] font-sans leading-relaxed">
              {post.content.map((paragraph, index) => (
                <p key={index} className="first-letter:font-serif first-letter:text-2xl first-letter:font-bold first-letter:text-[var(--primary-color)] first-letter:mr-1">
                  {paragraph}
                </p>
              ))}

              <p className="text-base text-[var(--text-muted-color)]">
                We hope this behind-the-scenes engineering analysis gives you insight into the core values of MacGit. High-performance native macOS engineering is far from dead, and Commit+ stands as a proud demonstration that visual elegance does not have to come at the cost of your RAM.
              </p>
            </div>

            {/* Code / Visual block showcase inside blog post */}
            <div className="bg-[var(--text-color)] rounded-2xl p-5 border border-neutral-800 text-xs font-mono text-neutral-300 space-y-3 relative overflow-hidden select-all shadow-md">
              <div className="absolute top-0 right-0 p-2 bg-[#2a2927] rounded-bl-lg text-[9px] text-[var(--primary-color)] font-bold">
                SWIFT PIPELINE EXPR
              </div>
              <pre className="text-left leading-relaxed overflow-x-auto whitespace-pre">
{`import Foundation

/// Dispatches localized git command pipeline asynchronously
func dispatchSubprocess(args: [String], currentPath: String) async throws -> String {
    let task = Process()
    task.executableURL = URL(fileURLWithPath: "/usr/bin/env")
    task.arguments = ["git"] + args
    task.currentDirectoryURL = URL(fileURLWithPath: currentPath)
    
    let outputPipe = Pipe()
    task.standardOutput = outputPipe
    
    try task.run()
    task.waitUntilExit()
    
    let data = outputPipe.fileHandleForReading.readDataToEndOfFile()
    return String(data: data, encoding: .utf8) ?? ""
}`}
              </pre>
            </div>

            {/* Reactions / Bottom Controls panel */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[var(--border-color)]">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`px-4 py-2 rounded-xl border flex items-center space-x-2 text-xs font-mono font-bold transition-all ${
                    liked 
                      ? 'bg-[var(--primary-color-light)] border-[var(--primary-color)]/30 text-[var(--primary-color)] shadow-3xs' 
                      : 'bg-[var(--bg-color)] border-[var(--border-color)] text-[var(--text-muted-color)] hover:text-[var(--text-color)] hover:border-[var(--primary-color)]/40'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${liked ? 'fill-[var(--primary-color)]' : ''}`} />
                  <span>{liked ? post.likes + 1 : post.likes} Likes</span>
                </button>

                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`p-2.5 rounded-xl border transition-all ${
                    bookmarked 
                      ? 'bg-amber-50 border-amber-300 text-amber-600' 
                      : 'bg-[var(--bg-color)] border-[var(--border-color)] text-[var(--text-muted-color)] hover:text-[var(--text-color)]'
                  }`}
                  title={bookmarked ? 'Remove Bookmark' : 'Bookmark Article'}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleShare}
                  className="px-4 py-2 bg-[var(--bg-color)] hover:bg-[#eae7df] border border-[var(--border-color)] text-xs font-mono font-bold text-[var(--text-muted-color)] hover:text-[var(--text-color)] rounded-xl transition-all flex items-center space-x-2"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
                </button>
              </div>
            </div>

            {/* Comments Feed Area */}
            <div className="border-t border-[var(--border-color)] pt-8 space-y-6">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-[var(--primary-color)]" />
                <h3 className="font-serif text-xl font-bold text-[var(--text-color)]">
                  Discussion ({comments.length})
                </h3>
              </div>

              {/* Add comment form */}
              <form onSubmit={handlePostComment} className="flex gap-4 items-start bg-[var(--bg-color)] p-4 rounded-2xl border border-[var(--border-color)]">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80" 
                  alt="My avatar" 
                  className="w-8 h-8 rounded-full object-cover shrink-0 border border-[var(--border-color)]" 
                />
                <div className="flex-1 space-y-3">
                  <textarea
                    rows={2}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a constructive response..."
                    className="w-full text-xs font-sans bg-white border border-[#d2d0c7] rounded-xl p-3 focus:outline-hidden focus:ring-1 focus:ring-[var(--primary-color)] placeholder-neutral-400 text-[var(--text-color)]"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)] text-white rounded-xl font-mono font-bold text-[10px] flex items-center space-x-1.5 shadow-2xs cursor-pointer"
                    >
                      <span>Post Response</span>
                      <Send className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </form>

              {/* Comment list */}
              <div className="space-y-4 pt-2">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-4 text-xs text-left border-b border-[var(--border-color)]/50 pb-4 last:border-b-0 last:pb-0">
                    <img src={comment.avatar} alt={comment.author} className="w-8 h-8 rounded-full object-cover shrink-0 border border-[var(--border-color)]" />
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-[var(--text-color)]">{comment.author}</span>
                          <span className="text-[9px] bg-[#eae7df] text-neutral-500 px-1.5 py-0.5 rounded ml-2 uppercase tracking-wide">
                            {comment.role}
                          </span>
                        </div>
                        <span className="text-[10px] text-neutral-400 font-mono">{comment.timestamp}</span>
                      </div>
                      <p className="text-xs text-[var(--text-muted-color)] leading-relaxed font-sans">{comment.content}</p>
                      
                      {/* Comment like */}
                      <button
                        type="button"
                        onClick={() => handleLikeComment(comment.id)}
                        className={`flex items-center space-x-1 px-2 py-1 rounded hover:bg-[#eae7df] font-mono text-[10px] ${
                          comment.hasLiked ? 'text-[var(--primary-color)] font-bold' : 'text-neutral-400'
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>{comment.likes} {comment.likes === 1 ? 'Like' : 'Likes'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </article>

          {/* Sidebar Area (4 cols) */}
          <aside className="lg:col-span-4 space-y-8 text-left">
            
            {/* Project Callout */}
            <div className="bg-[var(--primary-color)]/5 border border-[var(--primary-color)]/20 rounded-3xl p-6 space-y-4">
              <span className="font-mono text-[9px] font-bold text-[var(--primary-color)] uppercase tracking-wider block">
                NATIVE REPOSITORY
              </span>
              <h4 className="font-serif text-lg font-bold text-[var(--text-color)] leading-tight">
                Inspect Commit+ on Github
              </h4>
              <p className="text-xs text-[var(--text-muted-color)] leading-relaxed">
                Commit+ is fully public. Download compiled releases, report bugs, review AppKit integrations, or contribute directly.
              </p>
              <a 
                href="https://github.com/Tranthanh98/macgit" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center space-x-1 text-xs font-mono font-bold text-[var(--primary-color)] hover:underline"
              >
                <span>Visit Github Repository</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Read Next Recommendations */}
            <div className="bg-white border border-[var(--border-color)] rounded-3xl p-6 space-y-4">
              <h4 className="font-serif text-base font-bold text-[var(--text-color)] border-b border-[var(--border-color)] pb-3">
                Other Journal Articles
              </h4>
              
              <div className="space-y-4">
                {recommendations.map(rec => (
                  <div 
                    key={rec.id}
                    onClick={() => onNavigateToBlog(rec.id)}
                    className="group cursor-pointer space-y-1 block"
                  >
                    <span className="block text-[9px] font-mono text-[var(--primary-color)] uppercase tracking-wide">
                      {rec.tags[0]}
                    </span>
                    <h5 className="font-sans text-xs font-bold text-[var(--text-color)] group-hover:text-[var(--primary-color)] transition-colors leading-snug">
                      {rec.title}
                    </h5>
                    <p className="text-[10px] text-neutral-400 line-clamp-2">
                      {rec.excerpt}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter form */}
            <div className="bg-[var(--neutral-light-color)] border border-[var(--border-color)] rounded-3xl p-6 space-y-3">
              <h4 className="font-serif text-sm font-bold text-[var(--text-color)]">
                Join our Technical Journal
              </h4>
              <p className="text-xs text-[var(--text-muted-color)] leading-relaxed">
                Receive modular breakdowns, Git optimizations, and SwiftUI system updates once every two weeks.
              </p>
              <div className="pt-2 space-y-2">
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="w-full text-xs font-sans bg-white border border-[#d2d0c7] rounded-xl px-3 py-2 text-[var(--text-color)] focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={() => alert('Successfully joined the Technical Journal!')}
                  className="w-full py-2 bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)] text-white rounded-xl font-mono font-bold text-[10px]"
                >
                  Join Newsletter
                </button>
              </div>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}
