# StatementLens — Bank Statement Analyzer

Upload a CSV bank statement, get back categorized spending, trend charts, and an AI-generated analysis driven by an agentic Claude loop via Spring AI + MCP.

**Stack**: Java 21, Spring Boot 4.0.6, Spring AI, React 18 + TypeScript, Tailwind CSS, Recharts

---

## Step-by-Step Build Guide

### Phase 1 — Backend

- [x] **1. Initialize Spring Boot project**
  - Go to https://start.spring.io
  - Project: Maven | Language: Java | Spring Boot: 4.0.6
  - Group: `com.statementlens` | Artifact: `statement-lens`
  - Dependencies: Spring Web
  - Download, unzip into `java_project/backend/`

- [x] **2. Add remaining dependencies to pom.xml**
  - Apache Commons CSV `1.11.0`
  - Spring AI BOM (bill of materials — manages Spring AI dependency versions)
  - Spring AI Anthropic starter (replaces raw Anthropic SDK)
  - Spring AI MCP server starter
  - Lombok

- [x] **3. Configure application.properties**
  - Set multipart max file size to `10MB`
  - Add `spring.ai.anthropic.api-key=${ANTHROPIC_API_KEY:}` (Spring AI reads this automatically)
  - Add `spring.ai.anthropic.chat.model=claude-sonnet-4-6`

- [x] **4. Add CORS config**
  - Create `config/CorsConfig.java`
  - Allow origin `http://localhost:5173` (Vite default) on `/api/**`

- [x] **5. Create the Transaction model**
  - Create `model/Transaction.java`
  - Fields: `date` (LocalDate), `description` (String), `amount` (double), `category` (String)

- [x] **6. Build the CSV parser**
  - Create `service/CsvParserService.java`
  - Accept a `MultipartFile`, read with Apache Commons CSV
  - Detect columns by header name (handle Chase format: `Transaction Date`, `Description`, `Amount`)
  - Normalize amount sign (negative = debit/expense, positive = income)
  - Return `List<Transaction>`

- [ ] **7. Build the categorization engine**
  - Create `service/CategorizationService.java`
  - Keyword map (case-insensitive description matching):
    - Dining: `restaurant, mcdonald, starbucks, doordash, uber eats, grubhub`
    - Transport: `uber, lyft, parking, gas, shell, bp, exxon`
    - Groceries: `walmart, kroger, whole foods, trader joe, aldi, publix`
    - Subscriptions: `netflix, spotify, amazon prime, hulu, apple, youtube`
    - Utilities: `electric, water, internet, at&t, verizon, t-mobile, comcast`
    - Other: fallback
  - Takes a `Transaction`, sets its `category` field, returns it

- [ ] **8. Build the aggregation service**
  - Create `service/AggregationService.java`
  - Takes `List<Transaction>`, computes:
    - `totalIncome` and `totalExpenses`
    - `byCategory`: list of `{category, total, count}`
    - `byMonth`: list of `{month, income, expenses}` (group by year-month)
    - `topMerchants`: top 5 descriptions by total spend

- [ ] **9. Create the AnalysisResult DTO**
  - Create `dto/AnalysisResult.java`
  - Fields: `totalIncome`, `totalExpenses`, `byCategory`, `byMonth`, `topMerchants`, `aiInsight`

- [ ] **10. Expose analysis functions as MCP tools**
  - Create `tools/AnalysisTools.java`
  - Annotate methods with `@Tool` (Spring AI picks these up automatically)
  - Tools to expose:
    - `getSpendingByCategory()` — returns category totals
    - `getTopMerchants()` — returns top 5 merchants
    - `getMonthlyTrend()` — returns month-by-month breakdown
    - `getOverallSummary()` — returns total income, expenses, net
  - Store the current `AnalysisResult` in a request-scoped bean so tools can read it

