package com.statementlens.statement_lens.service;

import com.statementlens.statement_lens.model.Transaction;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.springframework.stereotype.Service;
import java.util.List;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.ArrayList;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.apache.commons.csv.CSVRecord;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CsvParserService {
    public List<Transaction> parse(MultipartFile file) throws IOException {
        List<Transaction> transactions = new ArrayList<>();

        Reader reader = new InputStreamReader(file.getInputStream());
        CSVParser csvParser = CSVFormat.DEFAULT.builder()
                .setHeader("Date", "Description", "Debit", "Credit", "Balance")
                .setTrim(true)
                .build()
                .parse(reader);
        for (CSVRecord record : csvParser) {
            Transaction transaction = new Transaction();
            Double amount = 0.0;
            if (record.get("Debit").isEmpty()) {
                amount = Double.parseDouble(record.get("Credit"));
            } else {
                amount = -Double.parseDouble(record.get("Debit"));
            }
            transaction.setDescription(record.get("Description"));
            transaction.setAmount(amount);
            transaction.setDate(LocalDate.parse(record.get("Date"), DateTimeFormatter.ofPattern("MM/dd/yyyy")));
            transactions.add(transaction);

        }

        return transactions;
    }
}
