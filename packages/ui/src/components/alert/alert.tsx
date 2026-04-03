import React from 'react';
import { View, Text, type ViewProps, type TextProps } from 'react-native';
import { cn } from '../../lib/cn';
import { tv, type VariantProps } from '../../lib/tv';

const alertVariants = tv({
  base: 'w-full rounded-lg border p-4',
  variants: {
    variant: {
      default: 'border-border bg-background',
      destructive: 'border-destructive-soft-border bg-destructive-soft',
      success: 'border-success-soft-border bg-success-soft',
      warning: 'border-warning-soft-border bg-warning-soft',
      info: 'border-info-soft-border bg-info-soft',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface AlertProps extends ViewProps, VariantProps<typeof alertVariants> {}

const Alert = React.forwardRef<View, AlertProps>(({ className, variant, ...props }, ref) => {
  return <View ref={ref} className={cn(alertVariants({ variant }), className)} {...props} />;
});

Alert.displayName = 'Alert';

// ─── AlertTitle ──────────────────────────────────────────────

export interface AlertTitleProps extends TextProps {}

const AlertTitle = React.forwardRef<Text, AlertTitleProps>(({ className, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      className={cn('mb-1 text-base font-semibold text-foreground', className)}
      {...props}
    />
  );
});

AlertTitle.displayName = 'AlertTitle';

// ─── AlertDescription ───────────────────────────────────────

export interface AlertDescriptionProps extends TextProps {}

const AlertDescription = React.forwardRef<Text, AlertDescriptionProps>(
  ({ className, ...props }, ref) => {
    return <Text ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />;
  }
);

AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription, alertVariants };
