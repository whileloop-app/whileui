import React, { createContext, useContext } from 'react';
import { Pressable, Text, type PressableProps, type TextProps } from 'react-native';
import { cn } from '../../lib/cn';
import { tv, type VariantProps } from '../../lib/tv';

// ─── Context ─────────────────────────────────────────────────

interface ToggleContextValue {
  pressed: boolean;
  variant: VariantProps<typeof toggleVariants>['variant'];
  size: VariantProps<typeof toggleVariants>['size'];
}

const ToggleContext = createContext<ToggleContextValue>({
  pressed: false,
  variant: 'default',
  size: 'default',
});

// ─── Variants ────────────────────────────────────────────────

const toggleVariants = tv({
  base: 'inline-flex items-center justify-center rounded-md active:bg-accent',
  variants: {
    variant: {
      default: 'bg-transparent',
      outline: 'border border-input bg-transparent',
    },
    size: {
      default: 'h-10 px-3',
      sm: 'h-8 px-2',
      lg: 'h-12 px-4',
    },
    pressed: {
      true: 'bg-accent',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    pressed: false,
  },
});

const toggleTextVariants = tv({
  base: 'text-sm font-medium',
  variants: {
    pressed: {
      true: 'text-accent-foreground',
      false: 'text-muted-foreground',
    },
    size: {
      default: 'text-sm',
      sm: 'text-xs',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    pressed: false,
    size: 'default',
  },
});

// ─── Types ───────────────────────────────────────────────────

export interface ToggleProps extends Omit<PressableProps, 'children'> {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  variant?: VariantProps<typeof toggleVariants>['variant'];
  size?: VariantProps<typeof toggleVariants>['size'];
  className?: string;
  children?: React.ReactNode;
}

export interface ToggleTextProps extends TextProps {
  className?: string;
}

// ─── Component ───────────────────────────────────────────────

function Toggle({
  pressed: controlledPressed,
  defaultPressed = false,
  onPressedChange,
  variant = 'default',
  size = 'default',
  className,
  children,
  ...props
}: ToggleProps) {
  const [internalPressed, setInternalPressed] = React.useState(defaultPressed);
  const pressed = controlledPressed ?? internalPressed;

  const handlePress = () => {
    const next = !pressed;
    setInternalPressed(next);
    onPressedChange?.(next);
  };

  return (
    <ToggleContext.Provider value={{ pressed, variant, size }}>
      <Pressable
        className={cn(toggleVariants({ variant, size, pressed }), className)}
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityState={{ selected: pressed }}
        {...props}
      >
        {children}
      </Pressable>
    </ToggleContext.Provider>
  );
}

function ToggleText({ className, ...props }: ToggleTextProps) {
  const { pressed, size } = useContext(ToggleContext);
  return <Text className={cn(toggleTextVariants({ pressed, size }), className)} {...props} />;
}

Toggle.displayName = 'Toggle';
ToggleText.displayName = 'ToggleText';

export { Toggle, ToggleText, toggleVariants, toggleTextVariants };
