import { useState, useRef } from "react";
import { analyze } from "../api/analyze";
import type { AnalysisResult } from "../types";
import { Navbar } from "./Navbar";

interface Props {
  onResult: (result: AnalysisResult) => void;
}

const Decoration = ({ side }: { side: "left" | "right" }) => (
  <div
    className={`hidden lg:flex fixed top-0 bottom-0 ${side === "left" ? "left-0" : "right-0"} w-48 flex-col justify-center gap-4 px-6 pointer-events-none`}
  >
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className="h-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40"
        style={{ width: `${40 + (i % 3) * 20}%`, opacity: 0.5 + (i % 3) * 0.2 }}
      />
    ))}
    <div className="w-10 h-10 rounded-xl border-2 border-emerald-100 dark:border-emerald-900/40 opacity-60" />
    <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 opacity-40" />
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className="h-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40"
        style={{ width: `${30 + (i % 2) * 30}%`, opacity: 0.3 + i * 0.15 }}
      />
    ))}
  </div>
);

export const UploadZone = ({ onResult }: Props) => {
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setLoading(true);
    setError(null);
    try {
      const result = await analyze(file);
      onResult(result);
    } catch {
      setError("Failed to analyze file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <Decoration side="left" />
      <Decoration side="right" />

      <div className="min-h-screen flex items-center justify-center p-6 pt-20">
        <div className="w-full max-w-lg">
          <p className="text-gray-500 dark:text-gray-400 text-center mb-8">
            Upload your bank statement CSV for an AI-powered spending analysis.
          </p>

          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              const file = e.dataTransfer.files[0];
              if (file) handleFile(file);
            }}
            className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-colors ${
              dragging
                ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950"
                : "border-gray-200 dark:border-gray-700 hover:border-emerald-300 hover:bg-gray-50 dark:hover:bg-gray-900"
            }`}
          >
            <div className="text-4xl mb-4">📂</div>
            <p className="text-gray-600 dark:text-gray-300 font-medium">
              {loading ? "Analyzing..." : "Drop your CSV here or click to browse"}
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              Supports TD credit card CSV format
            </p>
            <input
              ref={inputRef}
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />
          </div>

          {loading && (
            <div className="mt-6 flex justify-center">
              <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {error && (
            <p className="mt-4 text-center text-red-500 text-sm">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};
