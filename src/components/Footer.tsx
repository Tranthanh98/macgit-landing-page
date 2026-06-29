import { Github, Download, Shield, Heart } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
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
    <footer className="bg-[var(--text-color)] text-[var(--card-color)] pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-neutral-800">
          
          {/* Logo & Slogan */}
          <div className="md:col-span-2 space-y-4 text-left">
            <div className="flex items-center space-x-3">
              <img
                src="https://github.com/Tranthanh98/macgit/raw/main/.github/assets/logo.png"
                alt="Commit+ Logo"
                referrerPolicy="no-referrer"
                className="w-8 h-8 object-contain"
              />
              <span className="font-serif font-semibold text-lg">Commit+</span>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Fast, lightweight native Git client for macOS. Free and fully open source under the GNU Affero General Public License (AGPLv3).
            </p>
            <div className="flex items-center space-x-2 text-[10px] text-[var(--primary-color)] font-mono">
              <Shield className="w-3.5 h-3.5" />
              <span>100% telemetry-free & offline-safe.</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="text-left space-y-3">
            <span className="block text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Navigation</span>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => scrollToSection('features')} className="text-neutral-400 hover:text-white transition-colors">
                  Product Features
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('interactive')} className="text-neutral-400 hover:text-white transition-colors">
                  Interactive Playground
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('blog')} className="text-neutral-400 hover:text-white transition-colors">
                  Engineering Blog
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('docs')} className="text-neutral-400 hover:text-white transition-colors">
                  Developer Docs
                </button>
              </li>
            </ul>
          </div>

          {/* Download & Repo Actions */}
          <div className="text-left space-y-3">
            <span className="block text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Get Involved</span>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://github.com/Tranthanh98/macgit" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-neutral-400 hover:text-white transition-colors">
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li>
                <a href="https://github.com/Tranthanh98/macgit/releases" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-neutral-400 hover:text-white transition-colors">
                  <Download className="w-3.5 h-3.5" />
                  <span>Download App Releases</span>
                </a>
              </li>
              <li>
                <a href="https://github.com/Tranthanh98/macgit/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                  AGPL-3.0 License details
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyleft and bottom notes */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-neutral-500 font-mono">
          <div className="flex items-center space-x-1.5">
            <span>© {currentYear} Commit+ Contributors. Built with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <span>for the macOS community.</span>
          </div>
          <div>
            <span>Developed by </span>
            <a href="https://github.com/Tranthanh98" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white underline">
              @Tranthanh98
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
