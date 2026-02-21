import { useCSSVariable } from 'uniwind';

const HEX_RE = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
const RGB_RE = /^rgba?\(/i;
const HSL_RE = /^hsla?\(/i;
const NAMED_RE = /^[a-z]+$/i;

function isNativeColor(value: string): boolean {
  const s = value.trim();
  if (!s) return false;
  return HEX_RE.test(s) || RGB_RE.test(s) || HSL_RE.test(s) || NAMED_RE.test(s);
}

function toNativeColor(
  value: string | number | undefined,
  appFallback: string | number | undefined,
  fallback: string
): string {
  if (value != null) {
    const s = String(value);
    if (isNativeColor(s)) return s;
  }
  if (appFallback != null) {
    const s = String(appFallback);
    if (isNativeColor(s)) return s;
  }
  return fallback;
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
    appPrimary,
    appPrimaryForeground,
    appForeground,
    appMuted,
    appMutedForeground,
    appBackground,
    appBorder,
    appAccent,
    appDestructive,
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
    '--app-color-primary',
    '--app-color-primary-foreground',
    '--app-color-foreground',
    '--app-color-muted',
    '--app-color-muted-foreground',
    '--app-color-background',
    '--app-color-border',
    '--app-color-accent',
    '--app-color-destructive',
  ]);

  // Fallbacks when undefined; prefer app hex tokens if theme colors are non-native (oklch).
  return {
    primary: toNativeColor(primary, appPrimary, '#000000'),
    primaryForeground: toNativeColor(primaryForeground, appPrimaryForeground, '#ffffff'),
    foreground: toNativeColor(foreground, appForeground, '#000000'),
    muted: toNativeColor(muted, appMuted, '#f5f5f5'),
    mutedForeground: toNativeColor(mutedForeground, appMutedForeground, '#737373'),
    background: toNativeColor(background, appBackground, '#ffffff'),
    border: toNativeColor(border, appBorder, '#e5e5e5'),
    accent: toNativeColor(accent, appAccent, '#22c55e'),
    destructive: toNativeColor(destructive, appDestructive, '#dc2626'),
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
