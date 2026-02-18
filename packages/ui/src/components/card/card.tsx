import React from 'react';
import { View, Text, type ViewProps, type TextProps } from 'react-native';
import { cn } from '../../lib/cn';

// ─── Card ────────────────────────────────────────────────────

export interface CardProps extends ViewProps {}

const Card = React.forwardRef<View, CardProps>(({ className, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn('rounded-xl border border-border bg-card', className)}
      {...props}
    />
  );
});

Card.displayName = 'Card';

// ─── CardHeader ──────────────────────────────────────────────

export interface CardHeaderProps extends ViewProps {}

const CardHeader = React.forwardRef<View, CardHeaderProps>(({ className, ...props }, ref) => {
  return <View ref={ref} className={cn('p-6 pb-2', className)} {...props} />;
});

CardHeader.displayName = 'CardHeader';

// ─── CardTitle ───────────────────────────────────────────────

export interface CardTitleProps extends TextProps {}

const CardTitle = React.forwardRef<Text, CardTitleProps>(({ className, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      className={cn('text-xl font-semibold text-card-foreground tracking-tight', className)}
      {...props}
    />
  );
});

CardTitle.displayName = 'CardTitle';

// ─── CardDescription ────────────────────────────────────────

export interface CardDescriptionProps extends TextProps {}

const CardDescription = React.forwardRef<Text, CardDescriptionProps>(
  ({ className, ...props }, ref) => {
    return <Text ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />;
  }
);

CardDescription.displayName = 'CardDescription';

// ─── CardContent ─────────────────────────────────────────────

export interface CardContentProps extends ViewProps {}

const CardContent = React.forwardRef<View, CardContentProps>(({ className, ...props }, ref) => {
  return <View ref={ref} className={cn('p-6 pt-0', className)} {...props} />;
});

CardContent.displayName = 'CardContent';

// ─── CardFooter ──────────────────────────────────────────────

export interface CardFooterProps extends ViewProps {}

const CardFooter = React.forwardRef<View, CardFooterProps>(({ className, ...props }, ref) => {
  return <View ref={ref} className={cn('flex-row items-center p-6 pt-0', className)} {...props} />;
});

CardFooter.displayName = 'CardFooter';

// ─── Exports ─────────────────────────────────────────────────

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
