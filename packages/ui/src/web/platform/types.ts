/**
 * The capability adapter's contract.
 *
 * Everything an app needs from the device that a browser cannot, or can only
 * partly, supply — behind one interface with a web implementation as the
 * default and a Capacitor implementation the app installs at boot. Components
 * import from `platform/` and never know which host they are on.
 *
 * The reason this exists is not tidiness. Each capability here is something an
 * app is broken without and easy to forget — the Android hardware back key
 * closes the app if nobody handles it. Putting the whole mandatory set behind
 * one `installPlatform()` call means a new app cannot forget any of it. See
 * ROADMAP.md, "Group D".
 *
 * Every method resolves on every host. A capability that does not exist on the
 * current host is a no-op that reports `false`, never a throw — a button that
 * buzzes on a phone must not crash a laptop.
 */

export type Host = 'web' | 'capacitor' | 'tauri';

// ─── Haptics ─────────────────────────────────────────────────

export type ImpactStyle = 'light' | 'medium' | 'heavy';
export type NotificationType = 'success' | 'warning' | 'error';

export interface Haptics {
  /** Resolves `true` if the host actually produced feedback. */
  impact(style?: ImpactStyle): Promise<boolean>;
  selection(): Promise<boolean>;
  notification(type: NotificationType): Promise<boolean>;
}

// ─── Storage ─────────────────────────────────────────────────

export interface SecureStore {
  /** Honest flag. `localStorage` and Capacitor Preferences are both `false`;
   *  only a Keychain/Keystore-backed plugin is `true`. Auth tokens should check
   *  this rather than assume. */
  readonly secure: boolean;
  /** Human-readable backend name, for diagnostics and the showcase. */
  readonly backend: string;
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
  remove(key: string): Promise<void>;
}

// ─── Hardware back ───────────────────────────────────────────

/** Return `true` to consume the press; anything else lets it fall through to
 *  the next handler and finally to the host's default. */
export type BackHandler = () => boolean | void;

export interface HardwareBackHost {
  /** What happens when no handler consumed the press. History-based: go back
   *  if we can, otherwise leave the app (Android) or nothing (web). */
  fallback(canGoBack: boolean): void;
  /** Wire the host's back event to the shared dispatcher. Absent on hosts with
   *  no such event. Returns a disconnect. */
  connect?(dispatch: (canGoBack: boolean) => void): () => void;
}

// ─── Keyboard ────────────────────────────────────────────────

export interface KeyboardState {
  visible: boolean;
  /** Pixels; 0 when hidden or unknown. */
  height: number;
}

export interface Keyboard {
  hide(): Promise<void>;
  onChange(callback: (state: KeyboardState) => void): () => void;
}

// ─── Status bar ──────────────────────────────────────────────

/** Describes the *app's* theme, not the bar's text. `'dark'` means the UI is
 *  dark, so the bar should draw light text over it. */
export type StatusBarStyle = 'light' | 'dark';

export interface StatusBar {
  setStyle(style: StatusBarStyle): Promise<void>;
  setBackgroundColor(color: string): Promise<void>;
}

// ─── Share ───────────────────────────────────────────────────

export interface ShareInput {
  title?: string;
  text?: string;
  url?: string;
}

export interface Share {
  readonly available: boolean;
  /** Resolves `true` if the sheet was shown and not dismissed. */
  share(input: ShareInput): Promise<boolean>;
}

// ─── Deep links ──────────────────────────────────────────────

export interface DeepLinks {
  /** Fires when the app is opened, or brought forward, by a URL. Never fires
   *  on the web, where the URL is already in `location`. */
  onOpen(callback: (url: string) => void): () => void;
}

// ─── The whole thing ─────────────────────────────────────────

export interface Platform {
  readonly name: Host;
  readonly haptics: Haptics;
  readonly secureStore: SecureStore;
  readonly hardwareBack: HardwareBackHost;
  readonly keyboard: Keyboard;
  readonly statusBar: StatusBar;
  readonly share: Share;
  readonly deepLinks: DeepLinks;
}
