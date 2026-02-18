import React from 'react';
import { View, type ViewProps } from 'react-native';
import { Text } from '../../components/text';
import { Button, ButtonText } from '../../components/button';
import { Badge, BadgeText } from '../../components/badge';
import { cn } from '../../lib/cn';

// ─── Types ───────────────────────────────────────────────────

export interface PricingFeature {
  label: string;
  included: boolean;
}

export interface PricingCardProps extends ViewProps {
  name: string;
  description?: string;
  price: string;
  period?: string;
  features: PricingFeature[];
  badge?: string;
  highlighted?: boolean;
  buttonLabel?: string;
  onPress?: () => void;
}

// ─── Component ───────────────────────────────────────────────

export function PricingCard({
  name,
  description,
  price,
  period = '/month',
  features,
  badge,
  highlighted = false,
  buttonLabel = 'Get Started',
  onPress,
  className,
  ...props
}: PricingCardProps) {
  return (
    <View
      className={cn(
        'overflow-hidden rounded-2xl p-6',
        highlighted ? 'border-2 border-primary bg-card' : 'border border-border bg-card',
        className
      )}
      {...props}
    >
      {/* Header */}
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-lg font-semibold text-foreground">{name}</Text>
        {badge && (
          <Badge variant={highlighted ? 'default' : 'secondary'}>
            <BadgeText>{badge}</BadgeText>
          </Badge>
        )}
      </View>

      {description && <Text className="mb-4 text-sm text-muted-foreground">{description}</Text>}

      {/* Price */}
      <View className="mb-6 flex-row items-baseline">
        <Text className="text-4xl font-bold text-foreground">{price}</Text>
        <Text className="ml-1 text-muted-foreground">{period}</Text>
      </View>

      {/* Features */}
      <View className="mb-6 gap-3">
        {features.map((feature, index) => (
          <View key={index} className="flex-row items-center gap-3">
            <Text className={feature.included ? 'text-primary' : 'text-muted-foreground'}>
              {feature.included ? '✓' : '✕'}
            </Text>
            <Text
              className={cn(
                'text-sm',
                feature.included ? 'text-foreground' : 'text-muted-foreground line-through'
              )}
            >
              {feature.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Button */}
      <Button variant={highlighted ? 'default' : 'outline'} className="w-full" onPress={onPress}>
        <ButtonText>{buttonLabel}</ButtonText>
      </Button>
    </View>
  );
}
