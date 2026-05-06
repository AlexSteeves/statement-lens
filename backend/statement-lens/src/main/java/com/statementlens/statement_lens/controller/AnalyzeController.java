package com.statementlens.statement_lens.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.statementlens.statement_lens.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.statementlens.statement_lens.tools.*;
import com.statementlens.statement_lens.dto.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import com.statementlens.statement_lens.model.*;

@RestController
public class AnalyzeController {

    @Autowired
    private CsvParserService csvParserService;
    @Autowired
    private CategorizationService categorizationService;
    @Autowired
    private AggregationService aggregationService;
    @Autowired
    private InsightsService insightsService;

    @Autowired
    private AnalysisTools analysisTools;

    @GetMapping("/api/health")
    public String health() {
        return "OK";
    }

    @PostMapping("/api/analyze")
    public AnalysisResult analyze(@RequestParam("file") MultipartFile multipartFile) throws IOException {
        List<Transaction> transactions = csvParserService.parse(multipartFile);
        for (Transaction transaction : transactions) {
            categorizationService.categorize(transaction);
        }
        AnalysisResult result = aggregationService.aggregate(transactions);
        analysisTools.setResult(result);

        result.setAiInsight(insightsService.generateInsight());
        return result;

    }
}
