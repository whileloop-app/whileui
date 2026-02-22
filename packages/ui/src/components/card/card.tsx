import React from 'react';
import { View, type ViewProps, type TextProps } from 'react-native';
import { Text } from '../text';
import { cn } from '../../lib/cn';
import { tv, type VariantProps } from '../../lib/tv';

// ─── Card ────────────────────────────────────────────────────

const cardVariants = tv({
  base: 'rounded-xl border border-border bg-card',
  variants: {
    padding: {
      none: 'p-0',
      sm: 'p-4',
      default: 'p-6',
      lg: 'p-8',
    },
    unstyled: {
      true: 'rounded-none border-0 bg-transparent shadow-none',
      false: '',
    },
  },
  defaultVariants: {
    padding: 'default',
    unstyled: false,
  },
});

export interface CardProps extends ViewProps, VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<View, CardProps>(
  ({ className, padding, unstyled, ...props }, ref) => {
    return (
      <View ref={ref} className={cn(cardVariants({ padding, unstyled }), className)} {...props} />
    );
  }
);

Card.displayName = 'Card';

// ─── CardHeader ──────────────────────────────────────────────

export interface CardHeaderProps extends ViewProps {}

const CardHeader = React.forwardRef<View, CardHeaderProps>(({ className, ...props }, ref) => {
  return <View ref={ref} className={cn('pb-3', className)} {...props} />;
});

CardHeader.displayName = 'CardHeader';

// ─── CardTitle ───────────────────────────────────────────────

export interface CardTitleProps extends TextProps {}

const CardTitle = React.forwardRef<React.ComponentRef<typeof Text>, CardTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        className={cn('text-xl font-semibold text-card-foreground tracking-tight', className)}
        {...props}
      />
    );
  }
);

CardTitle.displayName = 'CardTitle';

// ─── CardDescription ────────────────────────────────────────

export interface CardDescriptionProps extends TextProps {}

const CardDescription = React.forwardRef<React.ComponentRef<typeof Text>, CardDescriptionProps>(
  ({ className, ...props }, ref) => {
    return <Text ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />;
  }
);

CardDescription.displayName = 'CardDescription';

// ─── CardContent ─────────────────────────────────────────────

export interface CardContentProps extends ViewProps {}

const CardContent = React.forwardRef<View, CardContentProps>(({ className, ...props }, ref) => {
  return <View ref={ref} className={cn('pb-3', className)} {...props} />;
});

CardContent.displayName = 'CardContent';

// ─── CardFooter ──────────────────────────────────────────────

export interface CardFooterProps extends ViewProps {}

const CardFooter = React.forwardRef<View, CardFooterProps>(({ className, ...props }, ref) => {
  return <View ref={ref} className={cn('flex-row items-center pt-1', className)} {...props} />;
});

CardFooter.displayName = 'CardFooter';

// ─── Exports ─────────────────────────────────────────────────

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants };
