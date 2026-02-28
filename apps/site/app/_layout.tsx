import React, { createContext, useContext, useCallback, useState, useMemo } from 'react';
import { View, Pressable, useWindowDimensions, StyleSheet } from 'react-native';
import { Slot, useRouter, usePathname } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useUniwind } from 'uniwind';
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from '@expo-google-fonts/plus-jakarta-sans';
import { Feather } from '@expo/vector-icons';
import {
  FontProvider,
  PortalHost,
  useThemeBridge,
  Text,
  Row,
  useThemeColors,
  type FontFamilyMap,
  type UseThemeBridgeResult,
} from '@thewhileloop/whileui';
import {
  NavigationSidebar,
  type NavigationSidebarSection,
} from '@thewhileloop/whileui/blocks/navigation';
import {
  categoryLabels,
  blockCategoryLabels,
  getComponentsByCategory,
  getBlocksByCategory,
  type RegistryCategory,
  type BlockCategory,
} from '../lib/registry';
import '../global.css';

const fontMap: FontFamilyMap = {
  'font-normal': 'PlusJakartaSans_400Regular',
  'font-medium': 'PlusJakartaSans_500Medium',
  'font-semibold': 'PlusJakartaSans_600SemiBold',
  'font-bold': 'PlusJakartaSans_700Bold',
  'font-extrabold': 'PlusJakartaSans_800ExtraBold',
};

const ThemeContext = createContext<UseThemeBridgeResult>({
  mode: 'light',
  resolvedTheme: 'light',
  setMode: () => {},
  cycleMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const SidebarContext = createContext<{
  open: boolean;
  toggle: () => void;
  close: () => void;
}>({ open: true, toggle: () => {}, close: () => {} });

const useSidebar = () => useContext(SidebarContext);

function useSidebarSections(): NavigationSidebarSection[] {
  const grouped = getComponentsByCategory();
  const blockGrouped = getBlocksByCategory();
  const colors = useThemeColors();

  return useMemo(() => {
    const sections: NavigationSidebarSection[] = [];
    const iconColor = colors.foreground;

    sections.push({
      items: [{ key: '/', label: 'Introduction', icon: introIcon(iconColor) }],
    });
    sections.push({
      items: [{ key: '/components', label: 'All Components', icon: gridIcon(iconColor) }],
    });

    (Object.keys(categoryLabels) as RegistryCategory[]).forEach((cat) => {
      const items = grouped[cat];
      if (items.length === 0) return;
      sections.push({
        title: categoryLabels[cat],
        items: items.map((c) => ({ key: `/components/${c.slug}`, label: c.name })),
      });
    });

    sections.push({
      items: [{ key: '/blocks', label: 'All Blocks', icon: layersIcon(iconColor) }],
    });

    (Object.keys(blockCategoryLabels) as BlockCategory[]).forEach((cat) => {
      const items = blockGrouped[cat];
      if (items.length === 0) return;
      sections.push({
        title: blockCategoryLabels[cat],
        items: items.map((b) => ({ key: `/blocks/${b.slug}`, label: b.name })),
      });
    });

    return sections;
  }, [grouped, blockGrouped, colors.foreground]);
}

function introIcon(color: string) {
  return <Feather name="book-open" size={16} color={color} />;
}
function gridIcon(color: string) {
  return <Feather name="grid" size={16} color={color} />;
}
function layersIcon(color: string) {
  return <Feather name="layers" size={16} color={color} />;
}

function SidebarHeader() {
  const { close } = useSidebar();
  const { width } = useWindowDimensions();
  const colors = useThemeColors();
  const isMobile = width < 768;

  return (
    <Row className="items-center justify-between">
      <Row className="items-center gap-2">
        <View className="h-6 w-6 rounded bg-primary items-center justify-center">
          <Text className="text-xs font-bold text-primary-foreground">W</Text>
        </View>
        <Text className="text-sm font-bold text-foreground tracking-tight">WhileUI</Text>
      </Row>
      {isMobile && (
        <Pressable
          onPress={close}
          className="h-8 w-8 items-center justify-center active:opacity-70"
        >
          <Feather name="x" size={18} color={colors.mutedForeground} />
        </Pressable>
      )}
    </Row>
  );
}

function DocsSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const sections = useSidebarSections();
  const { close } = useSidebar();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const handleSelect = useCallback(
    (key: string) => {
      router.push(key as any);
      if (isMobile) close();
    },
    [router, isMobile, close]
  );

  return (
    <NavigationSidebar
      sections={sections}
      activeKey={pathname}
      onSelect={handleSelect}
      header={isMobile ? <SidebarHeader /> : null}
      scrollViewClassName="docs-sidebar-scroll"
      className="w-full border-r-0 bg-card"
    />
  );
}

function SiteHeader() {
  const { mode, setMode } = useTheme();
  const { width } = useWindowDimensions();
  const { open, toggle } = useSidebar();
  const showNav = width >= 640;
  const colors = useThemeColors();

  const toggleTheme = useCallback(() => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  }, [mode, setMode]);

  const router = useRouter();

  return (
    <View
      className="h-14 flex-row items-center justify-between px-4 border-b border-border"
      style={{
        backgroundColor: mode === 'dark' ? 'rgba(10, 10, 15, 0.92)' : 'rgba(255, 255, 255, 0.8)',
        // @ts-expect-error — web-only CSS property
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        zIndex: 30,
      }}
    >
      <Row className="items-center gap-3">
        <Pressable
          onPress={toggle}
          className="h-9 w-9 rounded-md items-center justify-center active:opacity-70"
        >
          <Feather name={open ? 'sidebar' : 'menu'} size={18} color={colors.foreground} />
        </Pressable>

        <Pressable
          onPress={() => router.push('/')}
          className="flex-row items-center gap-2 active:opacity-70"
        >
          <View className="h-7 w-7 rounded-lg bg-primary items-center justify-center">
            <Text className="text-sm font-bold text-primary-foreground">W</Text>
          </View>
          <Text className="text-lg font-bold text-foreground tracking-tight">WhileUI</Text>
        </Pressable>

        {showNav && (
          <Row className="gap-5 items-center ml-4">
            <NavLink label="Docs" href="/" />
            <NavLink label="Components" href="/components" />
            <NavLink label="Blocks" href="/blocks" />
          </Row>
        )}
      </Row>

      <Row className="items-center gap-2">
        <View className="bg-secondary px-2.5 py-0.5 rounded-full border border-border">
          <Text className="text-xs text-muted-foreground font-medium">v1.1</Text>
        </View>
        <Pressable
          onPress={toggleTheme}
          className="h-9 w-9 rounded-lg items-center justify-center active:opacity-70 bg-secondary border border-border"
        >
          <Feather
            name={mode === 'dark' ? 'sun' : 'moon'}
            size={15}
            color={mode === 'dark' ? '#e5e5ea' : '#52525b'}
          />
        </Pressable>
      </Row>
    </View>
  );
}

