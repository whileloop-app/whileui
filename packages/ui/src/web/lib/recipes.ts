import type { CSSProperties } from 'react';

/**
 * DOM equivalents of `lib/recipes.ts`.
 *
 * The native track resolves visual tokens in JS (`useVisualTokens`) because
 * React Native cannot read a CSS variable from a class name. The DOM can, so
 * these recipes stay declarative: they emit `var()` references and the cascade
 * does the work. Changing a theme preset re-styles every control with no
 * re-render.
 *
 * Visual tokens are emitted unitless by `themePresetToCss` (`--ui-radius-md: 14`),
 * so every pixel token is wrapped in `calc(... * 1px)` here. That is the one
 * gotcha in the whole bridge.
 */

const px = (token: string) => `calc(var(${token}) * 1px)`;

export type ControlSize = 'default' | 'sm' | 'lg' | 'icon';

/** Mirror of `controlRecipe` in `lib/recipes.ts`. Keep the two in step. */
export function controlRecipe(size: ControlSize = 'default'): CSSProperties {
  if (size === 'sm') {
    return {
      minHeight: px('--ui-control-height-sm'),
      borderRadius: px('--ui-radius-md'),
      paddingInline: px('--ui-control-padding-x-sm'),
      paddingBlock: px('--ui-control-padding-y-sm'),
    };
  }

  if (size === 'lg') {
    return {
      minHeight: px('--ui-control-height-lg'),
      borderRadius: px('--ui-radius-xl'),
      paddingInline: px('--ui-control-padding-x-lg'),
      paddingBlock: px('--ui-control-padding-y-lg'),
    };
  }

  if (size === 'icon') {
    return {
      minHeight: px('--ui-control-height-default'),
      minWidth: px('--ui-control-height-default'),
      width: px('--ui-control-height-default'),
      borderRadius: px('--ui-radius-lg'),
      paddingInline: 0,
      paddingBlock: 0,
    };
  }

  return {
    minHeight: px('--ui-control-height-default'),
    borderRadius: px('--ui-radius-lg'),
    paddingInline: px('--ui-control-padding-x-default'),
    paddingBlock: px('--ui-control-padding-y-default'),
  };
}

export type SurfacePadding = 'none' | 'sm' | 'default' | 'lg';

/** Mirror of `surfacePadding` in `lib/recipes.ts`. */
export function surfacePadding(padding: SurfacePadding = 'default'): CSSProperties {
  if (padding === 'none') return {};
  if (padding === 'sm') return { padding: px('--ui-surface-padding-sm') };
  if (padding === 'lg') return { padding: px('--ui-surface-padding-lg') };
  return { padding: px('--ui-surface-padding-default') };
}
