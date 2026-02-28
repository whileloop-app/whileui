import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Text,
  Button,
  ButtonText,
  Badge,
  BadgeText,
  Row,
  Stack,
  Separator,
  Card,
  CardContent,
  Input,
  Spinner,
  useThemeColors,
} from '@thewhileloop/whileui';
import {
  ProductCard,
  PricingCard,
  CheckoutSummary,
  MetricCard,
} from '@thewhileloop/whileui/blocks/commerce';
import { ListItem, NotificationItem, TimelineFeed } from '@thewhileloop/whileui/blocks/lists';
import { ChatMessageBubble, ChatSuggestions } from '@thewhileloop/whileui/blocks/chat';
import {
  EmptyState,
  ErrorState,
  ContentSkeleton,
  PageSkeleton,
  LoadingScreen,
  ActionBar,
} from '@thewhileloop/whileui/blocks/layout';
import { Header, TabBar, NavigationSidebar } from '@thewhileloop/whileui/blocks/navigation';
import { DatePickerInline } from '@thewhileloop/whileui/blocks/datepicker';
import { Feather } from '@expo/vector-icons';

interface BlockDemoEntry {
  preview: React.ReactNode;
  code: string;
}

// ─── Commerce ────────────────────────────────────────────────

function ProductCardDemo() {
  return (
    <Row className="flex-wrap gap-4">
      <ProductCard
        title="Wireless Headphones"
        description="Premium noise-cancelling over-ear headphones"
        price="$249.99"
        originalPrice="$349.99"
        badge="Sale"
        rating={4.5}
        reviewCount={128}
        inStock
      />
      <ProductCard
        title="Smart Watch Pro"
        description="Health tracking, GPS, always-on display"
        price="$399.00"
        rating={4.8}
        reviewCount={256}
        inStock
        variant="horizontal"
      />
    </Row>
  );
}

function PricingCardDemo() {
  return (
    <Row className="flex-wrap gap-4 items-start">
      <PricingCard
        name="Starter"
        description="For personal projects"
        price="$0"
        period="/month"
        features={[
          { label: '3 projects', included: true },
          { label: '1 GB storage', included: true },
          { label: 'Community support', included: true },
          { label: 'Custom domains', included: false },
          { label: 'Analytics', included: false },
        ]}
        buttonLabel="Get Started"
        onPress={() => {}}
      />
      <PricingCard
        name="Pro"
        description="For growing teams"
        price="$29"
        period="/month"
        badge="Popular"
        highlighted
        features={[
          { label: 'Unlimited projects', included: true },
          { label: '100 GB storage', included: true },
          { label: 'Priority support', included: true },
          { label: 'Custom domains', included: true },
          { label: 'Advanced analytics', included: true },
        ]}
        buttonLabel="Upgrade to Pro"
        onPress={() => {}}
      />
    </Row>
  );
}

function CheckoutSummaryDemo() {
  return (
    <View className="w-[360px]">
      <CheckoutSummary
        items={[
          { label: 'Wireless Headphones × 1', value: '$249.99' },
          { label: 'USB-C Cable × 2', value: '$19.98' },
          { label: 'Carrying Case', value: '$39.99' },
        ]}
        subtotal="$309.96"
        shipping="$5.99"
        tax="$24.80"
        discount="-$30.00"
        total="$310.75"
        onCheckout={() => {}}
      />
    </View>
  );
}

function MetricCardDemo() {
  return (
    <Row className="flex-wrap gap-4">
      <MetricCard label="Revenue" value="$12,450" subtitle="+12% from last month" progress={72} />
      <MetricCard label="Users" value="1,284" subtitle="+8% this week" variant="outlined" />
      <MetricCard label="Orders" value="342" subtitle="28 pending" progress={85} />
    </Row>
  );
}

// ─── Lists ───────────────────────────────────────────────────

function ListItemDemo() {
  const colors = useThemeColors();
  return (
    <Stack className="w-[400px]">
      <ListItem
        icon={<Feather name="user" size={18} color={colors.primary} />}
        title="Account Settings"
        subtitle="Manage your profile and preferences"
        rightIcon={<Feather name="chevron-right" size={16} color={colors.mutedForeground} />}
      />
      <ListItem
        icon={<Feather name="bell" size={18} color={colors.primary} />}
        title="Notifications"
        subtitle="Push, email, and in-app alerts"
        rightText="3 new"
      />
      <ListItem
        icon={<Feather name="shield" size={18} color={colors.primary} />}
        title="Privacy & Security"
        compact
      />
    </Stack>
  );
}

