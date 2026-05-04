package com.statementlens.statement_lens.service;

import org.springframework.stereotype.Service;
import java.util.*;
import com.statementlens.statement_lens.model.*;
import com.statementlens.statement_lens.dto.*;
import java.util.stream.Collectors;
import java.time.YearMonth;

@Service
public class AggregationService {
    public AnalysisResult aggregate(List<Transaction> transactions) {
        AnalysisResult result = new AnalysisResult();
        result.setTotalIncome(0.0);
        result.setTotalExpense(0.0);
        for (Transaction transaction : transactions) {
            Double amount = transaction.getAmount();
            if (amount > 0) {
                result.setTotalIncome(result.getTotalIncome() + amount);
            } else {
                result.setTotalExpense(result.getTotalExpense() + amount);
            }
        }

        Map<String, List<Transaction>> categories = transactions.stream()
                .collect(Collectors.groupingBy(Transaction::getCategory));
        List<Map<String, Object>> byCategoryList = new ArrayList<>();
        for (Map.Entry<String, List<Transaction>> category : categories.entrySet()) {
            String categoryKey = category.getKey();
            List<Transaction> categoryTransactions = category.getValue();

            Integer count = categoryTransactions.size();
            Double total = 0.0;
            for (Transaction transaction : categoryTransactions) {
                total += transaction.getAmount();
            }

            Map<String, Object> categoryInformation = new HashMap<String, Object>();
            categoryInformation.put("total", total);
            categoryInformation.put("count", count);
            categoryInformation.put("category", categoryKey);
            byCategoryList.add(categoryInformation);
        }
        result.setByCategory(byCategoryList);

        Map<String, List<Transaction>> byMonths = transactions.stream()
                .collect(Collectors.groupingBy(t -> YearMonth.from(t.getDate()).toString()));
        List<Map<String, Object>> byMonthList = new ArrayList<>();

        for (Map.Entry<String, List<Transaction>> entry : byMonths.entrySet()) {
            String monthKey = entry.getKey();
            List<Transaction> monthTransactions = entry.getValue();

            Double expenses = 0.0;
            Double income = 0.0;
            for (Transaction month : monthTransactions) {
                Double amount = month.getAmount();
                if (amount > 0) {
                    income += amount;
                } else {
                    expenses += amount;
                }
            }

            Map<String, Object> monthInformation = new HashMap<String, Object>();
            monthInformation.put("income", income);
            monthInformation.put("expenses", expenses);
            monthInformation.put("month", monthKey);
            byMonthList.add(monthInformation);
        }
        result.setByMonth(byMonthList);

        Map<String, List<Transaction>> byMerchant = transactions.stream()
                .collect(Collectors.groupingBy(Transaction::getDescription));
        List<Map<String, Object>> byMerchantList = new ArrayList<>();

        for (Map.Entry<String, List<Transaction>> entry : byMerchant.entrySet()) {
            String merchantKey = entry.getKey();
            List<Transaction> merchantTransactions = entry.getValue();
            Integer count = merchantTransactions.size();
            Double amount = 0.0;
            for (Transaction merchant : merchantTransactions) {
                amount += merchant.getAmount();

            }
            Map<String, Object> merchantInformation = new HashMap<String, Object>();
            merchantInformation.put("merchant", merchantKey);
            merchantInformation.put("total", amount);
            merchantInformation.put("count", count);
            byMerchantList.add(merchantInformation);
        }
        byMerchantList.sort((a, b) -> Double.compare((Double) b.get("total"), (Double) a.get("total")));
        List<Map<String, Object>> topMerchants = byMerchantList.subList(0, Math.min(5, byMerchantList.size()));
        result.setTopMerchants(topMerchants);

        return result;
    }

}
