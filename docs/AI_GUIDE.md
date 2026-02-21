# AI Guide — WhileUI

This guide helps AI systems (and developers) quickly discover, compose, and deploy apps using WhileUI.

---

## Quick Reference

| Resource                              | Purpose                                                           |
| ------------------------------------- | ----------------------------------------------------------------- |
| [BLOCKS.md](../BLOCKS.md)             | Block catalog with props, tags, and composition order             |
| [docs/BLUEPRINTS.md](./BLUEPRINTS.md) | Pre-defined flow patterns (auth, settings, e-commerce, app shell) |
| [README.md](../README.md)             | Installation, components, API reference                           |
| [AGENTS.md](../AGENTS.md)             | Rules for theming, patterns, and conventions                      |

---

## Discovery

### Finding Blocks

1. **By domain:** Check `BLOCKS.md` — blocks are grouped by Auth, Navigation, Layout, Profile, Lists, Commerce, Splash, Media.
2. **By tag:** Blocks have tags (e.g. `auth`, `form`, `layout`). Use tags to find related blocks.
3. **By import:** All blocks export from `@thewhileloop/whileui`:

```tsx
import {
  SignInForm,
  AppShell,
  Header,
  BottomNav,
  ProductCard,
  CheckoutSummary,
  // ...
} from '@thewhileloop/whileui';
```

### Finding Components

- **Primitives:** `Text`, `View`, `Pressable`, `Stack`, `Row`, `Box`
- **Form controls:** `Button`, `Input`, `Checkbox`, `Switch`, `Select`, etc.
- **Display:** `Card`, `Badge`, `Alert`, `Avatar`, `DataRow`, etc.
- **Overlays:** `Dialog`, `AlertDialog`, `Popover`, `DropdownMenu`, etc.

See README "Components" section for the full table.

---

## Composition Patterns

1. **Full-screen:** Use `AppShell` as the outermost wrapper. Put `Header` in `header`, `BottomNav` in `bottomNav`, and content in `children`.
2. **Forms:** Auth blocks (`SignInForm`, `SignUpForm`, etc.) accept callback props. Wire `onSubmit`, `onForgotPassword`, `onSignUp`, etc. to your auth logic and navigation.
3. **Layout:** Use `Stack` for vertical layout, `Row` for horizontal. Both support `gap`, `align`, `justify`.
4. **Modals:** Use `FormModalScreen` for form modals with loading/saving states.
5. **Lists:** Use `ListItem`, `NotificationItem`, `SwipeableItem`, `TimelineFeed` for list UIs.

---

## Block Callbacks (Auth)

Auth blocks are **callback-driven**. Wire these to your auth service and router:

| Block              | Key callbacks                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------------- |
| SignInForm         | `onSubmit({ email, password })`, `onForgotPassword`, `onSignUp`, `onGooglePress`, `onApplePress`  |
| SignUpForm         | `onSubmit({ firstName, lastName, email, password })`, `onSignIn`, `onGooglePress`, `onApplePress` |
| ForgotPasswordForm | `onSubmit({ email })`, `onBackToSignIn`                                                           |
| VerifyEmailForm    | `onSubmit({ code })`, `onResend`                                                                  |
| ResetPasswordForm  | `onSubmit({ password, confirmPassword })`                                                         |
| UserMenu           | `onSelect(key)` — keys: profile, billing, settings, new-team, logout                              |

---

## Blueprints

Use blueprints when building common flows:

- **Auth flow:** SignIn → SignUp → ForgotPassword → VerifyEmail → ResetPassword. See [BLUEPRINTS.md](./BLUEPRINTS.md#auth-flow-blueprint).
- **Settings flow:** ProfileHeader + SettingsSection + SettingsItem. See [BLUEPRINTS.md](./BLUEPRINTS.md#settings-flow-blueprint).
- **E-commerce flow:** ProductCard list → Product detail → CheckoutSummary + ActionBar. See [BLUEPRINTS.md](./BLUEPRINTS.md#e-commerce-flow-blueprint).
- **App shell:** AppShell + Header + BottomNav. See [BLUEPRINTS.md](./BLUEPRINTS.md#app-shell-blueprint).

---

## Conventions (from AGENTS.md)

- **Theming:** Use semantic classes (`bg-background`, `text-foreground`). Theme via `global.css` and `Uniwind.setTheme()`.
- **Touch targets:** Minimum 44px. Icon-only buttons: `h-11 w-11`.
- **Layout shift:** Avoid toggling font-weight for active states. Use color differentiation.
- **Variant API:** Components use `tv()` and export `*Variants` for extension.
- **Text children:** Components accepting children handle both strings and elements (wrap strings in `<Text>`).

---

## Common Mistakes to Avoid

1. **Auth blocks:** Do not assume `onSubmit` receives `(email, password)` as separate args. It receives `{ email, password }` (SignInForm) or `{ firstName, lastName, email, password }` (SignUpForm).
2. **README vs implementation:** README and BLOCKS.md are the source of truth. If in doubt, check the block's TypeScript interface.
3. **PortalHost:** Add `<PortalHost />` at app root for Select, Popover, Tooltip, HoverCard to work.
4. **Uniwind:** `withUniwindConfig` must wrap metro config. `global.css` must be at app root and imported in App.tsx.

---

## Project Structure

```
whileui/
├── packages/ui/src/
│   ├── components/   # Primitives + UI components
│   ├── blocks/       # Pre-built screens (auth, navigation, layout, etc.)
│   └── lib/          # cn, tv, theme-bridge, etc.
├── apps/
│   ├── starter/     # Minimal template (AppShell + Header + BottomNav)
│   └── showcase/     # Full demo app
├── BLOCKS.md        # Block catalog
├── docs/
│   ├── BLUEPRINTS.md # Flow patterns
│   └── AI_GUIDE.md   # This file
└── README.md
```

---

## Generating Code

When generating WhileUI code:

1. **Import from** `@thewhileloop/whileui`
2. **Use blocks** for screens; use components for custom UI
3. **Wire callbacks** on auth blocks—they are required for functionality
4. **Compose with AppShell** for full-screen layouts
5. **Check BLOCKS.md** for exact prop names and types
6. **Reference BLUEPRINTS.md** for flow structure
