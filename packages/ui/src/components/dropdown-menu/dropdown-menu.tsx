import React, { createContext, useContext, useState } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { View, Modal, Pressable, Text, type ViewProps, type PressableProps } from 'react-native';
import { cn } from '../../lib/cn';
import { useFrostedSurface, type FrostedSurfaceProps } from '../../lib/frosted-surface';
import { useVisualTokens } from '../../lib/visual-tokens';
import { useThemeColors } from '../../lib/theme-colors';
import { shadowStyle, surfaceRadius, typographyStyle } from '../../lib/recipes';

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
  const visual = useVisualTokens();
  const colors = useThemeColors();
  const frostedSurface = useFrostedSurface({
    frosted,
    blurIntensity,
    blurTintToken,
    defaultTintToken: 'popover',
    defaultBlurPreset: 'medium',
  });
  const contentStyle: StyleProp<ViewStyle> = [
    {
      borderTopLeftRadius: surfaceRadius(visual, 'lg'),
      borderTopRightRadius: surfaceRadius(visual, 'lg'),
      borderTopWidth: visual.borderWidthHairline,
      borderLeftWidth: visual.borderWidthHairline,
      borderRightWidth: visual.borderWidthHairline,
    },
    shadowStyle(visual, colors, 'md'),
    frostedSurface.surfaceStyle,
    style,
  ];

  return (
    <Modal
      visible={open}
      transparent
      animationType="slide"
      statusBarTranslucent
      navigationBarTranslucent
      onRequestClose={() => setOpen(false)}
    >
      <Pressable className="flex-1 justify-end" onPress={() => setOpen(false)}>
        <Pressable
          className={cn(
            'w-full border-border p-2 pb-8 relative overflow-hidden',
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

function DropdownMenuItem({ className, style, ...props }: DropdownMenuItemProps) {
  const { setOpen } = useContext(DropdownMenuContext);
  const visual = useVisualTokens();
  const tokenStyle: ViewStyle = {
    borderRadius: visual.radiusSm,
    minHeight: visual.touchTargetMinSize,
    paddingHorizontal: visual.controlPaddingXSm,
    paddingVertical: visual.controlPaddingYSm,
  };
  return (
    <Pressable
      className={cn('flex flex-row items-center active:bg-accent', className)}
      style={(state) => [tokenStyle, typeof style === 'function' ? style(state) : style]}
      onPress={(e) => {
        props.onPress?.(e);
        setOpen(false);
      }}
      {...props}
    />
  );
}

function DropdownMenuLabel({ className, children, ...props }: DropdownMenuLabelProps) {
  const visual = useVisualTokens();
  return (
    <View className={cn('px-2 py-1.5', className)} {...props}>
      {typeof children === 'string' ? (
        <Text className="font-semibold text-foreground" style={typographyStyle(visual, 'label')}>
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
}

function DropdownMenuSeparator({ className, style, ...props }: DropdownMenuSeparatorProps) {
  const visual = useVisualTokens();
  return (
    <View
      className={cn('-mx-1 my-1 bg-border', className)}
      style={[{ height: visual.borderWidthHairline }, style]}
      {...props}
    />
  );
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
