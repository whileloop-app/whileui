import type { Host } from './types';

/**
 * Which shell is this WebView inside? Informational only — the *installed*
 * platform is whatever the app passed to `installPlatform()`. The two are
 * compared in the showcase so a Capacitor build that forgot to install its
 * adapter says so instead of silently running on web fallbacks.
 */
export function detectHost(): Host {
  if (typeof window === 'undefined') return 'web';
  const w = window as unknown as {
    Capacitor?: { isNativePlatform?: () => boolean };
    __TAURI__?: unknown;
    __TAURI_INTERNALS__?: unknown;
  };
  if (w.Capacitor?.isNativePlatform?.()) return 'capacitor';
  if (w.__TAURI__ !== undefined || w.__TAURI_INTERNALS__ !== undefined) return 'tauri';
  return 'web';
}
