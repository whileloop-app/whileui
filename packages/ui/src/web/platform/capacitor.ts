import type { Platform } from './types';
import { createWebPlatform } from './web';

/**
 * The Capacitor implementation — with **no Capacitor dependency**.
 *
 * The app passes in the plugin modules it installed, and this adapts them.
 * That is what lets `@thewhileloop/whileui` stay installable for a plain web
 * app: it never imports `@capacitor/*`, so a browser build carries none of it
 * and a Capacitor build wires it once in its entry point:
 *
 * ```ts
 * import { App } from '@capacitor/app';
 * import { Haptics } from '@capacitor/haptics';
 * import { Keyboard } from '@capacitor/keyboard';
 * import { Preferences } from '@capacitor/preferences';
 * import { Share } from '@capacitor/share';
 * import { StatusBar } from '@capacitor/status-bar';
 * import { installPlatform, createCapacitorPlatform } from '@thewhileloop/whileui/web';
 *
 * installPlatform(createCapacitorPlatform({ App, Haptics, Keyboard, Preferences, Share, StatusBar }));
 * ```
 *
 * Every dependency is optional. A missing one falls back to the web behaviour
 * for that capability, so an app can adopt plugins one at a time — but the
 * mandatory set is `App` (hardware back, deep links), `Keyboard`, `StatusBar`
 * and a storage backend. Ship without those and the app is broken in ways a
 * simulator will not show you.
 *
 * The dependency types below are *structural*: the minimum shape of each plugin
 * this file calls. They are deliberately not imported from `@capacitor/*` so
 * the library has no type dependency either. Method-shorthand keeps them
 * bivariant, so the real modules assign cleanly; a mismatch shows up in the
 * app's own typecheck, which is where you want it.
 */

// A listener handle is a Promise in Capacitor 5+, and was sync before that.
type Handle = { remove(): Promise<void> | void };
type MaybePromise<T> = T | Promise<T>;

export interface CapacitorDeps {
  /** `@capacitor/app` — hardware back, deep links, exit/minimise. */
  App?: {
    // Two events share one method in Capacitor's API; `any` here is the
    // boundary between their loosely-typed overloads and our typed handlers.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addListener(
      eventName: 'backButton' | 'appUrlOpen',
      listener: (event: any) => void
    ): MaybePromise<Handle>;
    exitApp(): Promise<void>;
    minimizeApp?(): Promise<void>;
  };
  /** `@capacitor/haptics`. */
  Haptics?: {
    impact(options: { style: 'LIGHT' | 'MEDIUM' | 'HEAVY' }): Promise<void>;
    selectionChanged?(): Promise<void>;
    notification?(options: { type: 'SUCCESS' | 'WARNING' | 'ERROR' }): Promise<void>;
  };
  /** `@capacitor/preferences`. **Not encrypted** — UserDefaults / SharedPreferences.
   *  Fine for settings; for tokens prefer `secureStorage`. */
  Preferences?: {
    get(options: { key: string }): Promise<{ value: string | null }>;
    set(options: { key: string; value: string }): Promise<void>;
    remove(options: { key: string }): Promise<void>;
  };
  /** A Keychain/Keystore-backed store, if you have one. Wins over
   *  `Preferences`. Any object with these three methods. */
  secureStorage?: {
    name: string;
    get(key: string): Promise<string | null>;
    set(key: string, value: string): Promise<void>;
    remove(key: string): Promise<void>;
  };
  /** `@capacitor/keyboard`. */
  Keyboard?: {
    hide(): Promise<void>;
    addListener(
      eventName: 'keyboardWillShow' | 'keyboardWillHide',
      listener: (info?: { keyboardHeight?: number }) => void
    ): MaybePromise<Handle>;
  };
  /** `@capacitor/status-bar`. */
  StatusBar?: {
    setStyle(options: { style: 'LIGHT' | 'DARK' | 'DEFAULT' }): Promise<void>;
    setBackgroundColor?(options: { color: string }): Promise<void>;
  };
  /** `@capacitor/share`. */
  Share?: {
    share(options: { title?: string; text?: string; url?: string }): Promise<unknown>;
  };
}