function NotificationItemDemo() {
  return (
    <Stack className="w-[400px]">
      <NotificationItem
        avatarFallback="JD"
        title="John Doe"
        message="Commented on your post: 'Great work on the new design!'"
        time="2m ago"
      />
      <NotificationItem
        avatarFallback="AS"
        title="Alice Smith"
        message="Sent you a connection request"
        time="1h ago"
        read
      />
      <NotificationItem
        avatarFallback="SY"
        title="System"
        message="Your subscription has been renewed successfully."
        time="3h ago"
        read
      />
    </Stack>
  );
}

function TimelineFeedDemo() {
  return (
    <View className="w-[400px]">
      <TimelineFeed
        items={[
          {
            id: '1',
            title: 'Order placed',
            subtitle: 'Your order #1234 was received',
            time: '9:00 AM',
          },
          {
            id: '2',
            title: 'Payment confirmed',
            subtitle: 'Payment of $310.75 processed',
            time: '9:01 AM',
          },
          {
            id: '3',
            title: 'Shipped',
            subtitle: 'Package dispatched via Express',
            time: '2:30 PM',
          },
          { id: '4', title: 'Out for delivery', time: 'Tomorrow' },
        ]}
      />
    </View>
  );
}

// ─── Chat ────────────────────────────────────────────────────

function ChatMessageBubbleDemo() {
  return (
    <Stack className="gap-3 w-[400px]">
      <ChatMessageBubble
        message={{ id: '1', role: 'user', content: 'How do I set up dark mode in WhileUI?' }}
      />
      <ChatMessageBubble
        message={{
          id: '2',
          role: 'assistant',
          content:
            'Use Uniwind.setTheme("dark") to switch to dark mode. All semantic tokens update automatically.',
        }}
      />
      <ChatMessageBubble
        message={{
          id: '3',
          role: 'system',
          content: 'Theme changed to dark mode.',
          contentSize: 'sm',
        }}
      />
    </Stack>
  );
}

function ChatSuggestionsDemo() {
  return (
    <View className="w-[400px]">
      <ChatSuggestions
        suggestions={[
          'How do I get started?',
          'Show me components',
          'What themes are available?',
          'Help with forms',
        ]}
        onSelect={() => {}}
      />
    </View>
  );
}

// ─── Layout ──────────────────────────────────────────────────

function EmptyStateDemo() {
  const colors = useThemeColors();
  return (
    <View className="w-[400px]">
      <EmptyState
        icon={<Feather name="inbox" size={32} color={colors.mutedForeground} />}
        title="No messages yet"
        description="Start a conversation or wait for someone to reach out."
        action={{ label: 'New Message', onPress: () => {} }}
        secondaryAction={{ label: 'Learn More', onPress: () => {} }}
      />
    </View>
  );
}

function ErrorStateDemo() {
  return (
    <View className="w-[400px]">
      <ErrorState
        title="Failed to load data"
        description="We couldn't reach the server. Check your connection and try again."
        onRetry={() => {}}
        retryLabel="Retry"
      />
    </View>
  );
}

function ContentSkeletonDemo() {
  return (
    <Row className="flex-wrap gap-6">
      <View className="w-[280px]">
        <Text className="text-xs text-muted-foreground font-medium mb-2">List variant</Text>
        <ContentSkeleton variant="list" rows={3} />
      </View>
      <View className="w-[280px]">
        <Text className="text-xs text-muted-foreground font-medium mb-2">Card variant</Text>
        <ContentSkeleton variant="card" />
      </View>
    </Row>
  );
}

function LoadingScreenDemo() {
  return (
    <View className="h-[200px] w-[300px] rounded-lg border border-border overflow-hidden">
      <LoadingScreen />
    </View>
  );
}

function ActionBarDemo() {
  return (
    <View className="w-[400px] border border-border rounded-lg overflow-hidden">
      <View className="p-4">
        <Text className="text-sm text-muted-foreground">Content above the action bar</Text>
      </View>
      <ActionBar sticky={false} safeArea={false}>
        <Row className="flex-1 gap-3 justify-end">
          <Button variant="outline">
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button>
            <ButtonText>Save Changes</ButtonText>
          </Button>
        </Row>
      </ActionBar>
    </View>
  );
}

// ─── Navigation ──────────────────────────────────────────────

function HeaderDemo() {
  const colors = useThemeColors();
  return (
    <Stack className="gap-4 w-[400px]">
      <Header
        title="Settings"
        leftAction={
          <View className="p-2">
            <Feather name="arrow-left" size={20} color={colors.foreground} />
          </View>
        }
        rightActions={[
          {
            key: 'search',
            icon: <Feather name="search" size={18} color={colors.foreground} />,
            onPress: () => {},
          },
          {
            key: 'more',
            icon: <Feather name="more-vertical" size={18} color={colors.foreground} />,
            onPress: () => {},
          },
        ]}
      />
      <Header title="Dashboard" subtitle="Overview" border={false} />
    </Stack>
  );
}

