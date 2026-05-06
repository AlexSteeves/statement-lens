export interface ByCategory {
  category: string;
  total: number;
  count: number;
}

export interface ByMonth {
  month: string;
  income: number;
  expenses: number;
}

export interface ByMerchant {
  merchant: string;
  total: number;
  count: number;
}

export interface AnalysisResult {
  totalIncome: number;
  totalExpense: number;
  byCategory: ByCategory[];
  byMonth: ByMonth[];
  topMerchants: ByMerchant[];
  aiInsight: string | null;
}
