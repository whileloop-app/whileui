import { View, type ViewProps } from 'react-native';
import { Pressable } from '../../components/pressable';
import { Badge, BadgeText } from '../../components/badge';
import { Text } from '../../components/text';
import { cn } from '../../lib/cn';
import { useInteractionTokens, withInteractivePressableStyle } from '../../lib/interaction-tokens';

export type PlanToggleValue = 'monthly' | 'annual';

export interface PlanToggleProps extends ViewProps {
  selected: PlanToggleValue;
  monthlyLabel?: string;
  annualLabel?: string;
  annualDiscount?: string;
  onChange?: (value: PlanToggleValue) => void;
  className?: string;
}

export function PlanToggle({
  selected,
  monthlyLabel = 'Monthly',
  annualLabel = 'Annual',
  annualDiscount,
  onChange,
  className,
  ...props
}: PlanToggleProps) {
  const interaction = useInteractionTokens();

  const renderItem = (value: PlanToggleValue, label: string) => {
    const active = selected === value;
    return (
      <Pressable
        key={value}
        className={cn(
          'flex-1 flex-row items-center justify-center gap-2 rounded-lg px-3 py-2',
          active ? 'bg-background border border-border' : 'bg-transparent'
        )}
        style={withInteractivePressableStyle(undefined, interaction, {
          disabled: !onChange,
          pressedVariant: 'default',
        })}
        disabled={!onChange}
        onPress={() => onChange?.(value)}
      >
        <Text className={cn('text-sm', active ? 'text-foreground' : 'text-muted-foreground')}>
          {label}
        </Text>
        {value === 'annual' && annualDiscount ? (
          <Badge variant="success">
            <BadgeText>{annualDiscount}</BadgeText>
          </Badge>
        ) : null}
      </Pressable>
    );
  };

  return (
    <View className={cn('rounded-xl bg-muted p-1', className)} {...props}>
      <View className="flex-row">
        {[renderItem('monthly', monthlyLabel), renderItem('annual', annualLabel)]}
      </View>
    </View>
  );
}
