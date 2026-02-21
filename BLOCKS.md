# WhileUI Block Catalog

Machine-readable reference for blocks. Use this to discover available blocks, their props, and composition patterns.

## Tags

- `auth` — Authentication flows
- `navigation` — App shell, headers, tabs, drawers
- `layout` — Full-screen scaffolds, empty/error states
- `profile` — User profile and settings
- `list` — List items, notifications, feeds
- `commerce` — Products, pricing, checkout, metrics
- `splash` — Launch and onboarding
- `media` — Images and media

---

## Auth Blocks

### SignInForm

**Tags:** `auth`, `form`

Email/password sign-in with optional social buttons.

| Prop             | Type                                  | Required | Description                  |
| ---------------- | ------------------------------------- | -------- | ---------------------------- |
| onSubmit         | `(data: { email, password }) => void` | No       | Called on submit             |
| onForgotPassword | `() => void`                          | No       | Called when "Forgot?" tapped |
| onSignUp         | `() => void`                          | No       | Called when "Sign Up" tapped |
| onGooglePress    | `() => void`                          | No       | Called when Google tapped    |
| onApplePress     | `() => void`                          | No       | Called when Apple tapped     |

### SignUpForm

**Tags:** `auth`, `form`

Registration form with first/last name, email, password.

| Prop          | Type                                                       | Required | Description                  |
| ------------- | ---------------------------------------------------------- | -------- | ---------------------------- |
| onSubmit      | `(data: { firstName, lastName, email, password }) => void` | No       | Called on submit             |
| onSignIn      | `() => void`                                               | No       | Called when "Sign In" tapped |
| onGooglePress | `() => void`                                               | No       | Called when Google tapped    |
| onApplePress  | `() => void`                                               | No       | Called when Apple tapped     |

### ForgotPasswordForm

**Tags:** `auth`, `form`

| Prop           | Type                        | Required | Description                          |
| -------------- | --------------------------- | -------- | ------------------------------------ |
| onSubmit       | `(data: { email }) => void` | No       | Called on submit                     |
| onBackToSignIn | `() => void`                | No       | Called when "Back to Sign In" tapped |

### ResetPasswordForm

**Tags:** `auth`, `form`

| Prop     | Type                                            | Required | Description      |
| -------- | ----------------------------------------------- | -------- | ---------------- |
| onSubmit | `(data: { password, confirmPassword }) => void` | No       | Called on submit |

### VerifyEmailForm

**Tags:** `auth`, `form`

| Prop     | Type                       | Required | Description                 |
| -------- | -------------------------- | -------- | --------------------------- |
| onSubmit | `(data: { code }) => void` | No       | Called on submit            |
| onResend | `() => void`               | No       | Called when "Resend" tapped |

### SocialConnections

**Tags:** `auth`, `form`

| Prop          | Type         | Required | Description               |
| ------------- | ------------ | -------- | ------------------------- |
| onGooglePress | `() => void` | No       | Called when Google tapped |
| onApplePress  | `() => void` | No       | Called when Apple tapped  |
| onGitHubPress | `() => void` | No       | Called when GitHub tapped |

### UserMenu

**Tags:** `auth`, `profile`, `navigation`

| Prop           | Type                    | Required | Description                                                                      |
| -------------- | ----------------------- | -------- | -------------------------------------------------------------------------------- |
| email          | `string`                | No       | User email (default: "user@email.com")                                           |
| name           | `string`                | No       | Display name (default: "My Account")                                             |
| avatarFallback | `string`                | No       | Avatar initials (default: "U")                                                   |
| onSelect       | `(key: string) => void` | No       | Called when menu item tapped. Keys: profile, billing, settings, new-team, logout |

---

## Navigation Blocks

### AppShell

**Tags:** `navigation`, `layout`

Layout wrapper with slots for header, content, footer, bottomNav.

| Prop      | Type        | Required | Description                        |
| --------- | ----------- | -------- | ---------------------------------- |
| header    | `ReactNode` | No       | Top bar (e.g. Header)              |
| footer    | `ReactNode` | No       | Bottom bar above bottomNav         |
| bottomNav | `ReactNode` | No       | Bottom navigation (e.g. BottomNav) |
| safeArea  | `boolean`   | No       | Use SafeAreaView (default: true)   |
| children  | `ReactNode` | Yes      | Main content                       |

### Header

**Tags:** `navigation`

| Prop         | Type                            | Required | Description                  |
| ------------ | ------------------------------- | -------- | ---------------------------- |
| title        | `string`                        | No       | Header title                 |
| subtitle     | `string`                        | No       | Header subtitle              |
| leftAction   | `ReactNode`                     | No       | Left slot (e.g. back button) |
| rightActions | `Array<{ key, icon, onPress }>` | No       | Right-side actions           |

### BottomNav

**Tags:** `navigation`

