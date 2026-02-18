import { View, type ViewProps } from 'react-native';
import { Text } from '../../components/text';
import { cn } from '../../lib/cn';

// ─── Types ───────────────────────────────────────────────────

export interface SettingsSectionProps extends ViewProps {
  title?: string;
  description?: string;
}

// ─── Component ───────────────────────────────────────────────

export function SettingsSection({
  title,
  description,
  children,
  className,
  ...props
}: SettingsSectionProps) {
  return (
    <View className={cn('mb-6', className)} {...props}>
      {title && (
        <Text className="mb-1 px-4 text-xs font-semibold uppercase text-muted-foreground">
          {title}
        </Text>
      )}
      {description && (
        <Text className="mb-2 px-4 text-sm text-muted-foreground">{description}</Text>
      )}
      <View className="overflow-hidden rounded-xl bg-card">{children}</View>
    </View>
  );
}
