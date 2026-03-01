import { useCSSVariable } from 'uniwind';
import { formatHex, parse } from 'culori';

interface ColorTokenSpec {
  key: keyof Omit<ThemeColors, 'placeholder'>;
  cssVar: string;
  appVar: string;
  fallback: string;
}

function parseThemeColor(value: string | number | undefined): string | undefined {
  if (value === undefined || value === null) return undefined;

  const s = String(value).trim();
  if (!s) return undefined;

  if (s.startsWith('#') || s.startsWith('rgb') || s.startsWith('hsl')) {
    return s;
  }

  try {
    const parsed = parse(s);
    if (parsed) {
      const hex = formatHex(parsed);
      if (hex) return hex;
    }
  } catch {
    return undefined;
  }

  return undefined;
}

function resolveThemeToken(
  cssValue: string | number | undefined,
  appValue: string | number | undefined,
  fallback: string
): string {
  return parseThemeColor(cssValue) ?? parseThemeColor(appValue) ?? fallback;
}

/**
 * Color values for RN primitives that require them (icons, Calendar, ActivityIndicator).
 * Reads from global.css via useCSSVariable — single source of truth in your theme.
 */
export interface ThemeColors {
  primary: string;
  primaryForeground: string;
  foreground: string;
  background: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  input: string;
  ring: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  success: string;
  successForeground: string;
  warning: string;
  warningForeground: string;
  info: string;
  infoForeground: string;
  overlay: string;
  overlayStrong: string;
  surfaceElevated: string;
  surfaceBorder: string;
  surfaceHighlight: string;
  stateHover: string;
  statePressed: string;
  stateDisabled: string;
  /** For placeholder text (aliases mutedForeground; override via placeholderTextColor when needed) */
  placeholder: string;
}

