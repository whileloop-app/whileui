import React from 'react';
import { TextInput, type TextInputProps, type TextStyle } from 'react-native';
import { cn } from '../../lib/cn';
import { tv, type VariantProps } from '../../lib/tv';
import { useThemeColors } from '../../lib/theme-colors';
import { useInteractionTokens } from '../../lib/interaction-tokens';
import { useVisualTokens } from '../../lib/visual-tokens';

// ─── Variants ────────────────────────────────────────────────

const textareaVariants = tv({
  base: 'w-full rounded-md border border-border bg-muted px-3 py-2 text-sm text-foreground',
  variants: {
    size: {
      default: '',
      sm: 'text-xs',
      lg: 'text-base',
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
  ({ className, size = 'default', placeholderTextColor, ...props }, ref) => {
    const colors = useThemeColors();
    const interaction = useInteractionTokens();
    const visual = useVisualTokens();

    const minHeight =
      size === 'sm'
        ? visual.textareaMinHeightSm
        : size === 'lg'
          ? visual.textareaMinHeightLg
          : visual.textareaMinHeightDefault;

    const style: TextStyle = {
      minHeight,
      ...(props.editable === false ? { opacity: interaction.disabledOpacity } : null),
    };

    return (
      <TextInput
        ref={ref}
        className={cn(textareaVariants({ size }), 'outline-none', className)}
        style={style}
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
