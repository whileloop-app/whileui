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

interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextValue>({
  open: false,
  setOpen: () => {},
});

// ─── Types ───────────────────────────────────────────────────

export interface DialogProps {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export interface DialogTriggerProps extends PressableProps {
  className?: string;
  asChild?: boolean;
}

export interface DialogContentProps extends ViewProps {
  className?: string;
}

export interface DialogOverlayProps extends ViewProps {
  className?: string;
}

export interface DialogHeaderProps extends ViewProps {
  className?: string;
}

export interface DialogFooterProps extends ViewProps {
  className?: string;
}

export interface DialogTitleProps extends TextProps {
  className?: string;
}

export interface DialogDescriptionProps extends TextProps {
  className?: string;
}

export interface DialogCloseProps extends PressableProps {
  className?: string;
  asChild?: boolean;
}

// ─── Components ──────────────────────────────────────────────

function Dialog({
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  children,
}: DialogProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;

  const setOpen = (value: boolean) => {
    setInternalOpen(value);
    onOpenChange?.(value);
  };

  return <DialogContext.Provider value={{ open, setOpen }}>{children}</DialogContext.Provider>;
}

function DialogTrigger({ className, children, asChild, ...props }: DialogTriggerProps) {
  const { setOpen } = useContext(DialogContext);

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

function DialogContent({ className, children, ...props }: DialogContentProps) {
  const { open, setOpen } = useContext(DialogContext);

  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
      <Pressable
        className="flex-1 justify-center items-center bg-black/50 px-4"
        onPress={() => setOpen(false)}
      >
        <Pressable
          className={cn(
            'w-full max-w-lg rounded-lg border border-border bg-background p-6 shadow-lg',
            className
          )}
          onPress={(e) => e.stopPropagation()}
          {...props}
        >
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return <View className={cn('flex flex-col gap-1.5 pb-4', className)} {...props} />;
}

function DialogFooter({ className, ...props }: DialogFooterProps) {
  return <View className={cn('flex flex-row justify-end gap-2 pt-4', className)} {...props} />;
}

function DialogTitle({ className, ...props }: DialogTitleProps) {
  return <Text className={cn('text-lg font-semibold text-foreground', className)} {...props} />;
}

function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return <Text className={cn('text-sm text-muted-foreground', className)} {...props} />;
}

// ... (interfaces update needed too)

function DialogClose({ className, children, asChild, ...props }: DialogCloseProps) {
  const { setOpen } = useContext(DialogContext);

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<any>;
    return React.cloneElement(child, {
      onPress: (e: any) => {
        child.props.onPress?.(e);
        setOpen(false);
      },
      ...props,
    });
  }

  return (
    <Pressable className={cn(className)} onPress={() => setOpen(false)} {...props}>
      {children}
    </Pressable>
  );
}

Dialog.displayName = 'Dialog';
DialogTrigger.displayName = 'DialogTrigger';
DialogContent.displayName = 'DialogContent';
DialogHeader.displayName = 'DialogHeader';
DialogFooter.displayName = 'DialogFooter';
DialogTitle.displayName = 'DialogTitle';
DialogDescription.displayName = 'DialogDescription';
DialogClose.displayName = 'DialogClose';

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
};
