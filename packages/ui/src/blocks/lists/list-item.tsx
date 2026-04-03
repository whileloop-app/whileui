import React from 'react';
import { View, Pressable, type PressableProps } from 'react-native';
import { Text } from '../../components/text';
import { Skeleton } from '../../components/skeleton';
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
  /** Show a skeleton placeholder instead of content. */
  loading?: boolean;
}

// ─── Skeleton ─────────────────────────────────────────────────

function ListItemSkeleton({
  showBorder = true,
  compact = false,
  className,
}: {
  showBorder?: boolean;
  compact?: boolean;
  className?: string;
}) {
  return (
    <View
      className={cn(
        'flex-row items-center bg-card px-4',
        compact ? 'py-2' : 'py-3',
        showBorder && 'border-b border-border',
        className
      )}
    >
      <Skeleton className="mr-3 h-8 w-8 rounded-lg" />
      <View className="flex-1 gap-1.5">
        <Skeleton className="h-4 w-2/3 rounded-md" />
        <Skeleton className="h-3 w-1/3 rounded-md" />
      </View>
      <Skeleton className="h-4 w-4 rounded-sm" />
    </View>
  );
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
  loading = false,
  className,
  ...props
}: ListItemProps) {
  if (loading) {
    return <ListItemSkeleton showBorder={showBorder} compact={compact} className={className} />;
  }

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