const THEME_COLOR_SPECS: readonly ColorTokenSpec[] = [
  {
    key: 'primary',
    cssVar: '--color-primary',
    appVar: '--app-color-primary',
    fallback: '#000000',
  },
  {
    key: 'primaryForeground',
    cssVar: '--color-primary-foreground',
    appVar: '--app-color-primary-foreground',
    fallback: '#ffffff',
  },
  {
    key: 'foreground',
    cssVar: '--color-foreground',
    appVar: '--app-color-foreground',
    fallback: '#000000',
  },
  {
    key: 'background',
    cssVar: '--color-background',
    appVar: '--app-color-background',
    fallback: '#ffffff',
  },
  {
    key: 'card',
    cssVar: '--color-card',
    appVar: '--app-color-card',
    fallback: '#ffffff',
  },
  {
    key: 'cardForeground',
    cssVar: '--color-card-foreground',
    appVar: '--app-color-card-foreground',
    fallback: '#000000',
  },
  {
    key: 'popover',
    cssVar: '--color-popover',
    appVar: '--app-color-popover',
    fallback: '#ffffff',
  },
  {
    key: 'popoverForeground',
    cssVar: '--color-popover-foreground',
    appVar: '--app-color-popover-foreground',
    fallback: '#000000',
  },
  {
    key: 'secondary',
    cssVar: '--color-secondary',
    appVar: '--app-color-secondary',
    fallback: '#f5f5f5',
  },
  {
    key: 'secondaryForeground',
    cssVar: '--color-secondary-foreground',
    appVar: '--app-color-secondary-foreground',
    fallback: '#171717',
  },
  {
    key: 'muted',
    cssVar: '--color-muted',
    appVar: '--app-color-muted',
    fallback: '#f5f5f5',
  },
  {
    key: 'mutedForeground',
    cssVar: '--color-muted-foreground',
    appVar: '--app-color-muted-foreground',
    fallback: '#737373',
  },
  {
    key: 'border',
    cssVar: '--color-border',
    appVar: '--app-color-border',
    fallback: '#e5e5e5',
  },
  {
    key: 'input',
    cssVar: '--color-input',
    appVar: '--app-color-input',
    fallback: '#e5e5e5',
  },
  {
    key: 'ring',
    cssVar: '--color-ring',
    appVar: '--app-color-ring',
    fallback: '#94a3b8',
  },
  {
    key: 'accent',
    cssVar: '--color-accent',
    appVar: '--app-color-accent',
    fallback: '#22c55e',
  },
  {
    key: 'accentForeground',
    cssVar: '--color-accent-foreground',
    appVar: '--app-color-accent-foreground',
    fallback: '#0a0a0a',
  },
  {
    key: 'destructive',
    cssVar: '--color-destructive',
    appVar: '--app-color-destructive',
    fallback: '#dc2626',
  },
  {
    key: 'destructiveForeground',
    cssVar: '--color-destructive-foreground',
    appVar: '--app-color-destructive-foreground',
    fallback: '#ffffff',
  },
  {
    key: 'success',
    cssVar: '--color-success',
    appVar: '--app-color-success',
    fallback: '#16a34a',
  },
  {
    key: 'successForeground',
    cssVar: '--color-success-foreground',
    appVar: '--app-color-success-foreground',
    fallback: '#ffffff',
  },
  {
    key: 'warning',
    cssVar: '--color-warning',
    appVar: '--app-color-warning',
    fallback: '#f59e0b',
  },
  {
    key: 'warningForeground',
    cssVar: '--color-warning-foreground',
    appVar: '--app-color-warning-foreground',
    fallback: '#111827',
  },
  {
    key: 'info',
    cssVar: '--color-info',
    appVar: '--app-color-info',
    fallback: '#3b82f6',
  },
  {
    key: 'infoForeground',
    cssVar: '--color-info-foreground',
    appVar: '--app-color-info-foreground',
    fallback: '#ffffff',
  },
  {
    key: 'overlay',
    cssVar: '--color-overlay',
    appVar: '--app-color-overlay',
    fallback: 'rgba(0, 0, 0, 0.4)',
  },
  {
    key: 'overlayStrong',
    cssVar: '--color-overlay-strong',
    appVar: '--app-color-overlay-strong',
    fallback: 'rgba(0, 0, 0, 0.55)',
  },
  {
    key: 'surfaceElevated',
    cssVar: '--color-surface-elevated',
    appVar: '--app-color-surface-elevated',
    fallback: '#ffffff',
  },
  {
    key: 'surfaceBorder',
    cssVar: '--color-surface-border',
    appVar: '--app-color-surface-border',
    fallback: 'rgba(255, 255, 255, 0.3)',
  },
  {
    key: 'surfaceHighlight',
    cssVar: '--color-surface-highlight',
    appVar: '--app-color-surface-highlight',
    fallback: 'rgba(255, 255, 255, 0.3)',
  },
  {
    key: 'stateHover',
    cssVar: '--color-state-hover',
    appVar: '--app-color-state-hover',
    fallback: 'rgba(0, 0, 0, 0.05)',
  },
  {
    key: 'statePressed',
    cssVar: '--color-state-pressed',
    appVar: '--app-color-state-pressed',
    fallback: 'rgba(0, 0, 0, 0.12)',
  },
  {
    key: 'stateDisabled',
    cssVar: '--color-state-disabled',
    appVar: '--app-color-state-disabled',
    fallback: 'rgba(0, 0, 0, 0.4)',
  },
] as const;

const THEME_COLOR_VARIABLES = THEME_COLOR_SPECS.flatMap(({ cssVar, appVar }) => [cssVar, appVar]);

export function useThemeColors(): ThemeColors {
  const values = useCSSVariable(THEME_COLOR_VARIABLES);
  const resolved: Partial<ThemeColors> = {};
  let index = 0;

  for (const token of THEME_COLOR_SPECS) {
    const cssValue = values[index++];
    const appValue = values[index++];
    (resolved as Record<string, string>)[token.key] = resolveThemeToken(
      cssValue,
      appValue,
      token.fallback
    );
  }

  resolved.placeholder = resolved.mutedForeground ?? '#737373';

  return resolved as ThemeColors;
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
    warning: c.warning,
    success: c.success,
    info: c.info,
    destructive: c.destructive,
  };
}

/** Alias for useThemeColors. Returns theme colors resolved to hex for RefreshControl, LinearGradient, charts. */
export const useThemeTokens = useThemeColors;

/** @deprecated Use useThemeTokens or useThemeColors. */
export const useResolvedThemeColors = useThemeColors;
