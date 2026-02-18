import React, { createContext, useContext, useState } from 'react';
import { View, Modal, Pressable, type ViewProps, type PressableProps } from 'react-native';
import { cn } from '../../lib/cn';

// ─── Context ─────────────────────────────────────────────────

interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const PopoverContext = createContext<PopoverContextValue>({
  open: false,
  setOpen: () => {},
});

// ─── Types ───────────────────────────────────────────────────

export interface PopoverProps {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export interface PopoverTriggerProps extends PressableProps {
  className?: string;
  asChild?: boolean;
}

export interface PopoverContentProps extends ViewProps {
  className?: string;
}

// ─── Components ──────────────────────────────────────────────

function Popover({
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  children,
}: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;

  const setOpen = (value: boolean) => {
    setInternalOpen(value);
    onOpenChange?.(value);
  };

  return <PopoverContext.Provider value={{ open, setOpen }}>{children}</PopoverContext.Provider>;
}

function PopoverTrigger({ className, children, asChild, ...props }: PopoverTriggerProps) {
  const { setOpen } = useContext(PopoverContext);

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

function PopoverContent({ className, children, ...props }: PopoverContentProps) {
  const { open, setOpen } = useContext(PopoverContext);

  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
      <Pressable className="flex-1 justify-center items-center px-4" onPress={() => setOpen(false)}>
        <Pressable
          className={cn('w-72 rounded-lg border border-border bg-popover p-4 shadow-lg', className)}
          onPress={(e) => e.stopPropagation()}
          {...props}
        >
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

Popover.displayName = 'Popover';
PopoverTrigger.displayName = 'PopoverTrigger';
PopoverContent.displayName = 'PopoverContent';

export { Popover, PopoverTrigger, PopoverContent };
