# WhileUI Native

> **shadcn/ui for React Native** — Copy-paste components you own.

Beautiful, accessible, themeable React Native components built with [Uniwind](https://uniwind.dev) + Tailwind CSS v4. Inspired by [shadcn/ui](https://ui.shadcn.com/).

## Installation

```bash
npm install @whileloop-app/whileui
# or
pnpm add @whileloop-app/whileui
```

### Peer Dependencies

```bash
npm install uniwind react-native-reanimated react-native-safe-area-context
```

### Portal Dependencies (Required for Select, Popover, Tooltip, HoverCard)

```bash
npm install @rn-primitives/portal @rn-primitives/hooks @rn-primitives/slot @rn-primitives/select @rn-primitives/popover @rn-primitives/tooltip @rn-primitives/hover-card
```

### Setup Uniwind

1. **metro.config.js** (wrap with withUniwindConfig):

```js
const { withUniwindConfig } = require('uniwind/metro');

module.exports = withUniwindConfig({
  cssEntryFile: './global.css',
})({
  // your metro config
});
```

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
import { PortalHost } from '@whileloop-app/whileui';
import { Button, ButtonText } from '@whileloop-app/whileui';

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
} from '@whileloop-app/whileui';

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
| **Select**      | —                                                     | Uses `SelectOption` type `{value, label}`. Includes SelectGroup, SelectLabel, SelectSeparator |
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

| Component        | Notes                                                                  |
| ---------------- | ---------------------------------------------------------------------- |
| **Dialog**       | Modal dialog with Header, Footer, Title, Description                   |
| **AlertDialog**  | Confirmation dialog with Action/Cancel buttons                         |
| **Popover**      | Position-aware popover (requires PortalHost)                           |
| **Tooltip**      | Position-aware tooltip (requires PortalHost)                           |
| **DropdownMenu** | DropdownMenuTrigger, Content, Item, Label, Separator                   |
| **ContextMenu**  | Long-press context menu                                                |
| **HoverCard**    | Position-aware hover card (requires PortalHost)                        |
| **Menubar**      | Horizontal menu bar                                                    |

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

---

# API Reference

## Button

```tsx
import { Button, ButtonText, ButtonIcon } from '@whileloop-app/whileui';

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
import { Input } from '@whileloop-app/whileui';

<Input placeholder="Email" variant="default" value={value} onChangeText={setValue} />;
```

| Prop        | Type                   | Default     | Description               |
| ----------- | ---------------------- | ----------- | ------------------------- |
| variant     | `'default' \| 'error'` | `'default'` | Input style variant       |
| placeholder | `string`               | —           | Placeholder text          |
| editable    | `boolean`              | `true`      | Whether input is editable |

## Card

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@whileloop-app/whileui';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>{/* Content */}</CardContent>
  <CardFooter>{/* Footer */}</CardFooter>
</Card>;
```

## Badge

```tsx
import { Badge, BadgeText } from '@whileloop-app/whileui';

<Badge variant="default">
  <BadgeText>New</BadgeText>
</Badge>;
```

| Prop    | Type                                                                                         | Default     |
| ------- | -------------------------------------------------------------------------------------------- | ----------- |
| variant | `'default' \| 'secondary' \| 'destructive' \| 'outline' \| 'success' \| 'warning' \| 'info'` | `'default'` |

## Alert

```tsx
import { Alert, AlertTitle, AlertDescription } from '@whileloop-app/whileui';

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
} from '@whileloop-app/whileui';

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
} from '@whileloop-app/whileui';

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
import { Checkbox } from '@whileloop-app/whileui';

<Checkbox checked={checked} onCheckedChange={setChecked} />;
```

| Prop            | Type                         | Default |
| --------------- | ---------------------------- | ------- |
| checked         | `boolean`                    | `false` |
| onCheckedChange | `(checked: boolean) => void` | —       |
| disabled        | `boolean`                    | `false` |

## Switch

```tsx
import { Switch } from '@whileloop-app/whileui';

<Switch checked={checked} onCheckedChange={setChecked} />;
```

| Prop            | Type                         | Default |
| --------------- | ---------------------------- | ------- |
| checked         | `boolean`                    | `false` |
| onCheckedChange | `(checked: boolean) => void` | —       |

## RadioGroup

```tsx
import { RadioGroup, RadioGroupItem } from '@whileloop-app/whileui';

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
} from '@whileloop-app/whileui';

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
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@whileloop-app/whileui';

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
} from '@whileloop-app/whileui';

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
import { Avatar, AvatarImage, AvatarFallback } from '@whileloop-app/whileui';

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
import { Progress } from '@whileloop-app/whileui';

<Progress value={50} size="default" />;
```

| Prop  | Type                        | Default     |
| ----- | --------------------------- | ----------- |
| value | `number`                    | `0`         |
| size  | `'sm' \| 'default' \| 'lg'` | `'default'` |

## Toast

```tsx
import { ToastProvider, ToastContainer, useToast } from '@whileloop-app/whileui';

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
import { Popover, PopoverTrigger, PopoverContent } from '@whileloop-app/whileui';

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
} from '@whileloop-app/whileui';

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
import { SignInForm } from '@whileloop-app/whileui';

<SignInForm onSubmit={(email, password) => {}} onForgotPassword={() => {}} onSignUp={() => {}} />;
```

## SignUpForm

```tsx
import { SignUpForm } from '@whileloop-app/whileui';

<SignUpForm onSubmit={(name, email, password) => {}} onSignIn={() => {}} />;
```

## BottomNav

```tsx
import { BottomNav } from '@whileloop-app/whileui';

<BottomNav
  items={[
    { key: 'home', label: 'Home', icon: <Icon /> },
    { key: 'profile', label: 'Profile', icon: <Icon />, badge: 3 },
  ]}
  activeKey="home"
  onSelect={(key) => {}}
/>;
```

## Header

```tsx
import { Header, HeaderBackButton } from '@whileloop-app/whileui';

<Header
  title="Settings"
  subtitle="Manage preferences"
  leftAction={<HeaderBackButton onPress={() => {}} />}
  rightActions={[{ key: 'search', icon: <Icon />, onPress: () => {} }]}
/>;
```

## SplashScreen

```tsx
import { SplashScreen } from '@whileloop-app/whileui';

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
import { EmptyState } from '@whileloop-app/whileui';

<EmptyState
  icon={<Icon />}
  title="No items"
  description="Add your first item."
  action={{ label: 'Add Item', onPress: () => {} }}
/>;
```

## ProfileHeader

```tsx
import { ProfileHeader } from '@whileloop-app/whileui';

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
import { SettingsSection, SettingsItem } from '@whileloop-app/whileui';

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
import { ProductCard } from '@whileloop-app/whileui';

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
import { PricingCard } from '@whileloop-app/whileui';

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
import { DrawerMenu } from '@whileloop-app/whileui';

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
