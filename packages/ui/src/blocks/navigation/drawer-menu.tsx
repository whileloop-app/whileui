import React from 'react';
import {
  View,
  Pressable,
  useWindowDimensions,
  StyleSheet,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { Text } from '../../components/text';
import { cn } from '../../lib/cn';

const DRAWER_WIDTH_RATIO = 0.82;
const OPEN_DURATION = 300;
const CLOSE_DURATION = 220;

export interface DrawerMenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number;
  destructive?: boolean;
}

export interface DrawerMenuSection {
  title?: string;
  items: DrawerMenuItem[];
}

export interface DrawerMenuProps {
  visible: boolean;
  onClose: () => void;
  sections: DrawerMenuSection[];
  activeKey?: string;
  onSelect?: (key: string) => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export function DrawerMenu({
  visible,
  onClose,
  sections,
  activeKey,
  onSelect,
  header,
  footer,
  className,
  style,
}: DrawerMenuProps) {
  const { width: screenWidth } = useWindowDimensions();
  const drawerWidth = screenWidth * DRAWER_WIDTH_RATIO;
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withTiming(visible ? 1 : 0, {
      duration: visible ? OPEN_DURATION : CLOSE_DURATION,
      easing: visible
        ? Easing.bezier(0.2, 0.8, 0.2, 1) // Swift, decelerating entrance
        : Easing.bezier(0.4, 0, 1, 1), // Accelerating, sharp exit
    });
  }, [visible, progress]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: progress.value * 0.5,
    pointerEvents: progress.value > 0 ? 'auto' : 'none',
  }));

  const drawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(progress.value, [0, 1], [-drawerWidth, 0]) }],
  }));

  const containerStyle = useAnimatedStyle(() => ({
    pointerEvents: progress.value > 0 ? 'auto' : 'none',
  }));

  const handleItemPress = (key: string) => {
    onSelect?.(key);
  };

  return (
    <Animated.View style={[StyleSheet.absoluteFill, containerStyle]}>
      {/* Backdrop */}
      <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: '#000' }, backdropStyle]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>

      {/* Drawer Panel */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: drawerWidth,
            shadowColor: '#000',
            shadowOffset: { width: 4, height: 0 },
            shadowOpacity: 0.15,
            shadowRadius: 24,
            elevation: 16,
          },
          drawerStyle,
          style,
        ]}
        className={cn('bg-background border-r border-border rounded-r-2xl', className)}
      >
        <View className="flex-1 pt-14 pb-8">
          {/* Header */}
          {header && <View className="px-5 pb-4 mb-2 border-b border-border">{header}</View>}

          {/* Sections */}
          <View className="flex-1 px-3">
            {sections.map((section, sectionIndex) => (
              <View key={sectionIndex} className="mb-4">
                {section.title && (
                  <Text className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-3 mb-2">
                    {section.title}
                  </Text>
                )}
                <View className="gap-0.5">
                  {section.items.map((item) => {
                    const isActive = activeKey === item.key;
                    return (
                      <Pressable
                        key={item.key}
                        onPress={() => handleItemPress(item.key)}
                        className={cn(
                          'flex-row items-center gap-3 px-4 py-3 mx-1 rounded-xl active:opacity-70 transition-colors',
                          isActive && 'bg-primary/5'
                        )}
                      >
                        {item.icon}
                        <Text
                          className={cn(
                            'flex-1 text-[15px] font-semibold tracking-tight',
                            item.destructive
                              ? 'text-destructive'
                              : isActive
                                ? 'text-primary'
                                : 'text-foreground'
                          )}
                        >
                          {item.label}
                        </Text>
                        {isActive && (
                          <View className="w-1.5 h-1.5 rounded-full bg-primary ml-2" />
                        )}
                        {item.badge !== undefined && (
                          <View className="bg-primary px-2 py-0.5 rounded-full min-w-[20px] items-center">
                            <Text className="text-xs font-semibold text-primary-foreground">
                              {item.badge}
                            </Text>
                          </View>
                        )}
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            ))}
          </View>

          {/* Footer */}
          {footer && <View className="px-5 py-4 mt-auto border-t border-border">{footer}</View>}
        </View>
      </Animated.View>
    </Animated.View>
  );
}
