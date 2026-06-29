import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Sparkles, FileText, BookOpen, X, Terminal, Cpu } from 'lucide-react';
import { blogPosts } from '../data/blogData';
import { docSections } from '../data/docsData';

interface SpotlightSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchItem {
  category: 'feature' | 'blog' | 'doc';
  title: string;
  subtitle: string;
  meta?: string;
  path: string;
  sectionId?: string;
  tabId?: string;
}

export default function SpotlightSearch({ isOpen, onClose }: SpotlightSearchProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Integrated search registry containing key product features, blog posts, and developer docs
  const database: SearchItem[] = [
    // --- LANDING PAGE FEATURES ---
    {
      category: 'feature',
      title: 'One-Click Undo Engine',
      subtitle: 'Instantly reverse git commits, checkout states, or staging changes in our interactive playground',
      meta: 'Interactive Module',
      path: '/',
      sectionId: 'interactive',
      tabId: 'undo'
    },
    {
      category: 'feature',
      title: 'Surgical Drag-and-Drop Staging',
      subtitle: 'Drag specific code blocks, hunks, or entire files to stage and commit them dynamically',
      meta: 'Interactive Module',
      path: '/',
      sectionId: 'interactive',
      tabId: 'dragdrop'
    },
    {
      category: 'feature',
      title: 'Simplified Git Flow Orchestrator',
      subtitle: 'Visually initialize, develop, publish, and finish Git branches with automated tracking',
      meta: 'Interactive Module',
      path: '/',
      sectionId: 'interactive',
      tabId: 'gitflow'
    },
    {
      category: 'feature',
      title: 'High-Frequency Subprocess Benchmark',
      subtitle: 'Compare Swift IPC subprocess efficiency and memory overhead in real-time speed metrics',
      meta: 'Interactive Module',
      path: '/',
      sectionId: 'interactive',
      tabId: 'performance'
    },
    {
      category: 'feature',
      title: 'Isolated Git Worktrees',
      subtitle: 'Context switch instantly by keeping parallel branches in separate physical folders',
      meta: 'Bento Feature',
      path: '/docs/git-worktrees'
    },
    {
      category: 'feature',
      title: 'Surgical Conflict Resolution',
      subtitle: 'Solve difficult file merging conflicts directly with intuitive click selectors',
      meta: 'Bento Feature',
      path: '/',
      sectionId: 'features'
    },

    // --- BLOG POSTS ---
    ...blogPosts.map(post => ({
      category: 'blog' as const,
      title: post.title,
      subtitle: post.excerpt,
      meta: `${post.readTime} • ${post.date}`,
      path: `/blog/${post.id}`
    })),

    // --- DOCS ---
    ...docSections.map(sec => ({
      category: 'doc' as const,
      title: sec.title,
      subtitle: `Manual topic detailing configurations for ${sec.title}`,
      meta: sec.category,
      path: `/docs/${sec.id}`
    }))
  ];

  // Filter registry based on search query
  const filtered = database.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase()) ||
    item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    (item.meta && item.meta.toLowerCase().includes(query.toLowerCase()))
  );

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      setSelectedIndex(0);
      setQuery('');
    }
  }, [isOpen]);

  // Global keyboard listener for hotkey triggering
  useEffect(() => {
    const handleGlobalKeys = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modifier = isMac ? e.metaKey : e.ctrlKey;

      if (modifier && e.shiftKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleGlobalKeys);
    return () => window.removeEventListener('keydown', handleGlobalKeys);
  }, [isOpen, onClose]);

  // Execution action upon selecting an item
  const handleSelectItem = (item: SearchItem) => {
    onClose();

    // If it points to an element ID on the landing page
    if (item.path === '/' && item.sectionId) {
      // If we are currently not on the home page, navigate to homepage first
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(item.sectionId!);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          if (item.tabId) {
            window.dispatchEvent(new CustomEvent('switch-feature-tab', { detail: item.tabId }));
          }
        }, 150);
      } else {
        // We are already on the homepage
        const element = document.getElementById(item.sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        if (item.tabId) {
          window.dispatchEvent(new CustomEvent('switch-feature-tab', { detail: item.tabId }));
        }
      }
    } else {
      // Standard page navigation (e.g. blog/xxx or docs/xxx)
      navigate(item.path);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(filtered.length - 1, prev + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(0, prev - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        handleSelectItem(filtered[selectedIndex]);
      }
    }
  };

  const getIcon = (category: string) => {
    switch (category) {
      case 'feature': return <Sparkles className="w-4 h-4 text-[var(--primary-color)]" />;
      case 'blog': return <FileText className="w-4 h-4 text-sky-500" />;
      case 'doc': return <BookOpen className="w-4 h-4 text-emerald-500" />;
      default: return <Search className="w-4 h-4 text-neutral-400" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-start justify-center pt-[15vh]">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[var(--text-color)]/45 backdrop-blur-xs z-40 animate-fade-in"
          />

          {/* Search Box Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="w-full max-w-2xl bg-[var(--bg-color)] border border-[var(--primary-color)] rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col mx-4"
            onKeyDown={handleKeyDown}
          >
            {/* Input Bar */}
            <div className="flex items-center space-x-3 px-4 py-4 border-b border-[var(--border-color)] bg-[var(--card-color)]">
              <Search className="w-5 h-5 text-[var(--primary-color)]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search features, guides, manual pages, or blog articles..."
                className="flex-1 bg-transparent border-0 outline-hidden focus:ring-0 text-sm font-sans text-[var(--text-color)] placeholder-neutral-400"
              />
              <div className="flex items-center space-x-1">
                <kbd className="px-1.5 py-0.5 text-[10px] bg-[#e3e1da] border border-[#d2d0c7] rounded text-neutral-500">ESC</kbd>
                <button onClick={onClose} className="p-1 rounded-full text-neutral-400 hover:text-neutral-600 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="max-h-[350px] overflow-y-auto p-2 space-y-1 bg-[var(--card-color)] scrollbar-thin text-left">
              {filtered.length > 0 ? (
                filtered.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={item.title + index}
                      onClick={() => handleSelectItem(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-[var(--neutral-light-color)] border border-[var(--primary-color)]/20' 
                          : 'border border-transparent'
                      }`}
                    >
                      <div className="flex items-center space-x-3 overflow-hidden pr-4">
                        <div className={`p-2 rounded-lg shrink-0 ${isSelected ? 'bg-white shadow-3xs' : 'bg-[var(--neutral-light-color)]'}`}>
                          {getIcon(item.category)}
                        </div>
                        <div className="flex flex-col overflow-hidden text-left">
                          <span className="text-xs font-serif font-bold text-[var(--text-color)] truncate">{item.title}</span>
                          <span className="text-[10px] text-[var(--text-muted-color)] truncate font-sans">{item.subtitle}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-mono uppercase tracking-wider font-bold ${
                          item.category === 'feature' ? 'bg-[var(--primary-color-light)] text-[var(--primary-color)]' :
                          item.category === 'blog' ? 'bg-sky-50 text-sky-600' :
                          'bg-emerald-50 text-emerald-600'
                        }`}>
                          {item.category}
                        </span>
                        {item.meta && (
                          <span className="text-[9px] font-mono text-neutral-400 hidden sm:inline-block max-w-[120px] truncate">
                            {item.meta}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-12 text-center flex flex-col items-center justify-center text-neutral-400">
                  <Search className="w-8 h-8 text-[var(--primary-color)]/40 mb-2 animate-pulse" />
                  <p className="font-mono text-xs">No matches found for "{query}"</p>
                  <p className="text-[10px] max-w-xs mt-1 font-sans">Try searching for other keywords like 'worktree', 'undo', 'performance', or 'swift'.</p>
                </div>
              )}
            </div>

            {/* Footer hints bar */}
            <div className="px-4 py-2.5 bg-[var(--neutral-light-color)] border-t border-[var(--border-color)] flex items-center justify-between text-[10px] text-neutral-500 font-mono">
              <div className="flex items-center space-x-3">
                <span className="flex items-center space-x-1">
                  <span>↑↓</span>
                  <span>to navigate</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span>↵</span>
                  <span>to select</span>
                </span>
              </div>
              <span>Commit+ Universal Search</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
