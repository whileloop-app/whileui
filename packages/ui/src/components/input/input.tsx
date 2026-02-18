import React from 'react';
import { TextInput, type TextInputProps } from 'react-native';
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
}

const Input = React.forwardRef<TextInput, InputProps>(
  ({ className, variant, editable = true, placeholderTextColor = '#737373', ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        className={cn(inputVariants({ variant }), !editable && 'opacity-50', className)}
        editable={editable}
        placeholderTextColor={placeholderTextColor}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input, inputVariants };
