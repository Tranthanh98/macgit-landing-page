import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Check, Sparkles, HelpCircle } from 'lucide-react';

export interface Theme {
  id: string;
  name: string;
  nameVi: string;
  primary: string;
  bgPreview: string;
  variables: {
    '--primary-color': string;
    '--primary-color-hover': string;
    '--primary-color-light': string;
    '--bg-color': string;
    '--card-color': string;
    '--border-color': string;
    '--neutral-light-color': string;
    '--text-color': string;
    '--text-muted-color': string;
  };
}

export const themes: Theme[] = [
  {
    id: 'terracotta',
    name: 'Classic Terracotta',
    nameVi: 'Đất Nung Cổ Điển',
    primary: '#cc5e3c',
    bgPreview: '#faf8f5',
    variables: {
      '--primary-color': '#cc5e3c',
      '--primary-color-hover': '#b74d2b',
      '--primary-color-light': '#f5e3dc',
      '--bg-color': '#faf8f5',
      '--card-color': '#fcfbf7',
      '--border-color': '#e5e3db',
      '--neutral-light-color': '#f1ede4',
      '--text-color': '#1b1a18',
      '--text-muted-color': '#5a5750',
    }
  },
  {
    id: 'ocean-pine',
    name: 'Ocean Pine',
    nameVi: 'Thông Đại Dương',
    primary: '#0f6257',
    bgPreview: '#f4f7f6',
    variables: {
      '--primary-color': '#0f6257',
      '--primary-color-hover': '#0a4c43',
      '--primary-color-light': '#e6f2f0',
      '--bg-color': '#f4f7f6',
      '--card-color': '#fbfdfd',
      '--border-color': '#dbe5e2',
      '--neutral-light-color': '#ebf1f0',
      '--text-color': '#111d1c',
      '--text-muted-color': '#4a5755',
    }
  },
  {
    id: 'nordic-slate',
    name: 'Nordic Slate',
    nameVi: 'Xám Bắc Âu',
    primary: '#3b82f6',
    bgPreview: '#f8fafc',
    variables: {
      '--primary-color': '#3b82f6',
      '--primary-color-hover': '#2563eb',
      '--primary-color-light': '#eff6ff',
      '--bg-color': '#f8fafc',
      '--card-color': '#ffffff',
      '--border-color': '#e2e8f0',
      '--neutral-light-color': '#f1f5f9',
      '--text-color': '#0f172a',
      '--text-muted-color': '#475569',
    }
  },
  {
    id: 'royal-plum',
    name: 'Royal Plum',
    nameVi: 'Mận Hoàng Gia',
    primary: '#7c3aed',
    bgPreview: '#fbfafc',
    variables: {
      '--primary-color': '#7c3aed',
      '--primary-color-hover': '#6d28d9',
      '--primary-color-light': '#f5f3ff',
      '--bg-color': '#fbfafc',
      '--card-color': '#ffffff',
      '--border-color': '#ebdff2',
      '--neutral-light-color': '#f3eaf7',
      '--text-color': '#1e0b29',
      '--text-muted-color': '#5c4d66',
    }
  },
  {
    id: 'cosmic-charcoal',
    name: 'Cosmic Charcoal',
    nameVi: 'Than Vũ Trụ (Tối)',
    primary: '#f4f4f5',
    bgPreview: '#09090b',
    variables: {
      '--primary-color': '#f4f4f5',
      '--primary-color-hover': '#ffffff',
      '--primary-color-light': '#27272a',
      '--bg-color': '#09090b',
      '--card-color': '#18181b',
      '--border-color': '#27272a',
      '--neutral-light-color': '#202023',
      '--text-color': '#fafafa',
      '--text-muted-color': '#a1a1aa',
    }
  }
];

export default function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeThemeId, setActiveThemeId] = useState('terracotta');
  const menuRef = useRef<HTMLDivElement>(null);

  // Initialize theme from localStorage or default
  useEffect(() => {
    const savedThemeId = localStorage.getItem('commitplus-theme');
    if (savedThemeId) {
      const match = themes.find(t => t.id === savedThemeId);
      if (match) {
        setActiveThemeId(savedThemeId);
        applyTheme(match);
      }
    }
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    Object.entries(theme.variables).forEach(([key, val]) => {
      root.style.setProperty(key, val);
    });
    localStorage.setItem('commitplus-theme', theme.id);
  };

  const handleThemeChange = (themeId: string) => {
    const match = themes.find(t => t.id === themeId);
    if (match) {
      setActiveThemeId(themeId);
      applyTheme(match);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-100 flex flex-col items-end" ref={menuRef}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="mb-3 w-64 bg-[var(--card-color)] border border-[var(--border-color)] rounded-2xl shadow-xl p-4 text-left border-t-2 border-t-[var(--primary-color)]"
          >
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[var(--border-color)]">
              <span className="text-xs font-serif font-bold text-[var(--text-color)] flex items-center space-x-1.5">
                <Palette className="w-3.5 h-3.5 text-[var(--primary-color)]" />
                <span>Visual Template</span>
              </span>
              <span className="text-[9px] font-mono bg-[var(--neutral-light-color)] text-[var(--text-muted-color)] px-1.5 py-0.5 rounded uppercase tracking-wider font-semibold">
                Theme
              </span>
            </div>

            <div className="space-y-1.5">
              {themes.map((t) => {
                const isActive = t.id === activeThemeId;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleThemeChange(t.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left transition-all hover:bg-[var(--neutral-light-color)] text-xs font-sans cursor-pointer group ${
                      isActive 
                        ? 'bg-[var(--neutral-light-color)] font-bold text-[var(--text-color)]' 
                        : 'text-[var(--text-muted-color)] hover:text-[var(--text-color)]'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 overflow-hidden">
                      {/* Color Preview Badge */}
                      <div 
                        className="w-4 h-4 rounded-full border border-neutral-300 flex items-center justify-center shrink-0 shadow-2xs"
                        style={{ backgroundColor: t.primary }}
                      >
                        <div 
                          className="w-2 h-2 rounded-full" 
                          style={{ backgroundColor: t.bgPreview }}
                        />
                      </div>

                      <div className="flex flex-col">
                        <span className="font-serif leading-none font-bold">{t.name}</span>
                        <span className="text-[9px] text-[var(--text-muted-color)] mt-0.5 font-sans font-normal">{t.nameVi}</span>
                      </div>
                    </div>

                    {isActive && (
                      <Check className="w-3.5 h-3.5 text-[var(--primary-color)] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-3 pt-2.5 border-t border-[var(--border-color)] text-[9px] font-mono text-[var(--text-muted-color)] leading-normal">
              Changes update system-wide variables instantly. Happy committing!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-[var(--primary-color)] text-[var(--bg-color)] shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center cursor-pointer relative group border-2 border-white/25"
        style={{ color: 'var(--bg-color)' }}
        aria-label="Toggle Theme Options"
      >
        <Palette className="w-5 h-5 animate-pulse" />
        
        {/* Subtle tooltip trigger on hover */}
        <span className="absolute right-14 bg-[#1b1a18] text-white text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity font-mono pointer-events-none whitespace-nowrap shadow-md">
          Change Template Color
        </span>
      </motion.button>
    </div>
  );
}
