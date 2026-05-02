# StatementLens — Concepts Log

Running list of concepts introduced during the build. Review these before each session.

---

## Java & Spring Boot Fundamentals

### Why Spring exists
Java EE required massive boilerplate to wire up even basic applications. Spring removed that by handling dependency injection — you declare what your class needs, Spring provides it.

### Why Spring Boot exists
Spring itself became boilerplate (especially XML config). Spring Boot introduced **convention over configuration** — it looks at your classpath, makes sensible defaults, and auto-configures everything. That's why it's called "Boot" — it bootstraps the app for you.

### @SpringBootApplication
Bundles three annotations:
- `@SpringBootConfiguration` — marks this as a config class
- `@EnableAutoConfiguration` — triggers the auto-setup
- `@ComponentScan` — tells Spring to scan this package for components (controllers, services, etc.)

### MVC + Layers
| Layer | Responsibility | Our project |
|---|---|---|
| Controller | Receives HTTP requests, returns responses | `AnalyzeController.java` |
| Service | Business logic | `CsvParserService`, `CategorizationService`, etc. |
| Repository | Talks to the database (reads/writes) | Not used — we're stateless |
| Model | Plain data class (fields only) | `Transaction.java` |
| View | Renders the UI | React handles this — backend returns JSON |

**Key distinction:** Logic lives in the Service, not the Controller. The Controller just routes.

### Repository vs ORM
Same concept as Django ORM — abstracts database access. In Spring: Spring Data JPA + `JpaRepository`. We don't use it in this project because there's no database.

### XML in old Spring
Like `tsconfig.json` but far more verbose — 30+ lines of XML for what would be 5 lines of JSON today. Spring Boot replaced this with auto-configuration and annotations.

---

## Tomcat

The embedded web server bundled inside Spring Boot. It listens for incoming HTTP requests and hands them to your app to handle. You don't install it — it's inside the jar. Spring Boot auto-configures it on port 8080 by default.

Analogy: Tomcat is the door, your Spring app is what's inside the house.

### 404 vs Connection Refused
- **404** — server is running, no route matched the request
- **Connection refused** — server isn't running at all

## Java Package Naming

Packages follow reverse domain convention to avoid naming collisions:
- `com.company.project` — commercial/public
- `org.project` — open source
- `io.name.project` — private/startup

Example: `com.statementlens.statementlens` → abbreviated in logs as `c.s.s`

## Beans

A bean is any object that Spring creates and manages for you. Instead of `new MyClass()`, you annotate the class and Spring instantiates it, wires it up, and keeps it alive for the life of the app. Controllers, services, and config classes are all beans.

## @Configuration

Tells Spring "this class contains setup instructions." Spring scans for it at startup and runs it when building the application context. Not compile time — startup time.

## CORS — Cross Origin Resource Sharing

A browser security feature that blocks responses from being read if the server hasn't explicitly allowed that origin. Two different ports = two different origins (e.g. React on `:5173`, Spring on `:8080`). Without CORS config, the browser blocks React from reading the Spring response.

The server must declare which origins it allows — that's what `CorsConfig.java` does.

## application.properties — Environment Variables

```properties
anthropic.api.key=${ANTHROPIC_API_KEY:}
```

Reads from an OS environment variable called `ANTHROPIC_API_KEY`. The `:` at the end means "default to empty string if not set" — same concept as `??` (null coalescing) in TypeScript. Never hardcode API keys — always read from env vars.

## Java interfaces and implements

An interface is a contract — a list of method signatures with no implementation (like a header file in C). A class uses `implements` to agree to fulfill that contract. `WebMvcConfigurer` has ~15 default empty methods — we only override `addCorsMappings()`, the rest do nothing.

## @Override

Tells the compiler you're intentionally replacing a method from an interface or parent class. If you misspell the method name, the compiler catches it instead of silently creating a new unrelated method.

## Checked exceptions — throws IOException

Java forces you to acknowledge that certain operations can fail. File/stream operations throw `IOException`. You must either catch it with try/catch or declare `throws IOException` on the method signature.

## Lombok @Data

Annotation that tells Lombok (hooks into the compiler) to generate getters, setters, `equals`, `hashCode`, and `toString` for every field at compile time. You never see the generated code but it's in the bytecode.

## Apache Commons CSV

Library for parsing CSV files:
- `CSVFormat.DEFAULT.builder().setHeader().setSkipHeaderRecord(true).build()` — treats first row as column names
- `record.get("ColumnName")` — access values by header name, not index
- All values come out as `String` — must parse manually

## MultipartFile

Spring's wrapper for files uploaded via HTTP multipart requests. The whole file, not a piece. `file.getInputStream()` gives the raw byte stream.

## Type conversion from CSV strings

CSV has no types — everything is a string. Convert manually:
- Date: `LocalDate.parse("2024-03-15")`
- Decimal: `Double.parseDouble("42.50")`

## Builder pattern

Constructing objects step by step via chained method calls. Each method returns the builder so you keep chaining, then `.build()` creates the final object.

## HTTP methods

- **GET** — read data
- **POST** — create / send data
- **PUT** — replace entire resource
- **PATCH** — update only the fields you send
- **DELETE** — remove resource

---

## Review — Start Next Session With These

Questions the user didn't answer or got wrong last session (2026-05-01):

- What did Spring Boot specifically add on top of plain Spring? (auto-configuration + convention over configuration — not the Initializr options)
- What does `@Override` do? (safety annotation — compiler catches misspelled method names)
- What is CORS? (Cross Origin Resource **Sharing** — about origins/domain+port, not endpoints)
- What is the builder pattern?
- Finish set 4 questions (stopped at Q2)

---

## Quick-Fire Review Questions

1. Why does Spring exist? What problem did it solve?
2. What did Spring Boot add on top of Spring?
3. What does `@EnableAutoConfiguration` do?
4. What are the three annotations inside `@SpringBootApplication`?
5. Where does business logic live — Controller or Service?
6. What does the Repository layer do? Why don't we have one?
7. What is "convention over configuration"?
8. What is Tomcat and why don't you have to install it separately?
9. What's the difference between a 404 and a connection refused error?
10. What is a bean?
11. What does `@Configuration` tell Spring?
12. What is CORS and why does it matter for our project?
13. What does the `:` in `${ANTHROPIC_API_KEY:}` do?
14. Why do Java packages start with `com`?
15. What is an interface and what does `implements` mean?
16. What does `@Override` do and why use it?
17. What is a checked exception? Why does `parse()` need `throws IOException`?
18. What does `@Data` generate and what reads the annotation?
19. What is `MultipartFile`?
20. Why do you need `Double.parseDouble()` when reading from a CSV?
21. What is the builder pattern?
22. What's the difference between PUT and PATCH?