export function createCapacitorPlatform(deps: CapacitorDeps): Platform {
  const web = createWebPlatform();
  const { App, Haptics, Preferences, secureStorage, Keyboard, StatusBar, Share } = deps;

  return {
    name: 'capacitor',

    haptics: Haptics
      ? {
          impact: async (style = 'light') => {
            await Haptics.impact({ style: style.toUpperCase() as 'LIGHT' | 'MEDIUM' | 'HEAVY' });
            return true;
          },
          selection: async () => {
            if (!Haptics.selectionChanged) return false;
            await Haptics.selectionChanged();
            return true;
          },
          notification: async (type) => {
            if (!Haptics.notification) return false;
            await Haptics.notification({
              type: type.toUpperCase() as 'SUCCESS' | 'WARNING' | 'ERROR',
            });
            return true;
          },
        }
      : web.haptics,

    secureStore: secureStorage
      ? {
          secure: true,
          backend: secureStorage.name,
          get: (key) => secureStorage.get(key),
          set: (key, value) => secureStorage.set(key, value),
          remove: (key) => secureStorage.remove(key),
        }
      : Preferences
        ? {
            secure: false,
            backend: 'Capacitor Preferences (unencrypted)',
            get: async (key) => (await Preferences.get({ key })).value,
            set: (key, value) => Preferences.set({ key, value }),
            remove: (key) => Preferences.remove({ key }),
          }
        : web.secureStore,

    hardwareBack: {
      // The Android convention at the root is to leave. Minimise keeps the
      // app's state for when they come back; exit is the fallback where the
      // plugin is too old to offer it.
      fallback: (canGoBack) => {
        if (canGoBack) {
          window.history.back();
          return;
        }
        if (App?.minimizeApp) void App.minimizeApp();
        else void App?.exitApp();
      },
      connect: App
        ? (dispatch) =>
            subscribe(
              App.addListener('backButton', (event: { canGoBack: boolean }) =>
                dispatch(event.canGoBack)
              )
            )
        : undefined,
    },

    keyboard: Keyboard
      ? {
          hide: () => Keyboard.hide(),
          onChange: (callback) => {
            const offShow = subscribe(
              Keyboard.addListener('keyboardWillShow', (info) =>
                callback({ visible: true, height: info?.keyboardHeight ?? 0 })
              )
            );
            const offHide = subscribe(
              Keyboard.addListener('keyboardWillHide', () =>
                callback({ visible: false, height: 0 })
              )
            );
            return () => {
              offShow();
              offHide();
            };
          },
        }
      : web.keyboard,

    statusBar: StatusBar
      ? {
          // Capacitor's `Style` names the *background* the bar sits on, which
          // is the same thing our `StatusBarStyle` names — so this is a
          // straight uppercase, not an inversion.
          setStyle: (style) => StatusBar.setStyle({ style: style === 'dark' ? 'DARK' : 'LIGHT' }),
          setBackgroundColor: async (color) => {
            // Android only; iOS draws the bar over the WebView instead.
            if (StatusBar.setBackgroundColor) await StatusBar.setBackgroundColor({ color });
            await web.statusBar.setBackgroundColor(color);
          },
        }
      : web.statusBar,

    share: Share
      ? {
          available: true,
          share: async (input) => {
            try {
              await Share.share(input);
              return true;
            } catch {
              // Capacitor rejects when the sheet is dismissed.
              return false;
            }
          },
        }
      : web.share,

    deepLinks: App
      ? {
          onOpen: (callback) =>
            subscribe(
              App.addListener('appUrlOpen', (event: { url: string }) => callback(event.url))
            ),
        }
      : web.deepLinks,
  };
}

/** Normalise Capacitor's sync-or-async listener handle to a plain unsubscribe. */
function subscribe(handle: MaybePromise<Handle>): () => void {
  return () => {
    void Promise.resolve(handle).then((h) => h.remove());
  };
}
