import React, { useCallback, useMemo } from 'react';
import { Modal, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUniwind } from 'uniwind';
import { Calendar, type DateData } from 'react-native-calendars';
import { Text } from '../../components/text';
import { Button, ButtonText } from '../../components/button';
import { cn } from '../../lib/cn';
import { useCalendarTheme, type CalendarTheme } from './use-calendar-theme';

export interface DatePickerModalProps {
  /** Controlled: selected date in YYYY-MM-DD */
  value?: string | null;
  /** Controlled: change handler */
  onValueChange?: (date: string | null) => void;
  /** Modal open state */
  open: boolean;
  /** Modal open change handler */
  onOpenChange: (open: boolean) => void;
  /** Minimum selectable date YYYY-MM-DD */
  minDate?: string;
  /** Maximum selectable date YYYY-MM-DD */
  maxDate?: string;
  /** Override calendar theme (RN color strings) */
  theme?: CalendarTheme;
  /** Trigger element. If not provided, no trigger is rendered. */
  trigger?: React.ReactNode;
  /** Title shown in modal header */
  title?: string;
  /** Button label for confirm */
  confirmLabel?: string;
  className?: string;
}

function formatDisplayDate(dateString: string | null | undefined): string {
  if (!dateString) return 'Select date';
  const d = new Date(dateString + 'T12:00:00');
  return d.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function DatePickerModal({
  value,
  onValueChange,
  open,
  onOpenChange,
  minDate,
  maxDate,
  theme: customTheme,
  trigger,
  title = 'Select date',
  confirmLabel = 'Done',
  className,
}: DatePickerModalProps) {
  const insets = useSafeAreaInsets();
  const { theme } = useUniwind();
  const calendarTheme = useCalendarTheme(customTheme);
  const arrowColor =
    calendarTheme.arrowColor ??
    calendarTheme.monthTextColor ??
    calendarTheme.dayTextColor ??
    '#000000';
  const renderArrow = useCallback(
    (direction: 'left' | 'right') => (
      <Text className="text-base font-medium" style={{ color: arrowColor }}>
        {direction === 'left' ? '<' : '>'}
      </Text>
    ),
    [arrowColor]
  );

  const markedDates = useMemo(() => {
    if (!value) return undefined;
    return {
      [value]: {
        selected: true,
        disableTouchEvent: false,
        today: false,
      },
    };
  }, [value]);

  const handleDayPress = (day: DateData) => {
    onValueChange?.(day.dateString);
  };

  const handleConfirm = () => {
    onOpenChange(false);
  };

  const handleBackdropPress = () => {
    onOpenChange(false);
  };

  return (
    <>
      {trigger ? (
        <Pressable
          onPress={() => onOpenChange(true)}
          className={cn(
            'min-h-10 w-full flex-row items-center rounded-lg border border-border bg-muted px-4',
            className
          )}
        >
          {trigger}
        </Pressable>
      ) : null}

      <Modal visible={open} transparent animationType="slide">
        <Pressable className="flex-1 justify-end bg-black/40" onPress={handleBackdropPress}>
          <Pressable
            className="rounded-t-xl border border-border bg-background"
            style={{ paddingBottom: Math.max(insets.bottom, 16) }}
            onPress={(e) => e.stopPropagation()}
          >
            <View className="flex-row items-center justify-between border-b border-border px-4 py-3">
              <Text className="text-base font-medium text-foreground">{title}</Text>
              <Button size="sm" onPress={handleConfirm}>
                <ButtonText>{confirmLabel}</ButtonText>
              </Button>
            </View>
            <View className="p-4">
              <Calendar
                key={theme}
                current={value ?? undefined}
                onDayPress={handleDayPress}
                markedDates={markedDates}
                minDate={minDate}
                maxDate={maxDate}
                theme={calendarTheme as Record<string, unknown>}
                renderArrow={renderArrow}
                enableSwipeMonths
              />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

/** Compact trigger showing formatted date. Use as DatePickerModal's trigger prop. */
export function DatePickerTrigger({
  value,
  placeholder = 'Select date',
  className,
}: {
  value?: string | null;
  placeholder?: string;
  className?: string;
}) {
  return (
    <View className={cn('flex-1 flex-row items-center min-w-0', className)}>
      <Text
        className={cn('flex-1 text-base', value ? 'text-foreground' : 'text-muted-foreground')}
        numberOfLines={1}
      >
        {value ? formatDisplayDate(value) : placeholder}
      </Text>
      <View className="ml-2 shrink-0 h-2 w-2 rotate-45 border-b-2 border-r-2 border-muted-foreground" />
    </View>
  );
}

export { formatDisplayDate };