function NavLink({ label, href }: { label: string; href: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const active = href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <Pressable onPress={() => router.push(href as any)} className="active:opacity-70">
      <Text
        className={`text-sm ${active ? 'text-foreground font-semibold' : 'text-muted-foreground font-medium'}`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function AppContent() {
  const { width } = useWindowDimensions();
  const { open, close } = useSidebar();
  const isDesktop = width >= 768;

  return (
    <View className="min-h-0 flex-1 flex-row bg-background">
      {/* Desktop sidebar — pushes content */}
      {isDesktop && open && (
        <View className="w-64 shrink-0 flex-col min-h-0 overflow-hidden border-r border-border bg-muted/30">
          <DocsSidebar />
        </View>
      )}

      {/* Mobile sidebar — overlay */}
      {!isDesktop && open && (
        <>
          <Pressable
            onPress={close}
            style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 40 }]}
          />
          <View
            style={{ position: 'absolute', top: 0, bottom: 0, left: 0, zIndex: 50, width: 280 }}
            className="bg-card border-r border-border"
          >
            <DocsSidebar />
          </View>
        </>
      )}

      <View className="flex-1" style={{ overflow: 'auto' as any }}>
        <Slot />
      </View>
    </View>
  );
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeBridge = useThemeBridge({ initialMode: 'dark' });
  return <ThemeContext.Provider value={themeBridge}>{children}</ThemeContext.Provider>;
}

export default function RootLayout() {
  useUniwind();
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  const { width } = useWindowDimensions();
  const [sidebarOpen, setSidebarOpen] = useState(width >= 768);

  const sidebarValue = useMemo(
    () => ({
      open: sidebarOpen,
      toggle: () => setSidebarOpen((p) => !p),
      close: () => setSidebarOpen(false),
    }),
    [sidebarOpen]
  );

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <FontProvider value={fontMap}>
        <ThemeProvider>
          <SidebarContext.Provider value={sidebarValue}>
            <View className="min-h-0 flex-1 bg-background">
              <SiteHeader />
              <AppContent />
              <PortalHost />
            </View>
          </SidebarContext.Provider>
        </ThemeProvider>
      </FontProvider>
    </SafeAreaProvider>
  );
}
