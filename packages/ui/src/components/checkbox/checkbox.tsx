import { useState } from 'react';
import { Pressable, View, type ViewProps } from 'react-native';
import { cn } from '../../lib/cn';
import { useInteractionTokens, withInteractivePressableStyle } from '../../lib/interaction-tokens';

export interface CheckboxProps extends Omit<ViewProps, 'children'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

function Checkbox({
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  className,
  ...props
}: CheckboxProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = controlledChecked ?? internalChecked;
  const interaction = useInteractionTokens();
  const interactiveStyle = withInteractivePressableStyle(undefined, interaction, {
    disabled,
    pressedVariant: 'default',
  });

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
      style={interactiveStyle}
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: isChecked, disabled }}
    >
      <View
        className={cn(
          'h-5 w-5 items-center justify-center rounded border',
          isChecked ? 'border-primary bg-primary' : 'border-border bg-muted',
          className
        )}
        {...props}
      >
        {isChecked && <View className="h-2.5 w-2.5 rounded-sm bg-primary-foreground" />}
      </View>
    </Pressable>
  );
}

Checkbox.displayName = 'Checkbox';

export { Checkbox };
