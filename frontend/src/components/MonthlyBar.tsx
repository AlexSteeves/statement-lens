import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid,
} from "recharts";
import type { AnalysisResult } from "../types";

interface Props {
  result: AnalysisResult;
}

export const MonthlyBar = ({ result }: Props) => {
  const data = [...result.byMonth]
    .sort((a, b) => a.month.localeCompare(b.month))
    .map((m) => ({
      month: m.month,
      Income: m.income,
      Expenses: Math.abs(m.expenses),
    }));

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
      <h2 className="text-sm uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-4">
        Monthly Breakdown
      </h2>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip formatter={(v: number) => `$${v.toFixed(2)}`} />
          <Legend />
          <Bar dataKey="Income" fill="#34d399" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Expenses" fill="#f87171" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
