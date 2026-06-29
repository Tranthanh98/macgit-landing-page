export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  tags: string[];
  likes: number;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'why-native-swift-matters',
    title: 'Why we built a Git client in 100% Native Swift',
    excerpt: 'Most modern desktop software is bundled with a hidden web browser. Here is why we rejected Electron in favor of direct AppKit and SwiftUI compilation.',
    date: 'June 25, 2026',
    readTime: '5 min read',
    author: {
      name: 'Thanh Tran',
      role: 'Creator & Lead Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&crop=crop&w=150&h=150&q=80'
    },
    tags: ['Swift', 'Architecture', 'Performance'],
    likes: 142,
    content: [
      'Open your Task Manager on any modern operating system, and you will notice a disturbing trend: simple chat utilities, music players, and text editors are routinely consuming hundreds of megabytes of RAM. The culprit is almost always Electron—a framework that wraps web applications inside a complete Chromium browser instance.',
      'When we set out to build Commit+ (MacGit), we decided to take a hard stance. Git is a tool for developers who care deeply about efficiency. A tool that helps you write performant code should not itself be bloated.',
      'By writing Commit+ entirely in Swift and SwiftUI, we achieved a boot time of less than 0.1 seconds and an active memory footprint of just 18MB. More importantly, we get direct access to the macOS system API, allowing us to launch Git subprocesses safely, handle Unix file descriptor notifications, and implement responsive spring physics using Apple’s core animation layers.',
      'Native development requires more discipline, but the result is a tool that feels like a natural extension of your operating system. It respects your battery life, launches instantly, and stays out of your way.'
    ]
  },
  {
    id: 'demystifying-git-worktrees',
    title: 'Stop stashing your work: How Git Worktrees can save your sanity',
    excerpt: 'Stashing is a fragile way to context-switch. Learn how Git Worktrees let you work on multiple branches simultaneously without touching your active directory.',
    date: 'June 18, 2026',
    readTime: '4 min read',
    author: {
      name: 'Thanh Tran',
      role: 'Creator & Lead Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&crop=crop&w=150&h=150&q=80'
    },
    tags: ['Git Internals', 'Workflow', 'Productivity'],
    likes: 98,
    content: [
      'Picture this: you are deep into a complex feature branch. You have modified twenty files, written half a dozen tests, and nothing compiles yet. Suddenly, a critical bug report comes in for the main production branch.',
      'Traditionally, your workflow is to run "git stash", check out the main branch, fix the bug, commit, check back out your feature branch, and run "git stash pop". While this works, it is prone to index conflicts, missing untracked files, and losing track of what was stashed.',
      'Enter Git Worktrees. A worktree allows you to have multiple active working directories attached to the same repository. Instead of stashing, you simply spin up a new worktree directory in a sibling folder (e.g., "../myproject-hotfix") pointing to the main branch.',
      'You can open that folder in a separate window, make your changes, commit, push, and delete the folder when finished. Your feature branch remains completely untouched and open in your primary editor. In Commit+, we built a visual sidebar explorer for worktrees, making this powerful workflow accessible in one single click.'
    ]
  },
  {
    id: 'subprocesses-vs-bindings',
    title: 'System Subprocesses vs. libgit2: An engineering trade-off',
    excerpt: 'An in-depth look at why Commit+ drives Git directly through Unix sub-processes rather than binding to C-library wrappers.',
    date: 'May 30, 2026',
    readTime: '6 min read',
    author: {
      name: 'Thanh Tran',
      role: 'Creator & Lead Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&crop=crop&w=150&h=150&q=80'
    },
    tags: ['Engineering', 'Unix', 'Git Internals'],
    likes: 115,
    content: [
      'When building a custom Git client, developers usually have two choices for interacting with repositories: link against "libgit2" (a highly complete, portable C library) or execute shell-like CLI subprocesses using the system’s native Git binary.',
      'Most clients choose libgit2 because it offers direct function bindings, in-memory data structures, and predictable execution. However, we chose the subprocess model using Swift’s native Process() API, and here is why.',
      'First, libgit2 is not a complete mirror of Git. It lacks support for several advanced features, newer configuration options, and custom hook scripts. Second, when the Git core team releases security updates or performance improvements, users of libgit2 must wait for the library to be updated, recompiled, and shipped. By calling the native "git" binary on the user’s PATH, Commit+ immediately benefits from whatever version of Git is installed on the machine.',
      'To make this fast, we designed a custom stream parser that reads stdout and stderr asynchronously. This allows us to feed diff lines and status indicators directly into the SwiftUI rendering loop without blocking the main thread, achieving performance that rivals or exceeds library-linked clients.'
    ]
  }
];
