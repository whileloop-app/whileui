import React, { forwardRef } from 'react';
import { View, TextInput, KeyboardAvoidingView, Platform, type TextInputProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cn } from '../../lib/cn';

export interface SmartInputProps extends TextInputProps {
  /** Left slot: emoji, attach, etc. */
  leftSlot?: React.ReactNode;
  /** Right slot: send button, etc. */
  rightSlot?: React.ReactNode;
  /** Container className */
  className?: string;
  /** Input field className */
  inputClassName?: string;
  /** Use safe area insets for bottom padding */
  safeArea?: boolean;
}

export const SmartInput = forwardRef<TextInput, SmartInputProps>(function SmartInput(
  {
    leftSlot,
    rightSlot,
    className,
    inputClassName,
    safeArea = true,
    placeholderTextColor,
    editable = true,
    ...props
  },
  ref
) {
  const insets = useSafeAreaInsets();
  const bottomPadding = safeArea ? Math.max(insets.bottom, 12) : 12;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="w-full"
    >
      <View
        className={cn(
          'w-full flex-row items-center gap-2 border-t border-border bg-background px-3 py-2',
          className
        )}
        style={{ paddingBottom: bottomPadding }}
      >
        {leftSlot && <View className="shrink-0">{leftSlot}</View>}
        <TextInput
          ref={ref}
          className={cn(
            'flex-1 min-h-11 max-h-[120px] rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground',
            !editable && 'opacity-50',
            inputClassName
          )}
          multiline
          submitBehavior="newline"
          textAlignVertical="top"
          placeholderTextColor={placeholderTextColor}
          editable={editable}
          {...props}
        />
        {rightSlot && <View className="shrink-0">{rightSlot}</View>}
      </View>
    </KeyboardAvoidingView>
  );
});
