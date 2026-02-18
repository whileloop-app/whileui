import * as React from 'react';
import { Platform, StyleSheet, type ViewStyle } from 'react-native';
import * as HoverCardPrimitive from '@rn-primitives/hover-card';
import { cn } from '../../lib/cn';

// ─── Types ───────────────────────────────────────────────────

export interface HoverCardProps {
  onOpenChange?: (open: boolean) => void;
  openDelay?: number;
  closeDelay?: number;
  children: React.ReactNode;
}

export interface HoverCardTriggerProps extends React.ComponentPropsWithoutRef<
  typeof HoverCardPrimitive.Trigger
> {
  className?: string;
}

export interface HoverCardContentProps extends React.ComponentPropsWithoutRef<
  typeof HoverCardPrimitive.Content
> {
  className?: string;
  portalHost?: string;
}

// ─── Components ──────────────────────────────────────────────

function HoverCard({ onOpenChange, openDelay, closeDelay, children }: HoverCardProps) {
  return (
    <HoverCardPrimitive.Root
      onOpenChange={onOpenChange}
      openDelay={openDelay}
      closeDelay={closeDelay}
    >
      {children}
    </HoverCardPrimitive.Root>
  );
}

const HoverCardTrigger = React.forwardRef<
  React.ComponentRef<typeof HoverCardPrimitive.Trigger>,
  HoverCardTriggerProps
>(({ className, ...props }, ref) => (
  <HoverCardPrimitive.Trigger ref={ref} className={cn(className)} {...props} />
));
HoverCardTrigger.displayName = 'HoverCardTrigger';

const HoverCardContent = React.forwardRef<
  React.ComponentRef<typeof HoverCardPrimitive.Content>,
  HoverCardContentProps
>(({ className, align = 'center', sideOffset = 4, portalHost, ...props }, ref) => (
  <HoverCardPrimitive.Portal hostName={portalHost}>
    <HoverCardPrimitive.Overlay style={Platform.OS !== 'web' ? StyleSheet.absoluteFill : undefined}>
      <HoverCardPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'z-50 w-64 rounded-lg border border-border bg-popover p-4 shadow-lg',
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className
        )}
        style={Platform.OS === 'web' ? {} : contentStyles}
        {...props}
      />
    </HoverCardPrimitive.Overlay>
  </HoverCardPrimitive.Portal>
));
HoverCardContent.displayName = 'HoverCardContent';

const contentStyles: ViewStyle = {
  position: 'absolute',
};

export { HoverCard, HoverCardTrigger, HoverCardContent };
