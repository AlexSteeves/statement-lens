package com.statementlens.statement_lens.tools;

import org.springframework.stereotype.Component;
import com.statementlens.statement_lens.dto.AnalysisResult;
import org.springframework.ai.tool.annotation.Tool;
import java.util.*;

@Component
public class AnalysisTools {

    private AnalysisResult result;

    @Tool
    public List<Map<String, Object>> getSpendingByCategory() {
        return result.getByCategory();
    };

    @Tool
    public List<Map<String, Object>> getTopMerchants() {
        return result.getTopMerchants();
    };

    @Tool
    public List<Map<String, Object>> getMonthlyTrend() {
        return result.getByMonth();
    };

    @Tool
    public Map<String, Object> getOverallSummary() {
        Map<String, Object> summary = new HashMap<String, Object>();
        summary.put("totalIncome", result.getTotalIncome());
        summary.put("totalExpenses", result.getTotalExpense());
        summary.put("net", result.getTotalIncome() - result.getTotalExpense());
        return summary;
    };
}
