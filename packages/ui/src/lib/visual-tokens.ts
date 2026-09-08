import { useCSSVariable } from 'uniwind';
import {
  VISUAL_TOKEN_SPECS,
  VISUAL_TOKEN_VARIABLES,
  type VisualTokenSpec,
  type VisualTokens,
} from './visual-token-contract';
export type { VisualTokens } from './visual-token-contract';

function parseNumber(value: string | number | undefined, fallback: number): number {
  if (value === undefined || value === null) return fallback;
  const parsed = Number.parseFloat(String(value));
  return Number.isFinite(parsed) ? parsed : fallback;
}

function parsePixel(value: string | number | undefined, fallback: number): number {
  return Math.max(0, Math.round(parseNumber(value, fallback)));
}

function parseRatio(
  value: string | number | undefined,
  fallback: number,
  min = 0,
  max = 1
): number {
  const parsed = parseNumber(value, fallback);
  return Math.min(max, Math.max(min, parsed));
}

function resolveVisualToken(
  spec: VisualTokenSpec,
  value: string | number | undefined
): number | boolean {
  if (spec.kind === 'boolean') {
    return parseNumber(value, spec.fallback) > 0;
  }

  if (spec.kind === 'pixel') {
    return parsePixel(value, spec.fallback);
  }

  if (spec.kind === 'scalar') {
    return Math.max(0, parseNumber(value, spec.fallback));
  }

  if (spec.kind === 'number') {
    return parseNumber(value, spec.fallback);
  }

  return parseRatio(value, spec.fallback, spec.min ?? 0, spec.max ?? 1);
}

export function useVisualTokens(): VisualTokens {
  const values = useCSSVariable(VISUAL_TOKEN_VARIABLES);
  const resolved: Partial<VisualTokens> = {};

  VISUAL_TOKEN_SPECS.forEach((spec, index) => {
    (resolved as Record<string, number | boolean>)[spec.key] = resolveVisualToken(
      spec,
      values[index]
    );
  });

  return resolved as VisualTokens;
}
