import { View, type ViewProps } from 'react-native';
import { Text } from '../../components/text';
import { Button, ButtonText } from '../../components/button';
import { Badge, BadgeText } from '../../components/badge';
import { Skeleton } from '../../components/skeleton';
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
  /** Show a skeleton placeholder instead of content. */
  loading?: boolean;
}

// ─── Skeleton ─────────────────────────────────────────────────

function PricingCardSkeleton({
  highlighted = false,
  className,
}: {
  highlighted?: boolean;
  className?: string;
}) {
  return (
    <View
      className={cn(
        'overflow-hidden rounded-2xl p-6',
        highlighted ? 'border-2 border-primary bg-card' : 'border border-border bg-card',
        className
      )}
    >
      <View className="mb-4 flex-row items-center justify-between">
        <Skeleton className="h-5 w-1/3 rounded-md" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </View>
      <Skeleton className="mb-4 h-3 w-3/4 rounded-md" />
      <View className="mb-6 flex-row items-baseline gap-1">
        <Skeleton className="h-10 w-20 rounded-md" />
        <Skeleton className="h-3 w-12 rounded-md" />
      </View>
      <View className="mb-6 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <View key={i} className="flex-row items-center gap-3">
            <Skeleton className="h-4 w-4 rounded-sm" />
            <Skeleton className="h-3 w-3/5 rounded-md" />
          </View>
        ))}
      </View>
      <Skeleton className="h-10 w-full rounded-lg" />
    </View>
  );
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
  loading = false,
  className,
  ...props
}: PricingCardProps) {
  if (loading) {
    return <PricingCardSkeleton highlighted={highlighted} className={className} />;
  }

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
