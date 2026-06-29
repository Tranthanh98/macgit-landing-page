import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Github, Download, Menu, X, Terminal, Monitor, Undo, Shield } from 'lucide-react';

interface HeaderProps {
  onSearchOpen: () => void;
}

export default function Header({ onSearchOpen }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'docs') {
      navigate('/docs');
      return;
    }
    if (location.pathname.startsWith('/blog') || location.pathname.startsWith('/docs')) {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[var(--card-color)]/90 backdrop-blur-md border-b border-[var(--border-color)] py-3 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer" 
            onClick={() => {
              if (location.pathname !== '/') {
                navigate('/');
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <img
              src="https://github.com/Tranthanh98/macgit/raw/main/.github/assets/logo.png"
              alt="Commit+ Logo"
              referrerPolicy="no-referrer"
              className="w-9 h-9 object-contain drop-shadow-sm"
            />
            <div className="flex flex-col">
              <span className="font-serif font-semibold text-[var(--text-color)] text-lg leading-tight">Commit+</span>
              <span className="font-sans text-[10px] text-[var(--primary-color)] uppercase tracking-wider font-semibold">macOS Native</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('features')}
              className="text-sm font-sans font-medium text-[var(--text-muted-color)] hover:text-[var(--text-color)] transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('interactive')}
              className="text-sm font-sans font-medium text-[var(--text-muted-color)] hover:text-[var(--text-color)] transition-colors"
            >
              Interactive Demo
            </button>
            <button
              onClick={() => scrollToSection('blog')}
              className="text-sm font-sans font-medium text-[var(--text-muted-color)] hover:text-[var(--text-color)] transition-colors"
            >
              Blog
            </button>
            <button
              onClick={() => scrollToSection('docs')}
              className="text-sm font-sans font-medium text-[var(--text-muted-color)] hover:text-[var(--text-color)] transition-colors"
            >
              Docs
            </button>
            <button
              onClick={() => scrollToSection('comparison')}
              className="text-sm font-sans font-medium text-[var(--text-muted-color)] hover:text-[var(--text-color)] transition-colors"
            >
              Comparison
            </button>
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={onSearchOpen}
              className="p-2 text-[var(--text-muted-color)] hover:text-[var(--text-color)] hover:bg-[#eae7df] rounded-lg transition-all flex items-center space-x-1.5 text-xs font-medium font-mono"
              title="Spotlight Search (Cmd+Shift+F)"
            >
              <kbd className="px-1.5 py-0.5 text-[10px] bg-[#e3e1da] border border-[#d2d0c7] rounded text-[var(--text-muted-color)] shadow-2xs">⌘⇧F</kbd>
            </button>

            <a
              href="https://github.com/Tranthanh98/macgit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-3 py-1.5 text-sm font-sans font-medium text-[var(--text-color)] hover:bg-[#eae7df] rounded-lg border border-[#d2d0c7] transition-all"
            >
              <Github className="w-4 h-4" />
              <span>Source</span>
            </a>

            <a
              href="https://github.com/Tranthanh98/macgit/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-1.5 text-sm font-sans font-medium text-[var(--card-color)] bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)] active:bg-[#a33f20] rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
            >
              <Download className="w-4 h-4" />
              <span>Free Download</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={onSearchOpen}
              className="p-2 text-[var(--text-muted-color)] hover:bg-[#eae7df] rounded-lg"
            >
              <kbd className="px-1 py-0.5 text-[9px] bg-[#e3e1da] border border-[#d2d0c7] rounded text-[var(--text-muted-color)]">⌘⇧F</kbd>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[var(--text-muted-color)] hover:bg-[#eae7df] focus:outline-hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#fbfaf7] border-b border-[var(--border-color)] overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4 shadow-inner">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => scrollToSection('features')}
                  className="flex items-center space-x-2 p-3 rounded-lg border border-[var(--border-color)] bg-[var(--card-color)] text-sm text-[var(--text-muted-color)] hover:text-[var(--text-color)] hover:bg-[#eae7df]"
                >
                  <span>Features</span>
                </button>
                <button
                  onClick={() => scrollToSection('interactive')}
                  className="flex items-center space-x-2 p-3 rounded-lg border border-[var(--border-color)] bg-[var(--card-color)] text-sm text-[var(--text-muted-color)] hover:text-[var(--text-color)] hover:bg-[#eae7df]"
                >
                  <span>Interactive</span>
                </button>
                <button
                  onClick={() => scrollToSection('blog')}
                  className="flex items-center space-x-2 p-3 rounded-lg border border-[var(--border-color)] bg-[var(--card-color)] text-sm text-[var(--text-muted-color)] hover:text-[var(--text-color)] hover:bg-[#eae7df]"
                >
                  <span>Blog</span>
                </button>
                <button
                  onClick={() => scrollToSection('docs')}
                  className="flex items-center space-x-2 p-3 rounded-lg border border-[var(--border-color)] bg-[var(--card-color)] text-sm text-[var(--text-muted-color)] hover:text-[var(--text-color)] hover:bg-[#eae7df]"
                >
                  <span>Docs</span>
                </button>
              </div>

              <div className="border-t border-[var(--border-color)] pt-4 flex flex-col space-y-3">
                <a
                  href="https://github.com/Tranthanh98/macgit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 p-3 rounded-lg border border-[#d2d0c7] bg-transparent text-sm font-medium text-[var(--text-color)]"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
                <a
                  href="https://github.com/Tranthanh98/macgit/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-[var(--primary-color)] text-sm font-medium text-white shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download for macOS</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
