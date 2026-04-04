import React, { createContext, useContext, useLayoutEffect, useRef, useState } from 'react';
import {
  View,
  Modal,
  Pressable,
  Text,
  Alert,
  Platform,
  StyleSheet,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
  type TextProps,
  type PressableProps,
  type PressableStateCallbackType,
} from 'react-native';
import { cn } from '../../lib/cn';
import { useThemeColors } from '../../lib/theme-colors';
import { useFrostedSurface, type FrostedSurfaceProps } from '../../lib/frosted-surface';

// ─── Native alert copy (for presentation="native") ───────────

/** `overlay` = themed UI as an absolute layer inside the parent (no second RN Modal). Mount inside your sheet `Modal` for app-styled confirms. */
export type AlertDialogPresentation = 'modal' | 'native' | 'overlay';

type NativeAlertCopy = {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: (() => void) | null;
  onCancel: (() => void) | null;
};

function emptyNativeCopy(): NativeAlertCopy {
  return {
    title: '',
    message: '',
    confirmLabel: 'OK',
    cancelLabel: 'Cancel',
    onConfirm: null,
    onCancel: null,
  };
}

function textFromNode(node: React.ReactNode): string {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textFromNode).filter(Boolean).join(' ');
  if (React.isValidElement(node)) {
    return textFromNode((node.props as { children?: React.ReactNode }).children);
  }
  return '';
}

/** Pressable children may be a render function; native alert only supports static labels. */
function textFromPressableChildren(
  children: React.ReactNode | ((state: PressableStateCallbackType) => React.ReactNode)
): string {
  if (typeof children === 'function') return '';
  return textFromNode(children);
}

// ─── Context ─────────────────────────────────────────────────

interface AlertDialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  nativeCopyRef: React.MutableRefObject<NativeAlertCopy>;
}

const fallbackNativeRef: React.MutableRefObject<NativeAlertCopy> = { current: emptyNativeCopy() };

const AlertDialogContext = createContext<AlertDialogContextValue>({
  open: false,
  setOpen: () => {},
  nativeCopyRef: fallbackNativeRef,
});

// ─── Types ───────────────────────────────────────────────────

