import type { AnalysisResult } from "../types";

interface Props {
  result: AnalysisResult;
}

const fmt = (n: number) =>
  new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(Math.abs(n));

const topCategory = (result: AnalysisResult) => {
  const expenses = result.byCategory.filter((c) => c.total < 0);
  if (!expenses.length) return "—";
  return expenses.reduce((a, b) => (a.total < b.total ? a : b)).category;
};

export const SummaryCards = ({ result }: Props) => {
  const net = result.totalIncome + result.totalExpense;

  const cards = [
    { label: "Total Income", value: fmt(result.totalIncome), color: "text-emerald-600 dark:text-emerald-400" },
    { label: "Total Expenses", value: fmt(result.totalExpense), color: "text-red-500 dark:text-red-400" },
    { label: "Net", value: fmt(net), color: net >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400" },
    { label: "Top Category", value: topCategory(result), color: "text-gray-700 dark:text-gray-200" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 shadow-sm"
        >
          <p className="text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1">
            {card.label}
          </p>
          <p className={`text-xl font-semibold ${card.color}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
};
