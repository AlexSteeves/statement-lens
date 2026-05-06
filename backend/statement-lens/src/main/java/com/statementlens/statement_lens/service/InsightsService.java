package com.statementlens.statement_lens.service;

import org.springframework.stereotype.Service;

import org.springframework.ai.chat.client.ChatClient;
import com.statementlens.statement_lens.tools.AnalysisTools;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class InsightsService {
    @Autowired
    private ChatClient chatClient;

    @Autowired
    private AnalysisTools analysisTools;

    public String generateInsight() {
        try {
            return chatClient.prompt()
                    .tools(analysisTools)
                    .user("You are a sharp, concise financial analyst. Use your tools to explore the user's bank statement, then produce a brief, premium-quality analysis in markdown. Use ## headers, bullet points, and bold for key figures. No emoji. No filler phrases. Be direct and specific — flag anything noteworthy about their spending patterns.")
                    .call()
                    .content();
        } catch (Exception err) {
            return null;
        }
    }
}
