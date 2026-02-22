import { RefreshControl, ScrollView, type ScrollViewProps } from 'react-native';
import { useThemeColors } from '../../lib/theme-colors';
import { cn } from '../../lib/cn';

// ─── Types ───────────────────────────────────────────────────

export interface PullToRefreshScrollViewProps extends ScrollViewProps {
  refreshing: boolean;
  onRefresh: () => void;
  /** Override tint/colors. Defaults to theme primary. */
  refreshColor?: string;
}

// ─── Component ───────────────────────────────────────────────

export function PullToRefreshScrollView({
  refreshing,
  onRefresh,
  refreshColor,
  className,
  children,
  ...props
}: PullToRefreshScrollViewProps) {
  const colors = useThemeColors();
  const tintColor = refreshColor ?? colors.primary;

  return (
    <ScrollView
      className={cn('flex-1', className)}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={tintColor}
          colors={[tintColor]}
        />
      }
      {...props}
    >
      {children}
    </ScrollView>
  );
}
