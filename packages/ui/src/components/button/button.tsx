import React, { createContext, useContext } from 'react';
import {
  Pressable,
  Text,
  View,
  type PressableProps,
  type TextProps,
  type ViewProps,
} from 'react-native';
import { cn } from '../../lib/cn';
import { tv, type VariantProps } from '../../lib/tv';
import { useResolveFontFamily } from '../../lib/font-context';

// ─── Context ─────────────────────────────────────────────────

interface ButtonContextValue {
  variant: VariantProps<typeof buttonVariants>['variant'];
  size: VariantProps<typeof buttonVariants>['size'];
}

const ButtonContext = createContext<ButtonContextValue>({
  variant: 'default',
  size: 'default',
});

// ─── Variants ────────────────────────────────────────────────

const buttonVariants = tv({
  base: 'inline-flex items-center justify-center rounded-md',
  variants: {
    variant: {
      default: 'bg-primary active:bg-primary/90',
      destructive: 'bg-destructive active:bg-destructive/90',
      outline: 'border border-input bg-background active:bg-accent',
      secondary: 'bg-secondary active:bg-secondary/80',
      ghost: 'active:bg-accent',
      link: '',
    },
    size: {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-12 rounded-md px-6',
      icon: 'h-11 w-11',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

const buttonTextVariants = tv({
  base: 'text-sm font-medium text-center',
  variants: {
    variant: {
      default: 'text-primary-foreground',
      destructive: 'text-destructive-foreground',
      outline: 'text-foreground',
      secondary: 'text-secondary-foreground',
      ghost: 'text-foreground',
      link: 'text-primary underline',
    },
    size: {
      default: 'text-sm',
      sm: 'text-xs',
      lg: 'text-base',
      icon: 'text-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

// ─── Types ───────────────────────────────────────────────────

export interface ButtonProps
  extends Omit<PressableProps, 'children'>, VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export interface ButtonTextProps extends TextProps {
  variant?: VariantProps<typeof buttonTextVariants>['variant'];
  size?: VariantProps<typeof buttonTextVariants>['size'];
  className?: string;
}

export interface ButtonIconProps extends ViewProps {
  position?: 'left' | 'right';
  className?: string;
}

// ─── Components ──────────────────────────────────────────────

const Button = React.forwardRef<React.ComponentRef<typeof Pressable>, ButtonProps>(
  ({ className, variant = 'default', size = 'default', disabled, children, ...props }, ref) => {
    return (
      <ButtonContext.Provider value={{ variant, size }}>
        <Pressable
          ref={ref as any}
          className={cn(buttonVariants({ variant, size }), disabled && 'opacity-50', className)}
          disabled={disabled}
          {...props}
        >
          {children}
        </Pressable>
      </ButtonContext.Provider>
    );
  }
);

Button.displayName = 'Button';

// ─── Sub-components ──────────────────────────────────────────

function ButtonText({
  className,
  variant: variantProp,
  size: sizeProp,
  style,
  ...props
}: ButtonTextProps) {
  const context = useContext(ButtonContext);
  const variant = variantProp ?? context.variant;
  const size = sizeProp ?? context.size;
  const resolved = cn(buttonTextVariants({ variant, size }), className);
  const fontFamily = useResolveFontFamily(resolved);

  return (
    <Text className={resolved} style={fontFamily ? [{ fontFamily }, style] : style} {...props} />
  );
}

ButtonText.displayName = 'ButtonText';

function ButtonIcon({ className, position = 'left', ...props }: ButtonIconProps) {
  return <View className={cn(position === 'left' ? 'mr-2' : 'ml-2', className)} {...props} />;
}

ButtonIcon.displayName = 'ButtonIcon';

// ─── Exports ─────────────────────────────────────────────────

export { Button, ButtonText, ButtonIcon, buttonVariants, buttonTextVariants };
