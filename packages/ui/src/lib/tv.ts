/**
 * Re-export tailwind-variants for convenient imports.
 * Components use tv() to define variant-based styles.
 *
 * @example
 * import { tv, type VariantProps } from '@/lib/tv';
 *
 * const buttonVariants = tv({
 *   base: 'rounded-md font-medium',
 *   variants: {
 *     size: { sm: 'px-3 py-1', md: 'px-4 py-2', lg: 'px-6 py-3' },
 *   },
 * });
 */
export { tv, type VariantProps } from 'tailwind-variants';
