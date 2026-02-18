import React from 'react';
import { View, type ViewProps } from 'react-native';
import { Text } from '../../components/text';
import { Separator } from '../../components/separator';
import { Button, ButtonText } from '../../components/button';
import { cn } from '../../lib/cn';

// ─── Types ───────────────────────────────────────────────────

export interface CheckoutLineItem {
  label: string;
  value: string;
  emphasized?: boolean;
}

export interface CheckoutSummaryProps extends ViewProps {
  items: CheckoutLineItem[];
  subtotal: string;
  shipping?: string;
  tax?: string;
  discount?: string;
  total: string;
  buttonLabel?: string;
  onCheckout?: () => void;
  loading?: boolean;
}

// ─── Component ───────────────────────────────────────────────

export function CheckoutSummary({
  items,
  subtotal,
  shipping,
  tax,
  discount,
  total,
  buttonLabel = 'Checkout',
  onCheckout,
  loading = false,
  className,
  ...props
}: CheckoutSummaryProps) {
  return (
    <View className={cn('rounded-xl border border-border bg-card p-4', className)} {...props}>
      <Text className="mb-4 text-lg font-semibold text-foreground">Order Summary</Text>

      {/* Items */}
      {items.length > 0 && (
        <View className="mb-4 gap-2">
          {items.map((item, index) => (
            <View key={index} className="flex-row items-center justify-between">
              <Text
                className={cn(
                  'text-sm',
                  item.emphasized ? 'font-medium text-foreground' : 'text-muted-foreground'
                )}
                numberOfLines={1}
              >
                {item.label}
              </Text>
              <Text
                className={cn(
                  'text-sm',
                  item.emphasized ? 'font-medium text-foreground' : 'text-muted-foreground'
                )}
              >
                {item.value}
              </Text>
            </View>
          ))}
        </View>
      )}

      <Separator className="my-3" />

      {/* Subtotal */}
      <View className="flex-row items-center justify-between">
        <Text className="text-sm text-muted-foreground">Subtotal</Text>
        <Text className="text-sm text-foreground">{subtotal}</Text>
      </View>

      {/* Shipping */}
      {shipping && (
        <View className="mt-2 flex-row items-center justify-between">
          <Text className="text-sm text-muted-foreground">Shipping</Text>
          <Text className="text-sm text-foreground">{shipping}</Text>
        </View>
      )}

      {/* Tax */}
      {tax && (
        <View className="mt-2 flex-row items-center justify-between">
          <Text className="text-sm text-muted-foreground">Tax</Text>
          <Text className="text-sm text-foreground">{tax}</Text>
        </View>
      )}

      {/* Discount */}
      {discount && (
        <View className="mt-2 flex-row items-center justify-between">
          <Text className="text-sm text-muted-foreground">Discount</Text>
          <Text className="text-sm text-primary">-{discount}</Text>
        </View>
      )}

      <Separator className="my-3" />

      {/* Total */}
      <View className="flex-row items-center justify-between">
        <Text className="text-base font-semibold text-foreground">Total</Text>
        <Text className="text-xl font-bold text-foreground">{total}</Text>
      </View>

      {/* Checkout Button */}
      {onCheckout && (
        <Button className="mt-4 w-full" onPress={onCheckout} disabled={loading}>
          <ButtonText>{loading ? 'Processing...' : buttonLabel}</ButtonText>
        </Button>
      )}
    </View>
  );
}
