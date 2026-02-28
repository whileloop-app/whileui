import React, { createContext, useContext } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  useWindowDimensions,
  View,
  type ViewProps,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../components/text';
import { cn } from '../../lib/cn';

// ─── Context ───────────────────────────────────────────────────

interface SheetContextValue {
  onClose: () => void;
}

const SheetContext = createContext<SheetContextValue>({ onClose: () => {} });

// ─── Types ─────────────────────────────────────────────────────

export interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  /** Max height: 'half' | 'full' | number (px). Default 'full' */
  maxHeight?: 'half' | 'full' | number;
  /** Web: max width. Default ~360 for mobile-first. */
  maxWidth?: number;
}

export interface SheetHeaderProps extends ViewProps {
  title?: string;
  description?: string;
}

export interface SheetContentProps extends ViewProps {
  scrollEnabled?: boolean;
}

export interface SheetFooterProps extends ViewProps {}

export interface SheetCloseProps extends ViewProps {
  children: React.ReactNode;
  asChild?: boolean;
}

// ─── Components ───────────────────────────────────────────────

export function Sheet({
  open,
  onOpenChange,
  children,
  maxHeight = 'full',
  maxWidth = 360,
}: SheetProps) {
  const insets = useSafeAreaInsets();
  const onClose = () => onOpenChange(false);
  const { height: screenHeight, width: windowWidth } = useWindowDimensions();

  // Full width on phones; cap at maxWidth only on tablets/web (breakpoint 600px)
  const widthStyle =
    typeof maxWidth === 'number' && windowWidth >= 600
      ? { maxWidth, alignSelf: 'center' as const, width: maxWidth }
      : {};

  const maxHeightStyle =
    maxHeight === 'full'
      ? { flex: 1 }
      : maxHeight === 'half'
        ? { maxHeight: screenHeight * 0.5, minHeight: Math.min(screenHeight * 0.4, 320) }
        : { maxHeight };

  return (
    <Modal
      visible={open}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent={Platform.OS === 'android'}
      presentationStyle="overFullScreen"
    >
      <View className="flex-1 justify-end bg-black/40">
        <Pressable className="flex-1" onPress={onClose} />
        <View
          className="rounded-t-xl border border-border bg-background overflow-hidden"
          style={[maxHeightStyle, { paddingBottom: Math.max(insets.bottom, 16) }, widthStyle]}
        >
          <SheetContext.Provider value={{ onClose }}>{children}</SheetContext.Provider>
        </View>
      </View>
    </Modal>
  );
}

export function SheetHeader({
  title,
  description,
  className,
  children,
  ...props
}: SheetHeaderProps) {
  const { onClose } = useContext(SheetContext);

  return (
    <View
      className={cn(
        'flex-row items-center justify-between gap-3 border-b border-border px-4 py-3',
        className
      )}
      {...props}
    >
      <View className="flex-1 min-w-0 gap-0.5 self-stretch justify-center">
        {title && (
          <Text className="text-base font-semibold text-foreground text-left">{title}</Text>
        )}
        {description && (
          <Text className="text-sm text-muted-foreground text-left">{description}</Text>
        )}
      </View>
      {children ?? (
        <Pressable
          onPress={onClose}
          className="p-2 -mr-2 -mt-2 -mb-2 rounded-lg active:opacity-70"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel="Close"
        >
          <Text className="text-xl text-muted-foreground leading-none">×</Text>
        </Pressable>
      )}
    </View>
  );
}

export function SheetContent({
  scrollEnabled = true,
  className,
  children,
  ...props
}: SheetContentProps) {
  if (scrollEnabled) {
    return (
      <ScrollView
        className={cn('flex-1', className)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
        {...(props as any)}
      >
        {children}
      </ScrollView>
    );
  }
  return (
    <View className={cn('flex-1 px-4 py-4', className)} {...props}>
      {children}
    </View>
  );
}

export function SheetFooter({ className, ...props }: SheetFooterProps) {
  return (
    <View
      className={cn('flex-row gap-2 justify-end border-t border-border px-4 py-3', className)}
      {...props}
    />
  );
}

export function SheetClose({ children, asChild, className, ...props }: SheetCloseProps) {
  const { onClose } = useContext(SheetContext);

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<any>;
    return React.cloneElement(child, {
      onPress: (e: any) => {
        child.props.onPress?.(e);
        onClose();
      },
      ...props,
    });
  }

  return (
    <Pressable className={cn(className)} onPress={onClose} {...props}>
      {children}
    </Pressable>
  );
}
