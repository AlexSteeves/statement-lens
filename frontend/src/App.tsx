import { useState } from "react";
import { UploadZone } from "./components/UploadZone";
import { SummaryCards } from "./components/SummaryCards";
import { SpendingPie } from "./components/SpendingPie";
import { MonthlyBar } from "./components/MonthlyBar";
import { MerchantsTable } from "./components/MerchantsTable";
import { AiInsight } from "./components/AiInsight";
import { Navbar } from "./components/Navbar";
import type { AnalysisResult } from "./types";

function App() {
  const [result, setResult] = useState<AnalysisResult | null>(null);

  if (!result) {
    return <UploadZone onResult={setResult} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar onReset={() => setResult(null)} />

      {/* Side accent strips */}
      <div className="hidden xl:block fixed left-0 top-14 bottom-0 w-1 bg-gradient-to-b from-emerald-300 via-emerald-100 to-transparent dark:from-emerald-700 dark:via-emerald-900 dark:to-transparent opacity-60" />
      <div className="hidden xl:block fixed right-0 top-14 bottom-0 w-1 bg-gradient-to-b from-emerald-300 via-emerald-100 to-transparent dark:from-emerald-700 dark:via-emerald-900 dark:to-transparent opacity-60" />

      <div className="max-w-5xl mx-auto px-6 py-10 pt-20 space-y-6">
        <SummaryCards result={result} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SpendingPie result={result} />
          <MonthlyBar result={result} />
        </div>

        <MerchantsTable result={result} />
        <AiInsight insight={result.aiInsight} />
      </div>
    </div>
  );
}

export default App;
