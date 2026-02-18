import React from 'react';
import { ActivityIndicator, type ActivityIndicatorProps } from 'react-native';
import { cn } from '../../lib/cn';
import { tv, type VariantProps } from '../../lib/tv';

const spinnerVariants = tv({
  base: '',
  variants: {
    size: {
      sm: '',
      default: '',
      lg: '',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

const sizeMap: Record<string, 'small' | 'large'> = {
  sm: 'small',
  default: 'small',
  lg: 'large',
};

export interface SpinnerProps
  extends Omit<ActivityIndicatorProps, 'size'>, VariantProps<typeof spinnerVariants> {
  className?: string;
}

function Spinner({ className, size, ...props }: SpinnerProps) {
  const activityIndicatorSize =
    size && size in sizeMap ? sizeMap[size as keyof typeof sizeMap] : 'small';

  return (
    <ActivityIndicator
      size={activityIndicatorSize}
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    />
  );
}

Spinner.displayName = 'Spinner';

export { Spinner, spinnerVariants };
