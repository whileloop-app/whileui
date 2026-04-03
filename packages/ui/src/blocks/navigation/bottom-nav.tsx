import React from 'react';
import { View, Pressable, type ViewProps, type PressableProps } from 'react-native';
import { Text } from '../../components/text';
import { cn } from '../../lib/cn';
import { useInteractionTokens, withInteractivePressableStyle } from '../../lib/interaction-tokens';
import { useVisualTokens } from '../../lib/visual-tokens';

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

function BottomNavItemComponent({
  item,
  isActive,
  className,
  style: styleProp,
  ...props
}: BottomNavItemProps) {
  const { label, icon, badge } = item;
  const interaction = useInteractionTokens();
  const visual = useVisualTokens();
  const interactiveStyle = withInteractivePressableStyle(styleProp, interaction, {
    pressedVariant: 'default',
  });

  return (
    <Pressable
      className={cn('flex-1 items-center justify-center py-2', className)}
      style={interactiveStyle}
      {...props}
    >
      <View
        className="relative"
        style={!isActive ? { opacity: interaction.inactiveOpacity } : undefined}
      >
        {icon}
        {badge !== undefined && badge > 0 && (
          <View className="absolute -right-2 -top-1 h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1">
            <Text
              className="font-bold text-destructive-foreground"
              style={{ fontSize: visual.bottomNavBadgeFontSize }}
            >
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
