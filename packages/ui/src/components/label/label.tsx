import React from 'react';
import { Text, type TextProps } from 'react-native';
import { cn } from '../../lib/cn';
import { useResolveFontFamily } from '../../lib/font-context';

export interface LabelProps extends TextProps {}

const Label = React.forwardRef<Text, LabelProps>(({ className, style, ...props }, ref) => {
  const resolved = cn('text-sm font-medium text-foreground leading-none', className);
  const fontFamily = useResolveFontFamily(resolved);
  return (
    <Text
      ref={ref}
      className={resolved}
      style={fontFamily ? [{ fontFamily }, style] : style}
      {...props}
    />
  );
});

Label.displayName = 'Label';

export { Label };
