import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, Text, TextInput, View, type TextInputProps } from 'react-native';
import { cn } from '../../lib/cn';
import { tv, type VariantProps } from '../../lib/tv';

const numericInputVariants = tv({
  base: 'w-full flex-row items-center rounded-md border bg-background',
  variants: {
    variant: {
      default: 'border-input',
      error: 'border-destructive',
    },
    size: {
      default: 'h-10',
      compact: 'h-9',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

const numericInputTextVariants = tv({
  base: 'flex-1 px-3 py-2 text-foreground',
  variants: {
    size: {
      default: 'text-sm',
      compact: 'text-xs',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

const stepperButtonVariants = tv({
  base: 'h-full w-11 items-center justify-center active:opacity-70',
  variants: {
    size: {
      default: 'px-3',
      compact: 'px-2',
    },
    disabled: {
      true: 'opacity-40',
      false: '',
    },
  },
  defaultVariants: {
    size: 'default',
    disabled: false,
  },
});

function toInputText(value: number | null | undefined) {
  if (value === null || value === undefined) {
    return '';
  }
  return Number.isFinite(value) ? String(value) : '';
}

function parseNumericText(text: string) {
  const normalized = text.replace(',', '.').trim();
  if (!normalized || normalized === '-' || normalized === '.' || normalized === '-.') {
    return null;
  }

  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function clampValue(value: number, min?: number, max?: number) {
  let next = value;
  if (min !== undefined && next < min) {
    next = min;
  }
  if (max !== undefined && next > max) {
    next = max;
  }
  return next;
}

export interface NumericInputProps
  extends
    Omit<TextInputProps, 'value' | 'defaultValue' | 'onChangeText' | 'keyboardType'>,
    VariantProps<typeof numericInputVariants> {
  className?: string;
  inputClassName?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  value?: number | null;
  defaultValue?: number;
  onValueChange?: (value: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  showSteppers?: boolean;
}

const NumericInput = React.forwardRef<TextInput, NumericInputProps>(
  (
    {
      className,
      inputClassName,
      prefix,
      suffix,
      value,
      defaultValue,
      onValueChange,
      min,
      max,
      step = 1,
      showSteppers = false,
      variant = 'default',
      size = 'default',
      editable = true,
      placeholderTextColor,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [internalText, setInternalText] = useState(() => toInputText(defaultValue));
    const isControlled = value !== undefined;
    const textValue = isControlled ? toInputText(value) : internalText;

    const currentValue = useMemo(() => parseNumericText(textValue), [textValue]);

    const setTextAndValue = useCallback(
      (nextText: string) => {
        if (!isControlled) {
          setInternalText(nextText);
        }
        onValueChange?.(parseNumericText(nextText));
      },
      [isControlled, onValueChange]
    );

    const applyNumericValue = useCallback(
      (nextValue: number | null) => {
        if (nextValue === null) {
          if (!isControlled) {
            setInternalText('');
          }
          onValueChange?.(null);
          return;
        }

        const clamped = clampValue(nextValue, min, max);
        if (!isControlled) {
          setInternalText(toInputText(clamped));
        }
        onValueChange?.(clamped);
      },
      [isControlled, max, min, onValueChange]
    );

    const handleTextChange = (nextText: string) => {
      const isNumericLike = /^-?\d*(?:[.,]\d*)?$/.test(nextText);
      if (!isNumericLike) {
        return;
      }

      setTextAndValue(nextText);
    };

    const handleBlur: TextInputProps['onBlur'] = (event) => {
      const parsed = parseNumericText(textValue);
      if (parsed !== null) {
        const clamped = clampValue(parsed, min, max);
        if (!isControlled) {
          setInternalText(toInputText(clamped));
        }
        onValueChange?.(clamped);
      }
      onBlur?.(event);
    };

    const canDecrease =
      editable && (min === undefined || currentValue === null || currentValue > min);
    const canIncrease =
      editable && (max === undefined || currentValue === null || currentValue < max);

    const nudge = (delta: -1 | 1) => {
      const baseline = currentValue ?? min ?? 0;
      applyNumericValue(baseline + delta * step);
    };

    return (
      <View
        className={cn(
          numericInputVariants({ variant, size }),
          !editable && 'opacity-50',
          className
        )}
      >
        {prefix ? <View className="shrink-0 pl-3">{prefix}</View> : null}
        <TextInput
          ref={ref}
          className={cn(numericInputTextVariants({ size }), inputClassName)}
          value={textValue}
          onChangeText={handleTextChange}
          onBlur={handleBlur}
          keyboardType="decimal-pad"
          editable={editable}
          placeholderTextColor={placeholderTextColor}
          {...props}
        />
        {suffix ? <View className="shrink-0 pr-3">{suffix}</View> : null}

        {showSteppers ? (
          <View className="ml-1 h-full flex-row border-l border-input">
            <Pressable
              className={cn(stepperButtonVariants({ size, disabled: !canDecrease }))}
              onPress={() => nudge(-1)}
              disabled={!canDecrease}
              hitSlop={4}
              accessibilityRole="button"
              accessibilityLabel="Decrease value"
            >
              <Text className="text-base font-medium text-foreground">-</Text>
            </Pressable>
            <Pressable
              className={cn(stepperButtonVariants({ size, disabled: !canIncrease }))}
              onPress={() => nudge(1)}
              disabled={!canIncrease}
              hitSlop={4}
              accessibilityRole="button"
              accessibilityLabel="Increase value"
            >
              <Text className="text-base font-medium text-foreground">+</Text>
            </Pressable>
          </View>
        ) : null}
      </View>
    );
  }
);

NumericInput.displayName = 'NumericInput';

export { NumericInput, numericInputVariants, numericInputTextVariants };
