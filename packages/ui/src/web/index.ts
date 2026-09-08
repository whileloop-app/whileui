/**
 * WhileUI — DOM track.
 *
 * Web, Capacitor mobile and Tauri desktop are all a WebView rendering this
 * build; there is no per-target branching here and there never should be.
 * Anything that differs by host is a device capability and belongs in
 * `platform/`. See ROADMAP.md.
 *
 * Lives beside the native track rather than replacing it so the published
 * package keeps working untouched while this fills in. The 2.0 split moves
 * this to the package root and the native track to `@thewhileloop/whileui-native`.
 */

export * from './components/button';
export * from './components/card';

export * from './blocks/layout/app-shell';
export * from './blocks/navigation/header';
export * from './blocks/navigation/drawer-menu';

export * from './platform';

export { controlRecipe, surfacePadding } from './lib/recipes';
export type { ControlSize, SurfacePadding } from './lib/recipes';

// The token layer is renderer-agnostic and re-exported unchanged — the same
// contract drives both tracks, which is the whole point of the split.
export {
  WHILEUI_PRESET_SOFT,
  WHILEUI_PRESET_ATELIER,
  WHILEUI_THEME_PRESETS,
  themePresetToCss,
  themePresetToCssVariables,
  type ThemePreset,
} from '../lib/theme-presets';
