# WhileUI Native

> Copy-paste components for React Native. You own the code.

Beautiful, accessible, themeable components built with [Uniwind](https://uniwind.dev) + Tailwind CSS v4.

## Installation

```bash
npm install @thewhileloop/whileui
# or
bun add @thewhileloop/whileui
```

### Required Peer Dependencies

```bash
bun add react@^19.0.0 react-native@^0.81.0 uniwind@^1.0.0 tailwindcss@^4.0.0
bun add react-native-reanimated react-native-safe-area-context react-native-screens
```

### Portal Dependencies (Select, Popover, Tooltip, HoverCard)

```bash
bun add @rn-primitives/portal @rn-primitives/hooks @rn-primitives/slot @rn-primitives/select @rn-primitives/popover @rn-primitives/tooltip @rn-primitives/hover-card
```

### Setup Uniwind (required)

1. **metro.config.js** (wrap with withUniwindConfig):

```js
const { withUniwindConfig } = require('uniwind/metro');

module.exports = withUniwindConfig({
  cssEntryFile: './global.css',
})({
  // your metro config
});
```

> `withUniwindConfig` must be the outermost wrapper. `cssEntryFile` must be a relative path string.

2. **global.css** at app root:

```css
@import 'tailwindcss';
@import 'uniwind';

/* WhileUI Noir theme - copy this or create your own */
@layer theme {
  :root {
    @variant light {
      --color-background: oklch(1 0 0);
      --color-foreground: oklch(0.1316 0.0041 17.69);
      --color-card: oklch(1 0 0);
      --color-card-foreground: oklch(0.1316 0.0041 17.69);
      --color-primary: oklch(0.1316 0.0041 17.69);
      --color-primary-foreground: oklch(0.98 0 0);
      --color-secondary: oklch(0.9598 0.0017 17.69);
      --color-secondary-foreground: oklch(0.1316 0.0041 17.69);
      --color-muted: oklch(0.9598 0.0017 17.69);
      --color-muted-foreground: oklch(0.5415 0.0135 17.69);
      --color-accent: oklch(0.9598 0.0017 17.69);
      --color-accent-foreground: oklch(0.1316 0.0041 17.69);
      --color-destructive: oklch(0.5 0.19 27);
      --color-destructive-foreground: oklch(0.98 0 0);
      --color-border: oklch(0.9039 0.0034 17.69);
      --color-input: oklch(0.9039 0.0034 17.69);
      --color-ring: oklch(0.1316 0.0041 17.69);
      --color-success: oklch(0.59 0.16 145);
      --color-success-foreground: oklch(0.98 0 0);
      --color-warning: oklch(0.75 0.18 85);
      --color-warning-foreground: oklch(0.1316 0.0041 17.69);
      --color-info: oklch(0.65 0.15 245);
      --color-info-foreground: oklch(0.98 0 0);
    }

    @variant dark {
      --color-background: oklch(0.1316 0.0041 17.69);
      --color-foreground: oklch(0.98 0 0);
      --color-card: oklch(0.1316 0.0041 17.69);
      --color-card-foreground: oklch(0.98 0 0);
      --color-primary: oklch(0.98 0 0);
      --color-primary-foreground: oklch(0.1316 0.0041 17.69);
      --color-secondary: oklch(0.2104 0.0084 17.69);
      --color-secondary-foreground: oklch(0.98 0 0);
      --color-muted: oklch(0.2104 0.0084 17.69);
      --color-muted-foreground: oklch(0.6961 0.0174 17.69);
      --color-accent: oklch(0.2104 0.0084 17.69);
      --color-accent-foreground: oklch(0.98 0 0);
      --color-destructive: oklch(0.45 0.18 27);
      --color-destructive-foreground: oklch(0.98 0 0);
      --color-border: oklch(0.2104 0.0084 17.69);
      --color-input: oklch(0.2104 0.0084 17.69);
      --color-ring: oklch(0.8267 0.0206 17.69);
      --color-success: oklch(0.59 0.16 145);
      --color-success-foreground: oklch(0.98 0 0);
      --color-warning: oklch(0.75 0.18 85);
      --color-warning-foreground: oklch(0.1316 0.0041 17.69);
      --color-info: oklch(0.65 0.15 245);
      --color-info-foreground: oklch(0.98 0 0);
    }
  }
}
```

3. **App.tsx**:

```tsx
import './global.css';
import { PortalHost } from '@thewhileloop/whileui';
import { Button, ButtonText } from '@thewhileloop/whileui';

export default function App() {
  return (
    <>
      {/* Your app content */}
      <PortalHost />
    </>
  );
}
```

> **Note:** `<PortalHost />` must be added at the root of your app (as the last child) to enable portal-based components like Select, Popover, Tooltip, and HoverCard to render correctly.

## Usage

```tsx
import {
  Button,
  ButtonText,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Text,
} from '@thewhileloop/whileui';

function MyScreen() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Email" />
        <Button className="mt-4">
          <ButtonText>Continue</ButtonText>
        </Button>
      </CardContent>
    </Card>
  );
}
```

## Philosophy

- **Copy-Paste Ownership** — Components live in _your_ project. No `node_modules` lock-in.
- **Beautiful by Default** — OKLCH color system, light/dark themes, polished out of the box.
- **Fully Customizable** — Every component uses `tv()` variants and accepts `className` overrides.
- **Accessible** — Proper ARIA roles, keyboard support, controlled/uncontrolled state.
- **Tree-Shakeable** — Only imports what you use. `sideEffects: false`.

## Quick Reference (AI / Code Generation)

- **Full-screen:** `AppShell` + `Header` in `header` + `BottomNav` in `bottomNav` + content in `children`
- **Layout:** `Stack` (vertical), `Row` (horizontal) — both support `gap`, `align`, `justify`
- **Auth callbacks:** Auth blocks use objects: `onSubmit({ email, password })`, `onSubmit({ firstName, lastName, email, password })`, etc. Wire to your auth service.
- **PortalHost:** Add `<PortalHost />` at app root for Select, Popover, Tooltip, HoverCard.
- **Uniwind:** `withUniwindConfig` must wrap metro config. `global.css` at app root, imported in `App.tsx`.
- **Reference:** Block props in `packages/ui/src/blocks`; flow patterns in README "Flow Patterns" section.

## Components

### Primitives

| Component     | Notes                            |
| ------------- | -------------------------------- |
| **Text**      | Themed text with variant support |
| **View**      | Themed view wrapper              |
| **Pressable** | Themed pressable wrapper         |
| **Stack**     | Vertical flex layout with gap    |
| **Row**       | Horizontal flex layout with gap  |
| **Box**       | Flexible container with variants |

### Form Controls

| Component            | Variants                                              | Notes                                                                                         |
| -------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **Button**           | default, destructive, outline, secondary, ghost, link | 4 sizes, ButtonText & ButtonIcon sub-components                                               |
| **Input**            | default, error                                        | TextInput wrapper with themed styling                                                         |
| **NumericInput**     | default, error                                        | Numeric input with prefix/suffix slots, optional steppers, and compact size                   |
| **FormField**        | default, compact                                      | Compound API: FormField, FormLabel, FormControl, FormHint, FormMessage                        |
| **LabeledField**     | default, compact                                      | Field wrapper with label/helper/error plus left/right slots                                   |
| **Textarea**         | —                                                     | Multi-line text input                                                                         |
| **Checkbox**         | —                                                     | Controlled/uncontrolled, accessibility roles                                                  |
| **Switch**           | —                                                     | Controlled/uncontrolled, accessibility roles                                                  |
| **RadioGroup**       | —                                                     | RadioGroup + RadioGroupItem                                                                   |
| **Select**           | —                                                     | Uses `SelectOption` type `{value, label}`. Includes SelectGroup, SelectLabel, SelectSeparator |
| **Label**            | —                                                     | Form field label                                                                              |
| **SegmentedControl** | single select                                         | SegmentedControl, SegmentedControlItem, SegmentedControlItemText with wrapping layout support |
| **Toggle**           | default, outline                                      | ToggleText sub-component                                                                      |
| **ToggleGroup**      | single, multiple                                      | Group of toggle items                                                                         |

### Display

| Component       | Variants                                          | Notes                                                                           |
| --------------- | ------------------------------------------------- | ------------------------------------------------------------------------------- |
| **Card**        | padding (none, sm, default, lg), unstyled         | Compound: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter |
| **Badge**       | default, secondary, destructive, outline, success | BadgeText sub-component                                                         |
| **Alert**       | default, destructive, success, warning            | AlertTitle & AlertDescription                                                   |
| **Avatar**      | sm, default, lg                                   | AvatarImage + AvatarFallback                                                    |
| **DataRow**     | default, compact                                  | DataRow, DataRowLeft/Center/Right, DataRowLabel/Description/Value               |
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
| **Popover**      | Position-aware popover (requires PortalHost)         |
| **Tooltip**      | Position-aware tooltip (requires PortalHost)         |
| **DropdownMenu** | DropdownMenuTrigger, Content, Item, Label, Separator |
| **ContextMenu**  | Long-press context menu                              |
| **HoverCard**    | Position-aware hover card (requires PortalHost)      |
| **Menubar**      | Horizontal menu bar                                  |

### Feedback

| Component | Notes                                          |
| --------- | ---------------------------------------------- |
| **Toast** | ToastProvider, ToastContainer, useToast() hook |

## Blocks (Pre-built Screens)

### Auth

| Block                  | Description                           |
| ---------------------- | ------------------------------------- |
| **SignInForm**         | Email/password sign in with callbacks |
| **SignUpForm**         | Registration form with callbacks      |
| **ForgotPasswordForm** | Password reset request                |
| **ResetPasswordForm**  | Set new password                      |
| **VerifyEmailForm**    | Email verification code input         |
| **SocialConnections**  | OAuth provider buttons                |
| **UserMenu**           | Profile dropdown for auth flows       |

### Navigation

| Block                 | Description                                       |
| --------------------- | ------------------------------------------------- |
| **AppShell**          | Layout shell with header/footer/bottomNav slots   |
| **NavigationSidebar** | Sidebar nav with grouped sections and footer slot |
| **Header**            | Top app bar with back/actions                     |
| **BottomNav**         | Tab-style bottom navigation bar                   |
| **FloatingBottomNav** | Elevated bottom nav with safe area support        |
| **TabBar**            | Top tab bar with indicator                        |
| **DrawerMenu**        | Drawer with sections and items                    |

### Layout

| Block                  | Description                                     |
| ---------------------- | ----------------------------------------------- |
| **ActionBar**          | Sticky bottom action row with safe-area padding |
| **ConfirmActionSheet** | Reusable destructive confirmation sheet         |
| **FormModalScreen**    | Modal scaffold for forms with loading states    |
| **EmptyState**         | Empty content placeholder                       |
| **ErrorState**         | Error display with retry                        |
| **LoadingScreen**      | Full-screen loading indicator                   |
| **OnboardingScreen**   | Onboarding flow screen                          |
| **SplashScreen**       | Branded splash (fade/scale/slide variants)      |
| **MinimalSplash**      | Minimal monochrome splash                       |
| **BrandedSplash**      | Splash with brand imagery                       |

### Profile & Settings

| Block               | Description                         |
| ------------------- | ----------------------------------- |
| **ProfileHeader**   | Profile header with stats           |
| **AccountCard**     | Account summary card                |
| **SettingsSection** | Section header with optional action |
| **SettingsItem**    | Row for toggles/links/settings      |

### Lists

| Block                | Description                         |
| -------------------- | ----------------------------------- |
| **ListItem**         | Title/subtitle row                  |
| **NotificationItem** | Notification row with metadata      |
| **SwipeableItem**    | Swipe actions list item             |
| **TimelineFeed**     | Vertical feed with connecting lines |

### Commerce

| Block               | Description                        |
| ------------------- | ---------------------------------- |
| **ProductCard**     | Product card with badge/media      |
| **PricingCard**     | Pricing tiers with feature list    |
| **CheckoutSummary** | Cart summary with line items       |
| **MetricCard**      | Stats/progress card for dashboards |


### Media

| Block          | Description                         |
| -------------- | ----------------------------------- |
| **SmartImage** | Image with aspect ratio and loading |

## Layout Primitives (Stack, Row, Box)

Use `Stack` for vertical layouts, `Row` for horizontal layouts. Both support `gap`, `align`, and `justify` variants.

```tsx
import { Stack, Row, Box } from '@thewhileloop/whileui';

<Stack gap="lg">
  <Text>Title</Text>
  <Row gap="md" justify="between">
    <Button>
      <ButtonText>Cancel</ButtonText>
    </Button>
    <Button>
      <ButtonText>Save</ButtonText>
    </Button>
  </Row>
</Stack>;
```

| Prop    | Stack/Row                                                           | Values                   |
| ------- | ------------------------------------------------------------------- | ------------------------ |
| gap     | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`           | Spacing between children |
| align   | `'start' \| 'center' \| 'end' \| 'stretch' \| 'baseline'`           | Cross-axis alignment     |
| justify | `'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly'` | Main-axis alignment      |

`Box` provides optional padding and margin variants for consistent spacing.

## Full-Screen Composition

Standard pattern: `AppShell` with `header`, scrollable `children`, and `bottomNav`.

```tsx
import { AppShell, Header, BottomNav, ScrollView } from '@thewhileloop/whileui';

<AppShell
  header={<Header title="Home" rightActions={[...]} />}
  bottomNav={
    <BottomNav
      items={[...]}
      activeKey="home"
      onSelect={(key) => setTab(key)}
    />
  }
>
  <ScrollView className="flex-1 p-4">
    {/* Screen content */}
  </ScrollView>
</AppShell>
```

### Flow Patterns

| Flow       | Blocks                                                                         |
| ---------- | ------------------------------------------------------------------------------ |
| Auth       | SignInForm → SignUpForm → ForgotPasswordForm → VerifyEmailForm → ResetPasswordForm |
| Settings   | ProfileHeader + SettingsSection + SettingsItem (+ FormModalScreen for edits)  |
| E-commerce | ProductCard list → CheckoutSummary + ActionBar                                 |
| App shell  | AppShell + Header + BottomNav + content                                        |

Block props: see TypeScript interfaces in `packages/ui/src/blocks`.

## Quick Start

```bash
bun install
cd apps/showcase
bun run dev
# Or: npx expo start --web
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
│           │   ├── form-field/
│           │   ├── numeric-input/
│           │   ├── segmented-control/
│           │   ├── data-row/
│           │   ├── dialog/
│           │   └── ...
│           ├── blocks/        # Pre-built screens
│           │   ├── auth/
│           │   ├── navigation/
│           │   ├── layout/
│           │   ├── profile/
│           │   ├── lists/
│           │   ├── commerce/
│           │   ├── splash/
│           │   └── media/
│           ├── lib/           # Utilities
│           │   ├── cn.ts      # clsx + tailwind-merge
│           │   ├── tv.ts      # tailwind-variants re-export
│           │   ├── font-context.ts
│           │   └── theme-bridge.ts
│           └── index.ts       # Barrel export
├── apps/
│   └── showcase/              # Expo demo app
│       ├── App.tsx            # Component showcase
│       ├── global.css         # Theme variables (OKLCH) — at app root!
│       └── metro.config.js    # Uniwind + monorepo config
└── package.json               # bun monorepo root
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

### Token Contract (Release Baseline)

The WhileUI token contract is strict for cross-app reuse. Define these in **every** theme variant (`@variant light`, `@variant dark`, and custom variants):

- Required core tokens: `background`, `foreground`, `card`, `card-foreground`, `primary`, `primary-foreground`, `secondary`, `secondary-foreground`, `muted`, `muted-foreground`, `accent`, `accent-foreground`, `destructive`, `destructive-foreground`, `border`, `input`, `ring`
- Optional status tokens: `success`, `success-foreground`, `warning`, `warning-foreground`, `info`, `info-foreground`
- Optional scale tokens: spacing (`--spacing`, `--spacing-*`), typography (`--text-*`, `--leading-*`, `--tracking-*`), radius (`--radius-*`), elevation (`--shadow-*`)

Minimal contract example:

```css
@layer theme {
  :root {
    @variant light {
      --color-background: oklch(1 0 0);
      --color-foreground: oklch(0.15 0 0);
      --color-card: oklch(1 0 0);
      --color-card-foreground: oklch(0.15 0 0);
      --color-primary: oklch(0.2 0 0);
      --color-primary-foreground: oklch(0.98 0 0);
      --color-secondary: oklch(0.95 0 0);
      --color-secondary-foreground: oklch(0.15 0 0);
      --color-muted: oklch(0.95 0 0);
      --color-muted-foreground: oklch(0.45 0 0);
      --color-accent: oklch(0.9 0.05 180);
      --color-accent-foreground: oklch(0.15 0 0);
      --color-destructive: oklch(0.58 0.2 26);
      --color-destructive-foreground: oklch(0.98 0 0);
      --color-border: oklch(0.9 0 0);
      --color-input: oklch(0.92 0 0);
      --color-ring: oklch(0.22 0 0);
    }
  }
}
```

Switch themes at runtime via Uniwind:

```tsx
import { Uniwind } from 'uniwind';

Uniwind.setTheme('dark'); // or 'light' or 'system'
```

Or use the first-party ThemeBridge helper with optional persistence:

```tsx
import { useThemeBridge, type ThemeBridgeAdapter } from '@thewhileloop/whileui';

const adapter: ThemeBridgeAdapter = {
  loadThemeMode: async () => 'system',
  saveThemeMode: async (mode) => {
    await storage.setItem('theme-mode', mode);
  },
};

const { mode, resolvedTheme, setMode, cycleMode } = useThemeBridge({ adapter });
```


## Tech Stack

- **Styling**: [Uniwind](https://uniwind.dev) (free tier) + Tailwind CSS v4
- **Variants**: [tailwind-variants](https://www.tailwind-variants.org/) (`tv()`)
- **Merging**: [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge)
- **Expo**: SDK 54
- **Monorepo**: bun + Turborepo

## License

MIT

---

# API Reference

## Button

```tsx
import { Button, ButtonText, ButtonIcon } from '@thewhileloop/whileui';

<Button variant="default" size="default" disabled={false} onPress={() => {}}>
  <ButtonIcon>
    <Icon />
  </ButtonIcon>
  <ButtonText>Click me</ButtonText>
  <ButtonIcon position="right">
    <Icon />
  </ButtonIcon>
</Button>;
```

| Prop      | Type                                                                          | Default     | Description                 |
| --------- | ----------------------------------------------------------------------------- | ----------- | --------------------------- |
| variant   | `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link'` | `'default'` | Button style variant        |
| size      | `'default' \| 'sm' \| 'lg' \| 'icon'`                                         | `'default'` | Button size                 |
| disabled  | `boolean`                                                                     | `false`     | Disable the button          |
| className | `string`                                                                      | —           | Additional Tailwind classes |

## Input

```tsx
import { Input } from '@thewhileloop/whileui';

<Input placeholder="Email" variant="default" value={value} onChangeText={setValue} />;
```

| Prop                 | Type                   | Default     | Description                                      |
| -------------------- | ---------------------- | ----------- | ------------------------------------------------ |
| variant              | `'default' \| 'error'` | `'default'` | Input style variant                              |
| placeholder          | `string`               | —           | Placeholder text                                 |
| placeholderTextColor | `string`               | —           | Hex for placeholder (theme-aware when provided)  |
| editable             | `boolean`              | `true`      | Whether input is editable                        |

## NumericInput

```tsx
import { NumericInput } from '@thewhileloop/whileui';

<NumericInput
  value={amount}
  onValueChange={setAmount}
  prefix={<Text className="text-muted-foreground">$</Text>}
  suffix={<Text className="text-muted-foreground">USD</Text>}
  min={0}
  step={0.5}
  showSteppers
  size="compact"
/>;
```

| Prop                 | Type                              | Default     | Description                       |
| -------------------- | --------------------------------- | ----------- | --------------------------------- |
| variant              | `'default' \| 'error'`            | `'default'` | Input style                       |
| size                 | `'default' \| 'compact'`          | `'default'` | Density size                      |
| value                | `number \| null`                  | —           | Controlled numeric value          |
| onValueChange       | `(value: number \| null) => void` | —           | Numeric value change callback     |
| placeholderTextColor | `string`                          | —           | Hex for placeholder               |
| prefix / suffix      | `ReactNode`                       | —           | Left/right slots                  |
| showSteppers        | `boolean`                         | `false`     | Show decrement/increment controls |

## FormField

```tsx
import {
  FormField,
  FormLabel,
  FormControl,
  FormHint,
  FormMessage,
  Input,
} from '@thewhileloop/whileui';

<FormField required invalid={Boolean(error)}>
  <FormLabel>Email</FormLabel>
  <FormControl>
    <Input placeholder="you@example.com" />
  </FormControl>
  {error ? <FormMessage>{error}</FormMessage> : <FormHint>We'll never share your email.</FormHint>}
</FormField>;
```

## LabeledField

```tsx
import { LabeledField, LabeledFieldControl, Input } from '@thewhileloop/whileui';

<LabeledField
  label="Username"
  hint="3-20 characters"
  leftSlot={<Icon />}
  rightSlot={
    <Button size="sm">
      <ButtonText>Check</ButtonText>
    </Button>
  }
>
  <LabeledFieldControl>
    <Input className="border-0 bg-transparent px-0" />
  </LabeledFieldControl>
</LabeledField>;
```

## SegmentedControl

```tsx
import {
  SegmentedControl,
  SegmentedControlItem,
  SegmentedControlItemText,
} from '@thewhileloop/whileui';

<SegmentedControl value={unit} onValueChange={setUnit} wrap>
  <SegmentedControlItem value="metric">
    <SegmentedControlItemText>Metric</SegmentedControlItemText>
  </SegmentedControlItem>
  <SegmentedControlItem value="imperial">
    <SegmentedControlItemText>Imperial</SegmentedControlItemText>
  </SegmentedControlItem>
</SegmentedControl>;
```

## DataRow

```tsx
import {
  DataRow,
  DataRowLeft,
  DataRowCenter,
  DataRowRight,
  DataRowLabel,
  DataRowDescription,
  DataRowValue,
  Avatar,
  AvatarFallback,
} from '@thewhileloop/whileui';

<DataRow>
  <DataRowLeft>
    <Avatar size="sm">
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  </DataRowLeft>
  <DataRowCenter>
    <DataRowLabel>Jane Doe</DataRowLabel>
    <DataRowDescription>Product Designer</DataRowDescription>
  </DataRowCenter>
  <DataRowRight>
    <DataRowValue>Owner</DataRowValue>
  </DataRowRight>
</DataRow>;
```

## Card

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@thewhileloop/whileui';

<Card padding="default">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>{/* Content */}</CardContent>
  <CardFooter>{/* Footer */}</CardFooter>
</Card>;

<Card unstyled padding="none" className="rounded-xl border border-border bg-card">
  {/* advanced custom layouts */}
</Card>;
```

| Prop     | Type                                  | Default     | Description                         |
| -------- | ------------------------------------- | ----------- | ----------------------------------- |
| padding  | `'none' \| 'sm' \| 'default' \| 'lg'` | `'default'` | Card interior padding               |
| unstyled | `boolean`                             | `false`     | Remove built-in card surface styles |

## Badge

```tsx
import { Badge, BadgeText } from '@thewhileloop/whileui';

<Badge variant="default">
  <BadgeText>New</BadgeText>
</Badge>;
```

| Prop    | Type                                                                                         | Default     |
| ------- | -------------------------------------------------------------------------------------------- | ----------- |
| variant | `'default' \| 'secondary' \| 'destructive' \| 'outline' \| 'success' \| 'warning' \| 'info'` | `'default'` |

## Alert

```tsx
import { Alert, AlertTitle, AlertDescription } from '@thewhileloop/whileui';

<Alert variant="default">
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>Something happened.</AlertDescription>
</Alert>;
```

| Prop    | Type                                                   | Default     |
| ------- | ------------------------------------------------------ | ----------- |
| variant | `'default' \| 'destructive' \| 'success' \| 'warning'` | `'default'` |

## Dialog

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@thewhileloop/whileui';

<Dialog>
  <DialogTrigger asChild>
    <Button>
      <ButtonText>Open</ButtonText>
    </Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    {/* Content */}
    <DialogFooter>
      <DialogClose asChild>
        <Button>
          <ButtonText>Close</ButtonText>
        </Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>;
```

## AlertDialog

```tsx
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from '@thewhileloop/whileui';

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">
      <ButtonText>Delete</ButtonText>
    </Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>;
```

## Checkbox

```tsx
import { Checkbox } from '@thewhileloop/whileui';

<Checkbox checked={checked} onCheckedChange={setChecked} />;
```

| Prop            | Type                         | Default |
| --------------- | ---------------------------- | ------- |
| checked         | `boolean`                    | `false` |
| onCheckedChange | `(checked: boolean) => void` | —       |
| disabled        | `boolean`                    | `false` |

## Switch

```tsx
import { Switch } from '@thewhileloop/whileui';

<Switch checked={checked} onCheckedChange={setChecked} />;
```

| Prop            | Type                         | Default |
| --------------- | ---------------------------- | ------- |
| checked         | `boolean`                    | `false` |
| onCheckedChange | `(checked: boolean) => void` | —       |

## RadioGroup

```tsx
import { RadioGroup, RadioGroupItem } from '@thewhileloop/whileui';

<RadioGroup value={value} onValueChange={setValue}>
  <RadioGroupItem value="option1" />
  <RadioGroupItem value="option2" />
</RadioGroup>;
```

## Select

```tsx
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@thewhileloop/whileui';

<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Select..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem label="Option 1" value="1" />
    <SelectItem label="Option 2" value="2" />
  </SelectContent>
</Select>;
```

## Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@thewhileloop/whileui';

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">
      <Text>Tab 1</Text>
    </TabsTrigger>
    <TabsTrigger value="tab2">
      <Text>Tab 2</Text>
    </TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">{/* Content 1 */}</TabsContent>
  <TabsContent value="tab2">{/* Content 2 */}</TabsContent>
</Tabs>;
```

## Accordion

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@thewhileloop/whileui';

<Accordion type="single" collapsible>
  <AccordionItem value="item1">
    <AccordionTrigger>
      <Text>Section 1</Text>
    </AccordionTrigger>
    <AccordionContent>
      <Text>Content 1</Text>
    </AccordionContent>
  </AccordionItem>
</Accordion>;
```

| Prop        | Type                     | Default    |
| ----------- | ------------------------ | ---------- |
| type        | `'single' \| 'multiple'` | `'single'` |
| collapsible | `boolean`                | `false`    |

## Avatar

```tsx
import { Avatar, AvatarImage, AvatarFallback } from '@thewhileloop/whileui';

<Avatar size="default">
  <AvatarImage src="https://..." />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>;
```

| Prop | Type                        | Default     |
| ---- | --------------------------- | ----------- |
| size | `'sm' \| 'default' \| 'lg'` | `'default'` |

## Progress

```tsx
import { Progress } from '@thewhileloop/whileui';

<Progress value={50} size="default" />;
```

| Prop  | Type                        | Default     |
| ----- | --------------------------- | ----------- |
| value | `number`                    | `0`         |
| size  | `'sm' \| 'default' \| 'lg'` | `'default'` |

## Toast

```tsx
import { ToastProvider, ToastContainer, useToast } from '@thewhileloop/whileui';

// Wrap app
<ToastProvider>
  <App />
  <ToastContainer position="top" />
</ToastProvider>;

// Use in component
const { toast } = useToast();
toast({ title: 'Success', description: 'Saved!', variant: 'success' });
```

| Toast Options | Type                                      |
| ------------- | ----------------------------------------- |
| title         | `string`                                  |
| description   | `string`                                  |
| variant       | `'default' \| 'success' \| 'destructive'` |
| duration      | `number` (ms)                             |

## Popover

```tsx
import { Popover, PopoverTrigger, PopoverContent } from '@thewhileloop/whileui';

<Popover>
  <PopoverTrigger asChild>
    <Button>
      <ButtonText>Open</ButtonText>
    </Button>
  </PopoverTrigger>
  <PopoverContent>
    <Text>Popover content</Text>
  </PopoverContent>
</Popover>;
```

## DropdownMenu

```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@thewhileloop/whileui';

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>
      <ButtonText>Menu</ButtonText>
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <Text>Edit</Text>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Text>Delete</Text>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>;
```

---

# Blocks API

## SignInForm

```tsx
import { SignInForm } from '@thewhileloop/whileui';

<SignInForm
  onSubmit={({ email, password }) => signIn(email, password)}
  onForgotPassword={() => navigate('ForgotPassword')}
  onSignUp={() => navigate('SignUp')}
  onGooglePress={() => signInWithGoogle()}
  onApplePress={() => signInWithApple()}
/>;
```

| Prop             | Type                                  | Description                  |
| ---------------- | ------------------------------------- | ---------------------------- |
| onSubmit         | `(data: { email, password }) => void` | Called on sign-in submit     |
| onForgotPassword | `() => void`                          | Called when "Forgot?" tapped |
| onSignUp         | `() => void`                          | Called when "Sign Up" tapped |
| onGooglePress    | `() => void`                          | Called when Google tapped    |
| onApplePress     | `() => void`                          | Called when Apple tapped     |

## SignUpForm

```tsx
import { SignUpForm } from '@thewhileloop/whileui';

<SignUpForm
  onSubmit={({ firstName, lastName, email, password }) =>
    signUp(firstName, lastName, email, password)
  }
  onSignIn={() => navigate('SignIn')}
  onGooglePress={() => signInWithGoogle()}
  onApplePress={() => signInWithApple()}
/>;
```

| Prop          | Type                                                       | Description                  |
| ------------- | ---------------------------------------------------------- | ---------------------------- |
| onSubmit      | `(data: { firstName, lastName, email, password }) => void` | Called on registration       |
| onSignIn      | `() => void`                                               | Called when "Sign In" tapped |
| onGooglePress | `() => void`                                               | Called when Google tapped    |
| onApplePress  | `() => void`                                               | Called when Apple tapped     |

## BottomNav

```tsx
import { BottomNav } from '@thewhileloop/whileui';

<BottomNav
  items={[
    { key: 'home', label: 'Home', icon: <Icon /> },
    { key: 'profile', label: 'Profile', icon: <Icon />, badge: 3 },
  ]}
  activeKey="home"
  onSelect={(key) => {}}
/>;
```

## ActionBar

```tsx
import { ActionBar, Button, ButtonText } from '@thewhileloop/whileui';

<ActionBar>
  <Button variant="outline" className="flex-1">
    <ButtonText>Cancel</ButtonText>
  </Button>
  <Button className="flex-1">
    <ButtonText>Save</ButtonText>
  </Button>
</ActionBar>;
```

## ConfirmActionSheet

```tsx
import { ConfirmActionSheet } from '@thewhileloop/whileui';

<ConfirmActionSheet
  open={open}
  onOpenChange={setOpen}
  title="Delete project?"
  description="This action cannot be undone."
  confirmLabel="Delete"
  destructive
  onConfirm={() => deleteProject()}
/>;
```

## NavigationSidebar

```tsx
import { NavigationSidebar } from '@thewhileloop/whileui';

<NavigationSidebar
  sections={[
    {
      title: 'Workspace',
      items: [
        { key: 'overview', label: 'Overview', icon: <Icon /> },
        { key: 'billing', label: 'Billing', icon: <Icon />, badge: 2 },
      ],
    },
  ]}
  activeKey="overview"
  onSelect={(key) => {}}
  header={<Text>Acme Inc.</Text>}
  footer={<Text className="text-xs text-muted-foreground">v1.0.0</Text>}
/>;
```

## Header

```tsx
import { Header, HeaderBackButton } from '@thewhileloop/whileui';

<Header
  title="Settings"
  subtitle="Manage preferences"
  leftAction={<HeaderBackButton onPress={() => {}} />}
  rightActions={[{ key: 'search', icon: <Icon />, onPress: () => {} }]}
/>;
```

## SplashScreen

```tsx
import { SplashScreen } from '@thewhileloop/whileui';

<SplashScreen
  logo={<MyLogo />}
  appName="MyApp"
  tagline="Your tagline"
  variant="scale"
  duration={1500}
  showLoading
  onAnimationComplete={() => {}}
/>;
```

| Prop        | Type                           | Default   |
| ----------- | ------------------------------ | --------- |
| variant     | `'fade' \| 'scale' \| 'slide'` | `'scale'` |
| duration    | `number`                       | `800`     |
| showLoading | `boolean`                      | `false`   |

## EmptyState

```tsx
import { EmptyState } from '@thewhileloop/whileui';

<EmptyState
  icon={<Icon />}
  title="No items"
  description="Add your first item."
  action={{ label: 'Add Item', onPress: () => {} }}
/>;
```

## ProfileHeader

```tsx
import { ProfileHeader } from '@thewhileloop/whileui';

<ProfileHeader
  name="John Doe"
  username="johndoe"
  bio="Designer & Developer"
  avatarFallback="JD"
  avatarUrl="https://..."
  verified
  stats={[
    { label: 'Followers', value: '1.2K' },
    { label: 'Following', value: 234 },
  ]}
  action={{ label: 'Edit Profile', onPress: () => {} }}
/>;
```

## SettingsSection / SettingsItem

```tsx
import { SettingsSection, SettingsItem } from '@thewhileloop/whileui';

<SettingsSection title="Preferences">
  <SettingsItem
    icon={<Icon />}
    label="Notifications"
    type="toggle"
    toggleValue={enabled}
    onToggle={setEnabled}
  />
  <SettingsItem icon={<Icon />} label="Privacy" value="Public" onPress={() => {}} />
  <SettingsItem icon={<Icon />} label="Sign Out" type="action" destructive />
</SettingsSection>;
```

## ProductCard

```tsx
import { ProductCard } from '@thewhileloop/whileui';

<ProductCard
  title="Product Name"
  price="$99"
  originalPrice="$129"
  badge="-23%"
  rating={4.5}
  reviewCount={128}
  variant="vertical"
  onPress={() => {}}
/>;
```

| Prop    | Type                         | Default      |
| ------- | ---------------------------- | ------------ |
| variant | `'vertical' \| 'horizontal'` | `'vertical'` |

## PricingCard

```tsx
import { PricingCard } from '@thewhileloop/whileui';

<PricingCard
  name="Pro"
  description="For teams"
  price="$29"
  period="/month"
  badge="Popular"
  highlighted
  features={[
    { label: 'Unlimited users', included: true },
    { label: 'Priority support', included: true },
    { label: 'Custom domain', included: false },
  ]}
  onPress={() => {}}
/>;
```

## DrawerMenu

```tsx
import { DrawerMenu } from '@thewhileloop/whileui';

<DrawerMenu
  visible={open}
  onClose={() => setOpen(false)}
  sections={[
    {
      title: 'Menu',
      items: [
        { key: 'home', label: 'Home', icon: <Icon /> },
        { key: 'settings', label: 'Settings', icon: <Icon /> },
      ],
    },
  ]}
  activeKey="home"
  onSelect={(key) => {}}
  header={<View>...</View>}
  footer={<Text>v1.0</Text>}
/>;
```
