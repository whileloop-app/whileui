import { useRef } from 'react';
import { View, Pressable, Animated, PanResponder, type ViewProps } from 'react-native';
import { Text } from '../../components/text';
import { cn } from '../../lib/cn';

// ─── Types ───────────────────────────────────────────────────

export interface SwipeAction {
  key: string;
  label: string;
  icon?: React.ReactNode;
  color: string;
  onPress: () => void;
}

export interface SwipeableItemProps extends ViewProps {
  leftActions?: SwipeAction[];
  rightActions?: SwipeAction[];
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  swipeThreshold?: number;
}

const EMPTY_ACTIONS: SwipeAction[] = [];

// ─── Component ───────────────────────────────────────────────

export function SwipeableItem({
  leftActions = EMPTY_ACTIONS,
  rightActions = EMPTY_ACTIONS,
  onSwipeLeft,
  onSwipeRight,
  swipeThreshold = 80,
  children,
  className,
  ...props
}: SwipeableItemProps) {
  const translateX = useRef(new Animated.Value(0)).current;
  const actionWidth = 80;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        const maxLeft = leftActions.length * actionWidth;
        const maxRight = rightActions.length * actionWidth;

        let newX = gestureState.dx;
        if (newX > maxLeft) newX = maxLeft;
        if (newX < -maxRight) newX = -maxRight;

        translateX.setValue(newX);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > swipeThreshold && leftActions.length > 0) {
          // Show left actions
          Animated.spring(translateX, {
            toValue: leftActions.length * actionWidth,
            useNativeDriver: true,
          }).start();
        } else if (gestureState.dx < -swipeThreshold && rightActions.length > 0) {
          // Show right actions
          Animated.spring(translateX, {
            toValue: -rightActions.length * actionWidth,
            useNativeDriver: true,
          }).start();
        } else {
          // Reset
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const resetPosition = () => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View className={cn('overflow-hidden', className)} {...props}>
      {/* Left Actions */}
      <View className="absolute bottom-0 left-0 top-0 flex-row">
        {leftActions.map((action, _index) => (
          <Pressable
            key={action.key}
            onPress={() => {
              action.onPress();
              resetPosition();
            }}
            className="items-center justify-center"
            style={{ width: actionWidth, backgroundColor: action.color }}
          >
            {action.icon}
            <Text className="mt-1 text-xs font-medium text-white">{action.label}</Text>
          </Pressable>
        ))}
      </View>

      {/* Right Actions */}
      <View className="absolute bottom-0 right-0 top-0 flex-row">
        {rightActions.map((action, _index) => (
          <Pressable
            key={action.key}
            onPress={() => {
              action.onPress();
              resetPosition();
            }}
            className="items-center justify-center"
            style={{ width: actionWidth, backgroundColor: action.color }}
          >
            {action.icon}
            <Text className="mt-1 text-xs font-medium text-white">{action.label}</Text>
          </Pressable>
        ))}
      </View>

      {/* Content */}
      <Animated.View
        {...panResponder.panHandlers}
        style={{ transform: [{ translateX }] }}
        className="bg-background"
      >
        {children}
      </Animated.View>
    </View>
  );
}
