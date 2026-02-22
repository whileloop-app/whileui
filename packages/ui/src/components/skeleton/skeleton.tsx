import { useEffect } from 'react';
import { View, type ViewProps } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { cn } from '../../lib/cn';
import { tv, type VariantProps } from '../../lib/tv';

// ─── Variants ─────────────────────────────────────────────────

const skeletonVariants = tv({
  base: 'rounded-md bg-muted',
  variants: {
    variant: {
      pulse: '',
      shimmer: '',
    },
  },
  defaultVariants: { variant: 'pulse' },
});

// ─── Types ───────────────────────────────────────────────────

export interface SkeletonProps extends ViewProps, VariantProps<typeof skeletonVariants> {
  className?: string;
}

// ─── Component ───────────────────────────────────────────────

function Skeleton({ className, variant = 'pulse', ...props }: SkeletonProps) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: variant === 'shimmer' ? 1400 : 1500, easing: Easing.linear }),
      -1,
      false
    );
  }, [progress, variant]);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: variant === 'pulse' ? interpolate(progress.value, [0, 0.5, 1], [1, 0.35, 1]) : 1,
  }));

  const shimmerBandWidth = 56;
  const shimmerStyle = useAnimatedStyle(() => {
    if (variant !== 'shimmer') return {};
    return {
      transform: [{ translateX: interpolate(progress.value, [0, 1], [-shimmerBandWidth, 999]) }],
    };
  });

  if (variant === 'shimmer') {
    return (
      <View
        className={cn(skeletonVariants({ variant }), 'overflow-hidden', className)}
        {...(props as any)}
      >
        <Animated.View
          style={[
            shimmerStyle,
            {
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: shimmerBandWidth,
              backgroundColor: 'rgba(255,255,255,0.35)',
            },
          ]}
        />
      </View>
    );
  }

  return (
    <Animated.View
      style={pulseStyle}
      className={cn(skeletonVariants({ variant }), className)}
      {...(props as any)}
    />
  );
}

Skeleton.displayName = 'Skeleton';

// ─── Exports ─────────────────────────────────────────────────

export { Skeleton, skeletonVariants };
