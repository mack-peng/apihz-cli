# AGENTS.md

## Project

`apihz-cli` — CLI for apihz.cn API marketplace. Entrypoint: `bin/apihz-cli.js` → `require('../dist/index')`.  
Build: `npm run build` (= `tsc`).  
No test framework exists in this repo.  
Single dependency: `commander`. Dev: `typescript`, `@types/node`.

## Architecture

```
src/
├── index.ts           # program.parse(process.argv)
├── program.ts         # decorateProgram(): global opts + register*Commands()
├── bundle.ts          # Re-exports for library consumers
├── api/*.ts           # Domain API classes (TimeAPI, WeatherAPI, etc.)
├── commands/*.ts      # register*Commands(program) functions
└── utils/
    ├── config.ts      # ConfigManager → ~/.apihz/config.json
    ├── output.ts      # formatOutput() = JSON.stringify(data, null, 2)
    └── http.ts        # ApihzClient — config resolution, get()
```

## Key Patterns

- **Command handler**: `action(function(this: Command) { const opts = this.optsWithGlobals(); ... })`
- **Config priority**: CLI flags (`--id`, `--key`) → env vars (`APIHZ_ID`, `APIHZ_KEY`) → `~/.apihz/config.json`
- **Output**: `formatOutput(data)` = `JSON.stringify(data, null, 2)`
- **Error format**: `console.error(err.message); process.exit(1)` — all commands catch
- **Auth**: All apihz.cn APIs require `id` + `key` as query params. ApihzClient injects them automatically.
- **VIP line**: Pass `--vip` global option or `config set --vip`. Switches base URL from `https://cn.apihz.cn` to `https://vip.apihz.cn`.

## Adding a Command

1. Create `src/api/<domain>.ts` with an API class wrapping ApihzClient
2. Create `src/commands/<domain>.ts` exporting `register<Domain>Commands(program)`
3. Re-export from `src/commands/index.ts`
4. Import and call in `src/program.ts`

## Unit Conversion API Quirk

Some unit conversion APIs expect Chinese unit names (e.g. `米秒` for m/s) rather than English symbols (`km/h`). The server validates unit name length and rejects >2 Chinese characters. Users should use the Chinese short form from the API docs.
