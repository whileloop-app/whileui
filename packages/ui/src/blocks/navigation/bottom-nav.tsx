import React from 'react';
import { View, Pressable, type ViewProps, type PressableProps } from 'react-native';
import { Text } from '../../components/text';
import { cn } from '../../lib/cn';

// ─── Types ───────────────────────────────────────────────────

export interface BottomNavItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

export interface BottomNavProps extends ViewProps {
  items: BottomNavItem[];
  activeKey: string;
  onSelect: (key: string) => void;
}

export interface BottomNavItemProps extends Omit<PressableProps, 'children'> {
  item: BottomNavItem;
  isActive: boolean;
}

// ─── Components ──────────────────────────────────────────────

function BottomNavItemComponent({ item, isActive, className, ...props }: BottomNavItemProps) {
  const { label, icon, badge } = item;

  return (
    <Pressable
      className={cn('flex-1 items-center justify-center py-2 active:opacity-70', className)}
      {...props}
    >
      <View className={cn('relative', !isActive && 'opacity-50')}>
        {icon}
        {badge !== undefined && badge > 0 && (
          <View className="absolute -right-2 -top-1 h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1">
            <Text className="text-[10px] font-bold text-destructive-foreground">
              {badge > 99 ? '99+' : badge}
            </Text>
          </View>
        )}
      </View>
      <Text
        className={cn(
          'mt-1 text-xs font-medium',
          isActive ? 'text-primary' : 'text-muted-foreground'
        )}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function BottomNav({ items, activeKey, onSelect, className, ...props }: BottomNavProps) {
  return (
    <View
      className={cn('flex-row border-t border-border bg-background px-2 pb-6 pt-2', className)}
      {...props}
    >
      {items.map((item) => (
        <BottomNavItemComponent
          key={item.key}
          item={item}
          isActive={activeKey === item.key}
          onPress={() => onSelect(item.key)}
        />
      ))}
    </View>
  );
}
