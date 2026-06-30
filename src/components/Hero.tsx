import { motion } from 'motion/react';
import { Download, Github, Shield, Terminal, Zap, ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-[var(--bg-color)]">
      {/* Elegant Radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--primary-color-light)] opacity-60 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[var(--neutral-light-color)] border border-[#e3e1da] text-[var(--primary-color)] text-xs font-mono font-medium mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Introducing Commit+ v1.0 — Free & Open Source</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl text-[var(--text-color)] font-semibold tracking-tight leading-[1.1] mb-6"
          >
            The missing <span className="italic text-[var(--primary-color)] font-normal">native, lightweight</span> Git client for macOS
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-[var(--text-muted-color)] font-sans max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Built from the ground up with Swift and SwiftUI. Zero external dependencies, lightning-fast native performance, and a completely visual rebase experience.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="https://github.com/Tranthanh98/macgit/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center space-x-3 px-8 py-3.5 text-base font-medium text-[var(--card-color)] bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)] rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
            >
              <Download className="w-5 h-5" />
              <span>Download for macOS</span>
            </a>

            <a
              href="https://github.com/Tranthanh98/macgit"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center space-x-3 px-8 py-3.5 text-base font-medium text-[var(--text-color)] bg-[var(--neutral-light-color)] hover:bg-[#eae7df] rounded-lg border border-[#d2d0c7] transition-all"
            >
              <Github className="w-5 h-5" />
              <span>Explore Repository</span>
            </a>
          </motion.div>

          {/* Mini benefits row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-3 gap-4 max-w-lg mx-auto mt-12 border-t border-[var(--border-color)] pt-8 text-xs font-mono text-[var(--text-muted-color)]"
          >
            <div className="flex flex-col items-center">
              <Zap className="w-5 h-5 text-[var(--primary-color)] mb-1.5" />
              <span className="font-bold text-[var(--text-color)]">100% Native</span>
              <span>Swift & SwiftUI</span>
            </div>
            <div className="flex flex-col items-center border-x border-[var(--border-color)]">
              <Shield className="w-5 h-5 text-[var(--primary-color)] mb-1.5" />
              <span className="font-bold text-[var(--text-color)]">Zero Bloat</span>
              <span>No Electron</span>
            </div>
            <div className="flex flex-col items-center">
              <Terminal className="w-5 h-5 text-[var(--primary-color)] mb-1.5" />
              <span className="font-bold text-[var(--text-color)]">Subprocess Git</span>
              <span>Driven via Process()</span>
            </div>
          </motion.div>
        </div>

        {/* macOS Native Window Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, type: 'spring', stiffness: 50 }}
          className="max-w-5xl mx-auto relative"
        >
          {/* Simple Image Showcase with shadow */}
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-color)] relative z-10">
            <img
              src="https://github.com/Tranthanh98/macgit/raw/main/.github/assets/Screenshot.png"
              alt="Commit+ macOS Git Client Interface"
              referrerPolicy="no-referrer"
              className="w-full object-cover select-none"
            />
          </div>

          {/* Decorative blur shadows */}
          <div className="absolute -inset-2 bg-gradient-to-r from-[var(--primary-color)]/20 to-[var(--primary-color-light)]/20 rounded-2xl blur-xl opacity-50 z-0 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
