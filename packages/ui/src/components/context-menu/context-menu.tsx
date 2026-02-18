import React, { createContext, useContext, useState } from 'react';
import {
  View,
  Modal,
  Pressable,
  Text,
  type ViewProps,
  type PressableProps,
  type TextProps,
} from 'react-native';
import { cn } from '../../lib/cn';

// ─── Context ─────────────────────────────────────────────────

interface ContextMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ContextMenuContext = createContext<ContextMenuContextValue>({
  open: false,
  setOpen: () => {},
});

// ─── Types ───────────────────────────────────────────────────

export interface ContextMenuProps {
  children: React.ReactNode;
}

export interface ContextMenuTriggerProps extends PressableProps {
  className?: string;
  asChild?: boolean;
}

export interface ContextMenuContentProps extends ViewProps {
  className?: string;
}

export interface ContextMenuItemProps extends PressableProps {
  className?: string;
}

export interface ContextMenuLabelProps extends ViewProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ContextMenuSeparatorProps extends ViewProps {
  className?: string;
}

// ─── Components ──────────────────────────────────────────────

function ContextMenu({ children }: ContextMenuProps) {
  const [open, setOpen] = useState(false);
  return (
    <ContextMenuContext.Provider value={{ open, setOpen }}>{children}</ContextMenuContext.Provider>
  );
}

function ContextMenuTrigger({ className, children, asChild, ...props }: ContextMenuTriggerProps) {
  const { setOpen } = useContext(ContextMenuContext);

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<any>;
    return React.cloneElement(child, {
      onLongPress: (e: any) => {
        child.props.onLongPress?.(e);
        setOpen(true);
      },
      delayLongPress: 300,
      ...props,
    });
  }

  return (
    <Pressable
      className={cn(className)}
      onLongPress={() => setOpen(true)}
      delayLongPress={300}
      {...props}
    >
      {children}
    </Pressable>
  );
}

function ContextMenuContent({ className, children, ...props }: ContextMenuContentProps) {
  const { open, setOpen } = useContext(ContextMenuContext);

  return (
    <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
      <Pressable className="flex-1 justify-end" onPress={() => setOpen(false)}>
        <Pressable
          className={cn(
            'w-full rounded-t-xl border-t border-x border-border bg-popover p-2 pb-8 shadow-lg',
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

function ContextMenuItem({ className, ...props }: ContextMenuItemProps) {
  const { setOpen } = useContext(ContextMenuContext);
  return (
    <Pressable
      className={cn('flex flex-row items-center rounded-md px-2 py-2 active:bg-accent', className)}
      onPress={(e) => {
        props.onPress?.(e);
        setOpen(false);
      }}
      {...props}
    />
  );
}

function ContextMenuLabel({ className, children, ...props }: ContextMenuLabelProps) {
  return (
    <View className={cn('px-2 py-1.5', className)} {...props}>
      {typeof children === 'string' ? (
        <Text className="text-sm font-semibold text-foreground">{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}

function ContextMenuSeparator({ className, ...props }: ContextMenuSeparatorProps) {
  return <View className={cn('-mx-1 my-1 h-px bg-border', className)} {...props} />;
}

ContextMenu.displayName = 'ContextMenu';
ContextMenuTrigger.displayName = 'ContextMenuTrigger';
ContextMenuContent.displayName = 'ContextMenuContent';
ContextMenuItem.displayName = 'ContextMenuItem';
ContextMenuLabel.displayName = 'ContextMenuLabel';
ContextMenuSeparator.displayName = 'ContextMenuSeparator';

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
};
