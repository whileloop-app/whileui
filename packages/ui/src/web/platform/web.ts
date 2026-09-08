import type { Platform } from './types';

/**
 * The browser implementation, and the default. Each capability does the most
 * honest thing the web can do: real where an API exists (`navigator.share`,
 * `navigator.vibrate`, the `theme-color` meta), a clearly-reported no-op where
 * one does not (Keychain, hardware back at the root, deep-link events).
 */
export function createWebPlatform(): Platform {
  return {
    name: 'web',

    haptics: {
      // Android Chrome only; iOS Safari has no vibration API at all.
      impact: async (style = 'light') =>
        vibrate(style === 'heavy' ? 30 : style === 'medium' ? 20 : 10),
      selection: async () => vibrate(5),
      notification: async (type) => vibrate(type === 'error' ? [30, 40, 30] : [15, 30, 15]),
    },

    secureStore: {
      secure: false,
      backend: 'localStorage',
      get: async (key) => localStorage.getItem(key),
      set: async (key, value) => localStorage.setItem(key, value),
      remove: async (key) => localStorage.removeItem(key),
    },

    hardwareBack: {
      // A browser has no "leave the app", so at the root this is nothing —
      // which is also what the browser itself would do.
      fallback: (canGoBack) => {
        if (canGoBack) window.history.back();
      },
    },

    keyboard: {
      // Blurring the focused element is what dismisses the soft keyboard on
      // every mobile browser; it is the web's only handle on it.
      hide: async () => (document.activeElement as HTMLElement | null)?.blur?.(),
      // No keyboard event on the web, but the visual viewport shrinks when one
      // appears. A 150px drop is the usual heuristic; nothing else in the page
      // changes the viewport by that much.
      onChange: (callback) => {
        const viewport = window.visualViewport;
        if (!viewport) return () => undefined;
        const onResize = () => {
          const height = Math.max(0, window.innerHeight - viewport.height);
          callback({ visible: height > 150, height: height > 150 ? height : 0 });
        };
        viewport.addEventListener('resize', onResize);
        return () => viewport.removeEventListener('resize', onResize);
      },
    },

    statusBar: {
      // Nothing to set: a browser's own chrome is not ours. The colour is real,
      // though — mobile browsers tint their toolbar from this meta tag.
      setStyle: async () => undefined,
      setBackgroundColor: async (color) => {
        let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
        if (!meta) {
          meta = document.createElement('meta');
          meta.name = 'theme-color';
          document.head.append(meta);
        }
        meta.content = color;
      },
    },

    share: {
      get available() {
        return typeof navigator !== 'undefined' && typeof navigator.share === 'function';
      },
      share: async (input) => {
        if (typeof navigator.share !== 'function') return false;
        try {
          await navigator.share(input);
          return true;
        } catch (error) {
          // The user closing the sheet is an AbortError, not a failure.
          if (error instanceof Error && error.name === 'AbortError') return false;
          throw error;
        }
      },
    },

    deepLinks: {
      onOpen: () => () => undefined,
    },
  };
}

function vibrate(pattern: number | number[]): boolean {
  if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') return false;
  return navigator.vibrate(pattern);
}
