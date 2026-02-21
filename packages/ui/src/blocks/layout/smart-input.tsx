import React, { forwardRef } from 'react';
import { View, TextInput, KeyboardAvoidingView, Platform, type TextInputProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cn } from '../../lib/cn';
import { useThemeColors } from '../../lib/theme-colors';

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
    ...props
  },
  ref
) {
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const bottomPadding = safeArea ? Math.max(insets.bottom, 12) : 12;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="w-full"
    >
      <View
        className={cn(
          'w-full flex-row items-center gap-2 px-3 py-2 bg-background',
          variant === 'bar' && 'border-t border-border',
          variant === 'card' && 'rounded-2xl border border-border shadow-md',
          className
        )}
        style={{ paddingBottom: bottomPadding }}
      >
        {leftSlot && <View className="shrink-0">{leftSlot}</View>}
        {centerSlot && <View className="shrink-0">{centerSlot}</View>}
        <TextInput
          ref={ref}
          className={cn(
            'flex-1 min-h-11 max-h-[120px] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground',
            variant === 'bar' && 'rounded-xl border border-input bg-background',
            variant === 'card' && 'rounded-xl bg-transparent',
            !editable && 'opacity-50',
            inputClassName
          )}
          multiline
          submitBehavior={submitBehavior}
          textAlignVertical="top"
          placeholderTextColor={placeholderTextColor ?? colors.mutedForeground}
          editable={editable}
          {...props}
        />
        {rightSlot && <View className="shrink-0">{rightSlot}</View>}
      </View>
    </KeyboardAvoidingView>
  );
});
