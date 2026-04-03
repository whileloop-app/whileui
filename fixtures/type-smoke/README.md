# Type Smoke Fixture

Compiles against the built WhileUI package output (`packages/ui/dist`) to validate
consumer typings for `children` and `className`.

## Run

```bash
bun run build --filter @thewhileloop/whileui
bunx tsc -p fixtures/type-smoke/tsconfig.json --noEmit
```
