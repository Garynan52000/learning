# Code Conventions

## Language & Runtime
- **TypeScript**: Strict mode enabled (`strict: true`).
- **Bun**: Used for runtime, file I/O, and HTTP server.

## Structure
- `server.ts`: Entry point.
- `src/routes/`: Route handlers (`alt.ts`, `describe.ts`, `health.ts`).
- `src/ocr.ts`: Tesseract.js wrapper.
- `src/ollama.ts`: Ollama API wrapper.
- `src/store/`: Simple caching (in-memory).
- `src/types.ts`: Type definitions.

## Patterns
- **Env Vars**: Loaded in `src/config.ts`.
- **API Response**: JSON format.
- **Error Handling**: Try-catch blocks in route handlers, returning appropriate HTTP status codes.
- **Imports**: ESM syntax with explicit extensions (e.g., `import ... from "./types"`).
