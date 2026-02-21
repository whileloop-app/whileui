# Blueprints

Blueprints are **composable flow patterns** that combine multiple blocks. Use these as reference when building apps—AI and developers can compose flows without designing from scratch.

---

## Auth Flow Blueprint

**Goal:** Sign-in → Sign-up → Forgot password → Verify email → Reset password

### Flow Diagram

```
Splash (optional)
    ↓
SignIn → ForgotPassword → (email sent) → ResetPassword
    ↑         ↑                              ↓
    └── SignUp ─→ VerifyEmail ──────────────┘
```

### Screen Mapping

| Screen          | Block                | Callbacks to wire                                                           |
| --------------- | -------------------- | --------------------------------------------------------------------------- |
| Sign In         | `SignInForm`         | `onSubmit`, `onForgotPassword`, `onSignUp`, `onGooglePress`, `onApplePress` |
| Sign Up         | `SignUpForm`         | `onSubmit`, `onSignIn`, `onGooglePress`, `onApplePress`                     |
| Forgot Password | `ForgotPasswordForm` | `onSubmit`, `onBackToSignIn`                                                |
| Verify Email    | `VerifyEmailForm`    | `onSubmit`, `onResend`                                                      |
| Reset Password  | `ResetPasswordForm`  | `onSubmit`                                                                  |

### Example Implementation (React Navigation)

```tsx
// Auth screens using WhileUI blocks
import {
  SignInForm,
  SignUpForm,
  ForgotPasswordForm,
  VerifyEmailForm,
  ResetPasswordForm,
} from '@thewhileloop/whileui';

function SignInScreen({ navigation }) {
  return (
    <View className="flex-1 justify-center items-center p-4">
      <SignInForm
        onSubmit={async ({ email, password }) => {
          await signIn(email, password);
          navigation.replace('Home');
        }}
        onForgotPassword={() => navigation.navigate('ForgotPassword')}
        onSignUp={() => navigation.navigate('SignUp')}
        onGooglePress={() => signInWithGoogle()}
        onApplePress={() => signInWithApple()}
      />
    </View>
  );
}

function SignUpScreen({ navigation }) {
  return (
    <View className="flex-1 justify-center items-center p-4">
      <SignUpForm
        onSubmit={async ({ firstName, lastName, email, password }) => {
          await signUp(firstName, lastName, email, password);
          navigation.navigate('VerifyEmail');
        }}
        onSignIn={() => navigation.goBack()}
        onGooglePress={() => signInWithGoogle()}
        onApplePress={() => signInWithApple()}
      />
    </View>
  );
}

function ForgotPasswordScreen({ navigation }) {
  return (
    <View className="flex-1 justify-center items-center p-4">
      <ForgotPasswordForm
        onSubmit={async ({ email }) => {
          await sendResetEmail(email);
          navigation.navigate('ResetPassword', { email });
        }}
        onBackToSignIn={() => navigation.goBack()}
      />
    </View>
  );
}
```

### Auth Stack Navigator Setup

```tsx
<Stack.Navigator screenOptions={{ headerShown: false }}>
  <Stack.Screen name="SignIn" component={SignInScreen} />
  <Stack.Screen name="SignUp" component={SignUpScreen} />
  <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
  <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
</Stack.Navigator>
```

---

## Settings Flow Blueprint

**Goal:** Profile header → Settings list → Detail/edit screens

### Flow Diagram

```
ProfileHeader
    ↓
SettingsSection
  - SettingsItem (Notifications) → NotificationsScreen
  - SettingsItem (Privacy) → PrivacyScreen
  - SettingsItem (Sign Out) → onLogout
```

### Blocks Used

- `ProfileHeader` — Avatar, name, stats, edit button
- `SettingsSection` — Group with title
- `SettingsItem` — Toggle, link, or action row
- `FormModalScreen` — For edit forms (e.g. edit profile)

### Example

