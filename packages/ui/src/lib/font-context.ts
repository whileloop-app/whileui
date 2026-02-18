import { createContext, useContext } from 'react';

/**
 * Map of Tailwind font-weight class names to the actual font family name
 * registered via expo-font / useFonts.
 *
 * Consumers provide this via <FontProvider> at the app root.
 */
export interface FontFamilyMap {
  'font-thin'?: string;
  'font-extralight'?: string;
  'font-light'?: string;
  'font-normal': string; // required – fallback / default
  'font-medium'?: string;
  'font-semibold'?: string;
  'font-bold'?: string;
  'font-extrabold'?: string;
  'font-black'?: string;
}

const FontContext = createContext<FontFamilyMap | null>(null);

export const FontProvider = FontContext.Provider;

/**
 * Resolve className list to the correct fontFamily string.
 * Scans right-to-left so the *last* font-weight class wins (Tailwind order).
 */
export function useResolveFontFamily(className?: string): string | undefined {
  const map = useContext(FontContext);
  if (!map) return undefined; // no provider → let system font render
  if (!className) return map['font-normal'];

  const classes = className.split(/\s+/);
  for (let i = classes.length - 1; i >= 0; i--) {
    const mapped = map[classes[i] as keyof FontFamilyMap];
    if (mapped) return mapped;
  }
  return map['font-normal'];
}
