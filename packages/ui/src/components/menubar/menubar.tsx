import React, { createContext, useContext, useState } from 'react';
import {
  View,
  Modal,
  Pressable,
  Text,
  type ViewProps,
  type PressableProps,
} from 'react-native';
import { cn } from '../../lib/cn';

// ─── Context ─────────────────────────────────────────────────

interface MenubarMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const MenubarMenuContext = createContext<MenubarMenuContextValue>({
  open: false,
  setOpen: () => {},
});

// ─── Types ───────────────────────────────────────────────────

export interface MenubarProps extends ViewProps {
  className?: string;
}

export interface MenubarMenuProps {
  children: React.ReactNode;
}

export interface MenubarTriggerProps extends PressableProps {
  className?: string;
}

export interface MenubarContentProps extends ViewProps {
  className?: string;
}

export interface MenubarItemProps extends PressableProps {
  className?: string;
}

export interface MenubarLabelProps extends ViewProps {
  className?: string;
  children?: React.ReactNode;
}

export interface MenubarSeparatorProps extends ViewProps {
  className?: string;
}

// ─── Components ──────────────────────────────────────────────

function Menubar({ className, ...props }: MenubarProps) {
  return (
    <View
      className={cn(
        'flex flex-row items-center gap-1 rounded-lg border border-border bg-background p-1',
        className
      )}
      {...props}
    />
  );
}

function MenubarMenu({ children }: MenubarMenuProps) {
  const [open, setOpen] = useState(false);
  return (
    <MenubarMenuContext.Provider value={{ open, setOpen }}>{children}</MenubarMenuContext.Provider>
  );
}

function MenubarTrigger({ className, ...props }: MenubarTriggerProps) {
  const { setOpen } = useContext(MenubarMenuContext);
  return (
    <Pressable
      className={cn('rounded-md px-3 py-1.5 active:bg-accent', className)}
      onPress={() => setOpen(true)}
      {...props}
    />
  );
}

function MenubarContent({ className, children, ...props }: MenubarContentProps) {
  const { open, setOpen } = useContext(MenubarMenuContext);

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

function MenubarItem({ className, ...props }: MenubarItemProps) {
  const { setOpen } = useContext(MenubarMenuContext);
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

function MenubarLabel({ className, children, ...props }: MenubarLabelProps) {
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

function MenubarSeparator({ className, ...props }: MenubarSeparatorProps) {
  return <View className={cn('-mx-1 my-1 h-px bg-border', className)} {...props} />;
}

Menubar.displayName = 'Menubar';
MenubarMenu.displayName = 'MenubarMenu';
MenubarTrigger.displayName = 'MenubarTrigger';
MenubarContent.displayName = 'MenubarContent';
MenubarItem.displayName = 'MenubarItem';
MenubarLabel.displayName = 'MenubarLabel';
MenubarSeparator.displayName = 'MenubarSeparator';

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarSeparator,
};
