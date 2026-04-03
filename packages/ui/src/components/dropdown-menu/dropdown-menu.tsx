import React, { createContext, useContext, useState } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { View, Modal, Pressable, Text, type ViewProps, type PressableProps } from 'react-native';
import { cn } from '../../lib/cn';
import { useFrostedSurface, type FrostedSurfaceProps } from '../../lib/frosted-surface';

// ─── Context ─────────────────────────────────────────────────

interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DropdownMenuContext = createContext<DropdownMenuContextValue>({
  open: false,
  setOpen: () => {},
});

// ─── Types ───────────────────────────────────────────────────

export interface DropdownMenuProps {
  children: React.ReactNode;
}

export interface DropdownMenuTriggerProps extends PressableProps {
  className?: string;
  asChild?: boolean;
}

export interface DropdownMenuContentProps extends ViewProps, FrostedSurfaceProps {
  className?: string;
}

export interface DropdownMenuItemProps extends PressableProps {
  className?: string;
}

export interface DropdownMenuLabelProps extends ViewProps {
  className?: string;
  children?: React.ReactNode;
}

export interface DropdownMenuSeparatorProps extends ViewProps {
  className?: string;
}

function DropdownMenu({ children }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      {children}
    </DropdownMenuContext.Provider>
  );
}

function DropdownMenuTrigger({ className, children, asChild, ...props }: DropdownMenuTriggerProps) {
  const { setOpen } = useContext(DropdownMenuContext);

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

function DropdownMenuContent({
  className,
  children,
  frosted = false,
  blurIntensity,
  blurTintToken,
  style,
  ...props
}: DropdownMenuContentProps) {
  const { open, setOpen } = useContext(DropdownMenuContext);
  const frostedSurface = useFrostedSurface({
    frosted,
    blurIntensity,
    blurTintToken,
    defaultTintToken: 'popover',
    defaultBlurPreset: 'medium',
  });
  const contentStyle: StyleProp<ViewStyle> = [frostedSurface.surfaceStyle, style];

  return (
    <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
      <Pressable className="flex-1 justify-end" onPress={() => setOpen(false)}>
        <Pressable
          className={cn(
            'w-full rounded-t-xl border-t border-x border-border p-2 pb-8 shadow-lg relative overflow-hidden',
            frosted ? 'bg-transparent' : 'bg-popover',
            className
          )}
          style={contentStyle}
          onPress={(e) => e.stopPropagation()}
          {...props}
        >
          {frostedSurface.overlay}
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function DropdownMenuItem({ className, ...props }: DropdownMenuItemProps) {
  const { setOpen } = useContext(DropdownMenuContext);
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

function DropdownMenuLabel({ className, children, ...props }: DropdownMenuLabelProps) {
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

function DropdownMenuSeparator({ className, ...props }: DropdownMenuSeparatorProps) {
  return <View className={cn('-mx-1 my-1 h-px bg-border', className)} {...props} />;
}

DropdownMenu.displayName = 'DropdownMenu';
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';
DropdownMenuContent.displayName = 'DropdownMenuContent';
DropdownMenuItem.displayName = 'DropdownMenuItem';
DropdownMenuLabel.displayName = 'DropdownMenuLabel';
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
};
