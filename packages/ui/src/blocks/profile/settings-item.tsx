import React from 'react';
import { View, Pressable, type PressableProps } from 'react-native';
import { Text } from '../../components/text';
import { Switch } from '../../components/switch';
import { cn } from '../../lib/cn';

// ─── Types ───────────────────────────────────────────────────

export interface SettingsItemProps extends Omit<PressableProps, 'children'> {
  icon?: React.ReactNode;
  label: string;
  description?: string;
  value?: string;
  type?: 'navigate' | 'toggle' | 'action';
  toggleValue?: boolean;
  onToggle?: (value: boolean) => void;
  destructive?: boolean;
  showBorder?: boolean;
}

// ─── Component ───────────────────────────────────────────────

export function SettingsItem({
  icon,
  label,
  description,
  value,
  type = 'navigate',
  toggleValue,
  onToggle,
  destructive = false,
  showBorder = true,
  className,
  ...props
}: SettingsItemProps) {
  const isToggle = type === 'toggle';

  return (
    <Pressable
      className={cn(
        'flex-row items-center px-4 py-3',
        showBorder && 'border-b border-border',
        !isToggle && 'active:bg-muted',
        className
      )}
      disabled={isToggle}
      {...props}
    >
      {/* Icon */}
      {icon && (
        <View className={cn('mr-3', destructive ? 'text-destructive' : 'text-muted-foreground')}>
          {icon}
        </View>
      )}

      {/* Content */}
      <View className="flex-1">
        <Text className={cn('text-base', destructive ? 'text-destructive' : 'text-foreground')}>
          {label}
        </Text>
        {description && <Text className="text-sm text-muted-foreground">{description}</Text>}
      </View>

      {/* Right Side */}
      {type === 'toggle' && onToggle && (
        <Switch checked={toggleValue || false} onCheckedChange={onToggle} />
      )}

      {type === 'navigate' && (
        <View className="flex-row items-center">
          {value && <Text className="mr-2 text-muted-foreground">{value}</Text>}
          <Text className="text-lg text-muted-foreground">›</Text>
        </View>
      )}
    </Pressable>
  );
}
