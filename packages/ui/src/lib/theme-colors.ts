import { useCSSVariable } from 'uniwind';
import { formatHex, parse } from 'culori';

// 1. Remove the simple regex checks (isNativeColor)
// 2. Add a robust converter function
function resolveToHex(value: string | number | undefined, fallback: string): string {
  if (value === undefined || value === null) return fallback;
  
  const s = String(value);

  // If it's already a simple hex/rgb string, return it (performance optimization)
  if (s.startsWith('#') || s.startsWith('rgb')) {
    return s;
  }

  // Parse and convert modern CSS colors (oklch, hsl, etc.) to Hex
  try {
    const parsed = parse(s);
    if (parsed) {
      const hex = formatHex(parsed);
      if (hex) return hex;
    }
  } catch (e) {
    // console.warn('Failed to parse color:', value);
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

  return {
    primary: resolveToHex(primary, '#000000'),
    primaryForeground: resolveToHex(primaryForeground, '#ffffff'),
    foreground: resolveToHex(foreground, '#000000'),
    muted: resolveToHex(muted, '#f5f5f5'),
    mutedForeground: resolveToHex(mutedForeground, '#737373'),
    background: resolveToHex(background, '#ffffff'),
    border: resolveToHex(border, '#e5e5e5'),
    accent: resolveToHex(accent, '#22c55e'),
    destructive: resolveToHex(destructive, '#dc2626'),
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
