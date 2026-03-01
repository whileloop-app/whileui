import { View, Pressable, Image, type PressableProps } from 'react-native';
import { Text } from '../../components/text';
import { Badge, BadgeText } from '../../components/badge';
import { cn } from '../../lib/cn';
import { useInteractionTokens, withInteractivePressableStyle } from '../../lib/interaction-tokens';

// ─── Types ───────────────────────────────────────────────────

export interface ProductCardProps extends Omit<PressableProps, 'children'> {
  imageUrl?: string;
  title: string;
  description?: string;
  price: string;
  originalPrice?: string;
  badge?: string;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
  variant?: 'vertical' | 'horizontal';
}

// ─── Component ───────────────────────────────────────────────

export function ProductCard({
  imageUrl,
  title,
  description,
  price,
  originalPrice,
  badge,
  rating,
  reviewCount,
  inStock = true,
  variant = 'vertical',
  className,
  style: styleProp,
  ...props
}: ProductCardProps) {
  const isHorizontal = variant === 'horizontal';
  const interaction = useInteractionTokens();

  return (
    <Pressable
      className={cn(
        'overflow-hidden rounded-xl border border-border bg-card',
        isHorizontal ? 'flex-row' : 'flex-col',
        className
      )}
      style={withInteractivePressableStyle(styleProp, interaction, {
        disabled: Boolean(props.disabled),
        pressedVariant: 'strong',
      })}
      {...props}
    >
      {/* Image */}
      <View
        className={cn(
          'items-center justify-center bg-muted',
          isHorizontal ? 'h-28 w-28' : 'aspect-square w-full'
        )}
      >
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} className="h-full w-full" resizeMode="cover" />
        ) : (
          <View className="items-center justify-center gap-2">
            <View className="h-10 w-10 rounded-lg bg-muted-foreground/10 items-center justify-center">
              <Text className="text-muted-foreground text-lg">📦</Text>
            </View>
          </View>
        )}
        {badge && (
          <View className="absolute left-2 top-2">
            <Badge variant="destructive">
              <BadgeText>{badge}</BadgeText>
            </Badge>
          </View>
        )}
      </View>

      {/* Content */}
      <View className={cn('flex-1 p-3', isHorizontal && 'justify-center')}>
        <Text className="font-medium text-foreground" numberOfLines={2}>
          {title}
        </Text>

        {description && !isHorizontal && (
          <Text className="mt-1 text-sm text-muted-foreground" numberOfLines={2}>
            {description}
          </Text>
        )}

        {/* Rating */}
        {rating !== undefined && (
          <View className="mt-1 flex-row items-center gap-1">
            <Text className="text-sm text-accent">★</Text>
            <Text className="text-sm text-muted-foreground">
              {rating.toFixed(1)}
              {reviewCount !== undefined && ` (${reviewCount})`}
            </Text>
          </View>
        )}

        {/* Price */}
        <View className="mt-2 flex-row items-center gap-2">
          <Text className="text-lg font-bold text-foreground">{price}</Text>
          {originalPrice && (
            <Text className="text-sm text-muted-foreground line-through">{originalPrice}</Text>
          )}
        </View>

        {/* Stock */}
        {!inStock && <Text className="mt-1 text-sm text-destructive">Out of stock</Text>}
      </View>
    </Pressable>
  );
}
