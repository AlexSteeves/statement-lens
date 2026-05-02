# StatementLens

Upload a bank statement CSV and get back categorized spending, monthly trends, and an AI-generated analysis — powered by an agentic Claude loop via Spring AI and MCP.

## How it works

The backend parses your exported CSV, categorizes each transaction by keyword matching, and computes spending breakdowns. An agentic AI cycle then uses those results as callable tools — Claude decides what to query, reasons over the data, and returns a plain-English insight.

## Tech stack

**Backend** — Java 21, Spring Boot 4, Spring AI, Apache Commons CSV  
**Frontend** — React 18, TypeScript, Tailwind CSS, Recharts  
**AI** — Claude (Anthropic) via Spring AI MCP tools

## Setup

**Prerequisites:** Java 21, Node 18+, an Anthropic API key

```bash
# Backend
cd backend/statement-lens
ANTHROPIC_API_KEY=your_key_here ./mvnw spring-boot:run

# Frontend
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`, upload a CSV exported from your bank, and hit analyze.

## Supported CSV formats

- Chase (Transaction Date, Description, Amount)
- Any CSV with recognizable date, description, and amount columns
