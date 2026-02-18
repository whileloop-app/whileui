import React, { createContext, useContext, useState } from 'react';
import {
  View,
  Modal,
  Pressable,
  Text,
  type ViewProps,
  type TextProps,
  type PressableProps,
} from 'react-native';
import { cn } from '../../lib/cn';

// ─── Context ─────────────────────────────────────────────────

interface AlertDialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AlertDialogContext = createContext<AlertDialogContextValue>({
  open: false,
  setOpen: () => {},
});

// ─── Types ───────────────────────────────────────────────────

export interface AlertDialogProps {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export interface AlertDialogTriggerProps extends PressableProps {
  className?: string;
  asChild?: boolean;
}

export interface AlertDialogContentProps extends ViewProps {
  className?: string;
}

export interface AlertDialogHeaderProps extends ViewProps {
  className?: string;
}

export interface AlertDialogFooterProps extends ViewProps {
  className?: string;
}

export interface AlertDialogTitleProps extends TextProps {
  className?: string;
}

export interface AlertDialogDescriptionProps extends TextProps {
  className?: string;
}

export interface AlertDialogActionProps extends PressableProps {
  className?: string;
  asChild?: boolean;
}

export interface AlertDialogCancelProps extends PressableProps {
  className?: string;
}

// ─── Components ──────────────────────────────────────────────

function AlertDialog({
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  children,
}: AlertDialogProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;

  const setOpen = (value: boolean) => {
    setInternalOpen(value);
    onOpenChange?.(value);
  };

  return (
    <AlertDialogContext.Provider value={{ open, setOpen }}>{children}</AlertDialogContext.Provider>
  );
}

function AlertDialogTrigger({ className, children, asChild, ...props }: AlertDialogTriggerProps) {
  const { setOpen } = useContext(AlertDialogContext);

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<any>;
    return React.cloneElement(child, {
      onPress: (e: any) => {
        child.props.onPress?.(e);
        setOpen(true);
      },
      ...props,
    });
  }

  return (
    <Pressable className={cn(className)} onPress={() => setOpen(true)} {...props}>
      {children}
    </Pressable>
  );
}

function AlertDialogContent({ className, children, ...props }: AlertDialogContentProps) {
  const { open } = useContext(AlertDialogContext);

  return (
    <Modal visible={open} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/50 px-4">
        <View
          className={cn(
            'w-full max-w-lg rounded-lg border border-border bg-background p-6 shadow-lg',
            className
          )}
          {...props}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
}

function AlertDialogHeader({ className, ...props }: AlertDialogHeaderProps) {
  return <View className={cn('flex flex-col gap-1.5 pb-4', className)} {...props} />;
}

function AlertDialogFooter({ className, ...props }: AlertDialogFooterProps) {
  return <View className={cn('flex flex-row justify-end gap-2 pt-4', className)} {...props} />;
}

function AlertDialogTitle({ className, ...props }: AlertDialogTitleProps) {
  return <Text className={cn('text-lg font-semibold text-foreground', className)} {...props} />;
}

function AlertDialogDescription({ className, ...props }: AlertDialogDescriptionProps) {
  return <Text className={cn('text-sm text-muted-foreground', className)} {...props} />;
}

function AlertDialogAction({ className, children, asChild, ...props }: AlertDialogActionProps) {
  const { setOpen } = useContext(AlertDialogContext);

  const handlePress = (e: any) => {
    props.onPress?.(e);
    setOpen(false);
  };

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<any>;
    return React.cloneElement(child, {
      onPress: handlePress,
      ...props,
    });
  }

  return (
    <Pressable
      className={cn(
        'inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 active:bg-primary/90',
        className
      )}
      onPress={handlePress}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text className="text-sm font-medium text-primary-foreground">{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

function AlertDialogCancel({ className, children, ...props }: AlertDialogCancelProps) {
  const { setOpen } = useContext(AlertDialogContext);
  return (
    <Pressable
      className={cn(
        'inline-flex items-center justify-center rounded-md border border-border bg-transparent px-4 py-2 active:bg-accent',
        className
      )}
      onPress={(e) => {
        props.onPress?.(e);
        setOpen(false);
      }}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text className="text-sm font-medium text-foreground">{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

AlertDialog.displayName = 'AlertDialog';
AlertDialogTrigger.displayName = 'AlertDialogTrigger';
AlertDialogContent.displayName = 'AlertDialogContent';
AlertDialogHeader.displayName = 'AlertDialogHeader';
AlertDialogFooter.displayName = 'AlertDialogFooter';
AlertDialogTitle.displayName = 'AlertDialogTitle';
AlertDialogDescription.displayName = 'AlertDialogDescription';
AlertDialogAction.displayName = 'AlertDialogAction';
AlertDialogCancel.displayName = 'AlertDialogCancel';

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
