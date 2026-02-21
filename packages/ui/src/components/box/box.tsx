import React from 'react';
import { View, type ViewProps } from 'react-native';
import { cn } from '../../lib/cn';
import { tv, type VariantProps } from '../../lib/tv';

const boxVariants = tv({
  base: '',
  variants: {
    padding: {
      none: '',
      xs: 'p-1',
      sm: 'p-2',
      md: 'p-3',
      lg: 'p-4',
      xl: 'p-6',
      '2xl': 'p-8',
    },
    margin: {
      none: '',
      xs: 'm-1',
      sm: 'm-2',
      md: 'm-3',
      lg: 'm-4',
      xl: 'm-6',
      '2xl': 'm-8',
    },
  },
  defaultVariants: {
    padding: 'none',
    margin: 'none',
  },
});

export interface BoxProps extends Omit<ViewProps, 'className'>, VariantProps<typeof boxVariants> {
  className?: string;
}

const Box = React.forwardRef<React.ComponentRef<typeof View>, BoxProps>(
  ({ className, padding, margin, ...props }, ref) => {
    return (
      <View ref={ref} className={cn(boxVariants({ padding, margin }), className)} {...props} />
    );
  }
);

Box.displayName = 'Box';

export { Box, boxVariants };
