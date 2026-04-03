import {
  type PressableProps,
  type PressableStateCallbackType,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useCSSVariable } from 'uniwind';

function parseNumber(value: string | number | undefined, fallback: number): number {
  if (value === undefined || value === null) return fallback;
  const parsed = Number.parseFloat(String(value));
  return Number.isFinite(parsed) ? parsed : fallback;
}

function clampOpacity(value: number): number {
  return Math.max(0, Math.min(1, value));
}

export interface InteractionTokens {
  pressOpacity: number;
  pressOpacityStrong: number;
  disabledOpacity: number;
  disabledOpacitySoft: number;
  disabledOpacitySubtle: number;
  inactiveOpacity: number;
  motionFast: number;
  motionNormal: number;
  motionSlow: number;
  drawerOpenDuration: number;
  drawerCloseDuration: number;
}

export type PressedVariant = 'default' | 'strong' | 'none';
export type DisabledVariant = 'default' | 'soft' | 'subtle' | 'none';

export interface InteractivePressableOptions {
  disabled?: boolean;
  pressedVariant?: PressedVariant;
  disabledVariant?: DisabledVariant;
}

export function useInteractionTokens(): InteractionTokens {
  const [
    pressOpacity,
    pressOpacityStrong,
    disabledOpacity,
    disabledOpacitySoft,
    disabledOpacitySubtle,
    inactiveOpacity,
    motionFast,
    motionNormal,
    motionSlow,
    drawerOpenDuration,
    drawerCloseDuration,
  ] = useCSSVariable([
    '--ui-press-opacity',
    '--ui-press-opacity-strong',
    '--ui-disabled-opacity',
    '--ui-disabled-opacity-soft',
    '--ui-disabled-opacity-subtle',
    '--ui-inactive-opacity',
    '--ui-motion-fast',
    '--ui-motion-normal',
    '--ui-motion-slow',
    '--ui-drawer-open-duration',
    '--ui-drawer-close-duration',
  ]);

  return {
    pressOpacity: clampOpacity(parseNumber(pressOpacity, 0.72)),
    pressOpacityStrong: clampOpacity(parseNumber(pressOpacityStrong, 0.9)),
    disabledOpacity: clampOpacity(parseNumber(disabledOpacity, 0.5)),
    disabledOpacitySoft: clampOpacity(parseNumber(disabledOpacitySoft, 0.6)),
    disabledOpacitySubtle: clampOpacity(parseNumber(disabledOpacitySubtle, 0.4)),
    inactiveOpacity: clampOpacity(parseNumber(inactiveOpacity, 0.5)),
    motionFast: Math.max(0, Math.round(parseNumber(motionFast, 160))),
    motionNormal: Math.max(0, Math.round(parseNumber(motionNormal, 220))),
    motionSlow: Math.max(0, Math.round(parseNumber(motionSlow, 300))),
    drawerOpenDuration: Math.max(0, Math.round(parseNumber(drawerOpenDuration, 300))),
    drawerCloseDuration: Math.max(0, Math.round(parseNumber(drawerCloseDuration, 220))),
  };
}

type PressableStyle = PressableProps['style'];

function resolveDisabledOpacity(
  tokens: InteractionTokens,
  variant: DisabledVariant
): number | undefined {
  if (variant === 'none') return undefined;
  if (variant === 'soft') return tokens.disabledOpacitySoft;
  if (variant === 'subtle') return tokens.disabledOpacitySubtle;
  return tokens.disabledOpacity;
}

function resolvePressedOpacity(
  tokens: InteractionTokens,
  variant: PressedVariant
): number | undefined {
  if (variant === 'none') return undefined;
  if (variant === 'strong') return tokens.pressOpacityStrong;
  return tokens.pressOpacity;
}

export function withInteractivePressableStyle(
  styleProp: PressableStyle | undefined,
  tokens: InteractionTokens,
  options: InteractivePressableOptions = {}
): PressableStyle {
  const { disabled = false, pressedVariant = 'default', disabledVariant = 'default' } = options;
  return (state: PressableStateCallbackType) => {
    const baseStyle =
      typeof styleProp === 'function'
        ? styleProp(state)
        : (styleProp as StyleProp<ViewStyle> | undefined);

    const disabledOpacity = resolveDisabledOpacity(tokens, disabledVariant);
    const pressedOpacity = resolvePressedOpacity(tokens, pressedVariant);
    const feedbackOpacity = disabled ? disabledOpacity : state.pressed ? pressedOpacity : undefined;

    return [
      baseStyle,
      feedbackOpacity !== undefined ? ({ opacity: feedbackOpacity } as ViewStyle) : null,
    ];
  };
}
