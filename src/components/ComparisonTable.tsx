import { Check, X, Shield, Award, Sparkles } from 'lucide-react';

export default function ComparisonTable() {
  const comparisonData = [
    {
      feature: 'Native Architecture',
      commitPlus: 'Swift / SwiftUI (100% Native)',
      cli: 'Native C Binary',
      electron: 'Web / Chromium Wrapper',
      tower: 'Native Swift/Objective-C',
      highlight: true
    },
    {
      feature: 'App Start & Memory',
      commitPlus: '0.1s Boot / 18MB RAM',
      cli: 'Instant / 2MB RAM',
      electron: '3s - 5s Boot / 450MB+ RAM',
      tower: '0.2s Boot / 45MB RAM',
      highlight: true
    },
    {
      feature: 'Pricing Model',
      commitPlus: 'Free & Open Source (AGPL-3.0)',
      cli: 'Free & Open Source',
      electron: 'Paid Subscription / Limited Free',
      tower: '$99+/year Subscription',
      highlight: false
    },
    {
      feature: 'Multi-Level Undo (⌘Z)',
      commitPlus: 'Yes (Stashes, Branches, Stages)',
      cli: 'No (Manual reflog/reset)',
      electron: 'Partial (Commits only)',
      tower: 'Yes (Advanced)',
      highlight: false
    },
    {
      feature: 'Visual Drag & Drop Rebase',
      commitPlus: 'Yes (Reorder, Squash, Cherry-pick)',
      cli: 'No (Interactive CLI file)',
      electron: 'Varies (Clunky)',
      tower: 'Yes (Polished)',
      highlight: false
    },
    {
      feature: 'External Dependencies',
      commitPlus: 'None (Self-contained binary)',
      cli: 'None',
      electron: 'Huge (Chromium, Node, JS assets)',
      tower: 'None',
      highlight: false
    },
    {
      feature: 'Integrated Git Worktrees',
      commitPlus: 'Yes (Visual Sidebar Nodes)',
      cli: 'Yes (Complex command flags)',
      electron: 'Rare / Custom scripts',
      tower: 'Partial',
      highlight: false
    }
  ];

  return (
    <section id="comparison" className="py-24 bg-[var(--bg-color)] relative border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs font-bold text-[var(--primary-color)] uppercase tracking-wider mb-2 block">
            MARKET POSITIONING
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[var(--text-color)] font-semibold tracking-tight mb-4">
            How Commit+ stacks up
          </h2>
          <p className="text-base text-[var(--text-muted-color)] font-sans">
            Why build another Git client? Because we believe Mac developers deserve a native client that is completely open source and free.
          </p>
        </div>

        {/* Table container */}
        <div className="overflow-x-auto bg-white border border-[var(--border-color)] rounded-2xl shadow-2xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--card-color)] border-b border-[var(--border-color)] text-xs font-mono text-[var(--text-muted-color)] uppercase tracking-wider">
                <th className="py-4 px-6 font-bold">Feature Matrix</th>
                <th className="py-4 px-6 font-bold text-[var(--primary-color)] bg-[var(--primary-color)]/5 border-x border-[var(--primary-color)]/20">
                  <div className="flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Commit+ (MacGit)</span>
                  </div>
                </th>
                <th className="py-4 px-6 font-bold">Git CLI (Terminal)</th>
                <th className="py-4 px-6 font-bold">Electron Clients</th>
                <th className="py-4 px-6 font-bold">Git Tower (Paid)</th>
              </tr>
            </thead>
            <tbody className="text-xs font-sans divide-y divide-[var(--border-color)]">
              {comparisonData.map((row, index) => (
                <tr 
                  key={row.feature} 
                  className={`hover:bg-[var(--bg-color)]/60 transition-colors ${
                    row.highlight ? 'bg-amber-50/15' : ''
                  }`}
                >
                  {/* Feature Label */}
                  <td className="py-4 px-6 font-semibold text-[var(--text-color)]">
                    {row.feature}
                  </td>
                  
                  {/* Commit+ (MacGit) */}
                  <td className="py-4 px-6 font-mono font-medium text-[var(--primary-color)] bg-[var(--primary-color)]/2 border-x border-[var(--primary-color)]/10">
                    <div className="flex items-center space-x-1.5 font-bold">
                      <Check className="w-4 h-4 text-[var(--primary-color)]" />
                      <span>{row.commitPlus}</span>
                    </div>
                  </td>

                  {/* Git CLI */}
                  <td className="py-4 px-6 font-mono text-[var(--text-muted-color)]">
                    {row.cli}
                  </td>

                  {/* Electron */}
                  <td className="py-4 px-6 font-mono text-neutral-400">
                    <div className="flex items-center space-x-1.5">
                      <X className="w-3.5 h-3.5 text-neutral-300" />
                      <span>{row.electron}</span>
                    </div>
                  </td>

                  {/* Git Tower */}
                  <td className="py-4 px-6 font-mono text-[var(--text-muted-color)]">
                    {row.tower}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footnote */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-[var(--card-color)] border border-[var(--border-color)] rounded-xl text-xs text-[var(--text-muted-color)]">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-[var(--primary-color)]" />
            <span>Licensed under AGPL-3.0. 100% telemetry-free and tracking-free.</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4 text-[var(--primary-color)]" />
            <span>Open Source on GitHub — contribute or audit code.</span>
          </div>
        </div>

      </div>
    </section>
  );
}
