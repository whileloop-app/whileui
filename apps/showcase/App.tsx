import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, StatusBar, Dimensions } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Uniwind, useUniwind } from 'uniwind';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Animated, { useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from '@expo-google-fonts/plus-jakarta-sans';
import './global.css';
import {
  FontProvider,
  Text,
  Button,
  ButtonText,
  ButtonIcon,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  BadgeText,
  Alert,
  AlertTitle,
  AlertDescription,
  Switch,
  Checkbox,
  Label,
  Separator,
  Progress,
  Spinner,
  Textarea,
  Skeleton,
  AspectRatio,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Toggle,
  ToggleText,
  ToggleGroup,
  ToggleGroupItem,
  ToggleGroupItemText,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarSeparator,
  // Toast
  ToastProvider,
  ToastContainer,
  useToast,
  // Auth Blocks
  SignInForm,
  SignUpForm,
  ForgotPasswordForm,
  VerifyEmailForm,
  ResetPasswordForm,
  SocialConnections,
  UserMenu,
  // Navigation Blocks
  BottomNav,
  FloatingBottomNav,
  Header,
  HeaderBackButton,
  TabBar,
  DrawerMenu,
  // Layout Blocks
  EmptyState,
  ErrorState,
  LoadingScreen,
  SplashScreen,
  // Profile Blocks
  ProfileHeader,
  SettingsSection,
  SettingsItem,
  AccountCard,
  // Lists Blocks
  ListItem,
  NotificationItem,
  // Commerce Blocks
  ProductCard,
  PricingCard,
  CheckoutSummary,
  cn,
} from '@whileui/native';

type CategoryKey =
  | 'components'
  | 'auth'
  | 'navigation'
  | 'layout'
  | 'profile'
  | 'lists'
  | 'commerce';

const categories: { key: CategoryKey; label: string; icon: string }[] = [
  { key: 'components', label: 'Components', icon: 'layers' },
  { key: 'auth', label: 'Auth', icon: 'lock' },
  { key: 'navigation', label: 'Navigation', icon: 'navigation' },
  { key: 'layout', label: 'Layout', icon: 'layout' },
  { key: 'profile', label: 'Profile', icon: 'user' },
  { key: 'lists', label: 'Lists', icon: 'list' },
  { key: 'commerce', label: 'Commerce', icon: 'shopping-bag' },
];

// ─── Haptic Feedback ─────────────────────────────────────────
const triggerHaptic = (type: 'light' | 'medium' | 'selection' = 'light') => {
  switch (type) {
    case 'light':
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      break;
    case 'medium':
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      break;
    case 'selection':
      Haptics.selectionAsync();
      break;
  }
};

// ─── Animated Counter ────────────────────────────────────────
function AnimatedCounter({ value, duration = 1000 }: { value: number; duration?: number }) {
  const animatedValue = useSharedValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    animatedValue.value = withTiming(value, {
      duration,
      easing: Easing.out(Easing.cubic),
    });
  }, [value, duration]);

  useEffect(() => {
    const interval = setInterval(() => {
      const progress = animatedValue.value / value;
      setDisplayValue(Math.round(animatedValue.value));
      if (progress >= 0.99) {
        setDisplayValue(value);
        clearInterval(interval);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [value]);

  return <>{displayValue}</>;
}

// ─── Animated Pressable ──────────────────────────────────────
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// Theme-aware icon colors (for @expo/vector-icons which need hex values)
// Colors matched to Noir global.css theme
const useIconColors = () => {
  const { theme } = useUniwind();
  const isDark = theme === 'dark';
  return {
    foreground: isDark ? '#ffffff' : '#000000',
    muted: isDark ? '#999999' : '#737373',
    primary: isDark ? '#ffffff' : '#000000',
    primaryForeground: isDark ? '#000000' : '#ffffff',
    accent: isDark ? '#4ade80' : '#22c55e',
    destructive: isDark ? '#ef4444' : '#dc2626',
  };
};

export default function App() {
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const fontMap = {
    'font-normal': 'PlusJakartaSans_400Regular',
    'font-medium': 'PlusJakartaSans_500Medium',
    'font-semibold': 'PlusJakartaSans_600SemiBold',
    'font-bold': 'PlusJakartaSans_700Bold',
    'font-extrabold': 'PlusJakartaSans_800ExtraBold',
  };

  return (
    <FontProvider value={fontMap}>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </FontProvider>
  );
}

function AppContent() {
  const { theme } = useUniwind();
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState<CategoryKey>('components');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const colors = useIconColors();

  // Show splash screen on first load
  if (showSplash) {
    return (
      <SafeAreaProvider>
        <View style={{ flex: 1 }} className="bg-background">
          <StatusBar
            barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
            translucent
            backgroundColor="transparent"
          />
          <SplashScreen
            logo={
              <View className="h-24 w-24 rounded-3xl bg-primary items-center justify-center">
                <Feather name="zap" size={48} color={colors.primaryForeground} />
              </View>
            }
            appName="WhileUI"
            tagline="Beautiful native components"
            variant="scale"
            duration={1500}
            showLoading
            onAnimationComplete={() => {
              setTimeout(() => setShowSplash(false), 800);
            }}
          />
        </View>
      </SafeAreaProvider>
    );
  }

  const cycleTheme = () => {
    const themes = ['light', 'dark'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    (Uniwind.setTheme as (t: string) => void)(themes[nextIndex]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'components':
        return <ComponentsTab />;
      case 'auth':
        return <AuthBlocksTab />;
      case 'navigation':
        return <NavigationBlocksTab />;
      case 'layout':
        return <LayoutBlocksTab />;
      case 'profile':
        return <ProfileBlocksTab />;
      case 'lists':
        return <ListsBlocksTab />;
      case 'commerce':
        return <CommerceBlocksTab />;
      default:
        return <ComponentsTab />;
    }
  };

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }} className="bg-background">
        <StatusBar
          barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
          translucent
          backgroundColor="transparent"
        />
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
          <View className="flex-1">
            {/* ─── Header ──────────────────────────────── */}
            <View className="px-5 pt-4 pb-2">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <Pressable
                    onPress={() => {
                      triggerHaptic('light');
                      setDrawerOpen(true);
                    }}
                    className="w-10 h-10 rounded-xl bg-muted items-center justify-center active:opacity-70"
                  >
                    <Feather name="menu" size={20} color={colors.foreground} />
                  </Pressable>
                  <View>
                    <Text className="text-3xl font-bold text-foreground tracking-tight">
                      WhileUI
                    </Text>
                    <Text className="text-sm text-muted-foreground mt-0.5">
                      Beautiful native components
                    </Text>
                  </View>
                </View>
                <Pressable
                  onPress={() => {
                    triggerHaptic('medium');
                    cycleTheme();
                  }}
                  className="w-10 h-10 rounded-xl bg-secondary items-center justify-center active:opacity-70"
                >
                  <Feather
                    name={theme === 'light' ? 'moon' : 'sun'}
                    size={18}
                    color={colors.foreground}
                  />
                </Pressable>
              </View>

              {/* ─── Stats Strip ──────────────────────── */}
              <View className="flex-row mt-4 gap-3">
                <View className="flex-1 bg-primary rounded-xl px-3 py-2.5">
                  <Text className="text-2xl font-bold text-primary-foreground">
                    <AnimatedCounter value={34} duration={800} />
                  </Text>
                  <Text className="text-xs text-primary-foreground/70">Components</Text>
                </View>
                <View className="flex-1 bg-card border border-border rounded-xl px-3 py-2.5">
                  <Text className="text-2xl font-bold text-foreground">
                    <AnimatedCounter value={29} duration={1000} />
                  </Text>
                  <Text className="text-xs text-muted-foreground">Blocks</Text>
                </View>
                <View className="flex-1 bg-card border border-border rounded-xl px-3 py-2.5">
                  <Text className="text-2xl font-bold text-foreground">
                    <AnimatedCounter value={2} duration={600} />
                  </Text>
                  <Text className="text-xs text-muted-foreground">Themes</Text>
                </View>
              </View>
            </View>

            {/* ─── Category Tabs ───────────────────────── */}
            <View className="mt-3 mb-3">
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20, gap: 6 }}
              >
                {categories.map((cat) => (
                  <Pressable
                    key={cat.key}
                    onPress={() => {
                      triggerHaptic('selection');
                      setActiveTab(cat.key);
                    }}
                    className={cn(
                      'flex-row items-center gap-1.5 rounded-full px-4 py-2',
                      activeTab === cat.key ? 'bg-primary' : 'bg-muted'
                    )}
                  >
                    <Feather
                      name={cat.icon as any}
                      size={14}
                      color={activeTab === cat.key ? colors.primaryForeground : colors.muted}
                    />
                    <Text
                      className={cn(
                        'text-sm font-medium',
                        activeTab === cat.key ? 'text-primary-foreground' : 'text-muted-foreground'
                      )}
                    >
                      {cat.label}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 20 }}
            >
              {renderContent()}
            </ScrollView>
          </View>
        </SafeAreaView>
        <ToastContainer position="top" className="mt-12" />

        {/* ─── App Drawer ─────────────────────────── */}
        <DrawerMenu
          visible={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          sections={[
            {
              title: 'Components',
              items: [
                {
                  key: 'components',
                  label: 'All Components',
                  icon: (
                    <Feather
                      name="layers"
                      size={20}
                      color={activeTab === 'components' ? colors.primary : colors.muted}
                    />
                  ),
                },
              ],
            },
            {
              title: 'Blocks',
              items: [
                {
                  key: 'auth',
                  label: 'Authentication',
                  icon: (
                    <Feather
                      name="lock"
                      size={20}
                      color={activeTab === 'auth' ? colors.primary : colors.muted}
                    />
                  ),
                },
                {
                  key: 'navigation',
                  label: 'Navigation',
                  icon: (
                    <Feather
                      name="compass"
                      size={20}
                      color={activeTab === 'navigation' ? colors.primary : colors.muted}
                    />
                  ),
                },
                {
                  key: 'layout',
                  label: 'Layout',
                  icon: (
                    <Feather
                      name="layout"
                      size={20}
                      color={activeTab === 'layout' ? colors.primary : colors.muted}
                    />
                  ),
                },
                {
                  key: 'profile',
                  label: 'Profile',
                  icon: (
                    <Feather
                      name="user"
                      size={20}
                      color={activeTab === 'profile' ? colors.primary : colors.muted}
                    />
                  ),
                },
                {
                  key: 'lists',
                  label: 'Lists',
                  icon: (
                    <Feather
                      name="list"
                      size={20}
                      color={activeTab === 'lists' ? colors.primary : colors.muted}
                    />
                  ),
                },
                {
                  key: 'commerce',
                  label: 'Commerce',
                  icon: (
                    <Feather
                      name="shopping-bag"
                      size={20}
                      color={activeTab === 'commerce' ? colors.primary : colors.muted}
                    />
                  ),
                },
              ],
            },
          ]}
          activeKey={activeTab}
          onSelect={(key) => {
            setActiveTab(key as CategoryKey);
            setDrawerOpen(false);
          }}
          header={
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 rounded-xl bg-primary items-center justify-center">
                <Text className="text-primary-foreground font-bold">W</Text>
              </View>
              <View>
                <Text className="font-bold text-foreground text-lg">WhileUI</Text>
                <Text className="text-xs text-muted-foreground">v1.0 · 34 components</Text>
              </View>
            </View>
          }
          footer={
            <Text className="text-xs text-muted-foreground text-center">
              Built with ❤️ for React Native
            </Text>
          }
        />
      </View>
    </SafeAreaProvider>
  );
}

// ─── Section Component ──────────────────────────────────────
function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <View className="mb-10">
      <View className="mb-4">
        <Text className="text-lg font-semibold text-foreground">{title}</Text>
        {subtitle && <Text className="text-sm text-muted-foreground mt-0.5">{subtitle}</Text>}
      </View>
      <View className="gap-4">{children}</View>
    </View>
  );
}

