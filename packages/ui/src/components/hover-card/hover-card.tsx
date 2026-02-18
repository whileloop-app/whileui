import React, { createContext, useContext, useState } from 'react';
import { Modal, Pressable, type ViewProps, type PressableProps } from 'react-native';
import { cn } from '../../lib/cn';

// ─── Context ─────────────────────────────────────────────────

interface HoverCardContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const HoverCardContext = createContext<HoverCardContextValue>({
  open: false,
  setOpen: () => {},
});

// ─── Types ───────────────────────────────────────────────────

export interface HoverCardProps {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export interface HoverCardTriggerProps extends PressableProps {
  className?: string;
  asChild?: boolean;
}

export interface HoverCardContentProps extends ViewProps {
  className?: string;
}

// ─── Components ──────────────────────────────────────────────

function HoverCard({
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  children,
}: HoverCardProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;

  const setOpen = (value: boolean) => {
    setInternalOpen(value);
    onOpenChange?.(value);
  };

  return (
    <HoverCardContext.Provider value={{ open, setOpen }}>{children}</HoverCardContext.Provider>
  );
}

function HoverCardTrigger({ className, children, asChild, ...props }: HoverCardTriggerProps) {
  const { setOpen } = useContext(HoverCardContext);

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<any>;
    return React.cloneElement(child, {
      onPress: (e: any) => {
        child.props.onPress?.(e);
        setOpen(true);
      },
      onLongPress: (e: any) => {
        child.props.onLongPress?.(e);
        setOpen(true);
      },
      ...props,
    });
  }

  return (
    <Pressable
      className={cn(className)}
      onLongPress={() => setOpen(true)}
      onPress={() => setOpen(true)}
      {...props}
    >
      {children}
    </Pressable>
  );
}

function HoverCardContent({ className, children, ...props }: HoverCardContentProps) {
  const { open, setOpen } = useContext(HoverCardContext);

  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
      <Pressable className="flex-1 justify-center items-center px-6" onPress={() => setOpen(false)}>
        <Pressable
          className={cn('w-80 rounded-lg border border-border bg-popover p-4 shadow-lg', className)}
          onPress={(e) => e.stopPropagation()}
          {...props}
        >
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

HoverCard.displayName = 'HoverCard';
HoverCardTrigger.displayName = 'HoverCardTrigger';
HoverCardContent.displayName = 'HoverCardContent';

export { HoverCard, HoverCardTrigger, HoverCardContent };