function TabBarDemo() {
  const [active, setActive] = useState('home');
  return (
    <Stack className="gap-4 w-[400px]">
      <TabBar
        items={[
          { key: 'home', label: 'Home' },
          { key: 'explore', label: 'Explore' },
          { key: 'saved', label: 'Saved' },
          { key: 'profile', label: 'Profile' },
        ]}
        activeKey={active}
        onSelect={setActive}
      />
      <TabBar
        items={[
          { key: 'all', label: 'All' },
          { key: 'active', label: 'Active' },
          { key: 'archived', label: 'Archived' },
        ]}
        activeKey="all"
        onSelect={() => {}}
        variant="pills"
      />
    </Stack>
  );
}

function NavigationSidebarDemo() {
  const [active, setActive] = useState('dashboard');
  const colors = useThemeColors();
  return (
    <View className="w-[240px] h-[360px] border border-border rounded-lg overflow-hidden">
      <NavigationSidebar
        activeKey={active}
        onSelect={setActive}
        header={
          <View className="px-4 py-3 border-b border-border">
            <Text className="text-sm font-bold text-foreground">My App</Text>
          </View>
        }
        sections={[
          {
            title: 'General',
            items: [
              {
                key: 'dashboard',
                label: 'Dashboard',
                icon: (
                  <Feather
                    name="home"
                    size={16}
                    color={active === 'dashboard' ? colors.primary : colors.mutedForeground}
                  />
                ),
              },
              {
                key: 'analytics',
                label: 'Analytics',
                icon: (
                  <Feather
                    name="bar-chart-2"
                    size={16}
                    color={active === 'analytics' ? colors.primary : colors.mutedForeground}
                  />
                ),
                badge: 3,
              },
              {
                key: 'users',
                label: 'Users',
                icon: (
                  <Feather
                    name="users"
                    size={16}
                    color={active === 'users' ? colors.primary : colors.mutedForeground}
                  />
                ),
              },
            ],
          },
          {
            title: 'Settings',
            items: [
              {
                key: 'general',
                label: 'General',
                icon: (
                  <Feather
                    name="settings"
                    size={16}
                    color={active === 'general' ? colors.primary : colors.mutedForeground}
                  />
                ),
              },
              {
                key: 'billing',
                label: 'Billing',
                icon: (
                  <Feather
                    name="credit-card"
                    size={16}
                    color={active === 'billing' ? colors.primary : colors.mutedForeground}
                  />
                ),
              },
            ],
          },
        ]}
      />
    </View>
  );
}

// ─── Datepicker ──────────────────────────────────────────────

function DatePickerInlineDemo() {
  const [date, setDate] = useState<string | null>(null);
  return (
    <View className="w-[340px]">
      <DatePickerInline value={date} onValueChange={setDate} />
      {date && (
        <Text className="text-sm text-muted-foreground mt-2 text-center">Selected: {date}</Text>
      )}
    </View>
  );
}

// ─── Exports ─────────────────────────────────────────────────

