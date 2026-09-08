import { useEffect, useRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../../lib/cn';
import { hardwareBack } from '../../platform';

/**
 * DOM DrawerMenu. Same API as `blocks/navigation/drawer-menu.tsx` on the
 * native track: `sections` of `items`, `activeKey`, `onSelect`, optional
 * `header` and `footer` slots.
 *
 * Always mounted, like the native one. Visibility is a transform plus a delayed
 * `visibility` flip, so the panel can animate out — and so a hidden drawer is
 * genuinely gone from the tab order and the accessibility tree rather than
 * merely transparent. `frosted` is deliberately absent for now, same reasoning
 * as Card: `expo-blur` and `backdrop-filter` are different enough to deserve
 * their own pass.
 *
 * Width is `--ui-drawer-width-ratio` of the viewport, capped at
 * `--ui-drawer-max-width-web` — the ~360px web default AGENTS.md sets for
 * overlays. A drawer that fills a desktop window stops reading as a drawer.
 */

export interface DrawerMenuItem {
  key: string;
  label: string;
  icon?: ReactNode;
  badge?: number;
  destructive?: boolean;
}

export interface DrawerMenuSection {
  title?: string;
  items: DrawerMenuItem[];
}

// `onSelect` is omitted because HTMLAttributes already declares it as a DOM
// event handler; ours takes the selected key, matching the native API.
export interface DrawerMenuProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'onSelect'
> {
  visible: boolean;
  onClose: () => void;
  sections: DrawerMenuSection[];
  activeKey?: string;
  onSelect?: (key: string) => void;
  header?: ReactNode;
  footer?: ReactNode;
  /** Pixel cap. Defaults to the `--ui-drawer-max-width-web` token. */
  maxWidth?: number;
}

// No motion tokens are emitted as CSS variables yet, so this is a literal.
// When `interaction-tokens` grows a CSS-variable form, read it from there.
const DURATION_MS = 200;

export function DrawerMenu({
  visible,
  onClose,
  sections,
  activeKey,
  onSelect,
  header,
  footer,
  maxWidth,
  className,
  ...props
}: DrawerMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // A drawer owns the screen while it is open: lock the page behind it, close
  // on Escape, and move focus in so keyboard users are not left behind.
  useEffect(() => {
    if (!visible) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    panelRef.current?.focus();
    // The Android back key closes an open drawer rather than navigating — the
    // one behaviour every Android user expects and every WebView app forgets.
    // Registered on open, released on close, so it never intercepts anything
    // while the drawer is shut.
    const offBack = hardwareBack.onBack(() => {
      onClose();
      return true;
    });
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
      offBack();
    };
  }, [visible, onClose]);

  return (
    <div
      className={cn('fixed inset-0 z-40', !visible && 'pointer-events-none')}
      aria-hidden={!visible}
      {...props}
    >
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
        style={{
          opacity: visible ? 1 : 0,
          transition: `opacity ${DURATION_MS}ms ease`,
        }}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        tabIndex={-1}
        className={cn(
          'absolute inset-y-0 left-0 flex flex-col overflow-y-auto border-r border-border bg-background outline-none',
          className
        )}
        style={{
          width: 'calc(var(--ui-drawer-width-ratio) * 100vw)',
          maxWidth: maxWidth ?? 'calc(var(--ui-drawer-max-width-web) * 1px)',
          transform: visible ? 'translateX(0)' : 'translateX(-100%)',
          visibility: visible ? 'visible' : 'hidden',
          // Visibility flips immediately on open and only after the slide on
          // close, so the exit animation is seen and the hidden panel is inert.
          transition: visible
            ? `transform ${DURATION_MS}ms ease-out, visibility 0s`
            : `transform ${DURATION_MS}ms ease-in, visibility 0s ${DURATION_MS}ms`,
        }}
      >
        {header}

        <nav
          className="flex-1 px-3 pb-6"
          style={{
            paddingTop: header ? 0 : 'calc(var(--ui-drawer-content-top-padding) * 1px)',
          }}
        >
          {sections.map((section, index) => (
            <div key={section.title ?? index} className="mb-4">
              {section.title && (
                <p className="px-3 pb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  {section.title}
                </p>
              )}
              <ul className="flex flex-col gap-0.5">
                {section.items.map((item) => {
                  const active = item.key === activeKey;
                  return (
                    <li key={item.key}>
                      <button
                        type="button"
                        onClick={() => onSelect?.(item.key)}
                        aria-current={active ? 'page' : undefined}
                        // Colour-only differentiation, never font-weight —
                        // toggling weight changes text width and the list
                        // jumps. See AGENTS.md.
                        className={cn(
                          'flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left font-medium transition-colors',
                          active
                            ? 'bg-primary/10 text-primary'
                            : item.destructive
                              ? 'text-destructive hover:bg-destructive/10'
                              : 'text-foreground hover:bg-muted'
                        )}
                        style={{ fontSize: 'calc(var(--ui-drawer-item-font-size) * 1px)' }}
                      >
                        {item.icon && (
                          <span className="inline-flex size-5 shrink-0 items-center justify-center [&>svg]:size-5">
                            {item.icon}
                          </span>
                        )}
                        <span className="min-w-0 flex-1 truncate">{item.label}</span>
                        {item.badge != null && item.badge > 0 && (
                          <span
                            className="inline-flex h-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-semibold text-primary-foreground"
                            style={{ minWidth: 'calc(var(--ui-drawer-badge-min-width) * 1px)' }}
                          >
                            {item.badge > 99 ? '99+' : item.badge}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {footer}
      </div>
    </div>
  );
}

DrawerMenu.displayName = 'DrawerMenu';
