# `tests`

Unit tests, run with:

```bash
pnpm test
```

## tests we have
| File             | What it checks                                                                                                                                        |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `events.test.ts` | `splitEvents` keeps an event "Upcoming" for its whole day in Melbourne and moves it to "Past" once that day ends, even though the server runs in UTC. |

## adding a test

1. Create `tests/<name>.test.ts`. `pnpm test` runs every `*.test.ts` in this folder and its subfolders.
2. Import the code with a relative path and the `.ts` extension, e.g. `import { splitEvents } from "../src/lib/events.ts";`. Node needs the extension, and `tsconfig.json` allows it.
3. Use `test("what should happen", () => { ... })` with `assert` from `node:assert/strict`.

Need to add more tests