import type { AnalysisResult } from "../types";

interface Props {
  result: AnalysisResult;
}

export const MerchantsTable = ({ result }: Props) => (
  <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
    <h2 className="text-sm uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-4">
      Top Merchants
    </h2>
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-800">
          <th className="pb-2 font-medium">Merchant</th>
          <th className="pb-2 font-medium text-right">Total</th>
          <th className="pb-2 font-medium text-right">Transactions</th>
        </tr>
      </thead>
      <tbody>
        {result.topMerchants.map((m) => (
          <tr key={m.merchant} className="border-b border-gray-50 dark:border-gray-800 last:border-0">
            <td className="py-2 text-gray-700 dark:text-gray-300">{m.merchant}</td>
            <td className={`py-2 text-right font-medium ${m.total < 0 ? "text-red-500" : "text-emerald-600 dark:text-emerald-400"}`}>
              {m.total < 0 ? "-" : "+"}${Math.abs(m.total).toFixed(2)}
            </td>
            <td className="py-2 text-right text-gray-400">{m.count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