// ─── Components Tab ─────────────────────────────────────────
function ComponentsTab() {
  const [progress, setProgress] = useState(45);
  const [switchVal, setSwitchVal] = useState(true);
  const [checkVal, setCheckVal] = useState(true);
  const [radioVal, setRadioVal] = useState('option-1');
  const [selectVal, setSelectVal] = useState('');
  const { toast } = useToast();
  const colors = useIconColors();

  React.useEffect(() => {
    const timer = setInterval(() => setProgress((p) => (p + 10) % 110), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <View>
      {/* Typography */}
      <Section title="Typography" subtitle="Bold geometric type with custom weight mapping">
        <Text className="text-4xl font-bold text-foreground tracking-tight">
          Build faster,{'\n'}ship beautiful.
        </Text>
        <Text className="text-base text-muted-foreground leading-relaxed">
          WhileUI gives you production-ready components that look stunning out of the box. Every
          component uses <Text className="font-semibold text-foreground">design tokens</Text> for
          effortless theming.
        </Text>
        <View className="flex-row flex-wrap gap-2 mt-1">
          <Badge>
            <BadgeText>React Native</BadgeText>
          </Badge>
          <Badge variant="secondary">
            <BadgeText>Expo</BadgeText>
          </Badge>
          <Badge variant="outline">
            <BadgeText>Uniwind</BadgeText>
          </Badge>
        </View>
      </Section>

      {/* Buttons */}
      <Section title="Buttons" subtitle="6 variants × 4 sizes">
        <View className="flex-row flex-wrap gap-2">
          <Button>
            <ButtonText>Primary</ButtonText>
          </Button>
          <Button variant="secondary">
            <ButtonText>Secondary</ButtonText>
          </Button>
          <Button variant="destructive">
            <ButtonText>Destructive</ButtonText>
          </Button>
          <Button variant="outline">
            <ButtonText>Outline</ButtonText>
          </Button>
          <Button variant="ghost">
            <ButtonText>Ghost</ButtonText>
          </Button>
          <Button variant="link">
            <ButtonText>Link</ButtonText>
          </Button>
        </View>
        <View className="flex-row items-center gap-2">
          <Button size="sm">
            <ButtonText>Small</ButtonText>
          </Button>
          <Button size="default">
            <ButtonText>Default</ButtonText>
          </Button>
          <Button size="lg">
            <ButtonText>Large</ButtonText>
          </Button>
          <Button size="icon">
            <ButtonText>+</ButtonText>
          </Button>
        </View>
        <Text className="text-sm font-medium text-muted-foreground mt-2">With Icons</Text>
        <View className="flex-row flex-wrap gap-2">
          <Button>
            <ButtonIcon>
              <Feather name="download" size={16} color={colors.primaryForeground} />
            </ButtonIcon>
            <ButtonText>Download</ButtonText>
          </Button>
          <Button variant="outline">
            <ButtonIcon>
              <Feather name="settings" size={16} color={colors.foreground} />
            </ButtonIcon>
            <ButtonText>Settings</ButtonText>
          </Button>
          <Button variant="secondary">
            <ButtonText>Next</ButtonText>
            <ButtonIcon position="right">
              <Feather name="arrow-right" size={16} color={colors.foreground} />
            </ButtonIcon>
          </Button>
          <Button size="icon" variant="outline">
            <Feather name="heart" size={18} color={colors.foreground} />
          </Button>
        </View>
        <Button disabled>
          <ButtonText>Disabled</ButtonText>
        </Button>
      </Section>

      {/* Form Controls */}
      <Section title="Form Controls" subtitle="Inputs, toggles, and selection">
        <Input placeholder="you@email.com" />
        <Textarea placeholder="Write something great..." />
        <View className="flex-row items-center gap-6">
          <View className="flex-row items-center gap-2">
            <Checkbox checked={checkVal} onCheckedChange={setCheckVal} />
            <Label onPress={() => setCheckVal(!checkVal)}>Terms & Privacy</Label>
          </View>
          <View className="flex-row items-center gap-2">
            <Switch checked={switchVal} onCheckedChange={setSwitchVal} />
            <Label onPress={() => setSwitchVal(!switchVal)}>Notify me</Label>
          </View>
        </View>
      </Section>

      {/* Selection */}
      <Section title="Selection" subtitle="Radio groups, selects, and toggles">
        <RadioGroup value={radioVal} onValueChange={setRadioVal}>
          <View className="flex-row items-center gap-2">
            <RadioGroupItem value="option-1" />
            <Label onPress={() => setRadioVal('option-1')}>Free plan</Label>
          </View>
          <View className="flex-row items-center gap-2">
            <RadioGroupItem value="option-2" />
            <Label onPress={() => setRadioVal('option-2')}>Pro plan</Label>
          </View>
        </RadioGroup>

        <Select value={selectVal} onValueChange={setSelectVal}>
          <SelectTrigger>
            <SelectValue placeholder="Select a framework" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem label="React Native" value="rn" />
            <SelectItem label="Flutter" value="flutter" />
            <SelectItem label="SwiftUI" value="swift" />
          </SelectContent>
        </Select>

        <View className="flex-row flex-wrap gap-4">
          <Toggle>
            <ToggleText>Bold</ToggleText>
          </Toggle>
          <ToggleGroup type="single">
            <ToggleGroupItem value="left">
              <ToggleGroupItemText>L</ToggleGroupItemText>
            </ToggleGroupItem>
            <ToggleGroupItem value="center">
              <ToggleGroupItemText>C</ToggleGroupItemText>
            </ToggleGroupItem>
            <ToggleGroupItem value="right">
              <ToggleGroupItemText>R</ToggleGroupItemText>
            </ToggleGroupItem>
          </ToggleGroup>
        </View>
      </Section>

      {/* Cards */}
      <Section title="Cards & Badges" subtitle="Content containers with status indicators">
        <Card>
          <CardHeader>
            <View className="flex-row items-center justify-between">
              <CardTitle>Team Activity</CardTitle>
              <Badge variant="success">
                <BadgeText>Live</BadgeText>
              </Badge>
            </View>
            <CardDescription>Your team completed 24 tasks this week.</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={progress} />
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <ButtonText>View Dashboard</ButtonText>
            </Button>
          </CardFooter>
        </Card>
        <Separator />
        <View className="flex-row flex-wrap gap-2">
          <Badge>
            <BadgeText>Default</BadgeText>
          </Badge>
          <Badge variant="secondary">
            <BadgeText>Secondary</BadgeText>
          </Badge>
          <Badge variant="destructive">
            <BadgeText>Destructive</BadgeText>
          </Badge>
          <Badge variant="outline">
            <BadgeText>Outline</BadgeText>
          </Badge>
          <Badge variant="success">
            <BadgeText>Success</BadgeText>
          </Badge>
          <Badge variant="warning">
            <BadgeText>Warning</BadgeText>
          </Badge>
          <Badge variant="info">
            <BadgeText>Info</BadgeText>
          </Badge>
        </View>
      </Section>

      {/* Feedback */}
      <Section title="Feedback" subtitle="Alerts, toasts, and loading states">
        <Alert className="flex-row items-start">
          <Text className="text-foreground font-bold text-lg mr-3">💡</Text>
          <View className="flex-1">
            <AlertTitle>Design tokens</AlertTitle>
            <AlertDescription>
              Customize every component by editing global.css — no code changes needed.
            </AlertDescription>
          </View>
        </Alert>
        <View className="flex-row flex-wrap gap-2">
          <Button
            variant="outline"
            onPress={() =>
              toast({
                title: 'Saved successfully',
                description: 'Your changes have been applied.',
              })
            }
          >
            <ButtonText>Toast</ButtonText>
          </Button>
          <Button
            variant="outline"
            onPress={() =>
              toast({
                title: 'Deployed!',
                description: 'Your app is now live.',
                variant: 'success',
              })
            }
          >
            <ButtonText>Success</ButtonText>
          </Button>
          <Button
            variant="destructive"
            onPress={() =>
              toast({
                title: 'Build failed',
                description: 'Check the error logs.',
                variant: 'destructive',
              })
            }
          >
            <ButtonText>Error</ButtonText>
          </Button>
        </View>
        <View className="flex-row gap-4 items-center">
          <Spinner size="sm" />
          <Spinner size="lg" className="text-primary" />
        </View>
        <View className="flex-row items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <View className="gap-2 flex-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </View>
        </View>
      </Section>

      {/* Overlays */}
      <Section title="Overlays" subtitle="Dialogs, popovers, and menus">
        <View className="flex-row flex-wrap gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <ButtonText>Dialog</ButtonText>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>Update your display name and bio.</DialogDescription>
              </DialogHeader>
              <Input placeholder="Display name" className="my-4" />
              <DialogFooter>
                <DialogClose asChild>
                  <Button>
                    <ButtonText>Save</ButtonText>
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <ButtonText>Delete</ButtonText>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete workspace?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently remove all data. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary">
                <ButtonText>Popover</ButtonText>
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Text className="font-medium text-foreground">Layer Settings</Text>
              <Text className="text-sm text-muted-foreground mt-2">
                Adjust opacity, blend mode, and dimensions.
              </Text>
            </PopoverContent>
          </Popover>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">
                <ButtonText>Tooltip</ButtonText>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Long press to preview</TooltipContent>
          </Tooltip>
        </View>

        <View className="flex-row flex-wrap gap-2 mt-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <ButtonText>Menu</ButtonText>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Workspace</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Text className="text-foreground">Settings</Text>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Text className="text-foreground">Members</Text>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Text className="text-foreground">Billing</Text>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Text className="text-foreground">API Keys</Text>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ContextMenu>
            <ContextMenuTrigger>
              <View className="border border-dashed border-border p-6 rounded-xl items-center justify-center bg-muted/20">
                <Text className="text-muted-foreground text-sm">Long press for context menu</Text>
              </View>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>
                <Text className="text-foreground">Copy</Text>
              </ContextMenuItem>
              <ContextMenuItem>
                <Text className="text-foreground">Paste</Text>
              </ContextMenuItem>
              <ContextMenuItem>
                <Text className="text-foreground">Delete</Text>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </View>
      </Section>

      {/* Disclosure */}
      <Section title="Disclosure" subtitle="Accordions, collapsibles, and tabs">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <Text className="text-foreground font-medium">Is it fully native?</Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text className="text-muted-foreground">
                Yes. Every component renders native Views, Text, and Pressables — no web views.
              </Text>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <Text className="text-foreground font-medium">Can I customize the theme?</Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text className="text-muted-foreground">
                Yes. All design tokens live in global.css — change one file to redesign everything.
              </Text>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <Text className="text-foreground font-medium">Does it support dark mode?</Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text className="text-muted-foreground">
                Yes. Use the theme toggle above to see every component adapt instantly.
              </Text>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Collapsible className="border border-border rounded-xl p-4 mt-2">
          <View className="flex-row items-center justify-between">
            <Text className="font-semibold text-foreground">What's included</Text>
            <CollapsibleTrigger className="p-2 rounded-lg active:bg-accent">
              <Text className="text-sm font-medium text-primary">Show</Text>
            </CollapsibleTrigger>
          </View>
          <CollapsibleContent className="overflow-hidden">
            <View className="gap-2 mt-3">
              <View className="flex-row items-center gap-2 p-2.5 bg-muted rounded-lg">
                <Text className="text-sm text-foreground">34 headless components</Text>
              </View>
              <View className="flex-row items-center gap-2 p-2.5 bg-muted rounded-lg">
                <Text className="text-sm text-foreground">28 pre-built blocks</Text>
              </View>
              <View className="flex-row items-center gap-2 p-2.5 bg-muted rounded-lg">
                <Text className="text-sm text-foreground">Full theming via design tokens</Text>
              </View>
            </View>
          </CollapsibleContent>
        </Collapsible>

        <Tabs defaultValue="preview" className="mt-4">
          <TabsList className="w-full">
            <TabsTrigger value="preview">
              <Text className="text-foreground">Preview</Text>
            </TabsTrigger>
            <TabsTrigger value="code">
              <Text className="text-foreground">Code</Text>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle>Welcome back</CardTitle>
                <CardDescription>Your workspace is ready.</CardDescription>
              </CardHeader>
              <CardContent className="gap-3">
                <Label>Email</Label>
                <Input placeholder="you@company.com" />
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <ButtonText>Continue</ButtonText>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="code">
            <Card>
              <CardContent className="py-6">
                <Text className="text-sm text-muted-foreground font-medium">
                  {
                    '<Card>\n  <CardHeader>\n    <CardTitle>Welcome back</CardTitle>\n  </CardHeader>\n  <CardContent>\n    <Input placeholder="..." />\n  </CardContent>\n</Card>'
                  }
                </Text>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Section>

      {/* Data Display */}
      <Section title="Data Display" subtitle="Avatars, aspect ratios, and hover cards">
        <View className="flex-row gap-3 items-center">
          <Avatar>
            <AvatarFallback>WU</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>MK</AvatarFallback>
          </Avatar>
          <View className="w-28">
            <AspectRatio ratio={16 / 9}>
              <View className="flex-1 bg-muted rounded-lg items-center justify-center">
                <Text className="text-xs text-muted-foreground">16:9</Text>
              </View>
            </AspectRatio>
          </View>
        </View>

        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link">
              <ButtonText>@whileui (Hover/Press)</ButtonText>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent>
            <View className="flex-row gap-3">
              <Avatar>
                <AvatarFallback>WU</AvatarFallback>
              </Avatar>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-foreground">@whileui</Text>
                <Text className="text-sm text-muted-foreground">
                  Beautiful, accessible native components for React Native.
                </Text>
              </View>
            </View>
          </HoverCardContent>
        </HoverCard>

        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>
              <Text className="text-foreground text-sm">File</Text>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <Text className="text-foreground">New Project</Text>
              </MenubarItem>
              <MenubarItem>
                <Text className="text-foreground">Open</Text>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <Text className="text-foreground">Export</Text>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>
              <Text className="text-foreground text-sm">Edit</Text>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <Text className="text-foreground">Undo</Text>
              </MenubarItem>
              <MenubarItem>
                <Text className="text-foreground">Redo</Text>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>
              <Text className="text-foreground text-sm">View</Text>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <Text className="text-foreground">Zoom In</Text>
              </MenubarItem>
              <MenubarItem>
                <Text className="text-foreground">Zoom Out</Text>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </Section>
    </View>
  );
}

// ─── Auth Blocks Tab ────────────────────────────────────────
function AuthBlocksTab() {
  return (
    <View className="gap-6">
      <Section title="Sign In" subtitle="Email & password authentication">
        <SignInForm />
      </Section>
      <Section title="Sign Up" subtitle="New account registration">
        <SignUpForm />
      </Section>
      <Section title="Forgot Password" subtitle="Password recovery flow">
        <ForgotPasswordForm />
      </Section>
      <Section title="Verify Email" subtitle="OTP verification">
        <VerifyEmailForm />
      </Section>
      <Section title="Reset Password" subtitle="Set a new password">
        <ResetPasswordForm />
      </Section>
      <Section title="Social Login" subtitle="Third-party authentication">
        <SocialConnections />
      </Section>
      <Section title="User Menu" subtitle="Signed-in user dropdown">
        <View className="items-start">
          <UserMenu />
        </View>
      </Section>
    </View>
  );
}

// ─── Navigation Blocks Tab ──────────────────────────────────
function NavigationBlocksTab() {
  const [activeNav, setActiveNav] = useState('home');
  const [activeTabBar, setActiveTabBar] = useState('all');
  const colors = useIconColors();

  const navItems = [
    {
      key: 'home',
      label: 'Home',
      icon: <Feather name="home" size={22} color={colors.muted} />,
      badge: 3,
    },
    {
      key: 'search',
      label: 'Explore',
      icon: <Feather name="search" size={22} color={colors.muted} />,
    },
    {
      key: 'add',
      label: 'Create',
      icon: <Feather name="plus" size={22} color={colors.muted} />,
    },
    {
      key: 'inbox',
      label: 'Inbox',
      icon: <Feather name="inbox" size={22} color={colors.muted} />,
      badge: 12,
    },
    {
      key: 'profile',
      label: 'Profile',
      icon: <Feather name="user" size={22} color={colors.muted} />,
    },
  ];

  const tabBarItems = [
    { key: 'all', label: 'All' },
    { key: 'following', label: 'Following' },
    { key: 'popular', label: 'Trending' },
    { key: 'recent', label: 'New' },
  ];

  return (
    <View className="gap-6">
      <Section title="Bottom Navigation" subtitle="iOS/Android style tab bar">
        <View className="rounded-xl overflow-hidden border border-border">
          <BottomNav items={navItems} activeKey={activeNav} onSelect={setActiveNav} />
        </View>
      </Section>

      <Section title="Floating Bottom Nav" subtitle="Modern floating pill style">
        <FloatingBottomNav
          items={navItems.slice(0, 4)}
          activeKey={activeNav}
          onSelect={setActiveNav}
        />
      </Section>

      <Section title="Header" subtitle="App header with actions">
        <View className="rounded-xl overflow-hidden border border-border">
          <Header
            title="Settings"
            subtitle="Manage your preferences"
            leftAction={<HeaderBackButton label="Back" />}
            rightActions={[
              {
                key: 'search',
                icon: <Feather name="search" size={20} color={colors.foreground} />,
                onPress: () => {},
              },
              {
                key: 'more',
                icon: <Feather name="more-horizontal" size={20} color={colors.foreground} />,
                onPress: () => {},
              },
            ]}
          />
        </View>
      </Section>

      <Section title="Tab Bar" subtitle="Content filtering tabs">
        <TabBar items={tabBarItems} activeKey={activeTabBar} onSelect={setActiveTabBar} />
      </Section>

      <Section title="Tab Bar — Pills" subtitle="Pill-style variant">
        <TabBar
          items={tabBarItems}
          activeKey={activeTabBar}
          onSelect={setActiveTabBar}
          variant="pills"
        />
      </Section>
    </View>
  );
}

// ─── Layout Blocks Tab ──────────────────────────────────────
function LayoutBlocksTab() {
  const [showLoading, setShowLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const colors = useIconColors();

  return (
    <View className="gap-6">
      <Section title="Splash Screen" subtitle="App launch animation">
        <Button onPress={() => setShowSplash(!showSplash)}>
          <ButtonText>{showSplash ? 'Hide Splash' : 'Show Splash'}</ButtonText>
        </Button>
        {showSplash && (
          <View className="h-72 rounded-xl border border-border overflow-hidden">
            <SplashScreen
              logo={
                <View className="h-20 w-20 rounded-2xl bg-primary items-center justify-center">
                  <Feather name="zap" size={40} color={colors.primaryForeground} />
                </View>
              }
              appName="WhileUI"
              tagline="Beautiful native components"
              variant="scale"
              showLoading
              loadingText="Starting up..."
            />
          </View>
        )}
      </Section>

      <Section title="Empty State" subtitle="When there's no content to show">
        <View className="h-64 rounded-xl border border-border overflow-hidden">
          <EmptyState
            icon={<Feather name="inbox" size={48} color={colors.muted} />}
            title="No messages yet"
            description="When you receive messages, they'll appear here."
            action={{ label: 'Compose', onPress: () => {} }}
          />
        </View>
      </Section>

      <Section title="Error State" subtitle="Something went wrong">
        <View className="h-64 rounded-xl border border-border overflow-hidden">
          <ErrorState
            icon={<Feather name="alert-triangle" size={48} color={colors.destructive} />}
            title="Connection lost"
            description="Check your internet connection and try again."
            onRetry={() => {}}
          />
        </View>
      </Section>

      <Section title="Loading Screen" subtitle="Content is being fetched">
        <Button onPress={() => setShowLoading(!showLoading)}>
          <ButtonText>{showLoading ? 'Hide Loading' : 'Show Loading'}</ButtonText>
        </Button>
        {showLoading && (
          <View className="h-32 rounded-xl border border-border overflow-hidden">
            <LoadingScreen message="Fetching data..." size="sm" />
          </View>
        )}
      </Section>
    </View>
  );
}

// ─── Profile Blocks Tab ─────────────────────────────────────
function ProfileBlocksTab() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const colors = useIconColors();

  return (
    <View className="gap-6">
      <Section title="Profile Header" subtitle="User profile with stats">
        <ProfileHeader
          name="Sarah Miller"
          username="sarahmiller"
          bio="Product designer building beautiful interfaces. React Native enthusiast."
          avatarFallback="SM"
          stats={[
            { label: 'Following', value: 234 },
            { label: 'Followers', value: '12.5K' },
            { label: 'Projects', value: 42 },
          ]}
          action={{ label: 'Edit Profile', onPress: () => {} }}
          verified
        />
      </Section>

      <Section title="Account Card" subtitle="Compact user info">
        <AccountCard
          name="Sarah Miller"
          email="sarah@whileui.dev"
          avatarFallback="SM"
          badge="Pro"
        />
      </Section>

      <Section title="Settings" subtitle="Grouped preference controls">
        <SettingsSection title="Preferences">
          <SettingsItem
            icon={<Feather name="bell" size={20} color={colors.muted} />}
            label="Push Notifications"
            type="toggle"
            toggleValue={notificationsEnabled}
            onToggle={setNotificationsEnabled}
          />
          <SettingsItem
            icon={<Feather name="moon" size={20} color={colors.muted} />}
            label="Dark Mode"
            type="toggle"
            toggleValue={darkModeEnabled}
            onToggle={setDarkModeEnabled}
          />
          <SettingsItem
            icon={<Feather name="lock" size={20} color={colors.muted} />}
            label="Privacy"
            value="Public"
          />
          <SettingsItem
            icon={<Feather name="log-out" size={20} color={colors.muted} />}
            label="Sign Out"
            type="action"
            destructive
            showBorder={false}
          />
        </SettingsSection>
      </Section>
    </View>
  );
}

// ─── Lists Blocks Tab ───────────────────────────────────────
function ListsBlocksTab() {
  const colors = useIconColors();

  return (
    <View className="gap-6">
      <Section title="List Items" subtitle="Standard list rows">
        <View className="rounded-xl overflow-hidden border border-border">
          <ListItem
            icon={<Feather name="mail" size={20} color={colors.muted} />}
            title="Email Notifications"
            subtitle="Receive updates via email"
            rightText="On"
          />
          <ListItem
            icon={<Feather name="smartphone" size={20} color={colors.muted} />}
            title="Push Notifications"
            subtitle="Get notified on your device"
          />
          <ListItem
            icon={<Feather name="volume-2" size={20} color={colors.muted} />}
            title="Sound Effects"
            description="Play sounds for actions and notifications"
            showBorder={false}
          />
        </View>
      </Section>

      <Section title="Notifications" subtitle="Activity feed items">
        <View className="rounded-xl overflow-hidden border border-border">
          <NotificationItem
            avatarFallback="SM"
            title="Sarah Miller"
            message="Starred your component library"
            time="2m ago"
            read={false}
          />
          <NotificationItem
            avatarFallback="TK"
            title="Tom Kang"
            message="Requested access to your workspace"
            time="1h ago"
            read={true}
          />
          <NotificationItem
            icon={<Feather name="award" size={20} color={colors.primary} />}
            title="Milestone reached!"
            message="Your library has 1,000 installs"
            time="2d ago"
            read={true}
          />
        </View>
      </Section>
    </View>
  );
}

// ─── Commerce Blocks Tab ────────────────────────────────────
function CommerceBlocksTab() {
  return (
    <View className="gap-6">
      <Section title="Product Cards" subtitle="Vertical and horizontal layouts">
        <View className="flex-row gap-3">
          <View className="flex-1">
            <ProductCard
              title="Wireless Earbuds"
              price="$129"
              originalPrice="$179"
              badge="–28%"
              rating={4.7}
              reviewCount={842}
            />
          </View>
          <View className="flex-1">
            <ProductCard title="Smart Watch" price="$249" rating={4.9} reviewCount={1203} />
          </View>
        </View>
        <ProductCard
          variant="horizontal"
          title="Noise-Cancelling Headphones"
          price="$299"
          rating={4.8}
          reviewCount={2156}
        />
      </Section>

      <Section title="Pricing" subtitle="Subscription plans">
        <PricingCard
          name="Pro"
          description="For teams and growing products"
          price="$29"
          badge="Most Popular"
          highlighted
          features={[
            { label: 'Unlimited components', included: true },
            { label: 'Priority support', included: true },
            { label: 'Figma source files', included: true },
            { label: 'Custom themes', included: true },
            { label: 'White-label license', included: false },
          ]}
          onPress={() => {}}
        />
      </Section>

      <Section title="Checkout" subtitle="Order summary">
        <CheckoutSummary
          items={[
            { label: 'Wireless Earbuds × 1', value: '$129.00' },
            { label: 'Smart Watch × 1', value: '$249.00' },
          ]}
          subtotal="$378.00"
          shipping="Free"
          tax="$30.24"
          discount="$37.80"
          total="$370.44"
          onCheckout={() => {}}
        />
      </Section>
    </View>
  );
}
