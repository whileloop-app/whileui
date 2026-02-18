import { useCallback, useEffect, useMemo, useState } from 'react';
import { Uniwind, useUniwind } from 'uniwind';

export type ThemeMode = 'light' | 'dark' | 'system';

type MaybePromise<T> = T | Promise<T>;

export interface ThemeBridgeAdapter {
  loadThemeMode: () => MaybePromise<ThemeMode | null | undefined>;
  saveThemeMode: (mode: ThemeMode) => MaybePromise<void>;
}

export interface ThemeBridgeProps {
  mode?: ThemeMode;
  initialMode?: ThemeMode;
  adapter?: ThemeBridgeAdapter;
  onModeChange?: (mode: ThemeMode) => void;
}

export interface UseThemeBridgeOptions {
  initialMode?: ThemeMode;
  adapter?: ThemeBridgeAdapter;
}

export interface UseThemeBridgeResult {
  mode: ThemeMode;
  resolvedTheme: string;
  setMode: (mode: ThemeMode) => void;
  cycleMode: () => void;
}

const modeCycle: ThemeMode[] = ['light', 'dark', 'system'];

export function applyThemeMode(mode: ThemeMode) {
  (Uniwind.setTheme as (theme: ThemeMode) => void)(mode);
}

export async function resolveThemeMode(
  adapter?: ThemeBridgeAdapter,
  fallback: ThemeMode = 'system'
): Promise<ThemeMode> {
  if (!adapter) {
    return fallback;
  }

  const persisted = await adapter.loadThemeMode();
  if (persisted === 'light' || persisted === 'dark' || persisted === 'system') {
    return persisted;
  }

  return fallback;
}

export async function syncThemeMode(mode: ThemeMode, adapter?: ThemeBridgeAdapter) {
  applyThemeMode(mode);
  if (adapter) {
    await adapter.saveThemeMode(mode);
  }
  return mode;
}

export function useThemeBridge({
  initialMode = 'system',
  adapter,
}: UseThemeBridgeOptions = {}): UseThemeBridgeResult {
  const { theme } = useUniwind();
  const [mode, setMode] = useState<ThemeMode>(initialMode);
  const [hydrated, setHydrated] = useState(!adapter);

  useEffect(() => {
    let mounted = true;

    if (!adapter) {
      return;
    }

    (async () => {
      const next = await resolveThemeMode(adapter, initialMode);
      if (!mounted) {
        return;
      }
      setMode(next);
      setHydrated(true);
    })();

    return () => {
      mounted = false;
    };
  }, [adapter, initialMode]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    applyThemeMode(mode);
    if (adapter) {
      void adapter.saveThemeMode(mode);
    }
  }, [adapter, hydrated, mode]);

  const cycleMode = useCallback(() => {
    setMode((currentMode) => {
      const currentIndex = modeCycle.indexOf(currentMode);
      const nextIndex = (currentIndex + 1) % modeCycle.length;
      return modeCycle[nextIndex];
    });
  }, []);

  return useMemo(
    () => ({
      mode,
      resolvedTheme: theme,
      setMode,
      cycleMode,
    }),
    [cycleMode, mode, theme]
  );
}

export function ThemeBridge({
  mode: controlledMode,
  initialMode = 'system',
  adapter,
  onModeChange,
}: ThemeBridgeProps) {
  const { mode, setMode } = useThemeBridge({ initialMode, adapter });
  const effectiveMode = controlledMode ?? mode;

  useEffect(() => {
    setMode(effectiveMode);
  }, [effectiveMode, setMode]);

  useEffect(() => {
    onModeChange?.(effectiveMode);
  }, [effectiveMode, onModeChange]);

  return null;
}
