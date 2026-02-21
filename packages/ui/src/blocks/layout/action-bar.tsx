import { View, type ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cn } from '../../lib/cn';

export interface ActionBarProps extends ViewProps {
  sticky?: boolean;
  safeArea?: boolean;
  elevated?: boolean;
}

export function ActionBar({
  sticky = true,
  safeArea = true,
  elevated = false,
  className,
  style,
  ...props
}: ActionBarProps) {
  const insets = useSafeAreaInsets();
  const bottomPadding = safeArea ? Math.max(insets.bottom, 12) : 12;

  return (
    <View
      className={cn(
        'w-full flex-row items-center gap-3 bg-background px-4 pt-3',
        sticky && 'absolute inset-x-0 bottom-0 border-t border-border',
        elevated && 'shadow-lg',
        className
      )}
      style={[{ paddingBottom: bottomPadding }, style]}
      {...props}
    />
  );
}