- [ ] **11. Build the agentic insight service**
  - Create `service/InsightService.java`
  - Use Spring AI `ChatClient` to start a conversation with Claude
  - Register the `AnalysisTools` with the client
  - Send an initial prompt: "You have tools to explore a user's bank statement. Analyze their spending and produce a concise, useful insight."
  - Claude will call tools in a loop, reason about results, and return a final answer when done
  - This is the agentic cycle — Claude decides what to query, not you
  - Wrap in try/catch — return `null` if it fails

- [ ] **12. Create the controller**
  - Create `controller/AnalyzeController.java`
  - `POST /api/analyze` — accepts `MultipartFile`, runs parse → categorize → aggregate → insight, returns `AnalysisResult`
  - `GET /api/health` — returns 200

- [ ] **13. Test the backend**
  - Export a real CSV from your bank
  - Run the app (`.\mvnw.cmd spring-boot:run`)
  - Hit `POST /api/analyze` via curl or Postman with the CSV
  - Watch the logs — you should see Claude making multiple tool calls before returning the insight

---

### Phase 2 — Frontend

- [ ] **14. Initialize React project**
  - `npm create vite@latest frontend -- --template react-ts`
  - `cd frontend && npm install`
  - Install: `tailwindcss`, `recharts`, `axios`, `@tanstack/react-query`
  - Set up Tailwind (`npx tailwindcss init -p`, configure `content` paths)

- [ ] **15. Set up Axios + React Query**
  - Create `src/api/analyze.ts`
  - Export a function that posts a `FormData` file to `/api/analyze` and returns `AnalysisResult`
  - Set Axios base URL to `http://localhost:8080`

- [ ] **16. Define TypeScript types**
  - Create `src/types/index.ts`
  - Mirror the `AnalysisResult` DTO shape exactly

- [ ] **17. Build the file upload component**
  - Create `src/components/UploadZone.tsx`
  - Drag-and-drop area (use `onDragOver` / `onDrop`) plus a click-to-browse fallback
  - On file select, call the analyze API and show a spinner while waiting
  - On success, lift the result up to the parent via a callback prop

- [ ] **18. Build the summary cards**
  - Create `src/components/SummaryCards.tsx`
  - 4 cards: Total Income, Total Expenses, Net, Top Category
  - Style with Tailwind

- [ ] **19. Build the pie chart**
  - Create `src/components/SpendingPie.tsx`
  - Use Recharts `PieChart` + `Pie` + `Tooltip` + `Legend`
  - Data: `byCategory` from the result

- [ ] **20. Build the bar chart**
  - Create `src/components/MonthlyBar.tsx`
  - Use Recharts `BarChart` with two bars: income and expenses
  - Data: `byMonth` from the result

- [ ] **21. Build the top merchants table**
  - Create `src/components/MerchantsTable.tsx`
  - Simple table: Merchant | Total | Transactions
  - Data: `topMerchants` from the result

- [ ] **22. Build the AI insight block**
  - Create `src/components/AiInsight.tsx`
  - Styled text block showing `aiInsight`
  - Render nothing if `aiInsight` is null

- [ ] **23. Wire everything together in App.tsx**
  - State: `result` (AnalysisResult | null)
  - If no result: show `UploadZone`
  - If result: show all components + a "Analyze another" button that resets state

---

### Phase 3 — Polish & Ship

- [ ] **24. Add a Docker Compose file**
  - `docker-compose.yml` at project root
  - Two services: `backend` and `frontend`
  - Pass `ANTHROPIC_API_KEY` as an environment variable to the backend

- [ ] **25. Write the README**
  - What it does (2–3 sentences)
  - Note on MCP + agentic loop (this is the talking point)
  - Supported CSV formats (Chase, generic)
  - Setup instructions (Docker Compose or manual)
  - Screenshot of the UI

- [ ] **26. Create a GitHub repo and push**
  - `git init` in `java_project/`
  - Add `.gitignore` (ignore `target/`, `node_modules/`, `.env`)
  - First commit and push to GitHub

- [ ] **27. Record and commit the demo video**
  - Record a screen capture (mp4) showing: upload a CSV → results appear → charts render → AI insight shows
  - Keep it under 2 minutes
  - Add to repo root as `demo.mp4`
  - Commit and push
