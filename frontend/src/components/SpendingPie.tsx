import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from "recharts";
import type { AnalysisResult } from "../types";

interface Props {
  result: AnalysisResult;
}

const COLORS = ["#34d399", "#60a5fa", "#f97316", "#a78bfa", "#f43f5e", "#facc15"];

export const SpendingPie = ({ result }: Props) => {
  const data = result.byCategory
    .filter((c) => c.total < 0)
    .map((c) => ({ name: c.category, value: Math.abs(c.total) }));

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
      <h2 className="text-sm uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-4">
        Spending by Category
      </h2>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(v: number) => `$${v.toFixed(2)}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
