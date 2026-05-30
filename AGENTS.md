# AGENTS.md

## Project

`apihz-cli` — CLI for apihz.cn API marketplace. Entrypoint: `bin/apihz-cli.js` → `require('../dist/index')`.
Build: `npm run build` (= `tsc`, outputs to `dist/` from `src/`).
No test framework or linting exists in this repo.
Runtime dep: `commander`. Dev: `typescript`, `@types/node`.

## Architecture

```
src/
├── index.ts           # program.parse(process.argv)
├── program.ts         # decorateProgram(): global opts + register*Commands()
├── bundle.ts          # Re-exports for library consumers (ApihzClient, ConfigManager, formatOutput)
├── api/*.ts           # Domain API classes wrapping ApihzClient (TimeAPI, WeatherAPI, etc.)
├── commands/*.ts      # register*Commands(program) functions (1 per domain + config.ts)
└── utils/
    ├── config.ts      # ConfigManager → ~/.apihz/config.json
    ├── output.ts      # formatOutput(data, pretty?) → JSON string
    └── http.ts        # ApihzClient — config resolution, get()
```

## Key Patterns

- **Command handler**: `action(function(this: Command) { const opts = this.optsWithGlobals(); ... })`
  - Alternative pattern for subcommands with options: `action(async (options, command) => { const opts = command.optsWithGlobals(); ... })`
- **Config priority**: CLI flags (`--id`, `--key`) → env vars (`APIHZ_ID`, `APIHZ_KEY`) → `~/.apihz/config.json`
- **Output**: `formatOutput(data)` = `JSON.stringify(data, null, 2)`. Has a second `pretty` param (default true) but no command currently uses it.
- **Error format**: `console.error(err.message); process.exit(1)` — all commands catch
- **Auth**: All apihz.cn APIs require `id` + `key` as query params. ApihzClient injects them automatically.
- **VIP line**: Pass `--vip` global option or `config set --vip`. Switches base URL from `https://cn.apihz.cn` to `https://vip.apihz.cn`.
- **Param filtering**: `ApihzClient.get()` auto-strips `undefined`, `null`, and `''` values from query params. You don't need to guard optional params.

## Global Options (program.ts)

- `--id <id>`, `--key <key>`, `--vip`, `--raw`
- `--raw` is declared but **not wired** to any command — `formatOutput` is always called without the second `pretty` arg. If you wire `--raw`, pass `!opts.raw` as the second argument.

## Adding a Command

1. Create `src/api/<domain>.ts` with an API class wrapping ApihzClient
2. Create `src/commands/<domain>.ts` exporting `register<Domain>Commands(program)`
3. Re-export from `src/commands/index.ts`
4. Import and call in `src/program.ts:decorateProgram()`

## Unit Conversion API Quirk

Some unit conversion APIs expect Chinese unit names (e.g. `米秒` for m/s) rather than English symbols (`km/h`). The server validates unit name length and rejects >2 Chinese characters. Use the Chinese short form from the API docs.
