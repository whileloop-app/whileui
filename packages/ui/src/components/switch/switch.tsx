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
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      accessibilityRole="switch"
      accessibilityState={{ checked: isChecked, disabled }}
    >
      <View
        className={cn(
          'h-9 w-12 flex-row items-center justify-start rounded-full p-0.5 border-2',
          isChecked ? 'border-primary bg-primary' : 'border-input bg-muted',
          disabled && 'opacity-50',
          className
        )}
        {...props}
      >
        <View
          className={cn(
            'h-7 w-7 rounded-full border-2 border-border bg-background shadow-sm',
            isChecked ? 'ml-3' : 'ml-0'
          )}
        />
      </View>
    </Pressable>
  );
}

Switch.displayName = 'Switch';

export { Switch };
