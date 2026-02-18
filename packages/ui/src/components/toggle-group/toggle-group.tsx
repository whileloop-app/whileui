import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  View,
  Pressable,
  Text,
  type ViewProps,
  type PressableProps,
  type TextProps,
} from 'react-native';
import { cn } from '../../lib/cn';
import { tv } from '../../lib/tv';

// ─── Context ─────────────────────────────────────────────────

type ToggleGroupType = 'single' | 'multiple';

interface ToggleGroupContextValue {
  type: ToggleGroupType;
  value: string[];
  onValueChange: (itemValue: string) => void;
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
}

const ToggleGroupContext = createContext<ToggleGroupContextValue>({
  type: 'single',
  value: [],
  onValueChange: () => {},
});

interface ToggleGroupItemContextValue {
  pressed: boolean;
  size?: 'default' | 'sm' | 'lg';
}

const ToggleGroupItemContext = createContext<ToggleGroupItemContextValue>({
  pressed: false,
  size: 'default',
});

// ─── Variants ────────────────────────────────────────────────

const toggleGroupItemVariants = tv({
  base: 'inline-flex items-center justify-center rounded-md',
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

const toggleGroupItemTextVariants = tv({
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

export interface ToggleGroupProps extends ViewProps {
  type?: ToggleGroupType;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

export interface ToggleGroupItemProps extends Omit<PressableProps, 'children'> {
  value: string;
  className?: string;
  children?: React.ReactNode;
}

export interface ToggleGroupItemTextProps extends TextProps {
  className?: string;
}

// ─── Components ──────────────────────────────────────────────

function ToggleGroup({
  type = 'single',
  defaultValue,
  value: controlledValue,
  onValueChange,
  variant = 'default',
  size = 'default',
  className,
  children,
  ...props
}: ToggleGroupProps) {
  const [internalValue, setInternalValue] = useState<string[]>(() => {
    if (!defaultValue) return [];
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  });

  const value = controlledValue
    ? Array.isArray(controlledValue)
      ? controlledValue
      : [controlledValue]
    : internalValue;

  const handleValueChange = useCallback(
    (itemValue: string) => {
      let next: string[];
      if (type === 'single') {
        next = value.includes(itemValue) ? [] : [itemValue];
      } else {
        next = value.includes(itemValue)
          ? value.filter((v) => v !== itemValue)
          : [...value, itemValue];
      }
      setInternalValue(next);
      onValueChange?.(type === 'single' ? next[0] || '' : next);
    },
    [type, value, onValueChange]
  );

  return (
    <ToggleGroupContext.Provider
      value={{ type, value, onValueChange: handleValueChange, variant, size }}
    >
      <View className={cn('flex flex-row items-center gap-1', className)} {...props}>
        {children}
      </View>
    </ToggleGroupContext.Provider>
  );
}

function ToggleGroupItem({
  value: itemValue,
  className,
  children,
  ...props
}: ToggleGroupItemProps) {
  const { value, onValueChange, variant, size } = useContext(ToggleGroupContext);
  const pressed = value.includes(itemValue);

  return (
    <ToggleGroupItemContext.Provider value={{ pressed, size }}>
      <Pressable
        className={cn(toggleGroupItemVariants({ variant, size, pressed }), className)}
        onPress={() => onValueChange(itemValue)}
        accessibilityRole="button"
        accessibilityState={{ selected: pressed }}
        {...props}
      >
        {children}
      </Pressable>
    </ToggleGroupItemContext.Provider>
  );
}

function ToggleGroupItemText({ className, ...props }: ToggleGroupItemTextProps) {
  const { pressed, size } = useContext(ToggleGroupItemContext);
  return (
    <Text className={cn(toggleGroupItemTextVariants({ pressed, size }), className)} {...props} />
  );
}

ToggleGroup.displayName = 'ToggleGroup';
ToggleGroupItem.displayName = 'ToggleGroupItem';
ToggleGroupItemText.displayName = 'ToggleGroupItemText';

export {
  ToggleGroup,
  ToggleGroupItem,
  ToggleGroupItemText,
  toggleGroupItemVariants,
  toggleGroupItemTextVariants,
};