export interface AlertDialogProps {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export interface AlertDialogTriggerProps extends PressableProps {
  className?: string;
  asChild?: boolean;
}

export interface AlertDialogContentProps extends ViewProps, FrostedSurfaceProps {
  className?: string;
  /**
   * `modal` — RN `Modal` + themed card (default).
   * `native` — `Alert.alert` on iOS/Android (system chrome); ignored on web.
   * `overlay` — same themed card as `modal`, but absolute fill inside the parent view (nest inside your `Modal`).
   */
  presentation?: AlertDialogPresentation;
}

export interface AlertDialogHeaderProps extends ViewProps {
  className?: string;
}

export interface AlertDialogFooterProps extends ViewProps {
  className?: string;
}

export interface AlertDialogTitleProps extends TextProps {
  className?: string;
}

export interface AlertDialogDescriptionProps extends TextProps {
  className?: string;
}

export interface AlertDialogActionProps extends PressableProps {
  className?: string;
  asChild?: boolean;
}

export interface AlertDialogCancelProps extends PressableProps {
  className?: string;
}

// ─── Components ──────────────────────────────────────────────

function AlertDialog({
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  children,
}: AlertDialogProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;
  const nativeCopyRef = useRef<NativeAlertCopy>(emptyNativeCopy());

  const setOpen = (value: boolean) => {
    setInternalOpen(value);
    onOpenChange?.(value);
  };

  return (
    <AlertDialogContext.Provider value={{ open, setOpen, nativeCopyRef }}>
      {children}
    </AlertDialogContext.Provider>
  );
}

function AlertDialogTrigger({ className, children, asChild, ...props }: AlertDialogTriggerProps) {
  const { setOpen } = useContext(AlertDialogContext);

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

const nativeHiddenStyle = StyleSheet.create({
  root: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
    overflow: 'hidden',
    left: -4096,
    top: 0,
  },
}).root;

function AlertDialogContent({
  className,
  children,
  presentation = 'modal',
  frosted = false,
  blurIntensity,
  blurTintToken,
  style,
  ...props
}: AlertDialogContentProps) {
  const { open, setOpen, nativeCopyRef } = useContext(AlertDialogContext);
  const colors = useThemeColors();
  const frostedSurface = useFrostedSurface({
    frosted,
    blurIntensity,
    blurTintToken,
    defaultTintToken: 'surfaceTranslucent',
    defaultBlurPreset: 'medium',
  });
  const contentStyle: StyleProp<ViewStyle> = [frostedSurface.surfaceStyle, style];

  const useNativeAlert =
    presentation === 'native' && (Platform.OS === 'ios' || Platform.OS === 'android');
  const useOverlay = presentation === 'overlay';

  const prevOpenRef = useRef(false);
  const nativeAlertShownForOpenRef = useRef(false);

  useLayoutEffect(() => {
    if (!useNativeAlert) return;

    if (!open) {
      nativeAlertShownForOpenRef.current = false;
      prevOpenRef.current = false;
      return;
    }

    const isNewOpenCycle = !prevOpenRef.current;
    prevOpenRef.current = true;

    if (!isNewOpenCycle || nativeAlertShownForOpenRef.current) {
      return;
    }
    nativeAlertShownForOpenRef.current = true;

    let cancelled = false;

    const showNativeAlert = () => {
      if (cancelled) return;
      const snap: NativeAlertCopy = { ...nativeCopyRef.current };

      const buttons = [
        {
          text: snap.cancelLabel || 'Cancel',
          style: 'cancel' as const,
          onPress: () => {
            snap.onCancel?.();
            setOpen(false);
          },
        },
        {
          text: snap.confirmLabel || 'OK',
          style: 'destructive' as const,
          onPress: () => {
            snap.onConfirm?.();
            setOpen(false);
          },
        },
      ];

      const options =
        Platform.OS === 'android'
          ? {
              cancelable: true,
              onDismiss: () => setOpen(false),
            }
          : undefined;

      Alert.alert(snap.title || '', snap.message || undefined, buttons, options);
    };

    // After all layout effects in this commit (Title/Description/Action register copy).
    // Also avoids presenting UIAlertController in the same turn as an RN fullscreen Modal,
    // which often yields no visible alert on iOS.
    queueMicrotask(showNativeAlert);

    return () => {
      cancelled = true;
      // Strict Mode (dev) runs this cleanup before the microtask; reset guards so the
      // remounted effect can schedule Alert.alert again. Safe when open becomes false:
      // the next effect run also clears these refs.
      nativeAlertShownForOpenRef.current = false;
      prevOpenRef.current = false;
    };
  }, [open, useNativeAlert, setOpen, nativeCopyRef]);

  const themedBody = (
    <View
      className="flex-1 justify-center items-center px-4"
      style={{ backgroundColor: colors.overlayStrong }}
    >
      <View
        className={cn(
          'w-full max-w-lg rounded-lg border border-border p-6 shadow-lg relative overflow-hidden',
          frosted ? 'bg-transparent' : 'bg-background',
          className
        )}
        style={contentStyle}
        {...props}
      >
        {frostedSurface.overlay}
        {children}
      </View>
    </View>
  );

  if (useNativeAlert) {
    return (
      <View
        pointerEvents="none"
        style={nativeHiddenStyle}
        collapsable={false}
        importantForAccessibility="no-hide-descendants"
      >
        {children}
      </View>
    );
  }

  if (useOverlay) {
    if (!open) {
      return (
        <View
          pointerEvents="none"
          style={nativeHiddenStyle}
          collapsable={false}
          importantForAccessibility="no-hide-descendants"
        >
          {children}
        </View>
      );
    }
    return (
      <View
        pointerEvents="box-none"
        style={[
          StyleSheet.absoluteFillObject,
          { zIndex: 100, elevation: Platform.OS === 'android' ? 24 : undefined },
        ]}
      >
        {themedBody}
      </View>
    );
  }

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      presentationStyle={Platform.OS === 'ios' ? 'overFullScreen' : undefined}
      statusBarTranslucent={Platform.OS === 'android'}
    >
      {themedBody}
    </Modal>
  );
}

function useAlertDialogNativeCopy() {
  return useContext(AlertDialogContext).nativeCopyRef;
}

