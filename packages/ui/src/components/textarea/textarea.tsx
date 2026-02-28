import React from 'react';
import { TextInput, type TextInputProps } from 'react-native';
import { cn } from '../../lib/cn';
import { tv, type VariantProps } from '../../lib/tv';
import { useThemeColors } from '../../lib/theme-colors';

// ─── Variants ────────────────────────────────────────────────

const textareaVariants = tv({
  base: 'min-h-[80px] w-full rounded-md border border-border bg-muted px-3 py-2 text-sm text-foreground disabled:opacity-50',
  variants: {
    size: {
      default: 'min-h-[80px]',
      sm: 'min-h-[60px] text-xs',
      lg: 'min-h-[120px] text-base',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

// ─── Types ───────────────────────────────────────────────────

export interface TextareaProps
  extends Omit<TextInputProps, 'style'>, VariantProps<typeof textareaVariants> {
  className?: string;
}

// ─── Component ───────────────────────────────────────────────

const Textarea = React.forwardRef<React.ComponentRef<typeof TextInput>, TextareaProps>(
  ({ className, size, placeholderTextColor, ...props }, ref) => {
    const colors = useThemeColors();
    return (
      <TextInput
        ref={ref}
        className={cn(textareaVariants({ size }), 'outline-none', className)}
        multiline
        textAlignVertical="top"
        placeholderTextColor={placeholderTextColor ?? colors.placeholder}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

// ─── Exports ─────────────────────────────────────────────────

export { Textarea, textareaVariants };