export const blockDemos: Record<string, BlockDemoEntry> = {
  'product-card': {
    preview: <ProductCardDemo />,
    code: `<ProductCard
  title="Wireless Headphones"
  description="Premium noise-cancelling"
  price="$249.99"
  originalPrice="$349.99"
  badge="Sale"
  rating={4.5}
  reviewCount={128}
  inStock
/>`,
  },
  'pricing-card': {
    preview: <PricingCardDemo />,
    code: `<PricingCard
  name="Pro"
  price="$29"
  period="/month"
  badge="Popular"
  highlighted
  features={[
    { label: 'Unlimited projects', included: true },
    { label: 'Priority support', included: true },
  ]}
  buttonLabel="Upgrade"
  onPress={() => {}}
/>`,
  },
  'checkout-summary': {
    preview: <CheckoutSummaryDemo />,
    code: `<CheckoutSummary
  items={[
    { label: 'Headphones × 1', value: '$249.99' },
    { label: 'Cable × 2', value: '$19.98' },
  ]}
  subtotal="$269.97"
  shipping="$5.99"
  tax="$21.60"
  total="$297.56"
  onCheckout={() => {}}
/>`,
  },
  'metric-card': {
    preview: <MetricCardDemo />,
    code: `<MetricCard
  label="Revenue"
  value="$12,450"
  subtitle="+12% from last month"
  progress={72}
/>`,
  },
  'list-item': {
    preview: <ListItemDemo />,
    code: `<ListItem
  icon={<Feather name="user" size={18} />}
  title="Account Settings"
  subtitle="Manage your profile"
  rightIcon={<Feather name="chevron-right" size={16} />}
/>`,
  },
  'notification-item': {
    preview: <NotificationItemDemo />,
    code: `<NotificationItem
  avatarFallback="JD"
  title="John Doe"
  message="Commented on your post"
  time="2m ago"
/>`,
  },
  'timeline-feed': {
    preview: <TimelineFeedDemo />,
    code: `<TimelineFeed items={[
  { id: '1', title: 'Order placed', subtitle: 'Order #1234 received', time: '9:00 AM' },
  { id: '2', title: 'Payment confirmed', time: '9:01 AM' },
  { id: '3', title: 'Shipped', subtitle: 'Via Express', time: '2:30 PM' },
]} />`,
  },
  'chat-message-bubble': {
    preview: <ChatMessageBubbleDemo />,
    code: `<ChatMessageBubble
  message={{ id: '1', role: 'user', content: 'Hello!' }}
/>
<ChatMessageBubble
  message={{ id: '2', role: 'assistant', content: 'Hi there!' }}
/>`,
  },
  'chat-suggestions': {
    preview: <ChatSuggestionsDemo />,
    code: `<ChatSuggestions
  suggestions={['How do I get started?', 'Show me components']}
  onSelect={(text) => console.log(text)}
/>`,
  },
  'empty-state': {
    preview: <EmptyStateDemo />,
    code: `<EmptyState
  icon={<Feather name="inbox" size={32} />}
  title="No messages yet"
  description="Start a conversation."
  action={{ label: 'New Message', onPress: () => {} }}
/>`,
  },
  'error-state': {
    preview: <ErrorStateDemo />,
    code: `<ErrorState
  title="Failed to load data"
  description="Check your connection."
  onRetry={() => {}}
/>`,
  },
  'content-skeleton': {
    preview: <ContentSkeletonDemo />,
    code: `<ContentSkeleton variant="list" rows={3} />
<ContentSkeleton variant="card" />`,
  },
  'loading-screen': {
    preview: <LoadingScreenDemo />,
    code: `<LoadingScreen />`,
  },
  'action-bar': {
    preview: <ActionBarDemo />,
    code: `<ActionBar>
  <Row className="flex-1 gap-3 justify-end">
    <Button variant="outline"><ButtonText>Cancel</ButtonText></Button>
    <Button><ButtonText>Save</ButtonText></Button>
  </Row>
</ActionBar>`,
  },
  header: {
    preview: <HeaderDemo />,
    code: `<Header
  title="Settings"
  leftAction={<HeaderBackButton onPress={goBack} />}
  rightActions={[
    { key: 'search', icon: <Feather name="search" />, onPress: () => {} },
  ]}
/>`,
  },
  'navigation-sidebar': {
    preview: <NavigationSidebarDemo />,
    code: `<NavigationSidebar
  activeKey={active}
  onSelect={setActive}
  sections={[
    {
      title: 'General',
      items: [
        { key: 'dashboard', label: 'Dashboard', icon: <Feather name="home" /> },
        { key: 'analytics', label: 'Analytics', badge: 3 },
      ],
    },
  ]}
/>`,
  },
  'tab-bar': {
    preview: <TabBarDemo />,
    code: `<TabBar
  items={[
    { key: 'home', label: 'Home' },
    { key: 'explore', label: 'Explore' },
    { key: 'saved', label: 'Saved' },
  ]}
  activeKey={active}
  onSelect={setActive}
  variant="pills"
/>`,
  },
  'date-picker-inline': {
    preview: <DatePickerInlineDemo />,
    code: `const [date, setDate] = useState<string | null>(null);

<DatePickerInline value={date} onValueChange={setDate} />`,
  },
  'page-skeleton': {
    preview: (
      <View className="h-[250px] w-[300px] rounded-lg border border-border overflow-hidden">
        <PageSkeleton variant="dashboard" />
      </View>
    ),
    code: `<PageSkeleton />`,
  },
  'error-boundary': {
    preview: (
      <View className="w-[360px] p-6 items-center">
        <Text className="text-sm text-muted-foreground text-center">
          ErrorBoundary is a wrapper component — it renders its children normally and shows a
          fallback UI only when an error is caught. No visual preview needed.
        </Text>
      </View>
    ),
    code: `<ErrorBoundary fallback={<ErrorState title="Crash" onRetry={() => window.location.reload()} />}>
  <YourApp />
</ErrorBoundary>`,
  },
  'smart-image': {
    preview: (
      <View className="w-[300px] p-4 items-center">
        <Text className="text-sm text-muted-foreground text-center">
          SmartImage wraps an Image with aspect ratio and loading placeholder. Provide an imageUrl
          to see it in action.
        </Text>
      </View>
    ),
    code: `<SmartImage
  source={{ uri: 'https://example.com/photo.jpg' }}
  aspectRatio={16 / 9}
/>`,
  },
};
