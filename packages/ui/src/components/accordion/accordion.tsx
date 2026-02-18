import React, { createContext, useContext, useState, useCallback } from 'react';
import { View, Pressable, type ViewProps, type PressableProps } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { cn } from '../../lib/cn';

// ─── Context ─────────────────────────────────────────────────

type AccordionType = 'single' | 'multiple';

interface AccordionContextValue {
  type: AccordionType;
  value: string[];
  onValueChange: (itemValue: string) => void;
  collapsible: boolean;
}

const AccordionContext = createContext<AccordionContextValue>({
  type: 'single',
  value: [],
  onValueChange: () => {},
  collapsible: true,
});

interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextValue>({
  value: '',
  isOpen: false,
});

// ─── Types ───────────────────────────────────────────────────

export interface AccordionProps extends ViewProps {
  type?: AccordionType;
  defaultValue?: string | string[];
  collapsible?: boolean;
  className?: string;
}

export interface AccordionItemProps extends ViewProps {
  value: string;
  className?: string;
}

export interface AccordionTriggerProps extends Omit<PressableProps, 'children'> {
  className?: string;
  children?: React.ReactNode;
}

export interface AccordionContentProps extends ViewProps {
  className?: string;
}

// ─── Components ──────────────────────────────────────────────

function Accordion({
  type = 'single',
  defaultValue,
  collapsible = true,
  className,
  children,
  ...props
}: AccordionProps) {
  const [value, setValue] = useState<string[]>(() => {
    if (!defaultValue) return [];
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  });

  const onValueChange = useCallback(
    (itemValue: string) => {
      setValue((prev) => {
        if (type === 'single') {
          if (prev.includes(itemValue) && collapsible) return [];
          if (prev.includes(itemValue)) return prev;
          return [itemValue];
        }
        if (prev.includes(itemValue)) return prev.filter((v) => v !== itemValue);
        return [...prev, itemValue];
      });
    },
    [type, collapsible]
  );

  return (
    <AccordionContext.Provider value={{ type, value, onValueChange, collapsible }}>
      <View className={cn('w-full', className)} {...props}>
        {children}
      </View>
    </AccordionContext.Provider>
  );
}

function AccordionItem({ value, className, children, ...props }: AccordionItemProps) {
  const { value: selectedValues } = useContext(AccordionContext);
  const isOpen = selectedValues.includes(value);

  return (
    <AccordionItemContext.Provider value={{ value, isOpen }}>
      <View className={cn('border-b border-border', className)} {...props}>
        {children}
      </View>
    </AccordionItemContext.Provider>
  );
}

function AccordionTrigger({ className, children, ...props }: AccordionTriggerProps) {
  const { onValueChange } = useContext(AccordionContext);
  const { value, isOpen } = useContext(AccordionItemContext);

  return (
    <Pressable
      className={cn('flex flex-row items-center justify-between py-4 active:opacity-70', className)}
      onPress={() => onValueChange(value)}
      {...props}
    >
      {children}
      <View
        className={cn(
          'border-foreground h-2 w-2 rotate-45 border-b-2 border-r-2 transition-transform',
          isOpen && 'rotate-[225deg]'
        )}
      />
    </Pressable>
  );
}

function AccordionContent({ className, children, ...props }: AccordionContentProps) {
  const { isOpen } = useContext(AccordionItemContext);
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

  if (!isOpen) return null;

  return (
    <Animated.View
      style={animatedStyle}
      className={cn('pb-4 overflow-hidden', className)}
      {...(props as any)}
    >
      {children}
    </Animated.View>
  );
}

Accordion.displayName = 'Accordion';
AccordionItem.displayName = 'AccordionItem';
AccordionTrigger.displayName = 'AccordionTrigger';
AccordionContent.displayName = 'AccordionContent';

// ─── Exports ─────────────────────────────────────────────────

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