| Prop      | Type                                  | Required | Description            |
| --------- | ------------------------------------- | -------- | ---------------------- |
| items     | `Array<{ key, label, icon, badge? }>` | Yes      | Tab items              |
| activeKey | `string`                              | Yes      | Active tab key         |
| onSelect  | `(key: string) => void`               | Yes      | Tab selection callback |

### FloatingBottomNav

**Tags:** `navigation`

Same API as BottomNav with elevated styling.

### DrawerMenu

**Tags:** `navigation`

| Prop      | Type                      | Required | Description             |
| --------- | ------------------------- | -------- | ----------------------- |
| visible   | `boolean`                 | Yes      | Drawer visibility       |
| onClose   | `() => void`              | Yes      | Close callback          |
| sections  | `Array<{ title, items }>` | Yes      | Menu sections           |
| activeKey | `string`                  | No       | Active item key         |
| onSelect  | `(key: string) => void`   | No       | Item selection callback |
| header    | `ReactNode`               | No       | Drawer header           |
| footer    | `ReactNode`               | No       | Drawer footer           |

### TabBar, NavigationSidebar

**Tags:** `navigation`

See README API Reference for full props.

---

## Layout Blocks

### FormModalScreen

**Tags:** `layout`, `form`

Modal scaffold for forms with title, close, loading, saving states.

| Prop          | Type         | Required | Description                             |
| ------------- | ------------ | -------- | --------------------------------------- |
| title         | `string`     | Yes      | Modal title                             |
| subtitle      | `string`     | No       | Modal subtitle                          |
| onClose       | `() => void` | No       | Close callback                          |
| loading       | `boolean`    | No       | Show loading spinner                    |
| saving        | `boolean`    | No       | Disable actions, show saving state      |
| savingText    | `string`     | No       | Text when saving (default: "Saving...") |
| leftSlot      | `ReactNode`  | No       | Left header slot (replaces close)       |
| rightSlot     | `ReactNode`  | No       | Right header slot                       |
| scrollEnabled | `boolean`    | No       | Enable scroll (default: true)           |
| children      | `ReactNode`  | Yes      | Form content                            |

### ActionBar

**Tags:** `layout`

Sticky bottom action row. Children are typically Buttons.

### ConfirmActionSheet

**Tags:** `layout`, `dialog`

| Prop         | Type                      | Required | Description          |
| ------------ | ------------------------- | -------- | -------------------- |
| open         | `boolean`                 | Yes      | Visibility           |
| onOpenChange | `(open: boolean) => void` | Yes      | Visibility callback  |
| title        | `string`                  | Yes      | Sheet title          |
| description  | `string`                  | No       | Sheet description    |
| confirmLabel | `string`                  | Yes      | Confirm button label |
| destructive  | `boolean`                 | No       | Destructive styling  |
| onConfirm    | `() => void`              | Yes      | Confirm callback     |

### EmptyState

**Tags:** `layout`

| Prop        | Type                 | Required | Description    |
| ----------- | -------------------- | -------- | -------------- |
| icon        | `ReactNode`          | No       | Icon           |
| title       | `string`             | Yes      | Title          |
| description | `string`             | No       | Description    |
| action      | `{ label, onPress }` | No       | Primary action |

### ErrorState

**Tags:** `layout`

| Prop        | Type                 | Required | Description   |
| ----------- | -------------------- | -------- | ------------- |
| title       | `string`             | No       | Error title   |
| description | `string`             | No       | Error message |
| action      | `{ label, onPress }` | No       | Retry action  |

### LoadingScreen, OnboardingScreen

**Tags:** `layout`, `splash`

See README for full props.

---

## Profile Blocks

### ProfileHeader

**Tags:** `profile`

| Prop           | Type                      | Required | Description         |
| -------------- | ------------------------- | -------- | ------------------- |
| name           | `string`                  | Yes      | Display name        |
| username       | `string`                  | No       | Username            |
| bio            | `string`                  | No       | Bio text            |
| avatarFallback | `string`                  | No       | Avatar initials     |
| avatarUrl      | `string`                  | No       | Avatar image URL    |
| stats          | `Array<{ label, value }>` | No       | Stat items          |
| action         | `{ label, onPress }`      | No       | Primary action      |
| verified       | `boolean`                 | No       | Show verified badge |

### AccountCard, SettingsSection, SettingsItem

**Tags:** `profile`

See README for full props.

---

## List Blocks

### ListItem

**Tags:** `list`

| Prop      | Type         | Required | Description              |
| --------- | ------------ | -------- | ------------------------ |
| title     | `string`     | Yes      | Title                    |
| subtitle  | `string`     | No       | Subtitle                 |
| leftSlot  | `ReactNode`  | No       | Left content (e.g. icon) |
| rightSlot | `ReactNode`  | No       | Right content            |
| onPress   | `() => void` | No       | Press handler            |

### NotificationItem

**Tags:** `list`

| Prop    | Type         | Required | Description    |
| ------- | ------------ | -------- | -------------- |
| title   | `string`     | Yes      | Title          |
| body    | `string`     | No       | Body text      |
| time    | `string`     | No       | Timestamp      |
| icon    | `ReactNode`  | No       | Icon           |
| unread  | `boolean`    | No       | Unread styling |
| onPress | `() => void` | No       | Press handler  |

