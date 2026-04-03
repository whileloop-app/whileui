import React from 'react';
import { View, type ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cn } from '../../lib/cn';

// ─── Types ───────────────────────────────────────────────────

export interface AppShellProps extends ViewProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  bottomNav?: React.ReactNode;
  safeArea?: boolean;
  /** Keep shell mounted while swapping content with skeleton. */
  loading?: boolean;
  /** Optional custom loading placeholder for the content area. */
  skeleton?: React.ReactNode;
}

// ─── Component ───────────────────────────────────────────────

export function AppShell({
  header,
  footer,
  bottomNav,
  safeArea = true,
  loading = false,
  skeleton,
  children,
  className,
  ...props
}: AppShellProps) {
  const Container = safeArea ? SafeAreaView : View;

  return (
    <Container className={cn('flex-1 bg-background', className)} {...props}>
      {header}
      <View className="flex-1">{loading ? (skeleton ?? null) : children}</View>
      {footer}
      {bottomNav}
    </Container>
  );
}
