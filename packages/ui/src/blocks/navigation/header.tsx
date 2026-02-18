import React from 'react';
import { View, Pressable, type ViewProps, type PressableProps } from 'react-native';
import { Text } from '../../components/text';
import { cn } from '../../lib/cn';

// ─── Types ───────────────────────────────────────────────────

export interface HeaderAction {
  key: string;
  icon: React.ReactNode;
  onPress: () => void;
}

export interface HeaderProps extends ViewProps {
  title?: string;
  subtitle?: string;
  leftAction?: React.ReactNode;
  rightActions?: HeaderAction[];
  centerContent?: React.ReactNode;
  transparent?: boolean;
  border?: boolean;
}

// ─── Component ───────────────────────────────────────────────

export function Header({
  title,
  subtitle,
  leftAction,
  rightActions,
  centerContent,
  transparent = false,
  border = true,
  className,
  ...props
}: HeaderProps) {
  return (
    <View
      className={cn(
        'flex-row items-center px-4 py-3',
        !transparent && 'bg-background',
        border && 'border-b border-border',
        className
      )}
      {...props}
    >
      {/* Left */}
      <View className="min-w-12">{leftAction}</View>

      {/* Center */}
      <View className="flex-1 items-center">
        {centerContent || (
          <View className="items-center">
            {title && (
              <Text className="text-base font-semibold text-foreground" numberOfLines={1}>
                {title}
              </Text>
            )}
            {subtitle && (
              <Text className="text-xs text-muted-foreground" numberOfLines={1}>
                {subtitle}
              </Text>
            )}
          </View>
        )}
      </View>

      {/* Right */}
      <View className="min-w-12 flex-row items-center justify-end gap-2">
        {rightActions?.map((action) => (
          <Pressable
            key={action.key}
            onPress={action.onPress}
            className="rounded-full p-2 active:bg-accent"
          >
            {action.icon}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

// ─── Header Back Button ──────────────────────────────────────

export interface HeaderBackButtonProps extends Omit<PressableProps, 'children'> {
  icon?: React.ReactNode;
  label?: string;
}

export function HeaderBackButton({ icon, label, className, ...props }: HeaderBackButtonProps) {
  return (
    <Pressable
      className={cn('flex-row items-center gap-1 rounded-full py-1 active:opacity-70', className)}
      {...props}
    >
      {icon || <Text className="text-xl text-primary">‹</Text>}
      {label && <Text className="text-base text-primary">{label}</Text>}
    </Pressable>
  );
}
