# Vite Smoke Fixture

This fixture verifies WhileUI web compatibility for portal-driven primitives.

## Coverage

- `PortalHost`
- `Select`
- `Popover`
- `Tooltip`
- `HoverCard`

## Run

```bash
cd fixtures/vite-smoke
bun install
bun run dev
bun run build
```

If Vite parsing fails on rn-primitives `dist/*.mjs`, ensure `vite.config.ts` keeps `withWhileUIViteCompat`.
