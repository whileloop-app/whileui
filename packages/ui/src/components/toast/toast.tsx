import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Pressable, View, type ViewProps } from 'react-native';
import Animated, { SlideInUp, SlideOutUp } from 'react-native-reanimated';
import { Text } from '../text';
import { cn } from '../../lib/cn';
import { tv, type VariantProps } from '../../lib/tv';

// ─── Types ───────────────────────────────────────────────────

export interface ToastData {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success';
  duration?: number;
  action?: {
    label: string;
    onPress: () => void;
  };
}

interface ToastContextValue {
  toasts: ToastData[];
  toast: (data: Omit<ToastData, 'id'>) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

// ─── Context ─────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

// ─── Provider ────────────────────────────────────────────────

export interface ToastProviderProps {
  children: React.ReactNode;
}

let toastId = 0;

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const toast = useCallback((data: Omit<ToastData, 'id'>) => {
    const id = `toast-${++toastId}`;
    setToasts((prev) => [...prev, { ...data, id }]);
    return id;
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss, dismissAll }}>
      {children}
    </ToastContext.Provider>
  );
}

// ─── Toast Variants ──────────────────────────────────────────

const toastVariants = tv({
  base: 'w-full flex-row items-center justify-between rounded-lg border p-4 shadow-lg',
  variants: {
    variant: {
      default: 'border-border bg-background',
      destructive: 'border-destructive bg-destructive',
      success: 'border-success bg-success',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// ─── Toast Item ──────────────────────────────────────────────

export interface ToastProps extends ViewProps, VariantProps<typeof toastVariants> {
  toast: ToastData;
  onDismiss: () => void;
}

function Toast({ toast: toastData, onDismiss, className, ...props }: ToastProps) {
  const { title, description, variant = 'default', duration = 4000, action } = toastData;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onDismiss, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onDismiss]);

  const textColor = variant === 'default' ? 'text-foreground' : `text-${variant}-foreground`;
  const descColor =
    variant === 'default' ? 'text-muted-foreground' : `text-${variant}-foreground/80`;

  return (
    <Animated.View
      entering={SlideInUp.duration(300)}
      exiting={SlideOutUp.duration(200)}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    >
      <View className="flex-1 gap-1">
        {title && <Text className={cn('text-sm font-semibold', textColor)}>{title}</Text>}
        {description && <Text className={cn('text-sm', descColor)}>{description}</Text>}
      </View>
      <View className="flex-row items-center gap-2">
        {action && (
          <Pressable
            onPress={() => {
              action.onPress();
              onDismiss();
            }}
            className="rounded-md border border-border px-3 py-1.5"
          >
            <Text className={cn('text-sm font-medium', textColor)}>{action.label}</Text>
          </Pressable>
        )}
        <Pressable onPress={onDismiss} className="p-1">
          <Text className={cn('text-lg', textColor)}>×</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

// ─── Toast Container ─────────────────────────────────────────

export interface ToastContainerProps extends ViewProps {
  position?: 'top' | 'bottom';
}

export function ToastContainer({ position = 'top', className, ...props }: ToastContainerProps) {
  const { toasts, dismiss } = useToast();

  const positionClass = position === 'top' ? 'top-0' : 'bottom-0';

  return (
    <View
      className={cn('absolute left-0 right-0 z-50 px-4 py-2', positionClass, className)}
      pointerEvents="box-none"
      {...props}
    >
      {toasts.map((toast) => (
        <View key={toast.id} className="mb-2">
          <Toast toast={toast} onDismiss={() => dismiss(toast.id)} />
        </View>
      ))}
    </View>
  );
}

// ─── Exports ─────────────────────────────────────────────────

export { Toast, toastVariants };