### SwipeableItem

**Tags:** `list`

| Prop         | Type                                           | Required | Description         |
| ------------ | ---------------------------------------------- | -------- | ------------------- |
| leftActions  | `Array<{ key, label, onPress, destructive? }>` | No       | Left swipe actions  |
| rightActions | `Array<{...}>`                                 | No       | Right swipe actions |
| children     | `ReactNode`                                    | Yes      | Row content         |

### TimelineFeed

**Tags:** `list`

| Prop          | Type                                                      | Required | Description                          |
| ------------- | --------------------------------------------------------- | -------- | ------------------------------------ |
| items         | `Array<{ id, title, subtitle?, time?, icon?, content? }>` | Yes      | Timeline items                       |
| showConnector | `boolean`                                                 | No       | Show connector lines (default: true) |

---

## Commerce Blocks

### ProductCard

**Tags:** `commerce`

| Prop          | Type                         | Required | Description                |
| ------------- | ---------------------------- | -------- | -------------------------- |
| title         | `string`                     | Yes      | Product name               |
| price         | `string`                     | Yes      | Price                      |
| originalPrice | `string`                     | No       | Strikethrough price        |
| badge         | `string`                     | No       | Badge (e.g. "-23%")        |
| rating        | `number`                     | No       | Star rating                |
| reviewCount   | `number`                     | No       | Review count               |
| variant       | `'vertical' \| 'horizontal'` | No       | Layout (default: vertical) |
| onPress       | `() => void`                 | No       | Press handler              |

### PricingCard

**Tags:** `commerce`

| Prop        | Type                         | Required | Description            |
| ----------- | ---------------------------- | -------- | ---------------------- |
| name        | `string`                     | Yes      | Plan name              |
| description | `string`                     | No       | Plan description       |
| price       | `string`                     | Yes      | Price                  |
| period      | `string`                     | No       | Period (e.g. "/month") |
| badge       | `string`                     | No       | Badge (e.g. "Popular") |
| highlighted | `boolean`                    | No       | Highlighted styling    |
| features    | `Array<{ label, included }>` | No       | Feature list           |
| onPress     | `() => void`                 | No       | Press handler          |

### CheckoutSummary

**Tags:** `commerce`

| Prop     | Type                                    | Required | Description |
| -------- | --------------------------------------- | -------- | ----------- |
| items    | `Array<{ id, title, quantity, price }>` | Yes      | Line items  |
| subtotal | `string`                                | Yes      | Subtotal    |
| tax      | `string`                                | No       | Tax         |
| total    | `string`                                | Yes      | Total       |

### MetricCard

**Tags:** `commerce`, `layout`

| Prop     | Type                      | Required | Description    |
| -------- | ------------------------- | -------- | -------------- |
| label    | `string`                  | Yes      | Metric label   |
| value    | `string \| number`        | Yes      | Metric value   |
| subtitle | `string`                  | No       | Subtitle       |
| progress | `number`                  | No       | Progress 0–100 |
| segments | `Array<{ value, color }>` | No       | Segmented bar  |
| icon     | `ReactNode`               | No       | Icon           |
| variant  | `'default' \| 'outlined'` | No       | Style variant  |

---

## Splash Blocks

### SplashScreen, MinimalSplash, BrandedSplash

**Tags:** `splash`

| Prop                | Type                           | Required | Description                 |
| ------------------- | ------------------------------ | -------- | --------------------------- |
| logo                | `ReactNode`                    | No       | Logo                        |
| appName             | `string`                       | No       | App name                    |
| tagline             | `string`                       | No       | Tagline                     |
| variant             | `'fade' \| 'scale' \| 'slide'` | No       | Animation                   |
| duration            | `number`                       | No       | Animation duration (ms)     |
| showLoading         | `boolean`                      | No       | Show loading indicator      |
| onAnimationComplete | `() => void`                   | No       | Animation complete callback |

---

## Media Blocks

### SmartImage

**Tags:** `media`

| Prop        | Type          | Required | Description               |
| ----------- | ------------- | -------- | ------------------------- |
| source      | `ImageSource` | Yes      | Image source              |
| aspectRatio | `number`      | No       | Aspect ratio (default: 1) |
| alt         | `string`      | No       | Accessibility label       |

---

## Composition Order

Recommended order when composing screens:

1. **AppShell** — outermost wrapper
2. **Header** — in `header` slot
3. **ScrollView** or content — in `children`
4. **BottomNav** or **ActionBar** — in `bottomNav` or `footer` slot

Example:

```tsx
<AppShell
  header={<Header title="Home" />}
  bottomNav={<BottomNav items={...} activeKey="home" onSelect={...} />}
>
  <ScrollView className="flex-1 p-4">
    <Stack gap="lg">
      {/* Content */}
    </Stack>
  </ScrollView>
</AppShell>
```
