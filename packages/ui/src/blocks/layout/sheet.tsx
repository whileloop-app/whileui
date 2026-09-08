import React, { createContext, useContext } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  type PressableProps,
  type StyleProp,
  useWindowDimensions,
  View,
  type ViewProps,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../components/text';
import { cn } from '../../lib/cn';
import { composeEventHandlers } from '../../lib/compose-event-handlers';
import { useThemeColors } from '../../lib/theme-colors';
import { useInteractionTokens, withInteractivePressableStyle } from '../../lib/interaction-tokens';
import { useVisualTokens } from '../../lib/visual-tokens';
import { surfacePadding, surfaceRadius, typographyStyle } from '../../lib/recipes';
import {
  useFrostedSurface,
  useFrostedBackdrop,
  type FrostedSurfaceProps,
} from '../../lib/frosted-surface';

// ─── Context ───────────────────────────────────────────────────

interface SheetContextValue {
  onClose: () => void;
}

const SheetContext = createContext<SheetContextValue>({ onClose: () => {} });

// ─── Types ─────────────────────────────────────────────────────

export interface SheetProps extends FrostedSurfaceProps {
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

export interface SheetCloseProps extends PressableProps {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

// ─── Components ───────────────────────────────────────────────

export function Sheet({
  open,
  onOpenChange,
  children,
  maxHeight = 'full',
  maxWidth: maxWidthProp,
  frosted = false,
  blurIntensity,
  blurTintToken,
}: SheetProps) {
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const visual = useVisualTokens();
  const onClose = () => onOpenChange(false);
  const frostedSurface = useFrostedSurface({
    frosted,
    blurIntensity,
    blurTintToken,
    defaultTintToken: 'surfaceTranslucent',
    defaultBlurPreset: 'medium',
  });
  const frostedBackdrop = useFrostedBackdrop({
    frosted,
    blurIntensity:
      typeof blurIntensity === 'number' && Number.isFinite(blurIntensity)
        ? blurIntensity * visual.frostedBackdropBlurScale
        : undefined,
    tintColor: colors.overlay,
  });
  const { height: screenHeight, width: windowWidth } = useWindowDimensions();

  const maxWidth = maxWidthProp ?? visual.sheetMaxWidth;

  // Full width on phones; cap at maxWidth only on tablets/web (breakpoint)
  const widthStyle =
    typeof maxWidth === 'number' && windowWidth >= visual.sheetTabletBreakpoint
      ? { maxWidth, alignSelf: 'center' as const, width: maxWidth }
      : {};

  const maxHeightStyle =
    maxHeight === 'full'
      ? { flex: 1 }
      : maxHeight === 'half'
        ? {
            maxHeight: screenHeight * visual.sheetHalfMaxHeightRatio,
            minHeight: Math.min(
              screenHeight * visual.sheetHalfMaxHeightRatio,
              visual.sheetHalfMinHeight
            ),
          }
        : { maxHeight };

  const sheetStyle: StyleProp<ViewStyle> = [
    maxHeightStyle,
    {
      paddingBottom: Math.max(insets.bottom, 16),
      borderTopLeftRadius: surfaceRadius(visual, 'xl'),
      borderTopRightRadius: surfaceRadius(visual, 'xl'),
      borderWidth: visual.borderWidthHairline,
    },
    widthStyle,
    frostedSurface.surfaceStyle,
  ];

  return (
    <Modal
      visible={open}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent={Platform.OS === 'android'}
      navigationBarTranslucent={Platform.OS === 'android'}
      presentationStyle="overFullScreen"
    >
      <View
        className="flex-1 justify-end"
        style={{ backgroundColor: frosted ? 'transparent' : colors.overlay }}
      >
        {frostedBackdrop}
        <Pressable className="flex-1" onPress={onClose} />
        <View
          className={cn(
            'border-border overflow-hidden relative',
            frosted ? 'bg-transparent' : 'bg-background'
          )}
          style={sheetStyle}
        >
          {frostedSurface.overlay}
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
  style,
  ...props
}: SheetHeaderProps) {
  const { onClose } = useContext(SheetContext);
  const interaction = useInteractionTokens();
  const visual = useVisualTokens();

  return (
    <View
      className={cn('flex-row items-center justify-between gap-3 border-border', className)}
      style={[
        {
          borderBottomWidth: visual.borderWidthHairline,
          paddingHorizontal: surfacePadding(visual, 'sm'),
          paddingVertical: visual.controlPaddingYDefault,
        },
        style,
      ]}
      {...props}
    >
      <View className="flex-1 min-w-0 gap-0.5 self-stretch justify-center">
        {title && (
          <Text
            className="font-semibold text-foreground text-left"
            style={typographyStyle(visual, 'body')}
          >
            {title}
          </Text>
        )}
        {description && (
          <Text
            className="text-muted-foreground text-left"
            style={typographyStyle(visual, 'label')}
          >
            {description}
          </Text>
        )}
      </View>
      {children ?? (
        <Pressable
          onPress={onClose}
          className="p-2 -mr-2 -mt-2 -mb-2"
          style={withInteractivePressableStyle({ borderRadius: visual.radiusMd }, interaction, {
            pressedVariant: 'default',
          })}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel="Close"
        >
          <Text
            className="text-muted-foreground leading-none"
            style={typographyStyle(visual, 'title')}
          >
            ×
          </Text>
        </Pressable>
      )}
    </View>
  );
}

export function SheetContent({
  scrollEnabled = true,
  className,
  children,
  style,
  ...props
}: SheetContentProps) {
  const visual = useVisualTokens();
  const contentPadding = surfacePadding(visual, 'sm');

  if (scrollEnabled) {
    return (
      <ScrollView
        className={cn('flex-1', className)}
        style={style}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: contentPadding }}
        {...(props as any)}
      >
        {children}
      </ScrollView>
    );
  }
  return (
    <View
      className={cn('flex-1', className)}
      style={[{ padding: contentPadding }, style]}
      {...props}
    >
      {children}
    </View>
  );
}

export function SheetFooter({ className, style, ...props }: SheetFooterProps) {
  const visual = useVisualTokens();

  return (
    <View
      className={cn('flex-row gap-2 justify-end border-border', className)}
      style={[
        {
          borderTopWidth: visual.borderWidthHairline,
          paddingHorizontal: surfacePadding(visual, 'sm'),
          paddingVertical: visual.controlPaddingYDefault,
        },
        style,
      ]}
      {...props}
    />
  );
}

export function SheetClose({ children, asChild, className, onPress, ...props }: SheetCloseProps) {
  const { onClose } = useContext(SheetContext);

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<any>;
    return React.cloneElement(child, {
      ...props,
      className: cn(child.props.className, className),
      onPress: composeEventHandlers(composeEventHandlers(child.props.onPress, onPress), () =>
        onClose()
      ),
    });
  }

  return (
    <Pressable
      {...props}
      className={cn(className)}
      onPress={composeEventHandlers(onPress, () => onClose())}
    >
      {children}
    </Pressable>
  );
}
