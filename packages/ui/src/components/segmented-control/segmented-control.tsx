import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  Pressable,
  Text,
  View,
  type PressableProps,
  type TextProps,
  type ViewProps,
} from 'react-native';
import { cn } from '../../lib/cn';
import { tv } from '../../lib/tv';

const segmentedControlVariants = tv({
  base: 'w-full flex-row items-center rounded-lg bg-muted p-1',
  variants: {
    wrap: {
      true: 'flex-wrap justify-center gap-1',
      false: 'flex-nowrap gap-1',
    },
    size: {
      default: '',
      compact: '',
    },
  },
  defaultVariants: {
    wrap: true,
    size: 'default',
  },
});

const segmentedControlItemVariants = tv({
  base: 'min-h-10 min-w-0 flex-row items-center justify-center rounded-md px-3 active:opacity-70',
  variants: {
    selected: {
      true: 'bg-background shadow-sm',
      false: 'bg-transparent',
    },
    size: {
      default: 'py-2',
      compact: 'min-h-9 py-1.5',
    },
    disabled: {
      true: 'opacity-50',
      false: '',
    },
    wrap: {
      true: 'basis-[48%] grow-0',
      false: 'flex-1',
    },
  },
  defaultVariants: {
    selected: false,
    size: 'default',
    disabled: false,
    wrap: true,
  },
});

const segmentedControlItemTextVariants = tv({
  base: 'font-medium',
  variants: {
    selected: {
      true: 'text-foreground',
      false: 'text-muted-foreground',
    },
    size: {
      default: 'text-sm',
      compact: 'text-xs',
    },
  },
  defaultVariants: {
    selected: false,
    size: 'default',
  },
});

interface SegmentedControlContextValue {
  value: string;
  onValueChange: (next: string) => void;
  size: 'default' | 'compact';
  wrap: boolean;
  disabled: boolean;
}

const SegmentedControlContext = createContext<SegmentedControlContextValue>({
  value: '',
  onValueChange: () => {},
  size: 'default',
  wrap: true,
  disabled: false,
});

interface SegmentedControlItemContextValue {
  selected: boolean;
  size: 'default' | 'compact';
}

const SegmentedControlItemContext = createContext<SegmentedControlItemContextValue>({
  selected: false,
  size: 'default',
});

export interface SegmentedControlProps extends ViewProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  wrap?: boolean | 'auto';
  size?: 'default' | 'compact';
  disabled?: boolean;
  className?: string;
}

export interface SegmentedControlItemProps extends Omit<PressableProps, 'children'> {
  value: string;
  children?: React.ReactNode;
  className?: string;
}

export interface SegmentedControlItemTextProps extends TextProps {
  className?: string;
}

function SegmentedControl({
  value: controlledValue,
  defaultValue = '',
  onValueChange,
  wrap = 'auto',
  size = 'default',
  disabled = false,
  className,
  children,
  ...props
}: SegmentedControlProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue ?? internalValue;
  const itemCount = useMemo(
    () => React.Children.toArray(children).filter((child) => React.isValidElement(child)).length,
    [children]
  );
  const shouldWrap = wrap === 'auto' ? itemCount > 3 : wrap;

  const handleValueChange = (nextValue: string) => {
    if (disabled || value === nextValue) {
      return;
    }
    setInternalValue(nextValue);
    onValueChange?.(nextValue);
  };

  const contextValue = useMemo(
    () => ({ value, onValueChange: handleValueChange, size, wrap: shouldWrap, disabled }),
    [value, size, shouldWrap, disabled]
  );

  return (
    <SegmentedControlContext.Provider value={contextValue}>
      <View
        className={cn(segmentedControlVariants({ wrap: shouldWrap, size }), className)}
        accessibilityRole="radiogroup"
        {...props}
      >
        {children}
      </View>
    </SegmentedControlContext.Provider>
  );
}

function SegmentedControlItem({
  value: itemValue,
  className,
  children,
  disabled: itemDisabled,
  ...props
}: SegmentedControlItemProps) {
  const { value, onValueChange, size, wrap, disabled } = useContext(SegmentedControlContext);
  const selected = value === itemValue;
  const finalDisabled = disabled || Boolean(itemDisabled);

  return (
    <SegmentedControlItemContext.Provider value={{ selected, size }}>
      <Pressable
        className={cn(
          segmentedControlItemVariants({
            selected,
            size,
            disabled: finalDisabled,
            wrap,
          }),
          className
        )}
        onPress={() => onValueChange(itemValue)}
        accessibilityRole="radio"
        accessibilityState={{ selected, disabled: finalDisabled }}
        disabled={finalDisabled}
        hitSlop={4}
        {...props}
      >
        {typeof children === 'string' ? (
          <SegmentedControlItemText>{children}</SegmentedControlItemText>
        ) : (
          children
        )}
      </Pressable>
    </SegmentedControlItemContext.Provider>
  );
}

function SegmentedControlItemText({ className, ...props }: SegmentedControlItemTextProps) {
  const { selected, size } = useContext(SegmentedControlItemContext);

  return (
    <Text
      className={cn(segmentedControlItemTextVariants({ selected, size }), className)}
      numberOfLines={1}
      {...props}
    />
  );
}

SegmentedControl.displayName = 'SegmentedControl';
SegmentedControlItem.displayName = 'SegmentedControlItem';
SegmentedControlItemText.displayName = 'SegmentedControlItemText';

export {
  SegmentedControl,
  SegmentedControlItem,
  SegmentedControlItemText,
  segmentedControlVariants,
  segmentedControlItemVariants,
  segmentedControlItemTextVariants,
};
