import { useRef } from 'react';
import { View, Pressable, Animated, PanResponder, type ViewProps } from 'react-native';
import { Text } from '../../components/text';
import { cn } from '../../lib/cn';
import { useVisualTokens } from '../../lib/visual-tokens';
import { typographyStyle } from '../../lib/recipes';

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
  const visual = useVisualTokens();
  const actionWidth = visual.swipeActionWidth;
  const leftActionsRef = useRef(leftActions);
  const rightActionsRef = useRef(rightActions);
  const onSwipeLeftRef = useRef(onSwipeLeft);
  const onSwipeRightRef = useRef(onSwipeRight);
  const swipeThresholdRef = useRef(swipeThreshold);
  const actionWidthRef = useRef(actionWidth);
  const hasInteractiveSwipeRef = useRef(false);

  leftActionsRef.current = leftActions;
  rightActionsRef.current = rightActions;
  onSwipeLeftRef.current = onSwipeLeft;
  onSwipeRightRef.current = onSwipeRight;
  swipeThresholdRef.current = swipeThreshold;
  actionWidthRef.current = actionWidth;
  hasInteractiveSwipeRef.current =
    leftActions.length > 0 ||
    rightActions.length > 0 ||
    typeof onSwipeLeft === 'function' ||
    typeof onSwipeRight === 'function';

  const animateTo = (value: number) => {
    Animated.spring(translateX, {
      toValue: value,
      useNativeDriver: true,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        if (!hasInteractiveSwipeRef.current) return false;

        const absDx = Math.abs(gestureState.dx);
        const absDy = Math.abs(gestureState.dy);

        return absDx > 10 && absDx > absDy * 1.25;
      },
      onPanResponderMove: (_, gestureState) => {
        const maxLeft = leftActionsRef.current.length * actionWidthRef.current;
        const maxRight = rightActionsRef.current.length * actionWidthRef.current;

        let newX = gestureState.dx;
        if (newX > maxLeft) newX = maxLeft;
        if (newX < -maxRight) newX = -maxRight;

        translateX.setValue(newX);
      },
      onPanResponderRelease: (_, gestureState) => {
        const maxLeft = leftActionsRef.current.length * actionWidthRef.current;
        const maxRight = rightActionsRef.current.length * actionWidthRef.current;

        if (gestureState.dx > swipeThresholdRef.current) {
          onSwipeRightRef.current?.();
          animateTo(maxLeft > 0 ? maxLeft : 0);
        } else if (gestureState.dx < -swipeThresholdRef.current) {
          onSwipeLeftRef.current?.();
          animateTo(maxRight > 0 ? -maxRight : 0);
        } else {
          animateTo(0);
        }
      },
      onPanResponderTerminate: () => {
        animateTo(0);
      },
    })
  ).current;

  const resetPosition = () => {
    animateTo(0);
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
            <Text
              className="mt-1 font-medium text-swipe-action-foreground"
              style={typographyStyle(visual, 'caption')}
            >
              {action.label}
            </Text>
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
            <Text
              className="mt-1 font-medium text-swipe-action-foreground"
              style={typographyStyle(visual, 'caption')}
            >
              {action.label}
            </Text>
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
