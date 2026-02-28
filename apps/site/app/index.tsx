import React, { useState } from 'react';
import { View, Pressable, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import {
  Text,
  Badge,
  BadgeText,
  Button,
  ButtonText,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  Row,
  Stack,
  Input,
  Switch,
  Checkbox,
  Progress,
  Avatar,
  AvatarFallback,
  Alert,
  AlertTitle,
  AlertDescription,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Spinner,
  Skeleton,
  SegmentedControl,
  SegmentedControlItem,
  SegmentedControlItemText,
  Separator,
  useThemeColors,
} from '@thewhileloop/whileui';
import { components, blocks } from '../lib/registry';

const isWeb = Platform.OS === 'web';

function HeroHeading({ children }: { children: string }) {
  return (
    <Text className="text-5xl sm:text-6xl font-bold text-foreground text-center tracking-tight leading-[1.1] max-w-3xl">
      {children}
    </Text>
  );
}

function ShowcaseCell({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <View
      className={`rounded-2xl border border-border bg-card p-6 items-center justify-center ${className}`}
      style={
        isWeb
          ? ({
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
              transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
            } as any)
          : undefined
      }
    >
      {children}
    </View>
  );
}

function LiveShowcase() {
  const [switchOn, setSwitchOn] = useState(true);
  const [checkboxOn, setCheckboxOn] = useState(true);
  const [segValue, setSegValue] = useState('week');

  return (
    <View className="gap-8">
      <Stack className="items-center gap-3">
        <Text className="text-2xl font-bold text-foreground text-center tracking-tight">
          See it live
        </Text>
        <Text className="text-base text-muted-foreground text-center max-w-lg leading-relaxed">
          Every component below is interactive. Built with React Native, running on the web.
        </Text>
      </Stack>

      <View className="flex-row flex-wrap gap-4 justify-center">
        <ShowcaseCell className="min-w-[280px] max-w-[340px]">
          <Stack className="gap-3 w-full">
            <Text className="text-xs text-muted-foreground font-semibold tracking-wider uppercase">
              Buttons
            </Text>
            <Row className="flex-wrap gap-2">
              <Button size="sm">
                <ButtonText>Primary</ButtonText>
              </Button>
              <Button size="sm" variant="secondary">
                <ButtonText>Secondary</ButtonText>
              </Button>
              <Button size="sm" variant="outline">
                <ButtonText>Outline</ButtonText>
              </Button>
              <Button size="sm" variant="ghost">
                <ButtonText>Ghost</ButtonText>
              </Button>
              <Button size="sm" variant="destructive">
                <ButtonText>Danger</ButtonText>
              </Button>
            </Row>
          </Stack>
        </ShowcaseCell>

        <ShowcaseCell className="min-w-[220px] max-w-[280px]">
          <Stack className="gap-4 w-full">
            <Text className="text-xs text-muted-foreground font-semibold tracking-wider uppercase">
              Controls
            </Text>
            <Row className="items-center gap-3">
              <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
              <Text className="text-sm text-foreground">{switchOn ? 'On' : 'Off'}</Text>
            </Row>
            <Row className="items-center gap-3">
              <Checkbox checked={checkboxOn} onCheckedChange={setCheckboxOn} />
              <Text className="text-sm text-foreground">Accept terms</Text>
            </Row>
          </Stack>
        </ShowcaseCell>

        <ShowcaseCell className="min-w-[280px] max-w-[340px]">
          <Stack className="gap-3 w-full">
            <Text className="text-xs text-muted-foreground font-semibold tracking-wider uppercase">
              Input
            </Text>
            <Input placeholder="Enter your email..." />
            <Input placeholder="Error state" variant="error" />
          </Stack>
        </ShowcaseCell>

        <ShowcaseCell className="min-w-[300px] max-w-[380px]">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Project Settings</CardTitle>
              <CardDescription>Manage your project configuration.</CardDescription>
            </CardHeader>
            <CardContent>
              <Text className="text-sm text-muted-foreground">
                Configure builds, deployments, and team access.
              </Text>
            </CardContent>
            <CardFooter>
              <Button size="sm">
                <ButtonText>Save</ButtonText>
              </Button>
            </CardFooter>
          </Card>
        </ShowcaseCell>

        <ShowcaseCell className="min-w-[260px] max-w-[320px]">
          <Stack className="gap-3 w-full">
            <Text className="text-xs text-muted-foreground font-semibold tracking-wider uppercase">
              Badges
            </Text>
            <Row className="flex-wrap gap-2">
              <Badge>
                <BadgeText>Default</BadgeText>
              </Badge>
              <Badge variant="secondary">
                <BadgeText>Secondary</BadgeText>
              </Badge>
              <Badge variant="destructive">
                <BadgeText>Error</BadgeText>
              </Badge>
              <Badge variant="outline">
                <BadgeText>Outline</BadgeText>
              </Badge>
              <Badge variant="success">
                <BadgeText>Success</BadgeText>
              </Badge>
            </Row>
          </Stack>
        </ShowcaseCell>

        <ShowcaseCell className="min-w-[220px] max-w-[280px]">
          <Stack className="gap-4 w-full">
            <Text className="text-xs text-muted-foreground font-semibold tracking-wider uppercase">
              Display
            </Text>
            <Row className="gap-2 items-center">
              <Avatar size="sm">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <Avatar size="lg">
                <AvatarFallback>MK</AvatarFallback>
              </Avatar>
            </Row>
            <Progress value={68} />
          </Stack>
        </ShowcaseCell>

        <ShowcaseCell className="min-w-[300px] max-w-[380px]">
          <Stack className="gap-3 w-full">
            <Alert variant="success">
              <AlertTitle>Deployed</AlertTitle>
              <AlertDescription>Your changes are live on production.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTitle>Build Failed</AlertTitle>
              <AlertDescription>Check the logs for details.</AlertDescription>
            </Alert>
          </Stack>
        </ShowcaseCell>

        <ShowcaseCell className="min-w-[280px] max-w-[340px]">
          <Stack className="gap-3 w-full">
            <Text className="text-xs text-muted-foreground font-semibold tracking-wider uppercase">
              Segmented
            </Text>
            <SegmentedControl value={segValue} onValueChange={setSegValue}>
              <SegmentedControlItem value="day">
                <SegmentedControlItemText>Day</SegmentedControlItemText>
              </SegmentedControlItem>
              <SegmentedControlItem value="week">
                <SegmentedControlItemText>Week</SegmentedControlItemText>
              </SegmentedControlItem>
              <SegmentedControlItem value="month">
                <SegmentedControlItemText>Month</SegmentedControlItemText>
              </SegmentedControlItem>
            </SegmentedControl>
          </Stack>
        </ShowcaseCell>

        <ShowcaseCell className="min-w-[300px] max-w-[380px]">
          <Tabs defaultValue="tab1" className="w-full">
            <TabsList>
              <TabsTrigger value="tab1">
                <Text className="text-sm">Account</Text>
              </TabsTrigger>
              <TabsTrigger value="tab2">
                <Text className="text-sm">Security</Text>
              </TabsTrigger>
              <TabsTrigger value="tab3">
                <Text className="text-sm">Billing</Text>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" className="p-3">
              <Text className="text-sm text-muted-foreground">Manage your account details.</Text>
            </TabsContent>
            <TabsContent value="tab2" className="p-3">
              <Text className="text-sm text-muted-foreground">Two-factor and passwords.</Text>
            </TabsContent>
            <TabsContent value="tab3" className="p-3">
              <Text className="text-sm text-muted-foreground">Plans and invoices.</Text>
            </TabsContent>
          </Tabs>
        </ShowcaseCell>

        <ShowcaseCell className="min-w-[220px] max-w-[280px]">
          <Stack className="gap-3 w-full">
            <Text className="text-xs text-muted-foreground font-semibold tracking-wider uppercase">
              Loading
            </Text>
            <Row className="gap-3 items-center">
              <Spinner size="sm" />
              <Spinner />
              <Spinner size="lg" />
            </Row>
            <Stack className="gap-2">
              <Skeleton className="h-3 w-3/4 rounded" />
              <Skeleton className="h-3 w-1/2 rounded" />
              <Skeleton className="h-8 w-full rounded-lg" />
            </Stack>
          </Stack>
        </ShowcaseCell>
      </View>
    </View>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  description: string;
}) {
  const colors = useThemeColors();
  return (
    <View className="flex-1 min-w-[240px] max-w-[320px] gap-4 rounded-2xl border border-border bg-card p-6">
      <View className="h-10 w-10 rounded-xl bg-muted items-center justify-center">
        <Feather name={icon} size={18} color={colors.primary} />
      </View>
      <Text className="text-base font-semibold text-foreground">{title}</Text>
      <Text className="text-sm text-muted-foreground leading-relaxed">{description}</Text>
    </View>
  );
}

function StatsRow() {
  return (
    <Row className="gap-8 items-center justify-center mt-2">
      <Stack className="items-center gap-0.5">
        <Text className="text-2xl font-bold text-foreground">{components.length}</Text>
        <Text className="text-xs text-muted-foreground font-medium">Components</Text>
      </Stack>
      <Separator orientation="vertical" className="h-8" />
      <Stack className="items-center gap-0.5">
        <Text className="text-2xl font-bold text-foreground">{blocks.length}</Text>
        <Text className="text-xs text-muted-foreground font-medium">Blocks</Text>
      </Stack>
      <Separator orientation="vertical" className="h-8" />
      <Stack className="items-center gap-0.5">
        <Text className="text-2xl font-bold text-foreground">3</Text>
        <Text className="text-xs text-muted-foreground font-medium">Platforms</Text>
      </Stack>
    </Row>
  );
}

export default function HomePage() {
  const router = useRouter();

  return (
    <View className="px-6 py-12 max-w-4xl self-center w-full gap-24">
      {/* Hero */}
      <Stack className="items-center gap-8 pt-20 pb-8">
        <Row className="items-center gap-3">
          <Text className="text-sm font-medium text-muted-foreground tracking-wide">
            the React Native component library you love.
          </Text>
          <Badge variant="outline" className="border-border px-2 py-0.5">
            <BadgeText className="text-xs text-muted-foreground font-medium">v1.1.0</BadgeText>
          </Badge>
        </Row>

        <HeroHeading>{'Beautiful by default.\nCustomizable by design.'}</HeroHeading>

        <Text className="text-lg text-muted-foreground text-center max-w-2xl leading-relaxed">
          Copy-paste components and production-ready blocks built with Tailwind CSS for React
          Native. iOS, Android, and Web. You own the code.
        </Text>

        <Row className="gap-3">
          <Button onPress={() => router.push('/components' as any)} size="lg">
            <ButtonText>View Components</ButtonText>
          </Button>
          <Button variant="outline" onPress={() => router.push('/blocks' as any)} size="lg">
            <ButtonText>Browse Blocks</ButtonText>
          </Button>
        </Row>

        <StatsRow />
      </Stack>

      {/* Live Showcase */}
      <LiveShowcase />

      {/* Features */}
      <Stack className="gap-10">
        <Stack className="items-center gap-3">
          <Text className="text-3xl font-bold text-foreground text-center tracking-tight">
            Why WhileUI?
          </Text>
          <Text className="text-base text-muted-foreground text-center max-w-lg leading-relaxed">
            Built for developers who want to ship fast without compromising on quality.
          </Text>
        </Stack>
        <View className="flex-row flex-wrap gap-5 justify-center">
          <FeatureCard
            icon="copy"
            title="Copy & Paste"
            description="No lock-in. Copy into your project and own the code. Customize everything."
          />
          <FeatureCard
            icon="smartphone"
            title="Cross-Platform"
            description="One codebase for iOS, Android, and Web via Expo. Write once, run everywhere."
          />
          <FeatureCard
            icon="droplet"
            title="Fully Themeable"
            description="OKLCH colors, design tokens, custom themes, and dark mode from one CSS file."
          />
          <FeatureCard
            icon="zap"
            title="Fast & Light"
            description="Zero runtime overhead. Tree-shakeable. Only ship what you actually use."
          />
          <FeatureCard
            icon="layers"
            title="Tailwind Variants"
            description="Type-safe, composable variants with tv(). Extend with className overrides."
          />
          <FeatureCard
            icon="layout"
            title="30+ Blocks"
            description="Chat, navigation, commerce, auth, onboarding. Drop in and ship today."
          />
        </View>
      </Stack>

      {/* Footer */}
      <View className="items-center py-16 border-t border-border gap-3">
        <Text className="text-sm font-medium text-muted-foreground">
          light and gorgeous, just like the moon.
        </Text>
        <Row className="items-center gap-2">
          <View className="h-5 w-5 rounded bg-primary items-center justify-center">
            <Text className="text-xs font-bold text-primary-foreground">W</Text>
          </View>
          <Text className="text-sm text-muted-foreground font-medium">Built by The While Loop</Text>
        </Row>
        <Text className="text-xs text-muted-foreground">React Native · Expo · Tailwind CSS</Text>
      </View>
    </View>
  );
}
