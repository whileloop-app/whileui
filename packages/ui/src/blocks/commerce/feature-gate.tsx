import { type ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';
import { Card } from '../../components/card';
import { Button, ButtonText } from '../../components/button';
import { Text } from '../../components/text';
import { cn } from '../../lib/cn';

export interface FeatureGateProps extends ViewProps {
  title: string;
  description: string;
  icon?: ReactNode;
  buttonLabel?: string;
  onUpgrade?: () => void;
  children?: ReactNode;
  className?: string;
}

export function FeatureGate({
  title,
  description,
  icon,
  buttonLabel = 'Upgrade',
  onUpgrade,
  children,
  className,
  ...props
}: FeatureGateProps) {
  if (!children) {
    return (
      <Card className={cn('rounded-xl border-dashed border-border p-5', className)} {...props}>
        <View className="items-start gap-3">
          {icon ? <View>{icon}</View> : null}
          <View className="gap-1">
            <Text className="text-base font-semibold text-foreground">{title}</Text>
            <Text className="text-sm text-muted-foreground">{description}</Text>
          </View>
          <Button onPress={onUpgrade} disabled={!onUpgrade}>
            <ButtonText>{buttonLabel}</ButtonText>
          </Button>
        </View>
      </Card>
    );
  }

  return (
    <View className={cn('overflow-hidden rounded-xl border border-border', className)} {...props}>
      <View className="opacity-45">{children}</View>
      <View className="absolute inset-0 items-center justify-center bg-background/70 px-6">
        {icon ? <View className="mb-3">{icon}</View> : null}
        <Text className="text-center text-base font-semibold text-foreground">{title}</Text>
        <Text className="mt-1 text-center text-sm text-muted-foreground">{description}</Text>
        <Button className="mt-4" onPress={onUpgrade} disabled={!onUpgrade}>
          <ButtonText>{buttonLabel}</ButtonText>
        </Button>
      </View>
    </View>
  );
}
