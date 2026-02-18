import React, { createContext, useContext, useState } from 'react';
import {
  Modal,
  Pressable,
  Text,
  type ViewProps,
  type TextProps,
  type PressableProps,
} from 'react-native';
import { cn } from '../../lib/cn';

// ─── Context ─────────────────────────────────────────────────

interface SelectContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  value: string;
  onValueChange: (value: string) => void;
  label: string;
  setLabel: (label: string) => void;
}

const SelectContext = createContext<SelectContextValue>({
  open: false,
  setOpen: () => {},
  value: '',
  onValueChange: () => {},
  label: '',
  setLabel: () => {},
});

// ─── Types ───────────────────────────────────────────────────

export interface SelectProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

export interface SelectTriggerProps extends Omit<PressableProps, 'children'> {
  className?: string;
  placeholder?: string;
  children?: React.ReactNode;
}

export interface SelectContentProps extends ViewProps {
  className?: string;
}

export interface SelectItemProps extends PressableProps {
  value: string;
  label: string;
  className?: string;
}

export interface SelectValueProps extends TextProps {
  placeholder?: string;
  className?: string;
}

// ─── Components ──────────────────────────────────────────────

function Select({
  defaultValue = '',
  value: controlledValue,
  onValueChange,
  children,
}: SelectProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState('');
  const value = controlledValue ?? internalValue;

  const handleValueChange = (newValue: string) => {
    setInternalValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <SelectContext.Provider
      value={{ open, setOpen, value, onValueChange: handleValueChange, label, setLabel }}
    >
      {children}
    </SelectContext.Provider>
  );
}

function SelectTrigger({ className, children, ...props }: SelectTriggerProps) {
  const { setOpen } = useContext(SelectContext);

  return (
    <Pressable
      className={cn(
        'flex h-10 w-full flex-row items-center justify-between rounded-md border border-input bg-background px-3 py-2',
        className
      )}
      onPress={() => setOpen(true)}
      {...props}
    >
      {children}
      <Text className="text-muted-foreground text-sm">▾</Text>
    </Pressable>
  );
}

function SelectValue({ placeholder, className, ...props }: SelectValueProps) {
  const { label } = useContext(SelectContext);

  return (
    <Text
      className={cn('text-sm', label ? 'text-foreground' : 'text-muted-foreground', className)}
      {...props}
    >
      {label || placeholder || 'Select...'}
    </Text>
  );
}

function SelectContent({ className, children, ...props }: SelectContentProps) {
  const { open, setOpen } = useContext(SelectContext);

  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
      <Pressable
        className="flex-1 justify-center items-center bg-black/50 px-4"
        onPress={() => setOpen(false)}
      >
        <Pressable
          className={cn(
            'w-full max-w-sm rounded-xl border border-border bg-background p-2 shadow-lg',
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

function SelectItem({ value: itemValue, label: itemLabel, className, ...props }: SelectItemProps) {
  const { value, onValueChange, setOpen, setLabel } = useContext(SelectContext);
  const isSelected = value === itemValue;

  return (
    <Pressable
      className={cn(
        'flex flex-row items-center rounded-md px-3 py-2.5 active:bg-muted',
        isSelected && 'bg-primary',
        className
      )}
      onPress={() => {
        onValueChange(itemValue);
        setLabel(itemLabel);
        setOpen(false);
      }}
      {...props}
    >
      <Text
        className={cn(
          'text-sm flex-1',
          isSelected ? 'text-primary-foreground font-medium' : 'text-foreground'
        )}
      >
        {itemLabel}
      </Text>
      {isSelected && <Text className="text-primary-foreground text-sm">✓</Text>}
    </Pressable>
  );
}

Select.displayName = 'Select';
SelectTrigger.displayName = 'SelectTrigger';
SelectValue.displayName = 'SelectValue';
SelectContent.displayName = 'SelectContent';
SelectItem.displayName = 'SelectItem';

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
