import React from 'react';
import { Pressable, ScrollView, View, type ViewProps } from 'react-native';
import { Text } from '../../components/text';
import { cn } from '../../lib/cn';

export interface NavigationSidebarItem {
  key: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: number;
  disabled?: boolean;
}

export interface NavigationSidebarSection {
  title?: string;
  items: NavigationSidebarItem[];
}

export interface NavigationSidebarProps extends ViewProps {
  sections: NavigationSidebarSection[];
  activeKey?: string;
  onSelect?: (key: string) => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export function NavigationSidebar({
  sections,
  activeKey,
  onSelect,
  header,
  footer,
  className,
  ...props
}: NavigationSidebarProps) {
  return (
    <View className={cn('w-72 border-r border-border bg-background', className)} {...props}>
      {header ? <View className="border-b border-border px-4 py-4">{header}</View> : null}

      <ScrollView className="flex-1 px-3 py-4">
        <View className="gap-4">
          {sections.map((section, index) => (
            <View key={index} className="gap-1">
              {section.title ? (
                <Text className="px-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {section.title}
                </Text>
              ) : null}

              {section.items.map((item) => {
                const isActive = activeKey === item.key;
                return (
                  <Pressable
                    key={item.key}
                    onPress={() => onSelect?.(item.key)}
                    disabled={item.disabled}
                    className={cn(
                      'min-h-11 flex-row items-center gap-3 rounded-lg px-3 py-2 active:opacity-70',
                      isActive && 'bg-primary/10',
                      item.disabled && 'opacity-50'
                    )}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isActive, disabled: item.disabled }}
                  >
                    {item.icon ? <View className="shrink-0">{item.icon}</View> : null}

                    <View className="min-w-0 flex-1 gap-0.5">
                      <Text
                        className={cn('font-medium', isActive ? 'text-primary' : 'text-foreground')}
                        numberOfLines={1}
                      >
                        {item.label}
                      </Text>
                      {item.description ? (
                        <Text className="text-xs text-muted-foreground" numberOfLines={1}>
                          {item.description}
                        </Text>
                      ) : null}
                    </View>

                    {item.badge !== undefined ? (
                      <View
                        className={cn(
                          'min-w-5 rounded-full px-1.5 py-0.5',
                          isActive ? 'bg-primary' : 'bg-muted'
                        )}
                      >
                        <Text
                          className={cn(
                            'text-[11px] font-medium',
                            isActive ? 'text-primary-foreground' : 'text-muted-foreground'
                          )}
                        >
                          {item.badge}
                        </Text>
                      </View>
                    ) : null}
                  </Pressable>
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>

      {footer ? <View className="border-t border-border px-4 py-4">{footer}</View> : null}
    </View>
  );
}
