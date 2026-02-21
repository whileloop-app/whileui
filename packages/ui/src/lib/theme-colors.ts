import { useCSSVariable } from 'uniwind';

/** React Native tintColor/color props require hex. Guard against oklch/hsl from useCSSVariable. */
const HEX_RE = /^#[0-9a-fA-F]{3,8}$/;
function toHex(value: string | number | undefined, fallback: string): string {
  if (value == null) return fallback;
  const s = String(value);
  return HEX_RE.test(s) ? s : fallback;
}

/**
 * Color values for RN primitives that require them (icons, Calendar, ActivityIndicator).
 * Reads from global.css via useCSSVariable — single source of truth in your theme.
 */
export interface ThemeColors {
  primary: string;
  primaryForeground: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  background: string;
  border: string;
  accent: string;
  destructive: string;
}

export function useThemeColors(): ThemeColors {
  const [
    primary,
    primaryForeground,
    foreground,
    muted,
    mutedForeground,
    background,
    border,
    accent,
    destructive,
  ] = useCSSVariable([
    '--color-primary',
    '--color-primary-foreground',
    '--color-foreground',
    '--color-muted',
    '--color-muted-foreground',
    '--color-background',
    '--color-border',
    '--color-accent',
    '--color-destructive',
  ]);

  // Fallbacks when undefined; toHex guards against oklch/hsl (RN tintColor/color need hex)
  return {
    primary: toHex(primary, '#000000'),
    primaryForeground: toHex(primaryForeground, '#ffffff'),
    foreground: toHex(foreground, '#000000'),
    muted: toHex(muted, '#f5f5f5'),
    mutedForeground: toHex(mutedForeground, '#737373'),
    background: toHex(background, '#ffffff'),
    border: toHex(border, '#e5e5e5'),
    accent: toHex(accent, '#22c55e'),
    destructive: toHex(destructive, '#dc2626'),
  };
}

/** Icon colors derived from theme. For @expo/vector-icons which need hex values. */
export function useIconColors() {
  const c = useThemeColors();
  return {
    foreground: c.foreground,
    muted: c.mutedForeground,
    primary: c.primary,
    primaryForeground: c.primaryForeground,
    accent: c.accent,
    destructive: c.destructive,
  };
}
