# Agent Rules — WhileUI Native

Guide for AI agents and contributors. Follow these conventions when editing the codebase.

## Core Rules

- Use **latest stable versions** of packages. Ask if unsure.
- Run `pnpm format && pnpm typecheck` after changes. Fix errors before completing.
- **Keep `README.md` current** — Update component tables and blocks list when adding/removing features. README is the source of truth for users.
- **Keep `docs/` current** — Update docs when blocks, flows, or discovery patterns change. See [Documentation](#documentation) below.
- **Avoid deprecated APIs** — Check for deprecation warnings, use recommended replacements. If a package marks an API deprecated, find the new import path or alternative.
- Don't bloat the codebase.

## Documentation

When adding/removing blocks, components, or flows, update the relevant docs. Keep cross-references accurate.

| File                 | Update when                                                                                  |
| -------------------- | -------------------------------------------------------------------------------------------- |
| `README.md`          | New/removed components, blocks, installation steps, API changes                              |
| `BLOCKS.md`          | New/removed blocks, prop changes, tags, composition order                                    |
| `docs/BLUEPRINTS.md` | New flow patterns, screen mappings, callback changes, block references in flows              |
| `docs/AI_GUIDE.md`   | Discovery patterns, composition patterns, doc structure, block groups, Quick Reference table |
| `AI_README.md`       | Entry-point links; update if doc structure or filenames change                               |

**Rules:** README and BLOCKS.md are source of truth for users. AI_GUIDE.md points to them—fix broken links. Blueprints reference BLOCKS.md for prop details.

### When Adding New Blocks

1. Export from `packages/ui/src/blocks/<category>/index.ts` and `packages/ui/src/index.ts`
2. Add to `BLOCKS.md` with props, types, and tags
3. Add to `README.md` blocks table
4. Add showcase demo in `apps/showcase/App.tsx` (or relevant tab)
5. If it's a new flow pattern, add a blueprint in `docs/BLUEPRINTS.md`

## Uniwind Configuration

- `global.css` at **app root** (not `src/`) — Tailwind scans from its location
- `withUniwindConfig` must be **outermost** wrapper in `metro.config.js`
- Import `global.css` in `App.tsx` (not `index.ts`) for HMR
- `cssEntryFile` must be **relative path string** (`'./global.css'`)
- Monorepos: use `@source '../../packages/ui/src';` in CSS
- Docs: https://docs.uniwind.dev/llms-full.txt

## Theme System

- Use `useUniwind()` + `Uniwind.setTheme()` — NOT local React state
- Components use semantic classes (`bg-background`, `text-foreground`) — no theme code in UI library
- Custom themes: register in `metro.config.js` with `extraThemes`, define in `global.css` using `@variant`
- **OKLCH color format**: Use `oklch(L C H)` for all color values (better perceptual uniformity)
- Theme colors MUST be wrapped in `@layer theme { :root { @variant light/dark { ... } } }`

### Design Tokens (in `@theme` block of `global.css`)

All visual properties are controlled via design tokens. To redesign the theme, modify `global.css` only — no component changes needed.

| Token Category     | Example Variables                                     | Controls                                 |
| ------------------ | ----------------------------------------------------- | ---------------------------------------- |
| **Spacing**        | `--spacing`, `--spacing-1` through `--spacing-96`     | `p-*`, `m-*`, `gap-*`, `w-*`, `h-*`      |
| **Typography**     | `--text-xs` through `--text-6xl`                      | `text-sm`, `text-base`, `text-xl`, etc.  |
| **Letter Spacing** | `--tracking-tighter` through `--tracking-widest`      | `tracking-tight`, `tracking-wide`        |
| **Line Height**    | `--leading-none` through `--leading-loose`            | `leading-none`, `leading-tight`          |
| **Border Radius**  | `--radius-none` through `--radius-full`               | `rounded-sm`, `rounded-lg`, `rounded-xl` |
| **Shadows**        | `--shadow-sm` through `--shadow-2xl`, `--shadow-none` | `shadow-sm`, `shadow-lg`, `shadow-xl`    |
| **Font**           | `--font-sans`                                         | Base font family                         |

### Theme Color Tokens (per `@variant`)

Required in both `light` and `dark` (and any custom theme):

- `background`, `foreground`, `card`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`
- `success`, `warning`, `info` (status colors)
- Each token needs `*-foreground` variant for text on that background

### Font Weight Mapping

React Native requires explicit font-family per weight. When changing fonts, update BOTH `--font-sans` in `@theme` AND the `.font-*` CSS classes in `global.css`.

## Component Patterns

### Variant API with tv()

All components use `tailwind-variants` for styling:

```tsx
const buttonVariants = tv({
  base: 'rounded-md font-medium',
  variants: {
    variant: { default: 'bg-primary', outline: 'border' },
    size: { sm: 'h-8', md: 'h-10' },
  },
  defaultVariants: { variant: 'default', size: 'md' },
});
```

Export `*Variants` for consumers who want to extend styles.

### Text Children Handling

Components accepting children must handle both strings and elements:

```tsx
{
  typeof children === 'string' ? <Text className="...">{children}</Text> : children;
}
```

Applies to: AvatarFallback, DropdownMenuLabel, AlertDialogAction/Cancel, etc.

### Context-Based Variant Inheritance

Parent components (Button, Badge, Toggle) provide Context so child text components auto-inherit `variant`:

```tsx
const ButtonContext = createContext({ variant: 'default', size: 'default' });
// ButtonText uses useContext(ButtonContext)
```

### asChild Gotchas

- `cloneElement` doesn't work with complex components (Context.Provider wrappers)
- Don't use `asChild` with `View` — it lacks `onPress`/`onLongPress`
- Prefer wrapping children in Pressable over cloneElement injection

### React Native Limitations

- SafeAreaView: use `react-native-safe-area-context` (RN's deprecated)
- **CSS box-shadow**: Not supported. Use `shadow-sm/md/lg` classes (soft shadows) or stacked Views for hard-edge 3D effects (NeoPOP style)
- **Icon colors**: `@expo/vector-icons` requires hex values, not CSS classes. Use a `useIconColors()` hook that reacts to theme changes

## UI Standards

- Overlays (Dialog, Popover, Menus): `rounded-lg`
- Controls (Button, Input, Select): `h-10`
- Cards: `rounded-xl`

### Touch Targets (Fitts's Law)

- **Minimum 44px** for mobile touch targets — even if visually smaller
- Icon-only buttons: `h-11 w-11` (44px)
- Small buttons: `h-9` minimum (36px visual, use `hitSlop` if needed)

### Preventing Layout Shift

- **Never toggle font-weight** for active/inactive states — causes width jump
- Use **color-only differentiation** (e.g., `text-primary` vs `text-muted-foreground`)
- Keep `font-medium` constant across states

### Press Feedback

- Always provide tactile feedback on interactive elements
- Buttons: `active:bg-*/90` (slight darken)
- Nav items: `active:opacity-70`
- Floating elements: `active:scale-95`

## Self-Improvement

Add to this file when you discover:

- Configuration gotchas (one-liner under relevant section)
- Reusable patterns (with minimal code example)
- Root causes of bugs (symptom → cause → fix)

**Keep entries concise. Consolidate similar issues. Delete outdated rules.**

## Custom Themes (Starter Kits)

Create reusable theme presets that can be switched at runtime:

### 1. Register in metro.config.js

```js
// metro.config.js
module.exports = withUniwindConfig(config, {
  cssEntryFile: './global.css',
  extraThemes: ['noir', 'minimalist', 'brand-accent'],
});
```

### 2. Define theme in global.css

```css
@layer theme {
  :root.noir,
  .noir {
    @variant light {
      --color-background: oklch(1 0 0);
      --color-foreground: oklch(0 0 0);
      --color-primary: oklch(0 0 0);
      /* ... other variables */
      --radius-sm: 0px;
      --radius-md: 0px;
    }
    @variant dark {
      /* dark mode variables */
    }
  }
}
```

### 3. Switch at runtime

```tsx
import { Uniwind } from 'uniwind';

// Switch to custom theme
Uniwind.setTheme('noir');

// Switch back to default light/dark
Uniwind.setTheme('light');
Uniwind.setTheme('dark');
```

### Required Theme Variables

All themes must define these variables for components to work:

- `--color-background`, `--color-foreground`
- `--color-card`, `--color-card-foreground`
- `--color-primary`, `--color-primary-foreground`
- `--color-secondary`, `--color-secondary-foreground`
- `--color-accent`, `--color-accent-foreground`
- `--color-muted`, `--color-muted-foreground`
- `--color-destructive`, `--color-destructive-foreground`
- `--color-border`, `--color-input`, `--color-ring`
- `--color-success`, `--color-success-foreground`
- `--color-warning`, `--color-warning-foreground`
- `--color-info`, `--color-info-foreground`
- `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`
