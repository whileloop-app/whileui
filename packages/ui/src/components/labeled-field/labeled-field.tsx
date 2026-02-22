import React from 'react';
import { View, type ViewProps } from 'react-native';
import {
  FormControl,
  FormField,
  FormHint,
  FormLabel,
  FormMessage,
  type FormFieldProps,
} from '../form-field';
import { cn } from '../../lib/cn';

export interface LabeledFieldProps extends Omit<FormFieldProps, 'children'> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  controlWrapperClassName?: string;
  children: React.ReactNode;
}

export interface LabeledFieldControlProps extends ViewProps {
  className?: string;
}

function LabeledField({
  label,
  hint,
  error,
  leftSlot,
  rightSlot,
  children,
  controlWrapperClassName,
  required,
  disabled,
  invalid,
  ...props
}: LabeledFieldProps) {
  const isInvalid = invalid ?? Boolean(error);

  return (
    <FormField required={required} disabled={disabled} invalid={isInvalid} {...props}>
      {label ? <FormLabel>{label}</FormLabel> : null}
      <FormControl>
        <View
          className={cn(
            'flex-row items-center gap-2 rounded-md border border-border bg-muted px-3',
            isInvalid && 'border-destructive',
            disabled && 'opacity-60',
            controlWrapperClassName
          )}
        >
          {leftSlot ? <View className="shrink-0">{leftSlot}</View> : null}
          <View className="min-h-10 min-w-0 flex-1 justify-center">{children}</View>
          {rightSlot ? <View className="shrink-0">{rightSlot}</View> : null}
        </View>
      </FormControl>
      {error ? <FormMessage>{error}</FormMessage> : hint ? <FormHint>{hint}</FormHint> : null}
    </FormField>
  );
}

const LabeledFieldControl = React.forwardRef<View, LabeledFieldControlProps>(
  ({ className, ...props }, ref) => {
    return <View ref={ref} className={cn('min-w-0 flex-1', className)} {...props} />;
  }
);

LabeledFieldControl.displayName = 'LabeledFieldControl';

export { LabeledField, LabeledFieldControl };
