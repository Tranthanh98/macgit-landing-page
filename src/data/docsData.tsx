import React from 'react';
import { Book, FileText, Code2, Terminal, HelpCircle, AlertCircle, CheckCircle2 } from 'lucide-react';

export interface DocSection {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export const docSections: DocSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    category: 'Setup',
    icon: <Book className="w-4 h-4" />,
    content: (
      <div className="space-y-6 text-left">
        <div>
          <h3 className="font-serif text-2xl text-[var(--text-color)] font-bold tracking-tight mb-2">Introduction</h3>
          <p className="text-sm text-[var(--text-muted-color)] leading-relaxed font-sans">
            Commit+ (MacGit) is a lightweight, fully native Git client written in Swift. It is designed to marry the speed and scriptability of the Command Line Interface with beautiful visual layouts for staging files, auditing histories, and resolving conflicts.
          </p>
        </div>

        <div className="bg-[var(--neutral-light-color)] border border-[var(--border-color)] rounded-xl p-4 text-xs text-[var(--text-muted-color)] leading-relaxed flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-[var(--primary-color)] shrink-0 mt-0.5" />
          <div className="font-sans">
            <strong className="text-[var(--text-color)]">System Requirement:</strong> Commit+ requires macOS 12.0 Monterey or higher, and expects a standard installation of Git on your shell path (type <code className="px-1 py-0.5 bg-white border border-[#d2d0c7] rounded font-mono text-[10px]">git --version</code> in Terminal to confirm).
          </div>
        </div>

        <div className="space-y-3 font-sans">
          <h4 className="font-serif text-lg text-[var(--text-color)] font-semibold">Standard Installation</h4>
          <p className="text-sm text-[var(--text-muted-color)] leading-relaxed">
            To install Commit+, you can grab our latest compiled app zip, decompress it, and drag it directly into your local applications folder:
          </p>
          <div className="bg-[var(--text-color)] rounded-xl p-4 font-mono text-xs text-neutral-300 border border-neutral-800 space-y-1">
            <div className="text-neutral-500"># Clone MacGit repository and review source</div>
            <div>git clone https://github.com/Tranthanh98/macgit.git</div>
            <div className="text-neutral-500"># Or download via terminal curls</div>
            <div>curl -L -O https://github.com/Tranthanh98/macgit/releases/latest/download/CommitPlus.zip</div>
            <div>unzip CommitPlus.zip -d /Applications/</div>
          </div>
        </div>

        <div className="space-y-2 font-sans">
          <h4 className="font-serif text-base text-[var(--text-color)] font-semibold">Telemetry & Auditing</h4>
          <p className="text-sm text-[var(--text-muted-color)] leading-relaxed">
            We collect absolutely 0 tracking telemetry, crash logs, or user identifiers. Commit+ is a 100% offline-safe local tool. We communicate with your local Git binary strictly through standard OS subprocess pipes.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'staging-committing',
    title: 'Staging & Committing',
    category: 'Core Git',
    icon: <FileText className="w-4 h-4" />,
    content: (
      <div className="space-y-6 text-left font-sans">
        <div>
          <h3 className="font-serif text-2xl text-[var(--text-color)] font-bold tracking-tight mb-2">The Staging Loop</h3>
          <p className="text-sm text-[var(--text-muted-color)] leading-relaxed">
            Commit+ separates staging from writing logs to mirror standard Git habits. In the sidebar view, any modified, untracked, or deleted files will appear immediately under the staging panel.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-serif text-lg text-[var(--text-color)] font-semibold">Staging file blocks</h4>
          <ul className="list-disc pl-5 text-sm text-[var(--text-muted-color)] space-y-2">
            <li><strong>Stage entire files:</strong> Click the check checkbox beside the file row or press <kbd className="px-1.5 py-0.5 bg-[var(--neutral-light-color)] border border-[#d2d0c7] rounded text-xs font-mono">Space</kbd> on a highlighted list item.</li>
            <li><strong>Hunk-level staging:</strong> In the central diff inspector, hover over any highlighted code block and click <strong className="text-[var(--primary-color)]">"Stage Hunk"</strong> to stage parts of a file.</li>
            <li><strong>Line-level staging:</strong> Drag select contiguous lines in the diff panel, right-click, and select "Stage lines".</li>
          </ul>
        </div>

        <div className="bg-[var(--neutral-light-color)] border border-[var(--border-color)] rounded-xl p-4 text-xs text-[var(--text-muted-color)] leading-relaxed space-y-2">
          <div className="font-bold text-[var(--text-color)] flex items-center space-x-1">
            <CheckCircle2 className="w-4 h-4 text-[var(--primary-color)]" />
            <span>Keyboard-First Commit:</span>
          </div>
          <p>
            When ready, press <kbd className="px-1.5 py-0.5 bg-white border border-[#d2d0c7] rounded text-xs font-mono">⌘ ⇧ C</kbd> from anywhere inside the repository view to focus the Commit message area, fill out the semantic summary, and press <kbd className="px-1.5 py-0.5 bg-white border border-[#d2d0c7] rounded text-xs font-mono">↵ (Enter)</kbd> to execute!
          </p>
        </div>

        <div className="bg-[var(--text-color)] rounded-xl p-4 font-mono text-xs text-neutral-300 border border-neutral-800 space-y-1">
          <div className="text-neutral-500"># Beneath the hood, Commit+ invokes:</div>
          <div>$ git add [filepath]</div>
          <div>$ git commit -m "feat(auth): add email verification callbacks"</div>
        </div>
      </div>
    )
  },
  {
    id: 'branches-merges',
    title: 'Branching & Merging',
    category: 'Core Git',
    icon: <Terminal className="w-4 h-4" />,
    content: (
      <div className="space-y-6 text-left font-sans">
        <div>
          <h3 className="font-serif text-2xl text-[var(--text-color)] font-bold tracking-tight mb-2">Branches & Pull Streams</h3>
          <p className="text-sm text-[var(--text-muted-color)] leading-relaxed">
            Navigate branches swiftly without friction. Branch creation, checkout, and merging can be triggered easily using keyboard hotkeys or floating utility panels.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-[var(--border-color)] bg-white space-y-2">
            <h5 className="font-serif font-bold text-[var(--text-color)] text-sm">Create Branch</h5>
            <p className="text-xs text-[var(--text-muted-color)] leading-relaxed">
              Press <kbd className="px-1 py-0.5 bg-[var(--neutral-light-color)] border border-[#d2d0c7] rounded text-[10px] font-mono">⌘⇧B</kbd>, type your new branch name (e.g. <code className="text-[var(--primary-color)]">feature/oauth</code>) and press Enter. It checks out automatically.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-[var(--border-color)] bg-white space-y-2">
            <h5 className="font-serif font-bold text-[var(--text-color)] text-sm">Visual Merging</h5>
            <p className="text-xs text-[var(--text-muted-color)] leading-relaxed">
              Right-click any tracking branch in the visual repository map and choose "Merge into Active". If conflicts occur, Commit+ launches the visual merge helper.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-serif text-base text-[var(--text-color)] font-semibold">Remote Synchronization</h4>
          <p className="text-sm text-[var(--text-muted-color)] leading-relaxed">
            Syncing with remote repositories like GitHub, GitLab, or Gitea is handled through direct integration. Push, Pull, and Fetch are mapped directly to hotkeys for continuous loops:
          </p>
          <div className="bg-[var(--text-color)] rounded-xl p-4 font-mono text-xs text-neutral-300 border border-neutral-800 space-y-1">
            <div>$ git fetch --prune origin</div>
            <div>$ git pull origin head</div>
            <div>$ git push origin [branch-name]</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'git-worktrees',
    title: 'Git Worktrees',
    category: 'Advanced',
    icon: <Code2 className="w-4 h-4" />,
    content: (
      <div className="space-y-6 text-left font-sans">
        <div>
          <h3 className="font-serif text-2xl text-[var(--text-color)] font-bold tracking-tight mb-2">Isolated Parallel Folders</h3>
          <p className="text-sm text-[var(--text-muted-color)] leading-relaxed">
            Git worktrees allow you to attach multiple checked-out directories pointing to different branches to a single local repository clone. This eliminates the need to run unstable stashes when switching context.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-serif text-base text-[var(--text-color)] font-semibold">Creating a Worktree</h4>
          <p className="text-sm text-[var(--text-muted-color)] leading-relaxed">
            Inside Commit+, right-click on any branch or tag node in the repository view and select <strong>"Create isolated Worktree"</strong>. Specify a sibling directory name, and Commit+ will spin up a fresh folder configured for you in milliseconds.
          </p>
        </div>

        <div className="bg-[var(--text-color)] rounded-xl p-4 font-mono text-xs text-neutral-300 border border-neutral-800 space-y-2">
          <div>
            <span className="text-neutral-500"># Under the hood command executed by Commit+:</span>
            <br />
            <span className="text-amber-400">$ git worktree add ../worktree-feature-oauth feature/oauth</span>
          </div>
          <div className="text-neutral-400 border-t border-neutral-800 pt-2 text-[11px]">
            This leaves your primary working directory untouched. You can open <code className="bg-neutral-800 px-1 py-0.5 rounded">../worktree-feature-oauth</code> in Xcode or VS Code separately.
          </div>
        </div>

        <div className="space-y-2 text-sm text-[var(--text-muted-color)] leading-relaxed font-sans">
          <h4 className="font-serif text-base text-[var(--text-color)] font-semibold">Pruning Worktrees</h4>
          <p>
            Once your parallel feature is merged and pushed, you can delete the worktree folder or click <strong>"Prune worktrees"</strong> in the Commit+ sidebar to automatically run <code className="px-1 py-0.5 bg-[var(--neutral-light-color)] rounded border border-[#d2d0c7] font-mono">git worktree prune</code>.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'faq',
    title: 'Troubleshooting & FAQ',
    category: 'Help',
    icon: <HelpCircle className="w-4 h-4" />,
    content: (
      <div className="space-y-6 text-left font-sans">
        <div>
          <h3 className="font-serif text-2xl text-[var(--text-color)] font-bold tracking-tight mb-2">Frequently Asked Questions</h3>
          <p className="text-sm text-[var(--text-muted-color)] leading-relaxed">
            Find answers to common configuration quirks and system inquiries.
          </p>
        </div>

        <div className="space-y-4 divide-y divide-[var(--border-color)]">
          <div className="space-y-1.5 pt-4 first:pt-0">
            <h5 className="font-serif font-bold text-[var(--text-color)] text-sm">Where does Commit+ search for the git binary?</h5>
            <p className="text-xs text-[var(--text-muted-color)] leading-relaxed">
              By default, the Swift subprocess runner evaluates your local environment path. It checks <code className="bg-[var(--neutral-light-color)] px-1 rounded font-mono text-[10px]">/usr/bin/git</code>, <code className="bg-[var(--neutral-light-color)] px-1 rounded font-mono text-[10px]">/usr/local/bin/git</code>, and <code className="bg-[var(--neutral-light-color)] px-1 rounded font-mono text-[10px]">/opt/homebrew/bin/git</code>. You can customize the path inside the App settings.
            </p>
          </div>

          <div className="space-y-1.5 pt-4">
            <h5 className="font-serif font-bold text-[var(--text-color)] text-sm">How do I setup SSH key passphrases?</h5>
            <p className="text-xs text-[var(--text-muted-color)] leading-relaxed">
              Commit+ expects credentials to be registered in your local SSH Agent. We highly recommend configuring your ssh config files to store passphrases in the Apple Keychain so they validate automatically:
            </p>
            <div className="bg-[var(--text-color)] rounded-xl p-3 font-mono text-[10px] text-neutral-300 border border-neutral-800 leading-tight">
              {`Host *
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_ed25519`}
            </div>
          </div>

          <div className="space-y-1.5 pt-4">
            <h5 className="font-serif font-bold text-[var(--text-color)] text-sm">Can I use Commit+ alongside standard command-line tools?</h5>
            <p className="text-xs text-[var(--text-muted-color)] leading-relaxed">
              Yes, absolutely! Since Commit+ triggers standard Git CLI processes behind the scenes, there are no proprietary indexes, hidden databases, or custom file lockers. Your repository state is always standard and safe.
            </p>
          </div>
        </div>
      </div>
    )
  }
];
