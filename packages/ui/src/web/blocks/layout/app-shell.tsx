import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../../lib/cn';

/**
 * DOM AppShell. Same slots as `blocks/layout/app-shell.tsx` on the native
 * track: `header`, `footer`, `bottomNav`, plus `loading` and `skeleton`.
 *
 * **`loading` swaps only the content.** Header, footer and nav stay mounted, so
 * a screen that is fetching shows its chrome immediately and its skeleton
 * underneath, instead of the whole shell popping in when data lands. That is
 * the fix TODO.md asks for under "Skeleton/Loading", applied at the one place
 * every screen passes through.
 *
 * The bottom nav sits in a `sticky` rail at the end of the column rather than
 * `position: fixed`. iOS only settles a fixed element once a scroll has
 * finished, so mid-flick a fixed dock drifts over the list and drops back.
 * Sticky is placed by the scroller and tracks the finger — and because it
 * occupies real space, nothing has to be padded out of its way.
 *
 * `safeArea` pads the nav rail for the home indicator. The top inset is the
 * Header's own job, so a custom header knows to handle it.
 */

export interface AppShellProps extends HTMLAttributes<HTMLDivElement> {
  header?: ReactNode;
  footer?: ReactNode;
  bottomNav?: ReactNode;
  safeArea?: boolean;
  loading?: boolean;
  skeleton?: ReactNode;
  /** Classes for the content column — gutters, max width, vertical padding. */
  contentClassName?: string;
}

export function AppShell({
  header,
  footer,
  bottomNav,
  safeArea = true,
  loading = false,
  skeleton,
  contentClassName,
  className,
  children,
  ...props
}: AppShellProps) {
  return (
    <div
      className={cn('flex min-h-dvh flex-col bg-background text-foreground', className)}
      {...props}
    >
      {header}
      <main className={cn('min-w-0 flex-1', contentClassName)}>
        {loading ? (skeleton ?? null) : children}
      </main>
      {footer}
      {bottomNav && (
        <div
          className="sticky bottom-0 z-30"
          style={safeArea ? { paddingBottom: 'env(safe-area-inset-bottom)' } : undefined}
        >
          {bottomNav}
        </div>
      )}
    </div>
  );
}

AppShell.displayName = 'AppShell';
