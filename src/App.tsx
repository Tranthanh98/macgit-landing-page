/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Routes, Route, useNavigate, useParams, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import InteractiveFeatures from './components/InteractiveFeatures';
import BentoGrid from './components/BentoGrid';
import Blog from './components/Blog';
import DocsTeaser from './components/DocsTeaser';
import Docs from './components/Docs';
import ComparisonTable from './components/ComparisonTable';
import Footer from './components/Footer';
import SpotlightSearch from './components/SpotlightSearch';
import BlogDetail from './components/BlogDetail';
import ThemeSelector from './components/ThemeSelector';

function HomeView({ onNavigateToBlog }: { onNavigateToBlog: (id: string) => void }) {
  return (
    <>
      {/* Hero Visual Section */}
      <Hero />

      {/* Bento Grid (Conflict resolution, Worktrees, search etc) */}
      <BentoGrid />

      {/* Main Core Interactive Features tab (Undo, Drag and drop, Git flow, Performance) */}
      <InteractiveFeatures />

      {/* Blog and Article Journal */}
      <Blog onNavigateToBlog={onNavigateToBlog} />

      {/* Developer Guides and Docs Teaser Grid */}
      <DocsTeaser />

      {/* Market Comparison Matrix */}
      <ComparisonTable />
    </>
  );
}

function BlogDetailWrapper() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <BlogDetail 
      blogId={id || ''} 
      onNavigateHome={() => navigate('/')}
      onNavigateToBlog={(blogId) => navigate(`/blog/${blogId}`)}
    />
  );
}

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] font-sans antialiased selection:bg-[var(--primary-color-light)] selection:text-[var(--primary-color)]">
      {/* Navigation Header */}
      <Header onSearchOpen={() => setIsSearchOpen(true)} />

      <Routes>
        <Route path="/" element={<HomeView onNavigateToBlog={(id) => navigate(`/blog/${id}`)} />} />
        <Route path="/blog/:id" element={<BlogDetailWrapper />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/docs/:id" element={<Docs />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Footer details */}
      <Footer />

      {/* Spotlight Search Overlay Modal */}
      <SpotlightSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Dynamic Visual Color Template Selector */}
      <ThemeSelector />
    </div>
  );
}

