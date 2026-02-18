# WhileUI Native

> **shadcn/ui for React Native** — Copy-paste components you own.

Beautiful, accessible, themeable React Native components built with [Uniwind](https://uniwind.dev) + Tailwind CSS v4. Inspired by [shadcn/ui](https://ui.shadcn.com/).

## Philosophy

- **Copy-Paste Ownership** — Components live in _your_ project. No `node_modules` lock-in.
- **Beautiful by Default** — OKLCH color system, light/dark themes, polished out of the box.
- **Fully Customizable** — Every component uses `tv()` variants and accepts `className` overrides.
- **Accessible** — Proper ARIA roles, keyboard support, controlled/uncontrolled state.

## Components

| Component     | Variants                                              | Notes                                                                           |
| ------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------- |
| **Button**    | default, destructive, outline, secondary, ghost, link | 4 sizes, ButtonText & ButtonIcon sub-components                                 |
| **Card**      | —                                                     | Compound: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter |
| **Input**     | default, error                                        | TextInput wrapper with themed styling                                           |
| **Badge**     | default, secondary, destructive, outline, success     | BadgeText sub-component                                                         |
| **Alert**     | default, destructive, success, warning                | AlertTitle & AlertDescription                                                   |
| **Switch**    | —                                                     | Controlled/uncontrolled, accessibility roles                                    |
| **Checkbox**  | —                                                     | Controlled/uncontrolled, accessibility roles                                    |
| **Label**     | —                                                     | Form field label                                                                |
| **Separator** | horizontal, vertical                                  | Themed divider                                                                  |
| **Progress**  | sm, default, lg                                       | Value-based progress bar with accessibility                                     |
| **Spinner**   | sm, default, lg                                       | ActivityIndicator wrapper                                                       |

## Quick Start

```bash
# Install dependencies
pnpm install

# Run the showcase app
cd apps/showcase
npx expo start
```

## Project Structure

```
whileui/
├── packages/
│   └── ui/
│       └── src/
│           ├── components/    # All components (copy these!)
│           │   ├── button/
│           │   ├── card/
│           │   ├── input/
│           │   └── ...
│           ├── lib/           # Utilities
│           │   ├── cn.ts      # clsx + tailwind-merge
│           │   └── tv.ts      # tailwind-variants re-export
│           └── index.ts       # Barrel export
├── apps/
│   └── showcase/              # Expo demo app
│       ├── App.tsx            # Component showcase
│       ├── metro.config.js    # Uniwind + monorepo config
│       └── src/global.css     # Theme variables (OKLCH)
└── package.json               # pnpm monorepo root
```

## Theming

Themes are defined in `global.css` using CSS variables with OKLCH colors:

```css
@variant light {
  --color-primary: oklch(0.6 0.2 160);
  --color-background: oklch(1 0 0);
  /* ... */
}

@variant dark {
  --color-primary: oklch(0.6 0.2 160);
  --color-background: oklch(0.145 0 0);
  /* ... */
}
```

Switch themes at runtime via Uniwind:

```tsx
import { Uniwind } from 'uniwind';

Uniwind.setTheme('dark'); // or 'light' or 'system'
```

## Using Components

Copy any component folder from `packages/ui/src/components/` into your project:

```tsx
import { cn } from './lib/cn';
import { tv, type VariantProps } from './lib/tv';

// Use the component with className overrides
<Button className="mt-4">
  <ButtonText>Get Started</ButtonText>
</Button>;
```

## Tech Stack

- **Styling**: [Uniwind](https://uniwind.dev) (free tier) + Tailwind CSS v4
- **Variants**: [tailwind-variants](https://www.tailwind-variants.org/) (`tv()`)
- **Merging**: [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge)
- **Expo**: SDK 54
- **Monorepo**: pnpm + Turborepo

## License

MIT
