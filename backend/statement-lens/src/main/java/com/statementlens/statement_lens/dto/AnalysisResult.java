package com.statementlens.statement_lens.dto;

import java.util.*;
import lombok.Data;

@Data
public class AnalysisResult {
    private Double totalIncome;
    private Double totalExpense;
    private List<Map<String, Object>> byCategory;
    private List<Map<String, Object>> byMonth;
    private List<Map<String, Object>> topMerchants;
    private String aiInsight;
}
