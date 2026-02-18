import React, { createContext, useContext } from 'react';
import { Text, View, type TextProps, type ViewProps } from 'react-native';
import { cn } from '../../lib/cn';
import { tv } from '../../lib/tv';

const dataRowVariants = tv({
  base: 'w-full flex-row items-center gap-3',
  variants: {
    size: {
      default: 'min-h-11 py-2',
      compact: 'min-h-10 py-1.5',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

const dataRowLabelVariants = tv({
  base: 'font-medium text-foreground',
  variants: {
    size: {
      default: 'text-sm',
      compact: 'text-xs',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

const dataRowDescriptionVariants = tv({
  base: 'text-muted-foreground',
  variants: {
    size: {
      default: 'text-xs',
      compact: 'text-[11px]',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

const dataRowValueVariants = tv({
  base: 'font-medium text-foreground text-right',
  variants: {
    size: {
      default: 'text-sm',
      compact: 'text-xs',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface DataRowContextValue {
  size: 'default' | 'compact';
}

const DataRowContext = createContext<DataRowContextValue>({
  size: 'default',
});

export interface DataRowProps extends ViewProps {
  size?: 'default' | 'compact';
  className?: string;
}

export interface DataRowLeftProps extends ViewProps {
  className?: string;
}

export interface DataRowCenterProps extends ViewProps {
  className?: string;
}

export interface DataRowRightProps extends ViewProps {
  className?: string;
}

export interface DataRowLabelProps extends TextProps {
  className?: string;
}

export interface DataRowDescriptionProps extends TextProps {
  className?: string;
}

export interface DataRowValueProps extends TextProps {
  className?: string;
}

const DataRow = React.forwardRef<View, DataRowProps>(
  ({ className, size = 'default', ...props }, ref) => {
    return (
      <DataRowContext.Provider value={{ size }}>
        <View ref={ref} className={cn(dataRowVariants({ size }), className)} {...props} />
      </DataRowContext.Provider>
    );
  }
);

DataRow.displayName = 'DataRow';

const DataRowLeft = React.forwardRef<View, DataRowLeftProps>(({ className, ...props }, ref) => {
  return (
    <View ref={ref} className={cn('shrink-0 items-center justify-center', className)} {...props} />
  );
});

DataRowLeft.displayName = 'DataRowLeft';

const DataRowCenter = React.forwardRef<View, DataRowCenterProps>(({ className, ...props }, ref) => {
  return <View ref={ref} className={cn('min-w-0 flex-1 gap-0.5', className)} {...props} />;
});

DataRowCenter.displayName = 'DataRowCenter';

const DataRowRight = React.forwardRef<View, DataRowRightProps>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn('ml-2 max-w-[45%] shrink-0 items-end justify-center', className)}
      {...props}
    />
  );
});

DataRowRight.displayName = 'DataRowRight';

const DataRowLabel = React.forwardRef<Text, DataRowLabelProps>(({ className, ...props }, ref) => {
  const { size } = useContext(DataRowContext);

  return (
    <Text
      ref={ref}
      className={cn(dataRowLabelVariants({ size }), className)}
      numberOfLines={1}
      {...props}
    />
  );
});

DataRowLabel.displayName = 'DataRowLabel';

const DataRowDescription = React.forwardRef<Text, DataRowDescriptionProps>(
  ({ className, ...props }, ref) => {
    const { size } = useContext(DataRowContext);

    return (
      <Text
        ref={ref}
        className={cn(dataRowDescriptionVariants({ size }), className)}
        numberOfLines={2}
        {...props}
      />
    );
  }
);

DataRowDescription.displayName = 'DataRowDescription';

const DataRowValue = React.forwardRef<Text, DataRowValueProps>(({ className, ...props }, ref) => {
  const { size } = useContext(DataRowContext);

  return (
    <Text
      ref={ref}
      className={cn(dataRowValueVariants({ size }), className)}
      numberOfLines={1}
      {...props}
    />
  );
});

DataRowValue.displayName = 'DataRowValue';

export {
  DataRow,
  DataRowLeft,
  DataRowCenter,
  DataRowRight,
  DataRowLabel,
  DataRowDescription,
  DataRowValue,
  dataRowVariants,
};
