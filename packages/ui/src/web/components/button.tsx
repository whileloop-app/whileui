import React, {
  createContext,
  useContext,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
} from 'react';
import { cn } from '../../lib/cn';
import { tv, type VariantProps } from '../../lib/tv';
import { controlRecipe } from '../lib/recipes';

/**
 * DOM Button. Same API as the native track: `variant`, `size`, and a
 * `ButtonContext` so `ButtonText` inherits both without being told twice.
 *
 * The port is deliberately boring — `buttonVariants` and `buttonTextVariants`
 * are copied verbatim from `components/button/button.tsx`, because they are
 * class strings and class strings do not care what renders them. What changes
 * is only the element (`Pressable` becomes `button`) and how sizing arrives:
 * the native track computes a style object from resolved tokens, this one
 * points at CSS variables and lets the cascade resolve them.
 */

// ─── Context ─────────────────────────────────────────────────

interface ButtonContextValue {
  variant: VariantProps<typeof buttonVariants>['variant'];
  size: VariantProps<typeof buttonVariants>['size'];
}

const ButtonContext = createContext<ButtonContextValue>({
  variant: 'default',
  size: 'default',
});

// ─── Variants ────────────────────────────────────────────────

const buttonVariants = tv({
  base: 'inline-flex flex-row items-center justify-center gap-2 select-none transition-colors disabled:pointer-events-none disabled:opacity-50',
  variants: {
    variant: {
      default: 'bg-primary hover:bg-primary/90',
      destructive: 'bg-destructive hover:bg-destructive/90',
      outline: 'border border-input bg-background hover:bg-accent',
      secondary: 'bg-secondary hover:bg-secondary/80',
      ghost: 'bg-transparent hover:bg-accent',
      link: '',
    },
    size: {
      default: '',
      sm: '',
      lg: '',
      icon: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

const buttonTextVariants = tv({
  base: 'font-medium text-center',
  variants: {
    variant: {
      default: 'text-primary-foreground',
      destructive: 'text-destructive-foreground',
      outline: 'text-foreground',
      secondary: 'text-secondary-foreground',
      ghost: 'text-foreground',
      link: 'text-primary underline',
    },
    size: {
      default: 'text-sm',
      sm: 'text-xs',
      lg: 'text-base',
      icon: 'text-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

// ─── Types ───────────────────────────────────────────────────

export interface ButtonProps
  extends
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  className?: string;
}

export interface ButtonTextProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: VariantProps<typeof buttonTextVariants>['variant'];
  size?: VariantProps<typeof buttonTextVariants>['size'];
  className?: string;
}

export interface ButtonIconProps extends HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

// ─── Components ──────────────────────────────────────────────

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', style, children, ...props }, ref) => {
    // `link` opts out of control geometry entirely — it is text, not a control.
    const tokenStyle = variant === 'link' ? undefined : controlRecipe(size ?? 'default');

    return (
      <ButtonContext.Provider value={{ variant, size }}>
        <button
          ref={ref}
          type={props.type ?? 'button'}
          className={cn(buttonVariants({ variant, size }), className)}
          style={{ ...tokenStyle, ...style }}
          {...props}
        >
          {children}
        </button>
      </ButtonContext.Provider>
    );
  }
);

Button.displayName = 'Button';

// ─── Sub-components ──────────────────────────────────────────

function ButtonText({
  className,
  variant: variantProp,
  size: sizeProp,
  ...props
}: ButtonTextProps) {
  const context = useContext(ButtonContext);
  const variant = variantProp ?? context.variant;
  const size = sizeProp ?? context.size;

  return <span className={cn(buttonTextVariants({ variant, size }), className)} {...props} />;
}

ButtonText.displayName = 'ButtonText';

function ButtonIcon({ className, ...props }: ButtonIconProps) {
  return <span className={cn('inline-flex items-center justify-center', className)} {...props} />;
}

ButtonIcon.displayName = 'ButtonIcon';

export { Button, ButtonText, ButtonIcon, ButtonContext, buttonVariants, buttonTextVariants };
