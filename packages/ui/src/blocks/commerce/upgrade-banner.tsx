import { View, type ViewProps } from 'react-native';
import { Button, ButtonText } from '../../components/button';
import { Text } from '../../components/text';
import { cn } from '../../lib/cn';

export type UpgradeBannerVariant = 'info' | 'warning';

export interface UpgradeBannerProps extends ViewProps {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
  variant?: UpgradeBannerVariant;
  className?: string;
}

export function UpgradeBanner({
  message,
  actionLabel = 'Upgrade',
  onAction,
  onDismiss,
  variant = 'info',
  className,
  ...props
}: UpgradeBannerProps) {
  return (
    <View
      className={cn(
        'rounded-xl border p-4',
        variant === 'warning' ? 'border-warning/40 bg-warning/10' : 'border-info/40 bg-info/10',
        className
      )}
      {...props}
    >
      <View className="gap-3">
        <Text className="text-sm text-foreground">{message}</Text>
        <View className="flex-row gap-2">
          <Button size="sm" onPress={onAction} disabled={!onAction}>
            <ButtonText>{actionLabel}</ButtonText>
          </Button>
          {onDismiss ? (
            <Button size="sm" variant="ghost" onPress={onDismiss}>
              <ButtonText>Dismiss</ButtonText>
            </Button>
          ) : null}
        </View>
      </View>
    </View>
  );
}
