import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Undo2, Redo2, Layers, GitBranch, Monitor, 
  ArrowRight, ShieldAlert, Check, RefreshCw, 
  Trash2, GitPullRequest, HelpCircle, Sparkles, Cpu, Award 
} from 'lucide-react';
import { CommitItem, BranchItem, StashItem } from '../types';

export default function InteractiveFeatures() {
  const [activeTab, setActiveTab] = useState<'undo' | 'dragdrop' | 'gitflow' | 'performance'>('undo');

  // Listen for custom tab-switching events from spotlight search
  useEffect(() => {
    const handleSwitchTab = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail && ['undo', 'dragdrop', 'gitflow', 'performance'].includes(customEvent.detail)) {
        setActiveTab(customEvent.detail as any);
      }
    };
    window.addEventListener('switch-feature-tab', handleSwitchTab);
    return () => window.removeEventListener('switch-feature-tab', handleSwitchTab);
  }, []);

  // --- UNDO PLAYGROUND STATE ---
  const [undoHistory, setUndoHistory] = useState<string[]>([
    'Checkout feature/auth',
    'Stage 4 modified source files',
    'Created local commit fd8a2c ("Integrate Google Auth")',
    'Stashed local untracked config files',
  ]);
  const [redoHistory, setRedoHistory] = useState<string[]>([]);
  const [undoNotification, setUndoNotification] = useState<string | null>(null);

  const handleUndo = () => {
    if (undoHistory.length === 0) return;
    const itemToUndo = undoHistory[undoHistory.length - 1];
    setUndoHistory(prev => prev.slice(0, -1));
    setRedoHistory(prev => [...prev, itemToUndo]);
    showUndoNotification(`Undid action: "${itemToUndo}"`);
  };

  const handleRedo = () => {
    if (redoHistory.length === 0) return;
    const itemToRedo = redoHistory[redoHistory.length - 1];
    setRedoHistory(prev => prev.slice(0, -1));
    setUndoHistory(prev => [...prev, itemToRedo]);
    showUndoNotification(`Redid action: "${itemToRedo}"`);
  };

  const showUndoNotification = (msg: string) => {
    setUndoNotification(msg);
    setTimeout(() => {
      setUndoNotification(null);
    }, 3000);
  };

  // Keyboard listener for Cmd+Z / Cmd+Shift+Z
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab !== 'undo') return;
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modifier = isMac ? e.metaKey : e.ctrlKey;

      if (modifier && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, undoHistory, redoHistory]);


  // --- DRAG & DROP STATE ---
  const [commits, setCommits] = useState<CommitItem[]>([
    { id: '1', hash: 'a5d2f8e', message: 'WIP: Login styling improvements', author: 'tranthanh', date: 'Just now' },
    { id: '2', hash: 'fe8a129', message: 'Add validation to user email input', author: 'tranthanh', date: '2 mins ago' },
    { id: '3', hash: 'bc948a1', message: 'Refactor auth routing & providers', author: 'tranthanh', date: '10 mins ago' },
  ]);
  const [draggedCommit, setDraggedCommit] = useState<CommitItem | null>(null);
  const [dragOverZone, setDragOverZone] = useState<string | null>(null);
  const [squashModalCommit, setSquashModalCommit] = useState<CommitItem | null>(null);
  const [dropSuccessMsg, setDropSuccessMsg] = useState<string | null>(null);

  const handleDragStart = (commit: CommitItem) => {
    setDraggedCommit(commit);
  };

  const handleDragOver = (e: React.DragEvent, zone: string) => {
    e.preventDefault();
    setDragOverZone(zone);
  };

  const handleDragLeave = () => {
    setDragOverZone(null);
  };

  const handleDrop = (zone: string) => {
    if (!draggedCommit) return;

    if (zone === 'squash') {
      if (commits.length > 1) {
        setSquashModalCommit(draggedCommit);
      } else {
        setDropSuccessMsg("Need at least two commits to squash!");
      }
    } else if (zone === 'cherrypick') {
      setDropSuccessMsg(`🍒 Cherry-picked commit ${draggedCommit.hash} onto main branch!`);
    } else if (zone === 'push') {
      setDropSuccessMsg(`🚀 Pushed commit ${draggedCommit.hash} to origin/feature/auth!`);
    }

    setDraggedCommit(null);
    setDragOverZone(null);
    setTimeout(() => setDropSuccessMsg(null), 4000);
  };

  const confirmSquash = () => {
    if (!squashModalCommit) return;
    
    // Simulate squashing: Merge top two commits
    const index = commits.findIndex(c => c.id === squashModalCommit.id);
    if (index !== -1) {
      const remaining = commits.filter(c => c.id !== squashModalCommit.id);
      if (remaining.length > 0) {
        // Edit the other commit's message to represent the squash
        remaining[0] = {
          ...remaining[0],
          message: `${remaining[0].message} (Squashed: ${squashModalCommit.message})`
        };
        setCommits(remaining);
        setDropSuccessMsg(`🥞 Squashed commits successfully into "${remaining[0].message}"`);
      }
    }
    setSquashModalCommit(null);
    setTimeout(() => setDropSuccessMsg(null), 4000);
  };


  // --- GIT FLOW STATE ---
  const [gitFlowStep, setGitFlowStep] = useState<number>(0);
  // Stages: 0: Init, 1: Feature Started, 2: Feature Work, 3: Feature Finished, 4: Release Started, 5: Release Closed
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '$ git checkout main',
    '$ git flow init -d',
    'Initialized empty Git repository in /Users/dev/macgit/.git/',
    'Using default branch names...',
  ]);

  const addLog = (logs: string[]) => {
    setTerminalLogs(prev => [...prev, ...logs]);
  };

  const runGitFlowStep = (step: 'start_feature' | 'commit_feature' | 'finish_feature' | 'start_release' | 'finish_release' | 'reset') => {
    if (step === 'reset') {
      setGitFlowStep(0);
      setTerminalLogs([
        '$ git checkout main',
        '$ git flow init -d',
        'Initialized empty Git repository in /Users/dev/macgit/.git/',
      ]);
      return;
    }

    if (step === 'start_feature') {
      setGitFlowStep(1);
      addLog([
        '$ git flow feature start auth-module',
        'Switched to a new branch \'feature/auth-module\'',
        'Summary of actions:',
        '- A new branch \'feature/auth-module\' was created, based on \'develop\'',
        '- You are now on branch \'feature/auth-module\'',
      ]);
    } else if (step === 'commit_feature') {
      setGitFlowStep(2);
      addLog([
        '$ git add Sources/Auth.swift',
        '$ git commit -m "feat: Add authentication layout and services"',
        '[feature/auth-module e4b89f2] feat: Add authentication layout and services',
        ' 3 files changed, 142 insertions(+), 12 deletions(-)',
      ]);
    } else if (step === 'finish_feature') {
      setGitFlowStep(3);
      addLog([
        '$ git flow feature finish auth-module',
        'Switched to branch \'develop\'',
        'Updating develop... 1a4d9e..e4b89f2',
        'Fast-forward',
        'Deleted branch feature/auth-module (was e4b89f2).',
        'Summary of actions:',
        '- The feature branch \'feature/auth-module\' was merged into \'develop\'',
        '- Feature branch \'feature/auth-module\' has been locally deleted',
        '- You are now on branch \'develop\'',
      ]);
    } else if (step === 'start_release') {
      setGitFlowStep(4);
      addLog([
        '$ git flow release start v1.0.0',
        'Switched to a new branch \'release/v1.0.0\'',
        'Summary of actions:',
        '- A new branch \'release/v1.0.0\' was created, based on \'develop\'',
        '- You are now on branch \'release/v1.0.0\'',
      ]);
    } else if (step === 'finish_release') {
      setGitFlowStep(5);
      addLog([
        '$ git flow release finish v1.0.0 -m "Tag v1.0.0 release"',
        'Switched to branch \'main\'',
        'Merge made by the \'recursive\' strategy.',
        'Switched to branch \'develop\'',
        'Merge made by the \'recursive\' strategy.',
        'Deleted branch release/v1.0.0 (was e4b89f2).',
        'Summary of actions:',
        '- Release branch \'release/v1.0.0\' has been merged into \'main\'',
        '- The release was tagged \'v1.0.0\'',
        '- Release branch \'release/v1.0.0\' has been back-merged into \'develop\'',
        '- Release branch \'release/v1.0.0\' has been locally deleted',
        '- You are now on branch \'develop\'',
      ]);
    }
  };


  // --- PERFORMANCE MONITOR STATE ---
  const [isStressTesting, setIsStressTesting] = useState(false);
  const [nativeMem, setNativeMem] = useState(14.2);
  const [electronMem, setElectronMem] = useState(412.5);
  const [nativeCpu, setNativeCpu] = useState(0.2);
  const [electronCpu, setElectronCpu] = useState(5.4);

  const startStressTest = () => {
    if (isStressTesting) return;
    setIsStressTesting(true);
    
    // Simulate stress test values jumping
    let interval = setInterval(() => {
      setNativeMem(prev => Math.min(18.5, +(prev + Math.random() * 0.8).toFixed(1)));
      setNativeCpu(prev => Math.min(2.1, +(prev + Math.random() * 0.4).toFixed(1)));
      setElectronMem(prev => Math.min(845.2, +(prev + Math.random() * 85).toFixed(1)));
      setElectronCpu(prev => Math.min(38.4, +(prev + Math.random() * 6.5).toFixed(1)));
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setIsStressTesting(false);
      // Reset back slowly
      setTimeout(() => {
        setNativeMem(14.2);
        setElectronMem(412.5);
        setNativeCpu(0.2);
        setElectronCpu(5.4);
      }, 2000);
    }, 3000);
  };


  return (
    <section id="interactive" className="py-24 bg-[var(--card-color)] border-y border-[var(--border-color)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl text-[var(--text-color)] font-semibold tracking-tight mb-4">
            Interactive Playground
          </h2>
          <p className="text-base text-[var(--text-muted-color)] font-sans">
            Don't take our word for it. Explore the core mechanics that make Commit+ uniquely productive, right in your browser.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 border-b border-[var(--border-color)] pb-4">
          <button
            onClick={() => setActiveTab('undo')}
            className={`flex items-center space-x-2 px-5 py-3 rounded-t-lg font-sans font-medium text-sm transition-all ${
              activeTab === 'undo'
                ? 'bg-[var(--neutral-light-color)] border-t-2 border-t-[var(--primary-color)] text-[var(--text-color)] shadow-xs'
                : 'text-[var(--text-muted-color)] hover:text-[var(--text-color)] hover:bg-[#eae7df]/40'
            }`}
          >
            <Undo2 className="w-4 h-4 text-[var(--primary-color)]" />
            <span>Multi-Level Undo</span>
          </button>

          <button
            onClick={() => setActiveTab('dragdrop')}
            className={`flex items-center space-x-2 px-5 py-3 rounded-t-lg font-sans font-medium text-sm transition-all ${
              activeTab === 'dragdrop'
                ? 'bg-[var(--neutral-light-color)] border-t-2 border-t-[var(--primary-color)] text-[var(--text-color)] shadow-xs'
                : 'text-[var(--text-muted-color)] hover:text-[var(--text-color)] hover:bg-[#eae7df]/40'
            }`}
          >
            <Layers className="w-4 h-4 text-[var(--primary-color)]" />
            <span>Interactive Drag & Drop</span>
          </button>

          <button
            onClick={() => setActiveTab('gitflow')}
            className={`flex items-center space-x-2 px-5 py-3 rounded-t-lg font-sans font-medium text-sm transition-all ${
              activeTab === 'gitflow'
                ? 'bg-[var(--neutral-light-color)] border-t-2 border-t-[var(--primary-color)] text-[var(--text-color)] shadow-xs'
                : 'text-[var(--text-muted-color)] hover:text-[var(--text-color)] hover:bg-[#eae7df]/40'
            }`}
          >
            <GitBranch className="w-4 h-4 text-[var(--primary-color)]" />
            <span>Visual Git Flow</span>
          </button>

          <button
            onClick={() => setActiveTab('performance')}
            className={`flex items-center space-x-2 px-5 py-3 rounded-t-lg font-sans font-medium text-sm transition-all ${
              activeTab === 'performance'
                ? 'bg-[var(--neutral-light-color)] border-t-2 border-t-[var(--primary-color)] text-[var(--text-color)] shadow-xs'
                : 'text-[var(--text-muted-color)] hover:text-[var(--text-color)] hover:bg-[#eae7df]/40'
            }`}
          >
            <Monitor className="w-4 h-4 text-[var(--primary-color)]" />
            <span>Native macOS Perf</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="bg-[var(--card-color)] border border-[var(--border-color)] rounded-2xl p-6 sm:p-8 shadow-sm">
          
          {/* --- UNDO ACTIONS TAB --- */}
          {activeTab === 'undo' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-[#eae7df] text-[var(--primary-color)] text-[10px] font-mono font-bold mb-4">
                    <Undo2 className="w-3 h-3" />
                    <span>TOWER-STYLE UNDO</span>
                  </div>
                  <h3 className="font-serif text-2xl text-[var(--text-color)] font-semibold mb-4">
                    A safety net for every operation
                  </h3>
                  <p className="text-[var(--text-muted-color)] text-sm leading-relaxed mb-6">
                    Messed up a rebase? Discarded changes you actually needed? Committed to the wrong branch?
                    <br /><br />
                    In Commit+, nearly <strong>any</strong> action can be undone instantly. Press <kbd className="px-1.5 py-0.5 bg-[var(--neutral-light-color)] border border-[#d2d0c7] rounded text-xs">⌘Z</kbd> to roll back. We track stage, unstages, branch creations, merges, stashes, and even remote deletions.
                  </p>
                </div>

                {/* Keyboard interaction instructions */}
                <div className="p-4 bg-[var(--card-color)] border border-[var(--border-color)] rounded-xl text-xs text-[var(--text-muted-color)] space-y-2">
                  <p className="font-semibold text-[var(--text-color)] flex items-center space-x-1">
                    <span>💡 Keyboard Interactive:</span>
                  </p>
                  <p>Try pressing <kbd className="px-1 py-0.5 bg-[#e3e1da] rounded">⌘ Z</kbd> or <kbd className="px-1 py-0.5 bg-[#e3e1da] rounded">⌘ ⇧ Z</kbd> on your physical keyboard now to trigger the rollbacks!</p>
                </div>
              </div>

              {/* Sandbox Simulator */}
              <div className="lg:col-span-7 bg-[var(--neutral-light-color)] rounded-xl p-6 border border-[var(--border-color)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4 border-b border-[var(--border-color)] pb-3">
                    <span className="text-xs font-mono font-bold text-[var(--text-color)] uppercase tracking-wide">
                      Git Action Log (Active Stack)
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleUndo}
                        disabled={undoHistory.length === 0}
                        className="px-3 py-1.5 bg-[var(--card-color)] border border-[#d2d0c7] text-[var(--text-color)] hover:bg-[#eae7df] disabled:opacity-40 disabled:hover:bg-[var(--card-color)] rounded-md text-xs font-medium flex items-center space-x-1.5 transition-all shadow-xs"
                      >
                        <Undo2 className="w-3.5 h-3.5" />
                        <span>Undo Last</span>
                      </button>
                      <button
                        onClick={handleRedo}
                        disabled={redoHistory.length === 0}
                        className="px-3 py-1.5 bg-[var(--card-color)] border border-[#d2d0c7] text-[var(--text-color)] hover:bg-[#eae7df] disabled:opacity-40 disabled:hover:bg-[var(--card-color)] rounded-md text-xs font-medium flex items-center space-x-1.5 transition-all shadow-xs"
                      >
                        <Redo2 className="w-3.5 h-3.5" />
                        <span>Redo</span>
                      </button>
                    </div>
                  </div>

                  {/* Actions log timeline visual */}
                  <div className="space-y-2 relative min-h-[220px] py-2">
                    <AnimatePresence initial={false}>
                      {undoHistory.length === 0 ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex flex-col items-center justify-center h-full py-12 text-center text-[var(--text-muted-color)]"
                        >
                          <ShieldAlert className="w-10 h-10 text-[var(--primary-color)]/60 mb-2" />
                          <p className="font-mono text-xs font-medium">Stack Empty</p>
                          <p className="text-xs max-w-xs mt-1">Click Redo or reload the page to add items back to the history.</p>
                        </motion.div>
                      ) : (
                        undoHistory.map((action, idx) => {
                          const isLast = idx === undoHistory.length - 1;
                          return (
                            <motion.div
                              key={action}
                              initial={{ opacity: 0, x: -15, y: -5 }}
                              animate={{ 
                                opacity: 1, 
                                x: 0, 
                                y: 0,
                                scale: isLast ? 1.02 : 1,
                                borderColor: isLast ? 'var(--primary-color)' : '#d2d0c7'
                              }}
                              exit={{ opacity: 0, x: 20, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                              className={`p-3 bg-[var(--card-color)] border rounded-lg flex items-center justify-between text-xs font-mono transition-all duration-300 ${
                                isLast ? 'shadow-sm ring-1 ring-[var(--primary-color)]/20' : ''
                              }`}
                            >
                              <div className="flex items-center space-x-3 overflow-hidden">
                                <span className="text-[var(--primary-color)] font-bold">#{idx + 1}</span>
                                <span className={`truncate ${isLast ? 'text-[var(--text-color)] font-medium' : 'text-[var(--text-muted-color)]'}`}>
                                  {action}
                                </span>
                              </div>
                              {isLast && (
                                <span className="px-2 py-0.5 bg-[var(--primary-color-light)] text-[var(--primary-color)] rounded text-[10px] uppercase font-bold animate-pulse">
                                  Undoable
                                </span>
                              )}
                            </motion.div>
                          );
                        })
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Notification toast */}
                <AnimatePresence>
                  {undoNotification && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 p-3 bg-[var(--text-color)] text-[var(--card-color)] rounded-lg text-xs font-mono flex items-center justify-between shadow-md"
                    >
                      <div className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>{undoNotification}</span>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-mono">⌘Z Success</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* --- DRAG & DROP TAB --- */}
          {activeTab === 'dragdrop' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-[#eae7df] text-[var(--primary-color)] text-[10px] font-mono font-bold mb-4">
                    <Layers className="w-3 h-3" />
                    <span>FLUID MECHANICS</span>
                  </div>
                  <h3 className="font-serif text-2xl text-[var(--text-color)] font-semibold mb-4">
                    Direct manipulation rebase
                  </h3>
                  <p className="text-[var(--text-muted-color)] text-sm leading-relaxed mb-6">
                    In Commit+, complex Git tree adjustments become tactile and visual:
                    <br /><br />
                    - <strong>Squash / Fixup</strong>: Drag a commit directly into another in the timeline.
                    <br />
                    - <strong>Cherry-Pick</strong>: Drag a commit from any feature branch to main.
                    <br />
                    - <strong>Push Branch</strong>: Drag your local branch icon to the remote indicator.
                  </p>
                </div>

                <div className="p-4 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl text-xs text-[var(--text-muted-color)]">
                  <p className="font-semibold text-[var(--text-color)] mb-1">🎮 How to play:</p>
                  <p>Drag one of the card commits from the left column and drop it into one of the marked action zones on the right!</p>
                </div>
              </div>

              {/* Drag Simulator */}
              <div className="lg:col-span-7 bg-[var(--neutral-light-color)] rounded-xl p-6 border border-[var(--border-color)] flex flex-col justify-between min-h-[380px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                  
                  {/* Commits List */}
                  <div className="flex flex-col">
                    <span className="text-xs font-mono font-bold text-[var(--text-color)] uppercase tracking-wide mb-3 block">
                      Local Commit History
                    </span>
                    <div className="space-y-3 flex-1">
                      {commits.map((commit) => (
                        <div
                          key={commit.id}
                          draggable
                          onDragStart={() => handleDragStart(commit)}
                          className="p-3 bg-[var(--card-color)] border border-[#d2d0c7] hover:border-[var(--primary-color)] active:cursor-grabbing cursor-grab rounded-lg shadow-2xs transition-all flex flex-col space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] text-[var(--primary-color)] font-bold">{commit.hash}</span>
                            <span className="text-[10px] text-neutral-400 font-mono">{commit.date}</span>
                          </div>
                          <span className="text-xs font-sans text-[var(--text-color)] font-medium leading-tight">
                            {commit.message}
                          </span>
                          <span className="text-[10px] text-neutral-500 font-mono">@{commit.author}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Drop Targets */}
                  <div className="flex flex-col justify-between space-y-3">
                    <span className="text-xs font-mono font-bold text-[var(--text-color)] uppercase tracking-wide block">
                      Drop target actions
                    </span>
                    
                    {/* Zone 1: Squash */}
                    <div
                      onDragOver={(e) => handleDragOver(e, 'squash')}
                      onDragLeave={handleDragLeave}
                      onDrop={() => handleDrop('squash')}
                      className={`p-4 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-center transition-all ${
                        dragOverZone === 'squash'
                          ? 'bg-[var(--primary-color-light)] border-[var(--primary-color)] text-[var(--primary-color)]'
                          : 'border-[#d2d0c7] bg-[var(--card-color)]/40 text-[var(--text-muted-color)] hover:bg-[var(--card-color)]/80'
                      }`}
                      style={{ height: '80px' }}
                    >
                      <Layers className="w-5 h-5 mb-1" />
                      <span className="text-[11px] font-mono font-bold">SQUASH COMMIT</span>
                    </div>

                    {/* Zone 2: Cherry-Pick */}
                    <div
                      onDragOver={(e) => handleDragOver(e, 'cherrypick')}
                      onDragLeave={handleDragLeave}
                      onDrop={() => handleDrop('cherrypick')}
                      className={`p-4 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-center transition-all ${
                        dragOverZone === 'cherrypick'
                          ? 'bg-[var(--primary-color-light)] border-[var(--primary-color)] text-[var(--primary-color)]'
                          : 'border-[#d2d0c7] bg-[var(--card-color)]/40 text-[var(--text-muted-color)] hover:bg-[var(--card-color)]/80'
                      }`}
                      style={{ height: '80px' }}
                    >
                      <GitPullRequest className="w-5 h-5 mb-1" />
                      <span className="text-[11px] font-mono font-bold">CHERRY-PICK TO MAIN</span>
                    </div>

                    {/* Zone 3: Push */}
                    <div
                      onDragOver={(e) => handleDragOver(e, 'push')}
                      onDragLeave={handleDragLeave}
                      onDrop={() => handleDrop('push')}
                      className={`p-4 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-center transition-all ${
                        dragOverZone === 'push'
                          ? 'bg-[var(--primary-color-light)] border-[var(--primary-color)] text-[var(--primary-color)]'
                          : 'border-[#d2d0c7] bg-[var(--card-color)]/40 text-[var(--text-muted-color)] hover:bg-[var(--card-color)]/80'
                      }`}
                      style={{ height: '80px' }}
                    >
                      <RefreshCw className="w-5 h-5 mb-1 animate-spin-slow" />
                      <span className="text-[11px] font-mono font-bold">PUSH TO REMOTE</span>
                    </div>
                  </div>
                </div>

                {/* Popups & feedback */}
                <div className="mt-4">
                  <AnimatePresence>
                    {dropSuccessMsg && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-3 bg-emerald-950 text-emerald-100 border border-emerald-800 rounded-lg text-xs font-mono flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>{dropSuccessMsg}</span>
                        </div>
                      </motion.div>
                    )}

                    {squashModalCommit && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-4 bg-[var(--text-color)] border border-neutral-800 rounded-lg text-[var(--card-color)] space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-[var(--primary-color)] font-bold">Interactive Rebase</span>
                          <span className="text-[10px] text-neutral-400 font-mono">⌘ Squash option</span>
                        </div>
                        <p className="text-xs text-neutral-300">
                          Do you want to squash <strong>{squashModalCommit.hash}</strong> into <strong>{commits[0]?.hash}</strong>?
                        </p>
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => setSquashModalCommit(null)}
                            className="px-2.5 py-1 text-xs border border-neutral-700 hover:bg-neutral-800 rounded text-neutral-300"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={confirmSquash}
                            className="px-3 py-1 text-xs bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)] text-white rounded font-bold"
                          >
                            Squash & Fixup
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}

          {/* --- VISUAL GIT FLOW TAB --- */}
          {activeTab === 'gitflow' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-[#eae7df] text-[var(--primary-color)] text-[10px] font-mono font-bold mb-4">
                    <GitBranch className="w-3 h-3" />
                    <span>WORKFLOW AUTOMATION</span>
                  </div>
                  <h3 className="font-serif text-2xl text-[var(--text-color)] font-semibold mb-4">
                    Visually guided Git Flow
                  </h3>
                  <p className="text-[var(--text-muted-color)] text-sm leading-relaxed mb-6">
                    Managing branches can get messy. Commit+ features full visual support for the Git Flow branching model.
                    <br /><br />
                    Create features, hotfixes, and releases from the sidebar with one click. Commit+ renders clear visual lanes and takes care of the complex back-merges, tagging, and branch purges safely under the hood.
                  </p>
                </div>

                {/* Git Flow flow actions buttons */}
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-[var(--text-color)] uppercase tracking-wide block">
                    Guide the flow:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => runGitFlowStep('start_feature')}
                      disabled={gitFlowStep !== 0}
                      className="px-3 py-2 bg-[var(--card-color)] border border-[#d2d0c7] hover:border-[var(--primary-color)] disabled:opacity-40 text-xs font-medium rounded-lg text-[var(--text-color)] text-left transition-all"
                    >
                      1. Start Feature
                    </button>
                    <button
                      onClick={() => runGitFlowStep('commit_feature')}
                      disabled={gitFlowStep !== 1}
                      className="px-3 py-2 bg-[var(--card-color)] border border-[#d2d0c7] hover:border-[var(--primary-color)] disabled:opacity-40 text-xs font-medium rounded-lg text-[var(--text-color)] text-left transition-all"
                    >
                      2. Code Commit
                    </button>
                    <button
                      onClick={() => runGitFlowStep('finish_feature')}
                      disabled={gitFlowStep !== 2}
                      className="px-3 py-2 bg-[var(--card-color)] border border-[#d2d0c7] hover:border-[var(--primary-color)] disabled:opacity-40 text-xs font-medium rounded-lg text-[var(--text-color)] text-left transition-all"
                    >
                      3. Finish Feature
                    </button>
                    <button
                      onClick={() => runGitFlowStep('start_release')}
                      disabled={gitFlowStep !== 3}
                      className="px-3 py-2 bg-[var(--card-color)] border border-[#d2d0c7] hover:border-[var(--primary-color)] disabled:opacity-40 text-xs font-medium rounded-lg text-[var(--text-color)] text-left transition-all"
                    >
                      4. Start Release
                    </button>
                    <button
                      onClick={() => runGitFlowStep('finish_release')}
                      disabled={gitFlowStep !== 4}
                      className="px-3 py-2 bg-[var(--card-color)] border border-[#d2d0c7] hover:border-[var(--primary-color)] disabled:opacity-40 text-xs font-medium rounded-lg text-[var(--text-color)] text-left transition-all"
                    >
                      5. Finish Release
                    </button>
                    <button
                      onClick={() => runGitFlowStep('reset')}
                      className="px-3 py-2 bg-[var(--primary-color)] text-white hover:bg-[var(--primary-color-hover)] text-xs font-bold rounded-lg text-center transition-all"
                    >
                      🔄 Reset Graph
                    </button>
                  </div>
                </div>
              </div>

              {/* Git flow interactive visualizer canvas */}
              <div className="lg:col-span-7 flex flex-col space-y-4">
                
                {/* Visual lanes representation */}
                <div className="bg-[var(--neutral-light-color)] rounded-xl p-5 border border-[var(--border-color)] h-[220px] relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-2 left-2 text-[10px] font-mono text-[var(--text-muted-color)]">
                    Visual Git Graph
                  </div>

                  {/* Branches lanes */}
                  <div className="grid grid-rows-3 gap-0 h-full pt-6 relative">
                    
                    {/* Lane 1: Main (stable releases) */}
                    <div className="border-b border-[var(--border-color)]/50 flex items-center px-4 relative">
                      <span className="text-[10px] font-mono font-bold text-[var(--primary-color)] w-14">main</span>
                      <div className="flex items-center space-x-12 relative z-10">
                        <div className="w-3.5 h-3.5 rounded-full bg-slate-900 border-2 border-white shadow-xs" title="v0.9.0" />
                        {gitFlowStep >= 5 && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-xs flex items-center justify-center relative"
                          >
                            <span className="absolute -top-5 text-[9px] font-mono bg-emerald-100 text-emerald-800 px-1 rounded">v1.0.0</span>
                          </motion.div>
                        )}
                      </div>
                      {/* Connection line */}
                      <div className="absolute left-20 right-4 h-0.5 bg-slate-900/40 top-1/2 -translate-y-1/2 z-0" />
                    </div>

                    {/* Lane 2: Develop */}
                    <div className="border-b border-[var(--border-color)]/50 flex items-center px-4 relative">
                      <span className="text-[10px] font-mono font-bold text-sky-700 w-14">develop</span>
                      <div className="flex items-center space-x-12 relative z-10">
                        <div className="w-3.5 h-3.5 rounded-full bg-sky-500 border-2 border-white shadow-xs" />
                        <div className="w-3.5 h-3.5 rounded-full bg-sky-500 border-2 border-white shadow-xs" />
                        {gitFlowStep >= 3 && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-3.5 h-3.5 rounded-full bg-sky-600 border-2 border-white shadow-xs"
                            title="Merged auth-module"
                          />
                        )}
                        {gitFlowStep >= 5 && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-3.5 h-3.5 rounded-full bg-sky-600 border-2 border-white shadow-xs"
                            title="Merged back v1.0.0"
                          />
                        )}
                      </div>
                      <div className="absolute left-20 right-4 h-0.5 bg-sky-500/40 top-1/2 -translate-y-1/2 z-0" />
                    </div>

                    {/* Lane 3: Feature / Release */}
                    <div className="flex items-center px-4 relative">
                      <span className="text-[10px] font-mono font-bold text-amber-700 w-14">
                        {gitFlowStep >= 4 ? 'release/*' : 'feature/*'}
                      </span>
                      <div className="flex items-center space-x-12 relative z-10">
                        <div className="w-14" /> {/* align offset */}
                        
                        {gitFlowStep === 1 && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-white shadow-xs"
                          />
                        )}

                        {gitFlowStep === 2 && (
                          <>
                            <div className="w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-white shadow-xs" />
                            <motion.div
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="w-3.5 h-3.5 rounded-full bg-amber-600 border-2 border-white shadow-xs"
                            />
                          </>
                        )}

                        {gitFlowStep === 4 && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-3.5 h-3.5 rounded-full bg-purple-500 border-2 border-white shadow-xs"
                          />
                        )}
                      </div>

                      {/* Connection lines paths */}
                      {gitFlowStep >= 1 && gitFlowStep <= 2 && (
                        <div className="absolute left-[160px] w-[80px] h-0.5 bg-amber-500/40 top-1/2 -translate-y-1/2 z-0" />
                      )}
                    </div>

                  </div>
                </div>

                {/* Subprocess console logs */}
                <div className="bg-[var(--text-color)] rounded-xl p-4 font-mono text-[11px] text-neutral-300 border border-neutral-800 flex-1 min-h-[160px] flex flex-col justify-between">
                  <div className="overflow-y-auto max-h-[130px] space-y-1.5 scrollbar-thin">
                    {terminalLogs.map((log, index) => (
                      <div
                        key={index}
                        className={
                          log.startsWith('$')
                            ? 'text-amber-400 font-bold'
                            : log.includes('error')
                            ? 'text-rose-400'
                            : 'text-neutral-400'
                        }
                      >
                        {log}
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-neutral-800 pt-2 flex items-center justify-between text-[10px] text-neutral-500">
                    <span>Shell Engine: Subprocess / Swift Process()</span>
                    <span className="text-neutral-600">Zero Node/JS Overhead</span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* --- NATIVE PERFORMANCE TAB --- */}
          {activeTab === 'performance' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-[#eae7df] text-[var(--primary-color)] text-[10px] font-mono font-bold mb-4">
                    <Cpu className="w-3 h-3" />
                    <span>NATIVE MACOS BENCHMARK</span>
                  </div>
                  <h3 className="font-serif text-2xl text-[var(--text-color)] font-semibold mb-4">
                    Swift vs Electron
                  </h3>
                  <p className="text-[var(--text-muted-color)] text-sm leading-relaxed mb-6">
                    Electron apps are slow web browsers in disguise. They require massive frameworks just to render static text, draining your MacBook's battery.
                    <br /><br />
                    Commit+ is a pure, native AppKit/SwiftUI binary. It starts instantly, stays locked at zero idle CPU, uses less RAM than a single browser tab, and matches native macOS system standards.
                  </p>
                </div>

                <div className="p-4 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl space-y-2">
                  <button
                    onClick={startStressTest}
                    disabled={isStressTesting}
                    className="w-full py-2.5 px-4 bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)] disabled:bg-[var(--neutral-light-color)] text-white disabled:text-neutral-400 rounded-lg text-xs font-bold font-mono transition-all flex items-center justify-center space-x-2"
                  >
                    {isStressTesting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Benchmarking...</span>
                      </>
                    ) : (
                      <>
                        <Cpu className="w-4 h-4 animate-pulse" />
                        <span>Run Heavy Repo Benchmark</span>
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-[var(--text-muted-color)] text-center">Simulates fetching a 150,000-commit repository locally.</p>
                </div>
              </div>

              {/* Charts Simulator */}
              <div className="lg:col-span-7 bg-[var(--neutral-light-color)] rounded-xl p-6 border border-[var(--border-color)] flex flex-col justify-between">
                <span className="text-xs font-mono font-bold text-[var(--text-color)] uppercase tracking-wide mb-4 block">
                  Resource Performance Metrics
                </span>

                <div className="space-y-6">
                  {/* Metric 1: RAM */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-[var(--text-color)]">Memory Footprint (RAM)</span>
                      <span>Lower is better</span>
                    </div>
                    {/* Commit+ Swift */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-[var(--text-muted-color)] font-mono">
                        <span>Commit+ (Native Swift)</span>
                        <span className="font-bold text-emerald-600">{nativeMem} MB</span>
                      </div>
                      <div className="h-2.5 bg-neutral-200 rounded-full overflow-hidden">
                        <motion.div
                          animate={{ width: `${(nativeMem / 845) * 100}%` }}
                          className="h-full bg-emerald-500 rounded-full"
                        />
                      </div>
                    </div>
                    {/* Electron Client */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-[var(--text-muted-color)] font-mono">
                        <span>Typical Electron App (Fork/Kraken)</span>
                        <span className="font-bold text-rose-600">{electronMem} MB</span>
                      </div>
                      <div className="h-2.5 bg-neutral-200 rounded-full overflow-hidden">
                        <motion.div
                          animate={{ width: `${(electronMem / 845) * 100}%` }}
                          className="h-full bg-rose-500 rounded-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Metric 2: CPU */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-[var(--text-color)]">Idle CPU Overhead</span>
                      <span>Lower is better</span>
                    </div>
                    {/* Commit+ Swift */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-[var(--text-muted-color)] font-mono">
                        <span>Commit+ (Native Swift)</span>
                        <span className="font-bold text-emerald-600">{nativeCpu}% CPU</span>
                      </div>
                      <div className="h-2.5 bg-neutral-200 rounded-full overflow-hidden">
                        <motion.div
                          animate={{ width: `${Math.max(3, (nativeCpu / 40) * 100)}%` }}
                          className="h-full bg-emerald-500 rounded-full"
                        />
                      </div>
                    </div>
                    {/* Electron Client */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-[var(--text-muted-color)] font-mono">
                        <span>Typical Electron App</span>
                        <span className="font-bold text-rose-600">{electronCpu}% CPU</span>
                      </div>
                      <div className="h-2.5 bg-neutral-200 rounded-full overflow-hidden">
                        <motion.div
                          animate={{ width: `${(electronCpu / 40) * 100}%` }}
                          className="h-full bg-rose-500 rounded-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Benefit Cards */}
                  <div className="grid grid-cols-2 gap-3 border-t border-[var(--border-color)] pt-4 mt-2">
                    <div className="p-3 bg-[var(--card-color)] border border-[#d2d0c7] rounded-lg">
                      <span className="block text-[11px] font-mono text-[var(--primary-color)] font-bold">BOOT TIME</span>
                      <span className="block font-serif text-lg font-bold text-[var(--text-color)]">0.1s</span>
                      <span className="text-[10px] text-[var(--text-muted-color)]">Instant launch experience</span>
                    </div>
                    <div className="p-3 bg-[var(--card-color)] border border-[#d2d0c7] rounded-lg">
                      <span className="block text-[11px] font-mono text-[var(--primary-color)] font-bold">BINARY SIZE</span>
                      <span className="block font-serif text-lg font-bold text-[var(--text-color)]">4.2 MB</span>
                      <span className="text-[10px] text-[var(--text-muted-color)]">No hidden browser bloat</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
