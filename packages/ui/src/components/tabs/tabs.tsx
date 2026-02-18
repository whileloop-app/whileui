import { createContext, useContext, useState } from 'react';
import { View, Pressable, type ViewProps, type PressableProps } from 'react-native';
import { cn } from '../../lib/cn';
import { tv } from '../../lib/tv';

// ─── Context ─────────────────────────────────────────────────

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue>({
  value: '',
  onValueChange: () => {},
});

// ─── Variants ────────────────────────────────────────────────

const tabsTriggerVariants = tv({
  base: 'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium',
  variants: {
    state: {
      active: 'bg-background text-foreground shadow',
      inactive: 'text-muted-foreground active:opacity-70',
    },
  },
  defaultVariants: {
    state: 'inactive',
  },
});

// ─── Types ───────────────────────────────────────────────────

export interface TabsProps extends ViewProps {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export interface TabsListProps extends ViewProps {
  className?: string;
}

export interface TabsTriggerProps extends PressableProps {
  value: string;
  className?: string;
}

export interface TabsContentProps extends ViewProps {
  value: string;
  className?: string;
}

// ─── Components ──────────────────────────────────────────────

function Tabs({
  defaultValue,
  value: controlledValue,
  onValueChange,
  className,
  children,
  ...props
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue ?? internalValue;

  const handleValueChange = (newValue: string) => {
    setInternalValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <View className={cn('w-full', className)} {...props}>
        {children}
      </View>
    </TabsContext.Provider>
  );
}

function TabsList({ className, ...props }: TabsListProps) {
  return (
    <View
      className={cn('flex flex-row items-center justify-center rounded-lg bg-muted p-1', className)}
      {...props}
    />
  );
}

function TabsTrigger({ value: tabValue, className, ...props }: TabsTriggerProps) {
  const { value, onValueChange } = useContext(TabsContext);
  const isActive = value === tabValue;

  return (
    <Pressable
      className={cn(
        tabsTriggerVariants({ state: isActive ? 'active' : 'inactive' }),
        'flex-1',
        className
      )}
      onPress={() => onValueChange(tabValue)}
      {...props}
    />
  );
}

function TabsContent({ value: tabValue, className, children, ...props }: TabsContentProps) {
  const { value } = useContext(TabsContext);
  if (value !== tabValue) return null;

  return (
    <View className={cn('mt-2', className)} {...props}>
      {children}
    </View>
  );
}

Tabs.displayName = 'Tabs';
TabsList.displayName = 'TabsList';
TabsTrigger.displayName = 'TabsTrigger';
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsTriggerVariants };
