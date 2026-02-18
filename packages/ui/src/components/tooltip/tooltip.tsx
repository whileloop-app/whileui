import React, { createContext, useContext, useState } from 'react';
import { View, Modal, Pressable, Text, type ViewProps, type PressableProps } from 'react-native';
import { cn } from '../../lib/cn';

// ─── Context ─────────────────────────────────────────────────

interface TooltipContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const TooltipContext = createContext<TooltipContextValue>({
  open: false,
  setOpen: () => {},
});

// ─── Types ───────────────────────────────────────────────────

export interface TooltipProps {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export interface TooltipTriggerProps extends PressableProps {
  className?: string;
  asChild?: boolean;
}

export interface TooltipContentProps extends ViewProps {
  className?: string;
}

// ─── Components ──────────────────────────────────────────────

function Tooltip({
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  children,
}: TooltipProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;

  const setOpen = (value: boolean) => {
    setInternalOpen(value);
    onOpenChange?.(value);
  };

  return <TooltipContext.Provider value={{ open, setOpen }}>{children}</TooltipContext.Provider>;
}

function TooltipTrigger({ className, children, asChild, ...props }: TooltipTriggerProps) {
  const { setOpen } = useContext(TooltipContext);

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<any>;
    return React.cloneElement(child, {
      onLongPress: (e: any) => {
        child.props.onLongPress?.(e);
        setOpen(true);
      },
      onPressOut: (e: any) => {
        child.props.onPressOut?.(e);
        setOpen(false);
      },
      ...props,
    });
  }

  return (
    <Pressable
      className={cn(className)}
      onLongPress={() => setOpen(true)}
      onPressOut={() => setOpen(false)}
      {...props}
    >
      {children}
    </Pressable>
  );
}

function TooltipContent({ className, children, ...props }: TooltipContentProps) {
  const { open, setOpen } = useContext(TooltipContext);

  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
      <Pressable className="flex-1 justify-center items-center" onPress={() => setOpen(false)}>
        <View className={cn('rounded-md bg-primary px-3 py-1.5 shadow-md', className)} {...props}>
          {typeof children === 'string' ? (
            <Text className="text-xs text-primary-foreground">{children}</Text>
          ) : (
            children
          )}
        </View>
      </Pressable>
    </Modal>
  );
}

Tooltip.displayName = 'Tooltip';
TooltipTrigger.displayName = 'TooltipTrigger';
TooltipContent.displayName = 'TooltipContent';

export { Tooltip, TooltipTrigger, TooltipContent };
