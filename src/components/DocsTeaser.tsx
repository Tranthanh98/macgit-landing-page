import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Book, FileText, Code2, Terminal, HelpCircle, ArrowRight 
} from 'lucide-react';

interface TeaserCard {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
}

export default function DocsTeaser() {
  const navigate = useNavigate();

  const cards: TeaserCard[] = [
    {
      id: 'getting-started',
      title: 'Getting Started & Setup',
      description: 'System requirements, binary paths, Swift installation protocols, and telemetry audits.',
      category: 'Setup',
      icon: <Book className="w-5 h-5 text-[var(--primary-color)]" />
    },
    {
      id: 'staging-committing',
      title: 'Staging & Committing',
      description: 'A deep analysis of interactive staging, hunk-level additions, and keyboard-first logs.',
      category: 'Core Git',
      icon: <FileText className="w-5 h-5 text-indigo-500" />
    },
    {
      id: 'branches-merges',
      title: 'Branching & Merging',
      description: 'Creating branches, pulling streams, performing upstream synchronization, and visual merging.',
      category: 'Core Git',
      icon: <Terminal className="w-5 h-5 text-sky-500" />
    },
    {
      id: 'git-worktrees',
      title: 'Advanced Git Worktrees',
      description: 'Operating parallel workspace directories to context-switch without breaking stashes.',
      category: 'Advanced',
      icon: <Code2 className="w-5 h-5 text-emerald-500" />
    },
    {
      id: 'faq',
      title: 'Troubleshooting & FAQ',
      description: 'Resolving binary pathing issues, SSH keychain passphrases, and custom path variables.',
      category: 'Help',
      icon: <HelpCircle className="w-5 h-5 text-amber-500" />
    }
  ];

  return (
    <section id="docs" className="py-24 bg-[var(--bg-color)] relative border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs font-bold text-[var(--primary-color)] uppercase tracking-wider mb-2 block">
            Developer Manual
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[var(--text-color)] font-semibold tracking-tight mb-4">
            Documentation & Guides
          </h2>
          <p className="text-base text-[var(--text-muted-color)] font-sans">
            Explore our comprehensive guides to mastering native git workflows, setting up isolated worktrees, and configuring credentials.
          </p>
        </div>

        {/* Grid of Docs Teaser Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {cards.map((card, idx) => (
            <motion.div
              key={card.id}
              onClick={() => navigate(`/docs/${card.id}`)}
              whileHover={{ y: -4 }}
              className="bg-[var(--card-color)] border border-[var(--border-color)] rounded-2xl p-6 shadow-2xs hover:shadow-sm cursor-pointer flex flex-col justify-between group transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[var(--border-color)] flex items-center justify-center">
                    {card.icon}
                  </div>
                  <span className="text-[9px] font-mono bg-[var(--neutral-light-color)] text-[var(--text-muted-color)] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                    {card.category}
                  </span>
                </div>
                
                <div className="space-y-1.5">
                  <h3 className="font-serif text-base font-bold text-[var(--text-color)] group-hover:text-[var(--primary-color)] transition-colors leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted-color)] font-sans leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>

              <div className="border-t border-[var(--border-color)] mt-6 pt-4 flex items-center justify-between text-xs font-mono font-bold text-[var(--primary-color)]">
                <span>Read Manual</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}

          {/* Quick Stats Block or Callout Card to make it 6 items */}
          <div className="bg-[var(--primary-color)]/5 border border-[var(--primary-color)]/20 rounded-2xl p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="font-mono text-[9px] font-bold text-[var(--primary-color)] uppercase tracking-wider block">
                COMMUNITY DRIVEN
              </span>
              <h3 className="font-serif text-lg font-bold text-[var(--text-color)]">
                Need custom shell parameters?
              </h3>
              <p className="text-xs text-[var(--text-muted-color)] leading-relaxed font-sans">
                Our guide covers standard paths but if you are running custom path builders or shell wrappers, our Swift engine supports custom shell override options.
              </p>
            </div>
            
            <button
              onClick={() => navigate('/docs/faq')}
              className="mt-6 w-full py-2 bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)] text-white rounded-xl font-mono font-bold text-[10px] shadow-3xs cursor-pointer text-center"
            >
              View Configuration FAQ
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
