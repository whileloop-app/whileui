import React, { createContext, useContext, useState } from 'react';
import { View, Pressable, type ViewProps, type PressableProps } from 'react-native';
import { cn } from '../../lib/cn';

// ─── Context ─────────────────────────────────────────────────

interface RadioGroupContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue>({
  value: '',
  onValueChange: () => {},
});

// ─── Types ───────────────────────────────────────────────────

export interface RadioGroupProps extends ViewProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export interface RadioGroupItemProps extends PressableProps {
  value: string;
  className?: string;
}

// ─── Components ──────────────────────────────────────────────

function RadioGroup({
  defaultValue = '',
  value: controlledValue,
  onValueChange,
  className,
  children,
  ...props
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue ?? internalValue;

  const handleValueChange = (newValue: string) => {
    setInternalValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <RadioGroupContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <View className={cn('gap-2', className)} {...props}>
        {children}
      </View>
    </RadioGroupContext.Provider>
  );
}

function RadioGroupItem({ value: itemValue, className, ...props }: RadioGroupItemProps) {
  const { value, onValueChange } = useContext(RadioGroupContext);
  const isSelected = value === itemValue;

  return (
    <Pressable
      className={cn(
        'h-5 w-5 rounded-full border-2 items-center justify-center',
        isSelected ? 'border-primary' : 'border-input',
        className
      )}
      onPress={() => onValueChange(itemValue)}
      {...props}
    >
      {isSelected && <View className="h-2.5 w-2.5 rounded-full bg-primary" />}
    </Pressable>
  );
}

RadioGroup.displayName = 'RadioGroup';
RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroup, RadioGroupItem };
