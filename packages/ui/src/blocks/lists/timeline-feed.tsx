import React from 'react';
import { View, ScrollView, type ViewProps } from 'react-native';
import { Text } from '../../components/text';
import { cn } from '../../lib/cn';

export interface TimelineItem {
  id: string;
  title: string;
  subtitle?: string;
  time?: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
}

export interface TimelineFeedProps extends ViewProps {
  className?: string;
  items: TimelineItem[];
  showConnector?: boolean;
}

function TimelineFeed({ className, items, showConnector = true, ...props }: TimelineFeedProps) {
  return (
    <ScrollView className={cn('flex-1', className)} {...props}>
      <View className="p-4">
        {items.map((item, index) => (
          <View key={item.id} className="flex-row">
            <View className="items-center mr-4" style={{ minWidth: 16 }}>
              {showConnector && index > 0 && <View className="w-0.5 bg-border h-4" />}
              {item.icon ? (
                <View className="w-8 h-8 rounded-full bg-primary items-center justify-center shrink-0">
                  {item.icon}
                </View>
              ) : (
                <View className="w-4 h-4 rounded-full bg-primary border-2 border-background shrink-0" />
              )}
              {showConnector && index < items.length - 1 && (
                <View className="w-0.5 bg-border flex-1 min-h-4" />
              )}
            </View>

            <View className={cn('flex-1 pb-6', index === items.length - 1 && 'pb-0')}>
              <View className="flex-row items-center justify-between">
                <Text variant="body" className="font-medium">
                  {item.title}
                </Text>
                {item.time && (
                  <Text variant="caption" className="text-muted-foreground">
                    {item.time}
                  </Text>
                )}
              </View>
              {item.subtitle && (
                <Text variant="caption" className="text-muted-foreground mt-1">
                  {item.subtitle}
                </Text>
              )}
              {item.content && <View className="mt-2">{item.content}</View>}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export { TimelineFeed };
