# StatementLens

StatementLens is a bank statement analyzer that turns a raw CSV export into categorized spending breakdowns, monthly trends, and an AI-generated financial insight — all in one upload.

## Why this project exists

Most financial analysis tools treat your bank data like a black box—they take your statements, process them somewhere you can't see, and hand back numbers you have to trust. StatementLens is different because it runs entirely in your control, using MCP servers as the foundation: Claude reasons through your transactions step-by-step, calling only the tools it needs, showing you exactly how it categorized your spending and why. This matters because MCP servers are becoming the standard way AI systems handle sensitive data—they're transparent, composable, and keep your information local—and StatementLens proves that approach works in practice. You upload a CSV, Claude's agentic loop analyzes it with full visibility into its reasoning, and you get categorized spending, trends, and insights backed by logic you can actually follow. It's not magic; it's architecture.

## Why this tech stack

**Java + Spring Boot** is the industry standard for building production-grade backends. It handles HTTP, dependency injection, and configuration out of the box — letting you focus on business logic rather than infrastructure.

**Spring AI** is Spring's official abstraction layer for working with AI models. Instead of calling the Anthropic API directly, Spring AI provides a consistent interface across providers, built-in retry logic, and first-class support for tool use and agentic patterns.

**MCP (Model Context Protocol)** is what makes the AI analysis genuinely agentic rather than a simple prompt. Instead of dumping all the transaction data into a prompt and hoping Claude makes sense of it, MCP exposes specific functions — `getSpendingByCategory`, `getTopMerchants`, `getMonthlyTrend`, `getOverallSummary` — as callable tools. Claude decides which tools to call, in what order, based on what it needs to answer the question. This mirrors how a real analyst would approach the data: look at the summary first, drill into categories, check merchant patterns. The model drives the investigation rather than passively receiving a data dump.

**React + TypeScript + Tailwind** on the frontend for a fast, type-safe UI with minimal configuration overhead.

---

## How to run

### Prerequisites

- Java 21
- Node 18+
- An Anthropic API key

---

### Backend

**1. Add your API key**

Open `backend/statement-lens/src/main/resources/application-local.properties` and replace the placeholder:

```properties
spring.ai.anthropic.api-key=your-key-here
```

**2. Start the server**

```powershell
cd backend/statement-lens
.\mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=local
```

The backend runs on `http://localhost:8080`.

---

### Frontend

**3. Install dependencies**

```powershell
cd frontend
npm install
```

**4. Start the dev server**

```powershell
npm run dev
```

The frontend runs on `http://localhost:5173`.

---

### Using the app

1. Open `http://localhost:5173`
2. Upload a CSV — use `sample-statement.csv` from the repo root to try it out
3. Wait ~10–15 seconds for Claude to analyze the data
4. View your spending breakdown, charts, and AI insight

---

## Supported CSV format

TD credit card export — columns: `Date, Description, Debit, Credit, Balance` (no header row).
