import React, { createContext, useContext, useState } from 'react';
import { View, Pressable, type ViewProps, type PressableProps } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { cn } from '../../lib/cn';

// ─── Context ─────────────────────────────────────────────────

interface CollapsibleContextValue {
  isOpen: boolean;
  toggle: () => void;
  disabled: boolean;
}

const CollapsibleContext = createContext<CollapsibleContextValue>({
  isOpen: false,
  toggle: () => {},
  disabled: false,
});

// Hook to access collapsible state
export function useCollapsible() {
  return useContext(CollapsibleContext);
}

// ─── Types ───────────────────────────────────────────────────

export interface CollapsibleProps extends ViewProps {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export interface CollapsibleTriggerProps extends PressableProps {
  className?: string;
  asChild?: boolean;
}

export interface CollapsibleContentProps extends ViewProps {
  className?: string;
  forceMount?: boolean;
}

// ─── Components ──────────────────────────────────────────────

function Collapsible({
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  disabled = false,
  className,
  children,
  ...props
}: CollapsibleProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = controlledOpen ?? internalOpen;

  const toggle = () => {
    if (disabled) return;
    const next = !isOpen;
    setInternalOpen(next);
    onOpenChange?.(next);
  };

  return (
    <CollapsibleContext.Provider value={{ isOpen, toggle, disabled }}>
      <View className={cn(className)} {...props}>
        {children}
      </View>
    </CollapsibleContext.Provider>
  );
}

function CollapsibleTrigger({
  className,
  children,
  asChild,
  onPress,
  ...props
}: CollapsibleTriggerProps) {
  const { toggle, disabled } = useContext(CollapsibleContext);

  const handlePress = (e: any) => {
    onPress?.(e);
    toggle();
  };

  // When asChild is true, wrap child in an invisible pressable overlay
  if (asChild && React.isValidElement(children)) {
    return (
      <Pressable onPress={handlePress} disabled={disabled} className={cn(className)} {...props}>
        {children}
      </Pressable>
    );
  }

  return (
    <Pressable className={cn(className)} onPress={handlePress} disabled={disabled} {...props}>
      {children}
    </Pressable>
  );
}

function CollapsibleContent({
  className,
  children,
  forceMount,
  ...props
}: CollapsibleContentProps) {
  const { isOpen } = useContext(CollapsibleContext);
  const opacity = useSharedValue(isOpen ? 1 : 0);

  React.useEffect(() => {
    opacity.value = withTiming(isOpen ? 1 : 0, {
      duration: 200,
      easing: Easing.inOut(Easing.ease),
    });
  }, [isOpen, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (!isOpen && !forceMount) return null;

  return (
    <Animated.View style={animatedStyle} className={cn(className)} {...(props as any)}>
      {children}
    </Animated.View>
  );
}

Collapsible.displayName = 'Collapsible';
CollapsibleTrigger.displayName = 'CollapsibleTrigger';
CollapsibleContent.displayName = 'CollapsibleContent';

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