```tsx
<ScrollView className="flex-1">
  <ProfileHeader
    name="John Doe"
    username="johndoe"
    avatarFallback="JD"
    stats={[
      { label: 'Followers', value: '1.2K' },
      { label: 'Following', value: '234' },
    ]}
    action={{ label: 'Edit Profile', onPress: () => setEditModalOpen(true) }}
  />
  <SettingsSection title="Preferences">
    <SettingsItem
      icon={<Icon name="bell" />}
      label="Notifications"
      type="toggle"
      toggleValue={notifications}
      onToggle={setNotifications}
    />
    <SettingsItem
      icon={<Icon name="lock" />}
      label="Privacy"
      value="Public"
      onPress={() => navigate('Privacy')}
    />
  </SettingsSection>
  <SettingsSection title="Account">
    <SettingsItem
      icon={<Icon name="log-out" />}
      label="Sign Out"
      type="action"
      destructive
      onPress={onLogout}
    />
  </SettingsSection>
</ScrollView>
```

---

## E-Commerce Flow Blueprint

**Goal:** Product list → Product detail → Checkout

### Flow Diagram

```
Product List (ProductCard grid)
    ↓ onPress
Product Detail (ProductCard + Add to cart)
    ↓
Checkout (CheckoutSummary + ActionBar)
```

### Blocks Used

- `ProductCard` — Product list and detail
- `PricingCard` — For plans or variants
- `CheckoutSummary` — Cart summary
- `ActionBar` — Checkout actions (Place order, etc.)
- `MetricCard` — Dashboard stats (orders, revenue)

### Example Product List

```tsx
<ScrollView className="flex-1 p-4">
  <View className="flex-row flex-wrap gap-3">
    {products.map((p) => (
      <View key={p.id} className="w-[47%]">
        <ProductCard
          title={p.name}
          price={p.price}
          originalPrice={p.originalPrice}
          badge={p.badge}
          rating={p.rating}
          reviewCount={p.reviewCount}
          onPress={() => navigation.navigate('Product', { id: p.id })}
        />
      </View>
    ))}
  </View>
</ScrollView>
```

### Example Checkout Screen

```tsx
<AppShell
  footer={
    <ActionBar>
      <Button variant="outline" className="flex-1" onPress={() => navigation.goBack()}>
        <ButtonText>Back</ButtonText>
      </Button>
      <Button className="flex-1" onPress={placeOrder}>
        <ButtonText>Place Order</ButtonText>
      </Button>
    </ActionBar>
  }
>
  <CheckoutSummary items={cartItems} subtotal={subtotal} tax={tax} total={total} />
</AppShell>
```

---

## App Shell Blueprint

**Goal:** Standard app layout with header, content, and bottom nav

### Structure

```
AppShell
├── header: Header
├── children: ScrollView + content
└── bottomNav: BottomNav
```

### Example

```tsx
function MainApp() {
  const [tab, setTab] = useState('home');

  return (
    <AppShell
      header={
        <Header
          title="MyApp"
          rightActions={[
            { key: 'search', icon: <SearchIcon />, onPress: () => {} },
            {
              key: 'profile',
              icon: <UserMenu email={user.email} name={user.name} onSelect={handleMenuSelect} />,
            },
          ]}
        />
      }
      bottomNav={
        <BottomNav
          items={[
            { key: 'home', label: 'Home', icon: <HomeIcon /> },
            { key: 'explore', label: 'Explore', icon: <ExploreIcon /> },
            { key: 'profile', label: 'Profile', icon: <ProfileIcon /> },
          ]}
          activeKey={tab}
          onSelect={setTab}
        />
      }
    >
      <ScrollView className="flex-1 p-4">
        {tab === 'home' && <HomeContent />}
        {tab === 'explore' && <ExploreContent />}
        {tab === 'profile' && <ProfileContent />}
      </ScrollView>
    </AppShell>
  );
}
```

---

## Summary

| Blueprint       | Blocks                                                                         | Use Case                     |
| --------------- | ------------------------------------------------------------------------------ | ---------------------------- |
| Auth Flow       | SignInForm, SignUpForm, ForgotPasswordForm, VerifyEmailForm, ResetPasswordForm | Auth screens with routing    |
| Settings Flow   | ProfileHeader, SettingsSection, SettingsItem, FormModalScreen                  | Profile and settings screens |
| E-Commerce Flow | ProductCard, CheckoutSummary, ActionBar, MetricCard                            | Product catalog and checkout |
| App Shell       | AppShell, Header, BottomNav                                                    | Main app layout              |

Reference [BLOCKS.md](../BLOCKS.md) for full prop details.
