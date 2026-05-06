import ReactMarkdown from "react-markdown";

interface Props {
  insight: string | null;
}

export const AiInsight = ({ insight }: Props) => {
  if (!insight) return null;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-8 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 rounded-full bg-emerald-400" />
        <h2 className="text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-semibold">
          AI Insight
        </h2>
      </div>
      <div className="prose-sm max-w-none text-gray-600 dark:text-gray-300">
        <ReactMarkdown
          components={{
            h2: ({ children }) => (
              <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-2 first:mt-0">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mt-4 mb-1">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 mb-3">
                {children}
              </p>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-gray-800 dark:text-gray-100">
                {children}
              </strong>
            ),
            ul: ({ children }) => (
              <ul className="space-y-1 mb-3 pl-4">{children}</ul>
            ),
            li: ({ children }) => (
              <li className="text-sm text-gray-600 dark:text-gray-300 flex gap-2 before:content-['–'] before:text-emerald-400 before:shrink-0">
                {children}
              </li>
            ),
          }}
        >
          {insight}
        </ReactMarkdown>
      </div>
    </div>
  );
};
