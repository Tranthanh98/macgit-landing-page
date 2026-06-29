import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, ArrowLeft, ChevronRight, HelpCircle, Book, AlertCircle
} from 'lucide-react';
import { docSections } from '../data/docsData';

export default function Docs() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Default to 'getting-started' if no ID parameter is specified
  const activeSectionId = id || 'getting-started';

  // Find the currently active document section
  const activeSection = docSections.find(sec => sec.id === activeSectionId) || docSections[0];

  // Reset page scroll position when active section changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSectionId]);

  // Filter sections by search query
  const filteredSections = docSections.filter(sec => 
    sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sec.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-16 sm:py-24 bg-[var(--bg-color)] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center space-x-2 text-xs font-mono text-neutral-400 mb-8 border-b border-[var(--border-color)] pb-4">
          <Link to="/" className="hover:text-[var(--primary-color)] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[var(--text-muted-color)]">Developer Manual</span>
          <span>/</span>
          <span className="text-[var(--primary-color)] font-bold">{activeSection.title}</span>
        </div>

        {/* Back Button & Title Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12 text-left">
          <div>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-[var(--border-color)] rounded-xl text-xs font-mono font-bold text-[var(--text-muted-color)] hover:text-[var(--text-color)] hover:border-[var(--primary-color)] hover:shadow-2xs transition-all cursor-pointer mb-4"
            >
              <ArrowLeft className="w-4 h-4 text-[var(--primary-color)]" />
              <span>Back to Landing Page</span>
            </button>
            <h1 className="font-serif text-3xl sm:text-4xl text-[var(--text-color)] font-bold tracking-tight">
              Documentation & Guides
            </h1>
            <p className="text-sm text-[var(--text-muted-color)] font-sans mt-2">
              Deep dive into the architecture, commands, and workflow integrations of Commit+.
            </p>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar Menu (4 columns) */}
          <div className="md:col-span-4 bg-[var(--card-color)] border border-[var(--border-color)] rounded-2xl p-5 space-y-6">
            
            {/* Search Filter */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[var(--neutral-light-color)] border border-[#d2d0c7] rounded-xl pl-9 pr-4 py-2 text-xs font-sans text-[var(--text-color)] focus:outline-hidden focus:ring-1 focus:ring-[var(--primary-color)]"
              />
            </div>

            {/* Structured Categories */}
            <div className="space-y-4 text-left">
              <div>
                <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest block mb-2 px-2">
                  Table of Contents
                </span>
                
                <div className="space-y-1">
                  {filteredSections.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => navigate(`/docs/${sec.id}`)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all font-sans text-xs text-left cursor-pointer ${
                        activeSectionId === sec.id
                          ? 'bg-[var(--neutral-light-color)] text-[var(--text-color)] font-bold border-l-2 border-[var(--primary-color)]'
                          : 'text-[var(--text-muted-color)] hover:bg-[var(--bg-color)] hover:text-[var(--text-color)]'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 truncate">
                        <span className={`${activeSectionId === sec.id ? 'text-[var(--primary-color)]' : 'text-neutral-400'}`}>
                          {sec.icon}
                        </span>
                        <span className="truncate">{sec.title}</span>
                      </div>
                      <span className="text-[9px] font-mono bg-[#eae7df] text-neutral-400 px-1.5 py-0.5 rounded-sm uppercase tracking-wide shrink-0">
                        {sec.category}
                      </span>
                    </button>
                  ))}

                  {filteredSections.length === 0 && (
                    <div className="py-8 text-center text-xs text-neutral-400 font-mono">
                      No matching pages found
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick shortcuts block */}
            <div className="bg-[var(--neutral-light-color)]/60 border border-[var(--border-color)] rounded-xl p-4 text-xs text-[var(--text-muted-color)] space-y-2 text-left">
              <span className="font-mono text-[9px] font-bold text-[var(--primary-color)] uppercase tracking-wide block">
                GLOBAL TERMINOLOGY
              </span>
              <p className="leading-relaxed text-[11px] font-sans">
                We strictly align terminology with the core Git spec. <code className="font-mono font-bold">Staging</code> corresponds to git-add; <code className="font-mono font-bold">Worktree</code> corresponds to git-worktree nodes.
              </p>
            </div>
          </div>

          {/* Right Guide Content Area (8 columns) */}
          <div className="md:col-span-8 bg-white border border-[var(--border-color)] rounded-2xl p-6 sm:p-10 min-h-[480px] shadow-3xs relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Meta Category Indicator */}
                <div className="flex items-center space-x-2 text-[10px] font-mono text-[var(--primary-color)] uppercase tracking-wider font-semibold">
                  <span>Commit+ Docs</span>
                  <span>/</span>
                  <span>{activeSection.category}</span>
                </div>

                {/* Section Content */}
                <div>
                  {activeSection.content}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
