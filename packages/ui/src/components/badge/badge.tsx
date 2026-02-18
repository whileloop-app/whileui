import React, { createContext, useContext } from 'react';
import { View, Text, type ViewProps, type TextProps } from 'react-native';
import { cn } from '../../lib/cn';
import { tv, type VariantProps } from '../../lib/tv';

// ─── Context ─────────────────────────────────────────────────

interface BadgeContextValue {
  variant: VariantProps<typeof badgeVariants>['variant'];
}

const BadgeContext = createContext<BadgeContextValue>({
  variant: 'default',
});

const badgeVariants = tv({
  base: 'inline-flex items-center rounded-full px-2.5 py-0.5',
  variants: {
    variant: {
      default: 'bg-primary',
      secondary: 'bg-secondary',
      destructive: 'bg-destructive',
      outline: 'border border-border bg-transparent',
      success: 'bg-success',
      warning: 'bg-warning',
      info: 'bg-info',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const badgeTextVariants = tv({
  base: 'text-xs font-semibold',
  variants: {
    variant: {
      default: 'text-primary-foreground',
      secondary: 'text-secondary-foreground',
      destructive: 'text-destructive-foreground',
      outline: 'text-foreground',
      success: 'text-success-foreground',
      warning: 'text-warning-foreground',
      info: 'text-info-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface BadgeProps extends ViewProps, VariantProps<typeof badgeVariants> {}

export interface BadgeTextProps extends TextProps, VariantProps<typeof badgeTextVariants> {}

function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  return (
    <BadgeContext.Provider value={{ variant }}>
      <View className={cn(badgeVariants({ variant }), className)} {...props}>
        {children}
      </View>
    </BadgeContext.Provider>
  );
}

function BadgeText({ className, variant: variantProp, ...props }: BadgeTextProps) {
  const context = useContext(BadgeContext);
  const variant = variantProp ?? context.variant;

  return <Text className={cn(badgeTextVariants({ variant }), className)} {...props} />;
}

Badge.displayName = 'Badge';
BadgeText.displayName = 'BadgeText';

export { Badge, BadgeText, badgeVariants, badgeTextVariants };
