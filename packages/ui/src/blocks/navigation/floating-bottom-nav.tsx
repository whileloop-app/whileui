import React from 'react';
import { View, Pressable, type ViewProps, type PressableProps } from 'react-native';
import { Text } from '../../components/text';
import { cn } from '../../lib/cn';

// ─── Types ───────────────────────────────────────────────────

export interface FloatingBottomNavItem {
  key: string;
  label: string;
  icon: React.ReactNode;
}

export interface FloatingBottomNavProps extends ViewProps {
  items: FloatingBottomNavItem[];
  activeKey: string;
  onSelect: (key: string) => void;
}

export interface FloatingBottomNavItemProps extends Omit<PressableProps, 'children'> {
  item: FloatingBottomNavItem;
  isActive: boolean;
}

// ─── Components ──────────────────────────────────────────────

function FloatingNavItem({ item, isActive, className, ...props }: FloatingBottomNavItemProps) {
  const { label, icon } = item;

  return (
    <Pressable
      className={cn(
        'flex-row items-center gap-2 rounded-full px-4 py-2',
        isActive && 'bg-primary',
        className
      )}
      {...props}
    >
      <View className={cn(isActive ? 'text-primary-foreground' : 'text-muted-foreground')}>
        {icon}
      </View>
      {isActive && <Text className="text-sm font-semibold text-primary-foreground">{label}</Text>}
    </Pressable>
  );
}

export function FloatingBottomNav({
  items,
  activeKey,
  onSelect,
  className,
  ...props
}: FloatingBottomNavProps) {
  return (
    <View className={cn('items-center pb-8', className)} {...props}>
      <View className="flex-row items-center gap-1 rounded-full bg-card p-1.5 shadow-lg">
        {items.map((item) => (
          <FloatingNavItem
            key={item.key}
            item={item}
            isActive={activeKey === item.key}
            onPress={() => onSelect(item.key)}
          />
        ))}
      </View>
    </View>
  );
}
