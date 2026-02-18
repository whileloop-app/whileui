import * as React from 'react';
import { Platform, StyleSheet, type ViewStyle } from 'react-native';
import * as PopoverPrimitive from '@rn-primitives/popover';
import { cn } from '../../lib/cn';

// ─── Types ───────────────────────────────────────────────────

export interface PopoverProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export interface PopoverTriggerProps extends React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Trigger
> {
  className?: string;
}

export interface PopoverContentProps extends React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Content
> {
  className?: string;
  portalHost?: string;
}

export interface PopoverCloseProps extends React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Close
> {
  className?: string;
}

// ─── Components ──────────────────────────────────────────────

function Popover({ onOpenChange, children }: PopoverProps) {
  return <PopoverPrimitive.Root onOpenChange={onOpenChange}>{children}</PopoverPrimitive.Root>;
}

const PopoverTrigger = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Trigger>,
  PopoverTriggerProps
>(({ className, ...props }, ref) => (
  <PopoverPrimitive.Trigger ref={ref} className={cn(className)} {...props} />
));
PopoverTrigger.displayName = 'PopoverTrigger';

const PopoverContent = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ className, align = 'center', sideOffset = 4, portalHost, ...props }, ref) => {
  return (
    <PopoverPrimitive.Portal hostName={portalHost}>
      <PopoverPrimitive.Overlay style={Platform.OS !== 'web' ? StyleSheet.absoluteFill : undefined}>
        <PopoverPrimitive.Content
          ref={ref}
          align={align}
          sideOffset={sideOffset}
          className={cn(
            'z-50 w-72 rounded-lg border border-border bg-popover p-4 shadow-lg',
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
            className
          )}
          style={Platform.OS === 'web' ? {} : contentStyles}
          {...props}
        />
      </PopoverPrimitive.Overlay>
    </PopoverPrimitive.Portal>
  );
});
PopoverContent.displayName = 'PopoverContent';

const PopoverClose = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Close>,
  PopoverCloseProps
>(({ className, ...props }, ref) => (
  <PopoverPrimitive.Close ref={ref} className={cn(className)} {...props} />
));
PopoverClose.displayName = 'PopoverClose';

const contentStyles: ViewStyle = {
  position: 'absolute',
};

export { Popover, PopoverTrigger, PopoverContent, PopoverClose };
