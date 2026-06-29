import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GitMerge, FolderGit2, Sparkles, Search, 
  Check, FileCode, AlertTriangle, Cpu, Terminal, RefreshCw
} from 'lucide-react';

export default function BentoGrid() {
  // --- AI COMMIT GENERATOR STATE ---
  const [aiStep, setAiStep] = useState<number>(0);
  const [aiCommitMsg, setAiCommitMsg] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const simulateAICocommit = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setAiStep(1);
    setAiCommitMsg('');
    
    setTimeout(() => {
      setAiStep(2);
      const fullMsg = 'feat(auth): integrate Google OAuth flow with secure session callbacks';
      let i = 0;
      let interval = setInterval(() => {
        setAiCommitMsg(prev => prev + fullMsg[i]);
        i++;
        if (i >= fullMsg.length) {
          clearInterval(interval);
          setIsGenerating(false);
          setAiStep(3);
        }
      }, 35);
    }, 1200);
  };

  // --- CONFLICT RESOLUTION STATE ---
  const [conflictResolved, setConflictResolved] = useState<'current' | 'incoming' | 'both' | null>(null);

  return (
    <section id="features" className="py-24 bg-[var(--bg-color)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs font-bold text-[var(--primary-color)] uppercase tracking-wider mb-2 block">
            Deeper Capabilities
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[var(--text-color)] font-semibold tracking-tight mb-4">
            Power tools for modern developers
          </h2>
          <p className="text-base text-[var(--text-muted-color)] font-sans">
            Commit+ matches full terminal capability, but designs elegant human interfaces on top.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Bento Card 1: Conflict Resolution (7 columns) */}
          <div className="md:col-span-7 bg-[var(--card-color)] border border-[var(--border-color)] rounded-2xl p-6 sm:p-8 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[var(--primary-color)]/10 flex items-center justify-center text-[var(--primary-color)] mb-6">
                <GitMerge className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[var(--text-color)] mb-2">
                Built-in conflict resolution
              </h3>
              <p className="text-sm text-[var(--text-muted-color)] leading-relaxed mb-6">
                No more jumping back to VS Code or dealing with messy raw text conflict blocks. Resolve merges, rebases, and cherry-picks right inside Commit+ with our visual split-screen editor.
              </p>
            </div>

            {/* Interactive Conflict Resolution Simulator */}
            <div className="bg-[var(--neutral-light-color)] rounded-xl p-4 border border-[var(--border-color)] text-xs font-mono space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between text-[10px] text-[var(--text-muted-color)] border-b border-[var(--border-color)] pb-2">
                <span className="flex items-center space-x-1.5 font-bold">
                  <AlertTriangle className="w-3.5 h-3.5 text-[var(--primary-color)]" />
                  <span>Merge Conflict: Sources/Auth.swift</span>
                </span>
                <span className="text-neutral-500">2 conflicts remaining</span>
              </div>

              {conflictResolved === null ? (
                <div className="space-y-2">
                  {/* Current Changes Block */}
                  <div className="border border-sky-300 rounded-lg overflow-hidden bg-sky-50/50">
                    <div className="bg-sky-100 text-sky-800 px-3 py-1 text-[10px] font-bold flex items-center justify-between">
                      <span>CURRENT CHANGES (HEAD)</span>
                      <span>Commit: fe8a29</span>
                    </div>
                    <pre className="p-3 text-[var(--text-muted-color)] text-[10px] leading-relaxed">
                      {`func validateSession() -> Bool {
  return session.token != nil && !session.isExpired
}`}
                    </pre>
                  </div>

                  {/* Incoming Changes Block */}
                  <div className="border border-amber-300 rounded-lg overflow-hidden bg-amber-50/50">
                    <div className="bg-amber-100 text-amber-800 px-3 py-1 text-[10px] font-bold flex items-center justify-between">
                      <span>INCOMING CHANGES (feature/oauth)</span>
                      <span>Commit: bc948a</span>
                    </div>
                    <pre className="p-3 text-[var(--text-muted-color)] text-[10px] leading-relaxed">
                      {`func validateSession() -> Bool {
  return OAuthProvider.shared.hasActiveToken()
}`}
                    </pre>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex justify-end space-x-2 pt-1.5">
                    <button
                      onClick={() => setConflictResolved('current')}
                      className="px-2.5 py-1.5 bg-[var(--card-color)] border border-[#d2d0c7] hover:bg-sky-50 hover:border-sky-300 text-[10px] font-bold rounded text-[var(--text-color)]"
                    >
                      Keep Current
                    </button>
                    <button
                      onClick={() => setConflictResolved('incoming')}
                      className="px-2.5 py-1.5 bg-[var(--card-color)] border border-[#d2d0c7] hover:bg-amber-50 hover:border-amber-300 text-[10px] font-bold rounded text-[var(--text-color)]"
                    >
                      Keep Incoming
                    </button>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-emerald-50 text-emerald-950 border border-emerald-200 rounded-lg space-y-2 text-center"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-1">
                    <Check className="w-4 h-4" />
                  </div>
                  <p className="font-bold text-xs text-emerald-800">Conflict Resolved!</p>
                  <p className="text-[10px] text-emerald-700 max-w-sm mx-auto">
                    {conflictResolved === 'current' 
                      ? 'Saved current session token validation logic.' 
                      : 'Saved incoming OAuth provider validation logic.'}
                  </p>
                  <button
                    onClick={() => setConflictResolved(null)}
                    className="text-[10px] font-bold text-[var(--primary-color)] underline mt-2 block mx-auto"
                  >
                    Reset Conflict Block
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Bento Card 2: Worktree Management (5 columns) */}
          <div className="md:col-span-5 bg-[var(--card-color)] border border-[var(--border-color)] rounded-2xl p-6 sm:p-8 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[var(--primary-color)]/10 flex items-center justify-center text-[var(--primary-color)] mb-6">
                <FolderGit2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[var(--text-color)] mb-2">
                Smarter git worktrees
              </h3>
              <p className="text-sm text-[var(--text-muted-color)] leading-relaxed mb-6">
                Want to fix a critical main bug but can't stash your complex feature branch? 
                <br /><br />
                Create isolated Git Worktrees in seconds from the sidebar. Work on both branches in parallel folders without index conflicts.
              </p>
            </div>

            {/* Visual folders display */}
            <div className="grid grid-cols-1 gap-2 bg-[var(--neutral-light-color)] rounded-xl p-4 border border-[var(--border-color)] text-xs font-mono">
              <div className="flex items-center justify-between p-2 bg-[var(--card-color)] border border-[#d2d0c7] rounded-lg">
                <div className="flex items-center space-x-2 text-[var(--text-color)] font-semibold">
                  <FolderGit2 className="w-4 h-4 text-[var(--primary-color)]" />
                  <span>worktree-main</span>
                </div>
                <span className="px-1.5 py-0.5 bg-neutral-100 text-neutral-500 rounded text-[9px] font-mono font-bold uppercase">
                  Stable
                </span>
              </div>

              <div className="flex items-center justify-between p-2 bg-[var(--card-color)] border border-[#d2d0c7] rounded-lg">
                <div className="flex items-center space-x-2 text-[var(--text-color)]">
                  <FolderGit2 className="w-4 h-4 text-[var(--primary-color)]" />
                  <span>worktree-feature-oauth</span>
                </div>
                <span className="px-1.5 py-0.5 bg-sky-100 text-sky-800 rounded text-[9px] font-mono font-bold uppercase animate-pulse">
                  ACTIVE
                </span>
              </div>

              <div className="flex items-center justify-between p-2 bg-[var(--card-color)]/50 border border-[#d2d0c7]/60 rounded-lg">
                <div className="flex items-center space-x-2 text-neutral-400">
                  <FolderGit2 className="w-4 h-4 text-neutral-300" />
                  <span>worktree-refactor-styles</span>
                </div>
                <span className="px-1.5 py-0.5 bg-neutral-100 text-neutral-400 rounded text-[9px] font-mono font-bold uppercase">
                  Inactive
                </span>
              </div>
            </div>
          </div>

          {/* Bento Card 3: AI Copilot - coming soon (5 columns) */}
          <div className="md:col-span-5 bg-[var(--card-color)] border border-[var(--border-color)] rounded-2xl p-6 sm:p-8 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[var(--primary-color)]/10 flex items-center justify-center text-[var(--primary-color)] mb-6">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[var(--text-color)] mb-2">
                AI features <span className="text-xs bg-[var(--primary-color-light)] text-[var(--primary-color)] font-sans font-bold px-1.5 py-0.5 rounded ml-1">SOON</span>
              </h3>
              <p className="text-sm text-[var(--text-muted-color)] leading-relaxed mb-6">
                Let local intelligence speed up your commit logs. Auto-generate semantic commit messages from your staged diffs, and receive intelligent advice for resolving merge conflicts.
              </p>
            </div>

            {/* AI Generator Simulator */}
            <div className="bg-[var(--neutral-light-color)] rounded-xl p-4 border border-[var(--border-color)] text-xs font-mono space-y-3">
              <div className="flex items-center justify-between text-[10px] text-[var(--text-muted-color)] border-b border-[var(--border-color)] pb-2">
                <span className="flex items-center space-x-1 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--primary-color)]" />
                  <span>AI Commit Copilot</span>
                </span>
                <span className="text-neutral-500">Local model (SwiftUI)</span>
              </div>

              <div className="min-h-[80px] bg-[var(--card-color)] border border-[#d2d0c7] rounded-lg p-3 flex flex-col justify-between">
                {aiStep === 0 && (
                  <span className="text-neutral-400 text-[11px] italic">No commit message generated yet. Click generate below.</span>
                )}
                {aiStep === 1 && (
                  <div className="flex items-center space-x-2 py-4 justify-center text-neutral-400">
                    <RefreshCw className="w-4 h-4 animate-spin text-[var(--primary-color)]" />
                    <span className="text-[11px] font-mono">Analyzing staged files...</span>
                  </div>
                )}
                {(aiStep === 2 || aiStep === 3) && (
                  <div className="text-xs text-[var(--text-color)] font-mono leading-relaxed">
                    <span>{aiCommitMsg}</span>
                    {aiStep === 2 && <span className="inline-block w-1.5 h-3.5 bg-[var(--primary-color)] animate-pulse ml-0.5" />}
                  </div>
                )}

                {aiStep === 3 && (
                  <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1 py-0.5 rounded font-bold uppercase self-end mt-2">
                    Message Generated
                  </span>
                )}
              </div>

              <button
                onClick={simulateAICocommit}
                disabled={isGenerating}
                className="w-full py-2 bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)] disabled:bg-neutral-300 text-white rounded font-mono font-bold text-[10px]"
              >
                Generate Commit Message
              </button>
            </div>
          </div>

          {/* Bento Card 4: Quick Spotlight Search (7 columns) */}
          <div className="md:col-span-7 bg-[var(--card-color)] border border-[var(--border-color)] rounded-2xl p-6 sm:p-8 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[var(--primary-color)]/10 flex items-center justify-center text-[var(--primary-color)] mb-6">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[var(--text-color)] mb-2">
                Spotlight quick search
              </h3>
              <p className="text-sm text-[var(--text-muted-color)] leading-relaxed mb-6">
                Instantly navigate your repository. Press <kbd className="px-1.5 py-0.5 bg-[var(--neutral-light-color)] border border-[#d2d0c7] rounded text-xs font-mono">⌘Shift+F</kbd> from anywhere inside the app to search for commits, files, tags, branch names, and hashes in real-time.
              </p>
            </div>

            {/* Visual quick search indicator */}
            <div className="bg-[var(--text-color)] rounded-xl p-4 border border-neutral-800 text-neutral-300 text-xs font-mono space-y-3 shadow-md">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5 text-neutral-400 text-[10px]">
                <span className="flex items-center space-x-1.5">
                  <Search className="w-3.5 h-3.5 text-[var(--primary-color)]" />
                  <span>Spotlight Repo Search</span>
                </span>
                <span>⌘⇧F</span>
              </div>

              <div className="flex items-center space-x-2 bg-neutral-900 border border-neutral-800 px-2.5 py-2 rounded-lg text-neutral-400">
                <Search className="w-3.5 h-3.5 text-[var(--primary-color)]" />
                <span>auth</span>
                <span className="w-1.5 h-4 bg-[var(--primary-color)] animate-pulse" />
              </div>

              <div className="space-y-1 pt-1 text-[11px] text-neutral-400">
                <div className="p-2 bg-neutral-900/60 rounded flex items-center justify-between border-l-2 border-[var(--primary-color)]">
                  <span>✨ bc948a — Refactor auth routing...</span>
                  <span className="text-[9px] bg-neutral-800 px-1 py-0.5 rounded text-[var(--primary-color)]">COMMIT</span>
                </div>
                <div className="p-2 hover:bg-neutral-900/60 rounded flex items-center justify-between">
                  <span>📁 Sources/Auth.swift</span>
                  <span className="text-[9px] bg-neutral-800 px-1 py-0.5 rounded text-sky-400">FILE</span>
                </div>
                <div className="p-2 hover:bg-neutral-900/60 rounded flex items-center justify-between">
                  <span>🌿 feature/auth-module</span>
                  <span className="text-[9px] bg-neutral-800 px-1 py-0.5 rounded text-amber-400">BRANCH</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
