# Agent Rules — WhileUI Native

## Core Rules

- Use **latest stable versions** of packages. Ask if unsure.
- Run `pnpm format && pnpm tsc --noEmit` after changes. Fix errors before completing.
- Update `README.md` when adding/removing features.
- Don't bloat the codebase.

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

## Self-Improvement

Add to this file when you discover:

- Configuration gotchas (one-liner under relevant section)
- Reusable patterns (with minimal code example)
- Root causes of bugs (symptom → cause → fix)

**Keep entries concise. Consolidate similar issues. Delete outdated rules.**
