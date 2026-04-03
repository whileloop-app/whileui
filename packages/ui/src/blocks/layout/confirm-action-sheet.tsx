import { useMemo } from 'react';
import {
  Modal,
  Pressable,
  View,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../components/text';
import { cn } from '../../lib/cn';
import { useThemeColors } from '../../lib/theme-colors';
import { useInteractionTokens, withInteractivePressableStyle } from '../../lib/interaction-tokens';
import { useFrostedSurface, type FrostedSurfaceProps } from '../../lib/frosted-surface';

export type ConfirmActionSheetActionVariant = 'default' | 'destructive' | 'cancel';

export interface ConfirmActionSheetAction {
  key: string;
  label: string;
  onPress?: () => void;
  variant?: ConfirmActionSheetActionVariant;
  disabled?: boolean;
  closeOnPress?: boolean;
}

export interface ConfirmActionSheetProps extends Omit<ViewProps, 'children'>, FrostedSurfaceProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  actions?: ConfirmActionSheetAction[];
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  destructive?: boolean;
}

export function ConfirmActionSheet({
  open,
  onOpenChange,
  title,
  description,
  actions,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  destructive = true,
  className,
  style,
  frosted = false,
  blurIntensity,
  blurTintToken,
  ...props
}: ConfirmActionSheetProps) {
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const interaction = useInteractionTokens();
  const frostedSurface = useFrostedSurface({
    frosted,
    blurIntensity,
    blurTintToken,
    defaultTintToken: 'surfaceTranslucent',
    defaultBlurPreset: 'medium',
  });

  const resolvedActions = useMemo<ConfirmActionSheetAction[]>(() => {
    if (actions && actions.length > 0) {
      return actions;
    }

    return [
      {
        key: 'cancel',
        label: cancelLabel,
        variant: 'cancel',
        onPress: onCancel,
      },
      {
        key: 'confirm',
        label: confirmLabel,
        variant: destructive ? 'destructive' : 'default',
        onPress: onConfirm,
      },
    ];
  }, [actions, cancelLabel, confirmLabel, destructive, onCancel, onConfirm]);

  const handleClose = () => onOpenChange(false);

  const handleActionPress = (action: ConfirmActionSheetAction) => {
    action.onPress?.();
    if (action.closeOnPress ?? true) {
      onOpenChange(false);
    }
  };

  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={handleClose}>
      <View className="flex-1 justify-end" style={{ backgroundColor: colors.overlay }}>
        <Pressable className="flex-1" onPress={handleClose} />
        <View
          className={cn(
            'rounded-t-lg border border-border px-4 pt-4 relative overflow-hidden',
            frosted ? 'bg-transparent' : 'bg-background',
            className
          )}
          style={[
            { paddingBottom: Math.max(insets.bottom, 12) } as ViewStyle,
            frostedSurface.surfaceStyle,
            style as StyleProp<ViewStyle>,
          ]}
          {...props}
        >
          {frostedSurface.overlay}
          <View className="mb-4 gap-1.5">
            <Text className="text-base font-semibold text-foreground">{title}</Text>
            {description ? (
              <Text className="text-sm text-muted-foreground">{description}</Text>
            ) : null}
          </View>

          <View className="gap-2">
            {resolvedActions.map((action) => {
              const isDestructive = action.variant === 'destructive';
              const isCancel = action.variant === 'cancel';

              return (
                <Pressable
                  key={action.key}
                  className={cn(
                    'min-h-11 items-center justify-center rounded-md border px-4 py-2',
                    isCancel ? 'border-border bg-muted' : 'border-transparent bg-secondary',
                    isDestructive && 'bg-destructive-soft border-destructive-soft-border',
                    action.disabled && ''
                  )}
                  style={withInteractivePressableStyle(undefined, interaction, {
                    disabled: Boolean(action.disabled),
                    pressedVariant: 'default',
                  })}
                  onPress={() => handleActionPress(action)}
                  disabled={action.disabled}
                  accessibilityRole="button"
                >
                  <Text
                    className={cn(
                      'text-sm font-medium',
                      isCancel ? 'text-foreground' : 'text-secondary-foreground',
                      isDestructive && 'text-destructive'
                    )}
                  >
                    {action.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
}
