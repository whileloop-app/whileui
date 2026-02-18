import React from 'react';
import { View, Pressable, type PressableProps } from 'react-native';
import { Text } from '../../components/text';
import { cn } from '../../lib/cn';

// ─── Types ───────────────────────────────────────────────────

export interface ListItemProps extends Omit<PressableProps, 'children'> {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  description?: string;
  rightIcon?: React.ReactNode;
  rightText?: string;
  action?: React.ReactNode;
  showBorder?: boolean;
  compact?: boolean;
}

// ─── Component ───────────────────────────────────────────────

export function ListItem({
  icon,
  title,
  subtitle,
  description,
  rightIcon,
  rightText,
  action,
  showBorder = true,
  compact = false,
  className,
  ...props
}: ListItemProps) {
  return (
    <Pressable
      className={cn(
        'flex-row items-center bg-card px-4',
        compact ? 'py-2' : 'py-3',
        showBorder && 'border-b border-border',
        'active:bg-muted',
        className
      )}
      {...props}
    >
      {/* Icon */}
      {icon && <View className="mr-3 text-muted-foreground">{icon}</View>}

      {/* Content */}
      <View className="flex-1">
        <Text className="text-base text-foreground">{title}</Text>
        {subtitle && <Text className="text-sm text-muted-foreground">{subtitle}</Text>}
        {description && (
          <Text className="mt-1 text-sm text-muted-foreground" numberOfLines={2}>
            {description}
          </Text>
        )}
      </View>

      {/* Right Side */}
      {rightText && <Text className="mr-2 text-sm text-muted-foreground">{rightText}</Text>}
      {rightIcon && <View className="text-muted-foreground">{rightIcon}</View>}
      {action}
      {!action && !rightIcon && <Text className="text-lg text-muted-foreground">›</Text>}
    </Pressable>
  );
}
