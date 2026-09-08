import React, { forwardRef } from 'react';
import { View, TextInput, KeyboardAvoidingView, Platform, type TextInputProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cn } from '../../lib/cn';
import { useThemeColors } from '../../lib/theme-colors';
import { useInteractionTokens } from '../../lib/interaction-tokens';
import { useVisualTokens } from '../../lib/visual-tokens';
import { controlRecipe, shadowStyle, surfaceRadius, typographyStyle } from '../../lib/recipes';

export interface SmartInputProps extends TextInputProps {
  /** Left slot: emoji, attach, etc. */
  leftSlot?: React.ReactNode;
  /** Center slot: intent selector, model picker, etc. */
  centerSlot?: React.ReactNode;
  /** Right slot: send button, etc. */
  rightSlot?: React.ReactNode;
  /** Bar = sticky bottom with border-t. Card = floating, no top border, rounded. */
  variant?: 'bar' | 'card';
  /** Container className */
  className?: string;
  /** Input field className */
  inputClassName?: string;
  /** 'newline' = Enter adds newline. 'submit' = Enter triggers onSubmitEditing. Default 'newline'. */
  submitBehavior?: 'newline' | 'submit' | 'blurAndSubmit';
  /** Use safe area insets for bottom padding */
  safeArea?: boolean;
}

export const SmartInput = forwardRef<TextInput, SmartInputProps>(function SmartInput(
  {
    leftSlot,
    centerSlot,
    rightSlot,
    variant = 'bar',
    className,
    inputClassName,
    submitBehavior = 'newline',
    safeArea = true,
    placeholderTextColor,
    editable = true,
    style,
    ...props
  },
  ref
) {
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const interaction = useInteractionTokens();
  const visual = useVisualTokens();
  const bottomPadding = safeArea ? Math.max(insets.bottom, 12) : 12;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="w-full"
    >
      <View
        className={cn(
          'w-full flex-row items-center gap-2 bg-background',
          variant === 'bar' && 'border-border',
          variant === 'card' && 'border-border',
          className
        )}
        style={[
          {
            paddingHorizontal: visual.controlPaddingXSm,
            paddingTop: visual.controlPaddingYSm,
            paddingBottom: bottomPadding,
          },
          variant === 'bar' ? { borderTopWidth: visual.borderWidthHairline } : null,
          variant === 'card'
            ? {
                borderRadius: surfaceRadius(visual, 'xl'),
                borderWidth: visual.borderWidthHairline,
                ...shadowStyle(visual, colors, 'md'),
              }
            : null,
        ]}
      >
        {leftSlot && <View className="shrink-0">{leftSlot}</View>}
        {centerSlot && <View className="shrink-0">{centerSlot}</View>}
        <TextInput
          ref={ref}
          style={[
            controlRecipe(visual, 'default'),
            typographyStyle(visual, 'label'),
            variant === 'bar' ? { borderWidth: visual.borderWidthControl } : null,
            { maxHeight: visual.smartInputMaxHeight },
            !editable ? { opacity: interaction.disabledOpacity } : null,
            style,
          ]}
          className={cn(
            'flex-1 text-foreground placeholder:text-muted-foreground outline-none',
            variant === 'bar' && 'border-border bg-muted',
            variant === 'card' && 'bg-transparent',
            inputClassName
          )}
          multiline
          submitBehavior={submitBehavior}
          textAlignVertical="top"
          placeholderTextColor={placeholderTextColor ?? colors.placeholder}
          editable={editable}
          {...props}
        />
        {rightSlot && <View className="shrink-0">{rightSlot}</View>}
      </View>
    </KeyboardAvoidingView>
  );
});
