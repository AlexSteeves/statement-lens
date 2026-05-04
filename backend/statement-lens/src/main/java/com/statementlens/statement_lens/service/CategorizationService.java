package com.statementlens.statement_lens.service;

import org.springframework.stereotype.Service;
import com.statementlens.statement_lens.model.Transaction;
import java.util.Map;
import java.util.HashMap;
import java.util.List;

@Service
public class CategorizationService {

    private static final Map<String, List<String>> KEYWORDS = new HashMap<>();
    static {
        KEYWORDS.put("Dining", List.of("restaurant", "mcdonald", "starbucks", "doordash", "grubhub"));
        KEYWORDS.put("Transport", List.of("uber", "lyft", "parking", "gas", "shell", "bp"));
        KEYWORDS.put("Groceries", List.of("walmart", "kroger", "whole foods", "trader joe", "aldi"));
        KEYWORDS.put("Subscriptions", List.of("netflix", "spotify", "amazon prime", "hulu", "apple"));
        KEYWORDS.put("Utilities", List.of("electric", "water", "internet", "at&t", "verizon", "comcast"));
    }

    public Transaction categorize(Transaction transaction) {

        // 1. Get the description from the transaction and lowercase it
        String description = transaction.getDescription().toLowerCase();
        // 2. Loop through each entry in KEYWORDS
        for (Map.Entry<String, List<String>> entry : KEYWORDS.entrySet()) {
            String category = entry.getKey();
            List<String> keywords = entry.getValue();
            // 3. Check if any keyword in the list appears in the description
            for (String keyword : keywords) {
                if (description.contains(keyword)) {
                    transaction.setCategory(category);
                    return transaction;
                }
            }
        }
        transaction.setCategory("Other");
        return transaction;

    }
}
