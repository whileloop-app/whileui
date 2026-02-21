# Agent Rules — WhileUI Native

Rules for AI agents and contributors editing this codebase. Follow every rule. No exceptions on docs.

## Core Rules

- Use **latest stable versions** of packages. Ask if unsure.
- Run `bun format && bun typecheck` after changes. Fix errors before completing.
- **Docs are mandatory** — README is the source of truth. Incomplete doc updates = task incomplete. Never leave docs stale.
- **Avoid deprecated APIs** — Check for deprecation warnings, use recommended replacements. If a package marks an API deprecated, find the new import path or alternative.
- Don't bloat the codebase.

## Documentation

**Rule:** When you add, remove, or change a component or block, you MUST update README in the same change. Do not defer. Incomplete doc updates = task incomplete.

**Docs:** README only. Components table, blocks table, API Reference, Flow Patterns, Quick Reference.

**Cross-references:** Fix broken links.

### When Adding a Block (all required)

1. Export from `packages/ui/src/blocks/<category>/index.ts` and `packages/ui/src/index.ts`
2. Add to `README.md` blocks table
3. Add to README Blocks API section with key props
4. Add showcase demo in `apps/showcase/App.tsx`
5. If new flow: add to README Flow Patterns table

**Do not skip steps 2–4.** Missing doc or showcase = incomplete.

### When Adding a Component (all required)

1. Export from `packages/ui/src/components/<name>/index.ts` and `packages/ui/src/index.ts`
2. Add to `README.md` components table
3. Add to README API Reference if notable props
4. Add showcase demo in `apps/showcase/App.tsx`

**Do not skip steps 2–4.**

### When Changing Props or Removing

- **Props:** Update README API section and Blocks API
- **Removing:** Remove from README (all sections), showcase. No orphan references

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
- **Icon colors**: `@expo/vector-icons` requires hex values, not CSS classes. Use `useIconColors()` from the UI package (reads from global.css via `useCSSVariable`)
- **Other RN primitives requiring hex**: ActivityIndicator (Spinner), TextInput's `placeholderTextColor` need hex. Add optional props (`spinnerColor`, `placeholderTextColor`); apps pass hex from theme when theming matters

### Web & Responsive (Sites + Apps)

WhileUI targets both native apps and web. Components should be web-aware by default where behavior differs:

- **Overlays** (DrawerMenu, modals, sheets): Use sensible web defaults (e.g. max-width ~360px for drawers). Add optional `maxWidth` or `width` props for override.
- **Platform.OS**: Use for behavior that truly differs (haptics, native APIs). Guard web-incompatible code (`if (Platform.OS === 'web') return`).
- **useWindowDimensions**: Use for layout breakpoints when width matters (e.g. `width >= 768` for desktop layout).
- **Override props**: Provide `maxWidth`, `width`, etc. so apps can customize. Library has smart defaults; apps opt in to overrides.
- **Uniwind `web:` variant**: Use for platform-specific styling in apps; library may use `Platform.OS` for structural behavior.

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

### Blocks vs components

- **Blocks** = copy-paste compositions. No themeability props needed — people edit the block code directly. Use semantic tokens; theme via `global.css`.
- **Components** = imported dependencies. Must be themeable (semantic classes, `*Variants` for extension).

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
