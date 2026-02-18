import React from 'react';
import { View, Pressable, ScrollView, type ViewProps, type PressableProps } from 'react-native';
import { Text } from '../../components/text';
import { cn } from '../../lib/cn';

// ─── Types ───────────────────────────────────────────────────

export interface TabBarItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
}

export interface TabBarProps extends ViewProps {
  items: TabBarItem[];
  activeKey: string;
  onSelect: (key: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  scrollable?: boolean;
}

export interface TabBarItemProps extends Omit<PressableProps, 'children'> {
  item: TabBarItem;
  isActive: boolean;
  variant: 'default' | 'pills' | 'underline';
}

// ─── Components ──────────────────────────────────────────────

function TabBarItemComponent({ item, isActive, variant, className, ...props }: TabBarItemProps) {
  const { label, icon } = item;

  const baseStyles = 'flex-row items-center justify-center gap-2 px-4 py-2';
  const variantStyles = {
    default: isActive ? 'border-b-2 border-primary' : 'border-b-2 border-transparent',
    pills: isActive ? 'bg-primary rounded-full' : 'rounded-full',
    underline: isActive ? 'border-b-2 border-primary' : '',
  };
  const textStyles = {
    default: isActive ? 'text-primary font-semibold' : 'text-muted-foreground',
    pills: isActive ? 'text-primary-foreground font-semibold' : 'text-muted-foreground',
    underline: isActive ? 'text-foreground font-semibold' : 'text-muted-foreground',
  };

  return (
    <Pressable className={cn(baseStyles, variantStyles[variant], className)} {...props}>
      {icon && (
        <View className={isActive && variant === 'pills' ? 'text-primary-foreground' : ''}>
          {icon}
        </View>
      )}
      <Text className={cn('text-sm', textStyles[variant])}>{label}</Text>
    </Pressable>
  );
}

export function TabBar({
  items,
  activeKey,
  onSelect,
  variant = 'default',
  scrollable = false,
  className,
  ...props
}: TabBarProps) {
  const content = (
    <View
      className={cn(
        'flex-row',
        variant === 'pills' && 'gap-1 rounded-full bg-muted p-1',
        variant === 'default' && 'border-b border-border',
        !scrollable && 'justify-around',
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <TabBarItemComponent
          key={item.key}
          item={item}
          isActive={activeKey === item.key}
          variant={variant}
          onPress={() => onSelect(item.key)}
        />
      ))}
    </View>
  );

  if (scrollable) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {content}
      </ScrollView>
    );
  }

  return content;
}
