import { useEffect } from 'react';
import { type ViewProps } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { cn } from '../../lib/cn';

// ─── Types ───────────────────────────────────────────────────

export interface SkeletonProps extends ViewProps {
  className?: string;
}

// ─── Component ───────────────────────────────────────────────

function Skeleton({ className, ...props }: SkeletonProps) {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.5, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={animatedStyle}
      className={cn('rounded-md bg-muted', className)}
      {...(props as any)}
    />
  );
}

Skeleton.displayName = 'Skeleton';

// ─── Exports ─────────────────────────────────────────────────

export { Skeleton };
