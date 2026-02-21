import { useCSSVariable } from 'uniwind';

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

  // Fallbacks only when useCSSVariable returns undefined (e.g. before theme init)
  return {
    primary: String(primary ?? '#000000'),
    primaryForeground: String(primaryForeground ?? '#ffffff'),
    foreground: String(foreground ?? '#000000'),
    muted: String(muted ?? '#f5f5f5'),
    mutedForeground: String(mutedForeground ?? '#737373'),
    background: String(background ?? '#ffffff'),
    border: String(border ?? '#e5e5e5'),
    accent: String(accent ?? '#22c55e'),
    destructive: String(destructive ?? '#dc2626'),
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
