# Suggested Commands

Since this is a Bun project without defined scripts in `package.json`, use the following commands:

## Running the Server
```bash
bun server.ts
# or
bun run server.ts
```
The server defaults to port 3000 (configurable via `PORT` env var).

## Development
- **Watch mode** (auto-restart on changes):
  ```bash
  bun --watch server.ts
  ```

## Testing
- **Run tests**:
  ```bash
  bun test
  ```

## Linting/Formatting
- No explicit linting/formatting scripts are set up yet.
- Use `bunx prettier --write .` for formatting if needed.
