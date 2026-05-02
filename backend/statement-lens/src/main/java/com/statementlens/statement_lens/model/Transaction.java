package com.statementlens.statement_lens.model;

import lombok.Data;
import java.time.LocalDate;

@Data
public class Transaction {
    private LocalDate date;
    private String description;
    private Double amount;
    private String category;
}
