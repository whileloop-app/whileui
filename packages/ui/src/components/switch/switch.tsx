import { useState } from 'react';
import { Pressable, View, type ViewProps } from 'react-native';
import { cn } from '../../lib/cn';

export interface SwitchProps extends Omit<ViewProps, 'children'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

function Switch({
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  className,
  ...props
}: SwitchProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = controlledChecked ?? internalChecked;

  const handleToggle = () => {
    if (disabled) return;
    const newValue = !isChecked;
    setInternalChecked(newValue);
    onCheckedChange?.(newValue);
  };

  return (
    <Pressable
      onPress={handleToggle}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityState={{ checked: isChecked, disabled }}
    >
      <View
        className={cn(
          'h-7 w-12 rounded-full p-0.5',
          isChecked ? 'bg-primary' : 'bg-input',
          disabled && 'opacity-50',
          className
        )}
        {...props}
      >
        <View
          className={cn(
            'h-6 w-6 rounded-full bg-background shadow-sm',
            isChecked ? 'ml-5' : 'ml-0'
          )}
        />
      </View>
    </Pressable>
  );
}

Switch.displayName = 'Switch';

export { Switch };
