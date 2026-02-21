import React from 'react';
import { View, type ViewProps } from 'react-native';
import { Text } from '../../components/text';
import { Button, ButtonText } from '../../components/button';
import { cn } from '../../lib/cn';

// ─── Types ───────────────────────────────────────────────────

export interface EmptyStateProps extends ViewProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onPress: () => void;
  };
  secondaryAction?: {
    label: string;
    onPress: () => void;
  };
}

// ─── Component ───────────────────────────────────────────────

function DefaultEmptyIcon() {
  return (
    <View className="mb-6 h-14 w-14 items-center justify-center rounded-2xl border-2 border-dashed border-muted">
      <View className="h-4 w-5 rounded-sm border border-muted-foreground" />
    </View>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <View className={cn('flex-1 items-center justify-center p-8', className)} {...props}>
      <View className="mb-6">
        {icon ? <View className="text-muted-foreground">{icon}</View> : <DefaultEmptyIcon />}
      </View>

      <Text className="mb-2 text-center text-xl font-semibold text-foreground">{title}</Text>

      {description && (
        <Text className="mb-6 max-w-xs text-center text-muted-foreground">{description}</Text>
      )}

      {action && (
        <Button onPress={action.onPress} className="mb-3">
          <ButtonText>{action.label}</ButtonText>
        </Button>
      )}

      {secondaryAction && (
        <Button variant="ghost" onPress={secondaryAction.onPress}>
          <ButtonText>{secondaryAction.label}</ButtonText>
        </Button>
      )}
    </View>
  );
}
