import React from 'react';
import { View, TextInput, type TextInputProps } from 'react-native';
import { cn } from '../../lib/cn';
import { tv, type VariantProps } from '../../lib/tv';

const inputVariants = tv({
  base: 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground',
  variants: {
    variant: {
      default: 'border-input',
      error: 'border-destructive',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface InputProps extends TextInputProps, VariantProps<typeof inputVariants> {
  className?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  inputClassName?: string;
}

const Input = React.forwardRef<TextInput, InputProps>(
  (
    {
      className,
      prefix,
      suffix,
      inputClassName,
      variant,
      editable = true,
      placeholderTextColor = '#737373',
      ...props
    },
    ref
  ) => {
    return (
      <View
        className={cn(
          'flex-row items-center rounded-md border border-input bg-background',
          inputVariants({ variant }),
          !editable && 'opacity-50',
          className
        )}
      >
        {prefix && <View className="pl-3">{prefix}</View>}
        <TextInput
          ref={ref}
          className={cn(
            'flex-1 py-2 text-sm text-foreground placeholder:text-muted-foreground',
            prefix && 'pl-2',
            suffix && 'pr-2',
            inputClassName
          )}
          editable={editable}
          placeholderTextColor={placeholderTextColor}
          {...props}
        />
        {suffix && <View className="pr-3">{suffix}</View>}
      </View>
    );
  }
);

Input.displayName = 'Input';

export { Input, inputVariants };
