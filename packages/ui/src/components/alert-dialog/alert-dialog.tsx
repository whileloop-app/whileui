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
import { composeEventHandlers } from '../../lib/compose-event-handlers';
import { useInteractionTokens, withInteractivePressableStyle } from '../../lib/interaction-tokens';
import { useThemeColors } from '../../lib/theme-colors';
import { useFrostedSurface, type FrostedSurfaceProps } from '../../lib/frosted-surface';
import { useVisualTokens } from '../../lib/visual-tokens';
import { shadowStyle, typographyStyle } from '../../lib/recipes';

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
    if (controlledOpen === undefined) {
      setInternalOpen(value);
    }
    onOpenChange?.(value);
  };

  return (
    <AlertDialogContext.Provider value={{ open, setOpen, nativeCopyRef }}>
      {children}
    </AlertDialogContext.Provider>
  );
}

function AlertDialogTrigger({
  className,
  children,
  asChild,
  onPress,
  ...props
}: AlertDialogTriggerProps) {
  const { setOpen } = useContext(AlertDialogContext);

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<any>;
    return React.cloneElement(child, {
      ...props,
      className: cn(child.props.className, className),
      onPress: composeEventHandlers(composeEventHandlers(child.props.onPress, onPress), () =>
        setOpen(true)
      ),
    });
  }

  return (
    <Pressable
      {...props}
      className={cn(className)}
      onPress={composeEventHandlers(onPress, () => setOpen(true))}
    >
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
  const visual = useVisualTokens();
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
    <Pressable
      className="flex-1 justify-center items-center px-4"
      style={{ backgroundColor: colors.overlayStrong }}
      onPress={() => setOpen(false)}
    >
      <Pressable
        className={cn(
          'w-full border-border relative overflow-hidden',
          frosted ? 'bg-transparent' : 'bg-background',
          className
        )}
        style={[
          {
            maxWidth: visual.sheetMaxWidth,
            borderWidth: visual.borderWidthHairline,
            borderRadius: visual.radiusXl,
            padding: visual.surfacePaddingDefault,
          },
          shadowStyle(visual, colors, 'lg'),
          contentStyle,
        ]}
        onPress={(event) => event.stopPropagation()}
        {...props}
      >
        {frostedSurface.overlay}
        {children}
      </Pressable>
    </Pressable>
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
      navigationBarTranslucent={Platform.OS === 'android'}
      onRequestClose={() => setOpen(false)}
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

function AlertDialogTitle({ className, children, style, ...props }: AlertDialogTitleProps) {
  const nativeCopyRef = useAlertDialogNativeCopy();
  const visual = useVisualTokens();

  useLayoutEffect(() => {
    nativeCopyRef.current.title = textFromNode(children);
    return () => {
      nativeCopyRef.current.title = '';
    };
  }, [children, nativeCopyRef]);

  return (
    <Text
      className={cn('font-semibold text-foreground', className)}
      style={[typographyStyle(visual, 'title'), style]}
      {...props}
    >
      {children}
    </Text>
  );
}

function AlertDialogDescription({
  className,
  children,
  style,
  ...props
}: AlertDialogDescriptionProps) {
  const nativeCopyRef = useAlertDialogNativeCopy();
  const visual = useVisualTokens();

  useLayoutEffect(() => {
    nativeCopyRef.current.message = textFromNode(children);
    return () => {
      nativeCopyRef.current.message = '';
    };
  }, [children, nativeCopyRef]);

  return (
    <Text
      className={cn('text-muted-foreground', className)}
      style={[typographyStyle(visual, 'label'), style]}
      {...props}
    >
      {children}
    </Text>
  );
}

function AlertDialogAction({
  className,
  children,
  asChild,
  onPress,
  ...props
}: AlertDialogActionProps) {
  const { setOpen, nativeCopyRef } = useContext(AlertDialogContext);
  const interaction = useInteractionTokens();
  const visual = useVisualTokens();
  const onPressRef = useRef(onPress);
  onPressRef.current = onPress;
  const interactiveStyle = withInteractivePressableStyle(undefined, interaction, {
    pressedVariant: 'strong',
  });

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

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<any>;
    return React.cloneElement(child, {
      ...props,
      className: cn(child.props.className, className),
      onPress: composeEventHandlers(composeEventHandlers(child.props.onPress, onPress), () =>
        setOpen(false)
      ),
    });
  }

  return (
    <Pressable
      {...props}
      className={cn('inline-flex items-center justify-center bg-primary', className)}
      style={(state) => {
        const baseStyle =
          typeof interactiveStyle === 'function' ? interactiveStyle(state) : interactiveStyle;
        return [
          baseStyle,
          {
            minHeight: visual.controlHeightDefault,
            borderRadius: visual.radiusLg,
            paddingHorizontal: visual.controlPaddingXDefault,
            paddingVertical: visual.controlPaddingYDefault,
          },
        ];
      }}
      onPress={composeEventHandlers(onPress, () => setOpen(false))}
    >
      {typeof children === 'string' ? (
        <Text
          className="font-medium text-primary-foreground"
          style={typographyStyle(visual, 'label')}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

function AlertDialogCancel({ className, children, onPress, ...props }: AlertDialogCancelProps) {
  const { setOpen, nativeCopyRef } = useContext(AlertDialogContext);
  const interaction = useInteractionTokens();
  const visual = useVisualTokens();
  const onPressRef = useRef(onPress);
  onPressRef.current = onPress;
  const interactiveStyle = withInteractivePressableStyle(undefined, interaction, {
    pressedVariant: 'default',
  });

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
      {...props}
      className={cn(
        'inline-flex items-center justify-center border-border bg-transparent',
        className
      )}
      style={(state) => {
        const baseStyle =
          typeof interactiveStyle === 'function' ? interactiveStyle(state) : interactiveStyle;
        return [
          baseStyle,
          {
            minHeight: visual.controlHeightDefault,
            borderWidth: visual.borderWidthControl,
            borderRadius: visual.radiusLg,
            paddingHorizontal: visual.controlPaddingXDefault,
            paddingVertical: visual.controlPaddingYDefault,
          },
        ];
      }}
      onPress={composeEventHandlers(onPress, () => setOpen(false))}
    >
      {typeof children === 'string' ? (
        <Text className="font-medium text-foreground" style={typographyStyle(visual, 'label')}>
          {children}
        </Text>
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
