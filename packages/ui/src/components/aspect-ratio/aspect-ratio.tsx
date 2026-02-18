import React from 'react';
import { View, type ViewProps } from 'react-native';
import { cn } from '../../lib/cn';

// ─── Types ───────────────────────────────────────────────────

export interface AspectRatioProps extends ViewProps {
  ratio?: number;
  className?: string;
}

// ─── Component ───────────────────────────────────────────────

function AspectRatio({ ratio = 1, className, children, style, ...props }: AspectRatioProps) {
  return (
    <View className={cn('relative', className)} style={[{ aspectRatio: ratio }, style]} {...props}>
      {children}
    </View>
  );
}

AspectRatio.displayName = 'AspectRatio';

// ─── Exports ─────────────────────────────────────────────────

export { AspectRatio };
