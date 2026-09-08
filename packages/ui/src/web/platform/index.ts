import type {
  BackHandler,
  DeepLinks,
  Haptics,
  Keyboard,
  Platform,
  SecureStore,
  Share,
  StatusBar,
} from './types';
import { createWebPlatform } from './web';

export * from './types';
export { detectHost } from './detect';
export { createWebPlatform } from './web';
export { createCapacitorPlatform, type CapacitorDeps } from './capacitor';

/**
 * The installed platform, and the stable handles components import.
 *
 * The exports below are *proxies* that delegate to whatever is currently
 * installed — so `import { haptics }` at the top of a component works whether
 * or not `installPlatform()` has run yet, and so a component never holds a
 * reference to a stale implementation. The web platform is installed by
 * default; a Capacitor app replaces it once, at boot, before rendering.
 */

let current: Platform = createWebPlatform();
let disconnectBack: (() => void) | undefined;

export function installPlatform(platform: Platform): void {
  disconnectBack?.();
  current = platform;
  disconnectBack = platform.hardwareBack.connect?.(dispatchBack);
}

/** The installed platform. Mostly for diagnostics — prefer the named handles. */
export function currentPlatform(): Platform {
  return current;
}

// ─── Hardware back ───────────────────────────────────────────

/**
 * Handlers run most-recent-first, and the first to return `true` consumes the
 * press. That ordering is the whole point: an open sheet registers on open and
 * unregisters on close, so back closes the sheet, then the next press goes
 * to the drawer beneath it, and only then to navigation. Nothing has to know
 * about anything else.
 */
const backHandlers: BackHandler[] = [];

function dispatchBack(canGoBack: boolean): void {
  for (let i = backHandlers.length - 1; i >= 0; i--) {
    if (backHandlers[i]() === true) return;
  }
  current.hardwareBack.fallback(canGoBack);
}

export const hardwareBack = {
  /** Register an interceptor. Returns its unsubscribe; call it on unmount. */
  onBack(handler: BackHandler): () => void {
    backHandlers.push(handler);
    return () => {
      const index = backHandlers.lastIndexOf(handler);
      if (index >= 0) backHandlers.splice(index, 1);
    };
  },
  /** Run the back sequence as if the key had been pressed. On a host with a
   *  real back event this is what that event calls; on the web it is how a
   *  header back button and the showcase drive the same path. */
  trigger(): void {
    dispatchBack(window.history.length > 1);
  },
  /** How many interceptors are currently registered. Diagnostics. */
  get depth(): number {
    return backHandlers.length;
  },
};

// ─── Proxies ─────────────────────────────────────────────────

export const haptics: Haptics = {
  impact: (style) => current.haptics.impact(style),
  selection: () => current.haptics.selection(),
  notification: (type) => current.haptics.notification(type),
};

export const secureStore: SecureStore = {
  get secure() {
    return current.secureStore.secure;
  },
  get backend() {
    return current.secureStore.backend;
  },
  get: (key) => current.secureStore.get(key),
  set: (key, value) => current.secureStore.set(key, value),
  remove: (key) => current.secureStore.remove(key),
};

export const keyboard: Keyboard = {
  hide: () => current.keyboard.hide(),
  onChange: (callback) => current.keyboard.onChange(callback),
};

export const statusBar: StatusBar = {
  setStyle: (style) => current.statusBar.setStyle(style),
  setBackgroundColor: (color) => current.statusBar.setBackgroundColor(color),
};

export const share: Share = {
  get available() {
    return current.share.available;
  },
  share: (input) => current.share.share(input),
};

export const deepLinks: DeepLinks = {
  onOpen: (callback) => current.deepLinks.onOpen(callback),
};
