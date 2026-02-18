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
}

// ─── Component ───────────────────────────────────────────────

export function AppShell({
  header,
  footer,
  bottomNav,
  safeArea = true,
  children,
  className,
  ...props
}: AppShellProps) {
  const Container = safeArea ? SafeAreaView : View;

  return (
    <Container className={cn('flex-1 bg-background', className)} {...props}>
      {header}
      <View className="flex-1">{children}</View>
      {footer}
      {bottomNav}
    </Container>
  );
}
