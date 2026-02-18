import React from 'react';
import { View, Text, type ViewProps, type TextProps } from 'react-native';
import { cn } from '../../lib/cn';
import { tv, type VariantProps } from '../../lib/tv';

const alertVariants = tv({
  base: 'w-full rounded-lg border p-4',
  variants: {
    variant: {
      default: 'border-border bg-background',
      destructive: 'border-destructive/50 bg-destructive/10',
      success: 'border-success/50 bg-success/10',
      warning: 'border-warning/50 bg-warning/10',
      info: 'border-info/50 bg-info/10',
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
