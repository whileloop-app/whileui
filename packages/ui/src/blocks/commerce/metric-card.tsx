import React from 'react';
import { View, type ViewProps } from 'react-native';
import { Text } from '../../components/text';
import { Card } from '../../components/card';
import { cn } from '../../lib/cn';
import { tv, type VariantProps } from '../../lib/tv';

const metricCardVariants = tv({
  base: 'p-4',
  variants: {
    variant: {
      default: 'bg-card',
      outlined: 'bg-transparent border border-border',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface MetricCardProps extends ViewProps, VariantProps<typeof metricCardVariants> {
  className?: string;
  label: string;
  value: string | number;
  subtitle?: string;
  progress?: number;
  segments?: { value: number; color: string }[];
  icon?: React.ReactNode;
}

function MetricCard({
  className,
  label,
  value,
  subtitle,
  progress,
  segments,
  icon,
  variant,
  ...props
}: MetricCardProps) {
  return (
    <Card className={cn(metricCardVariants({ variant }), className)} {...props}>
      <View className="flex-row items-start justify-between mb-2">
        <Text variant="caption" className="text-muted-foreground">
          {label}
        </Text>
        {icon && <View>{icon}</View>}
      </View>

      <Text variant="heading" className="mb-1">
        {value}
      </Text>

      {subtitle && (
        <Text variant="caption" className="text-muted-foreground">
          {subtitle}
        </Text>
      )}

      {progress !== undefined && (
        <View className="mt-3">
          <View className="h-2 bg-muted rounded-full overflow-hidden">
            <View
              className="h-full bg-primary rounded-full"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </View>
        </View>
      )}

      {segments && segments.length > 0 && (
        <View className="mt-3 flex-row h-3 rounded-full overflow-hidden">
          {segments.map((seg, i) => (
            <View
              key={i}
              className="h-full"
              style={{ width: `${seg.value}%`, backgroundColor: seg.color }}
            />
          ))}
        </View>
      )}
    </Card>
  );
}

export { MetricCard, metricCardVariants };