function AlertDialogHeader({ className, ...props }: AlertDialogHeaderProps) {
  return <View className={cn('flex flex-col gap-1.5 pb-4', className)} {...props} />;
}

function AlertDialogFooter({ className, ...props }: AlertDialogFooterProps) {
  return <View className={cn('flex flex-row justify-end gap-2 pt-4', className)} {...props} />;
}

function AlertDialogTitle({ className, children, ...props }: AlertDialogTitleProps) {
  const nativeCopyRef = useAlertDialogNativeCopy();

  useLayoutEffect(() => {
    nativeCopyRef.current.title = textFromNode(children);
    return () => {
      nativeCopyRef.current.title = '';
    };
  }, [children, nativeCopyRef]);

  return (
    <Text className={cn('text-lg font-semibold text-foreground', className)} {...props}>
      {children}
    </Text>
  );
}

function AlertDialogDescription({ className, children, ...props }: AlertDialogDescriptionProps) {
  const nativeCopyRef = useAlertDialogNativeCopy();

  useLayoutEffect(() => {
    nativeCopyRef.current.message = textFromNode(children);
    return () => {
      nativeCopyRef.current.message = '';
    };
  }, [children, nativeCopyRef]);

  return (
    <Text className={cn('text-sm text-muted-foreground', className)} {...props}>
      {children}
    </Text>
  );
}

function AlertDialogAction({ className, children, asChild, ...props }: AlertDialogActionProps) {
  const { setOpen, nativeCopyRef } = useContext(AlertDialogContext);
  const onPressRef = useRef(props.onPress);
  onPressRef.current = props.onPress;

  useLayoutEffect(() => {
    nativeCopyRef.current.confirmLabel = textFromPressableChildren(children);
    nativeCopyRef.current.onConfirm = () => {
      const h = onPressRef.current;
      if (h) (h as (e?: unknown) => void)();
    };
    return () => {
      nativeCopyRef.current.confirmLabel = 'OK';
      nativeCopyRef.current.onConfirm = null;
    };
  }, [children, nativeCopyRef]);

  const handlePress = (e: Parameters<NonNullable<PressableProps['onPress']>>[0]) => {
    props.onPress?.(e);
    setOpen(false);
  };

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<any>;
    return React.cloneElement(child, {
      onPress: handlePress,
      ...props,
    });
  }

  return (
    <Pressable
      className={cn(
        'inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 active:bg-primary-active',
        className
      )}
      onPress={handlePress}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text className="text-sm font-medium text-primary-foreground">{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

function AlertDialogCancel({ className, children, ...props }: AlertDialogCancelProps) {
  const { setOpen, nativeCopyRef } = useContext(AlertDialogContext);
  const onPressRef = useRef(props.onPress);
  onPressRef.current = props.onPress;

  useLayoutEffect(() => {
    nativeCopyRef.current.cancelLabel = textFromPressableChildren(children);
    nativeCopyRef.current.onCancel = () => {
      const h = onPressRef.current;
      if (h) (h as (e?: unknown) => void)();
    };
    return () => {
      nativeCopyRef.current.cancelLabel = 'Cancel';
      nativeCopyRef.current.onCancel = null;
    };
  }, [children, nativeCopyRef]);

  return (
    <Pressable
      className={cn(
        'inline-flex items-center justify-center rounded-md border border-border bg-transparent px-4 py-2 active:bg-accent',
        className
      )}
      onPress={(e) => {
        props.onPress?.(e);
        setOpen(false);
      }}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text className="text-sm font-medium text-foreground">{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

AlertDialog.displayName = 'AlertDialog';
AlertDialogTrigger.displayName = 'AlertDialogTrigger';
AlertDialogContent.displayName = 'AlertDialogContent';
AlertDialogHeader.displayName = 'AlertDialogHeader';
AlertDialogFooter.displayName = 'AlertDialogFooter';
AlertDialogTitle.displayName = 'AlertDialogTitle';
AlertDialogDescription.displayName = 'AlertDialogDescription';
AlertDialogAction.displayName = 'AlertDialogAction';
AlertDialogCancel.displayName = 'AlertDialogCancel';

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
