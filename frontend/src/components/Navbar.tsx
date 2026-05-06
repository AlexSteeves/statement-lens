import { ThemeToggle } from "./ThemeToggle";

interface Props {
  onReset?: () => void;
}

export const Navbar = ({ onReset }: Props) => (
  <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-white/80 dark:bg-gray-950/80 backdrop-blur border-b border-gray-100 dark:border-gray-800 flex items-center px-6">
    <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <span className="font-semibold text-gray-800 dark:text-gray-100 tracking-tight">
          StatementLens
        </span>
      </div>

      <div className="flex items-center gap-3">
        {onReset && (
          <button
            onClick={onReset}
            className="text-sm text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            ← Analyze another
          </button>
        )}
        <ThemeToggle />
      </div>
    </div>
  </header>
);
