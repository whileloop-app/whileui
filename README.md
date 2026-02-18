# WhileUI Native

> **shadcn/ui for React Native** — Copy-paste components you own.

Beautiful, accessible, themeable React Native components built with [Uniwind](https://uniwind.dev) + Tailwind CSS v4. Inspired by [shadcn/ui](https://ui.shadcn.com/).

## Philosophy

- **Copy-Paste Ownership** — Components live in _your_ project. No `node_modules` lock-in.
- **Beautiful by Default** — OKLCH color system, light/dark themes, polished out of the box.
- **Fully Customizable** — Every component uses `tv()` variants and accepts `className` overrides.
- **Accessible** — Proper ARIA roles, keyboard support, controlled/uncontrolled state.

## Components

### Primitives

| Component     | Notes                            |
| ------------- | -------------------------------- |
| **Text**      | Themed text with variant support |
| **View**      | Themed view wrapper              |
| **Pressable** | Themed pressable wrapper         |

### Form Controls

| Component       | Variants                                              | Notes                                                 |
| --------------- | ----------------------------------------------------- | ----------------------------------------------------- |
| **Button**      | default, destructive, outline, secondary, ghost, link | 4 sizes, ButtonText & ButtonIcon sub-components       |
| **Input**       | default, error                                        | TextInput wrapper with themed styling                 |
| **Textarea**    | —                                                     | Multi-line text input                                 |
| **Checkbox**    | —                                                     | Controlled/uncontrolled, accessibility roles          |
| **Switch**      | —                                                     | Controlled/uncontrolled, accessibility roles          |
| **RadioGroup**  | —                                                     | RadioGroup + RadioGroupItem                           |
| **Select**      | —                                                     | SelectTrigger, SelectValue, SelectContent, SelectItem |
| **Label**       | —                                                     | Form field label                                      |
| **Toggle**      | default, outline                                      | ToggleText sub-component                              |
| **ToggleGroup** | single, multiple                                      | Group of toggle items                                 |

### Display

| Component       | Variants                                          | Notes                                                                           |
| --------------- | ------------------------------------------------- | ------------------------------------------------------------------------------- |
| **Card**        | —                                                 | Compound: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter |
| **Badge**       | default, secondary, destructive, outline, success | BadgeText sub-component                                                         |
| **Alert**       | default, destructive, success, warning            | AlertTitle & AlertDescription                                                   |
| **Avatar**      | sm, default, lg                                   | AvatarImage + AvatarFallback                                                    |
| **Separator**   | horizontal, vertical                              | Themed divider                                                                  |
| **Progress**    | sm, default, lg                                   | Value-based progress bar with accessibility                                     |
| **Spinner**     | sm, default, lg                                   | ActivityIndicator wrapper                                                       |
| **Skeleton**    | —                                                 | Loading placeholder                                                             |
| **AspectRatio** | —                                                 | Maintain aspect ratio container                                                 |

### Layout

| Component       | Notes                                    |
| --------------- | ---------------------------------------- |
| **Tabs**        | TabsList, TabsTrigger, TabsContent       |
| **Accordion**   | AccordionItem, AccordionTrigger, Content |
| **Collapsible** | CollapsibleTrigger, CollapsibleContent   |

### Overlays & Menus

| Component        | Notes                                                |
| ---------------- | ---------------------------------------------------- |
| **Dialog**       | Modal dialog with Header, Footer, Title, Description |
| **AlertDialog**  | Confirmation dialog with Action/Cancel buttons       |
| **Popover**      | PopoverTrigger + PopoverContent                      |
| **Tooltip**      | TooltipTrigger + TooltipContent                      |
| **DropdownMenu** | DropdownMenuTrigger, Content, Item, Label, Separator |
| **ContextMenu**  | Long-press context menu                              |
| **HoverCard**    | Hover-triggered card (press on mobile)               |
| **Menubar**      | Horizontal menu bar                                  |

### Feedback

| Component | Notes                                          |
| --------- | ---------------------------------------------- |
| **Toast** | ToastProvider, ToastContainer, useToast() hook |

## Blocks (Pre-built Screens)

### Auth

| Block                  | Description                    |
| ---------------------- | ------------------------------ |
| **SignInForm**         | Email/password sign in         |
| **SignUpForm**         | Registration form              |
| **ForgotPasswordForm** | Password reset request         |
| **ResetPasswordForm**  | Set new password               |
| **VerifyEmailForm**    | Email verification code input  |
| **SocialConnections**  | OAuth provider buttons         |
| **UserMenu**           | Avatar dropdown with user info |

### Navigation

| Block                 | Description                     |
| --------------------- | ------------------------------- |
| **Header**            | App header with title & actions |
| **BottomNav**         | Bottom tab navigation           |
| **FloatingBottomNav** | Floating bottom navigation      |
| **TabBar**            | Horizontal tab bar              |
| **DrawerMenu**        | Side drawer navigation          |

### Layout

| Block                | Description                   |
| -------------------- | ----------------------------- |
| **AppShell**         | Main app layout wrapper       |
| **EmptyState**       | Empty content placeholder     |
| **ErrorState**       | Error display with retry      |
| **LoadingScreen**    | Full-screen loading indicator |
| **OnboardingScreen** | Onboarding flow screen        |

### Splash

| Block             | Description                                      |
| ----------------- | ------------------------------------------------ |
| **SplashScreen**  | Animated app launch splash with fade/scale/slide |
| **MinimalSplash** | Preset: Simple fade animation                    |
| **BrandedSplash** | Preset: Scale animation with loading indicator   |

### Profile

| Block               | Description                |
| ------------------- | -------------------------- |
| **ProfileHeader**   | User profile header        |
| **AccountCard**     | Account info card          |
| **SettingsItem**    | Settings list item         |
| **SettingsSection** | Settings group with header |

### Lists

| Block                | Description                      |
| -------------------- | -------------------------------- |
| **ListItem**         | Standard list item               |
| **NotificationItem** | Notification list item           |
| **SwipeableItem**    | Swipeable list item with actions |

### Commerce

| Block               | Description                |
| ------------------- | -------------------------- |
| **ProductCard**     | Product display card       |
| **PricingCard**     | Pricing tier card          |
| **CheckoutSummary** | Order summary for checkout |

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
│           │   ├── dialog/
│           │   └── ...
│           ├── blocks/        # Pre-built screens
│           │   ├── auth/
│           │   ├── navigation/
│           │   ├── layout/
│           │   ├── profile/
│           │   ├── lists/
│           │   └── commerce/
│           ├── lib/           # Utilities
│           │   ├── cn.ts      # clsx + tailwind-merge
│           │   ├── tv.ts      # tailwind-variants re-export
│           │   └── font-context.ts
│           └── index.ts       # Barrel export
├── apps/
│   └── showcase/              # Expo demo app
│       ├── App.tsx            # Component showcase
│       ├── global.css         # Theme variables (OKLCH) — at app root!
│       └── metro.config.js    # Uniwind + monorepo config
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
