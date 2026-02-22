import React, { createContext, useContext } from 'react';
import { Text, View, type TextProps, type ViewProps } from 'react-native';
import { cn } from '../../lib/cn';
import { tv, type VariantProps } from '../../lib/tv';

const formFieldVariants = tv({
  base: 'w-full',
  variants: {
    density: {
      default: 'gap-1.5',
      compact: 'gap-1',
    },
  },
  defaultVariants: {
    density: 'default',
  },
});

const formControlVariants = tv({
  base: 'justify-center',
  variants: {
    density: {
      default: 'min-h-10',
      compact: 'min-h-9',
    },
    invalid: {
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    density: 'default',
    invalid: false,
  },
});

type FormFieldDensity = NonNullable<VariantProps<typeof formFieldVariants>['density']>;

interface FormFieldContextValue {
  density: FormFieldDensity;
  invalid: boolean;
  disabled: boolean;
  required: boolean;
}

const FormFieldContext = createContext<FormFieldContextValue>({
  density: 'default',
  invalid: false,
  disabled: false,
  required: false,
});

export interface FormFieldProps extends ViewProps, VariantProps<typeof formFieldVariants> {
  invalid?: boolean;
  disabled?: boolean;
  required?: boolean;
}

export interface FormLabelProps extends TextProps {
  showRequiredIndicator?: boolean;
}

export interface FormControlProps extends ViewProps {}

export interface FormHintProps extends TextProps {}

export interface FormMessageProps extends TextProps {}

const FormField = React.forwardRef<View, FormFieldProps>(
  (
    {
      className,
      density = 'default',
      invalid = false,
      disabled = false,
      required = false,
      ...props
    },
    ref
  ) => {
    return (
      <FormFieldContext.Provider value={{ density, invalid, disabled, required }}>
        <View
          ref={ref}
          className={cn(formFieldVariants({ density }), disabled && 'opacity-60', className)}
          {...props}
        />
      </FormFieldContext.Provider>
    );
  }
);

FormField.displayName = 'FormField';

const FormLabel = React.forwardRef<Text, FormLabelProps>(
  ({ className, showRequiredIndicator = true, children, ...props }, ref) => {
    const { invalid, disabled, required } = useContext(FormFieldContext);

    return (
      <Text
        ref={ref}
        className={cn(
          'text-sm font-medium leading-tight text-foreground',
          invalid && 'text-destructive',
          disabled && 'text-muted-foreground',
          className
        )}
        {...props}
      >
        {children}
        {required && showRequiredIndicator ? <Text className="text-destructive"> *</Text> : null}
      </Text>
    );
  }
);

FormLabel.displayName = 'FormLabel';

const FormControl = React.forwardRef<View, FormControlProps>(({ className, ...props }, ref) => {
  const { density, invalid, disabled } = useContext(FormFieldContext);

  return (
    <View
      ref={ref}
      className={cn(
        formControlVariants({ density, invalid }),
        invalid && 'rounded-md ring-1 ring-destructive/60',
        disabled && 'opacity-60',
        className
      )}
      {...props}
    />
  );
});

FormControl.displayName = 'FormControl';

const FormHint = React.forwardRef<Text, FormHintProps>(({ className, ...props }, ref) => {
  const { invalid } = useContext(FormFieldContext);

  return (
    <Text
      ref={ref}
      className={cn('text-xs text-muted-foreground', invalid && 'text-destructive/80', className)}
      {...props}
    />
  );
});

FormHint.displayName = 'FormHint';

const FormMessage = React.forwardRef<Text, FormMessageProps>(
  ({ className, children, ...props }, ref) => {
    if (children === undefined || children === null || children === false) {
      return null;
    }

    return (
      <Text ref={ref} className={cn('text-xs font-medium text-destructive', className)} {...props}>
        {children}
      </Text>
    );
  }
);

FormMessage.displayName = 'FormMessage';

export {
  FormField,
  FormLabel,
  FormControl,
  FormHint,
  FormMessage,
  formFieldVariants,
  formControlVariants,
};
