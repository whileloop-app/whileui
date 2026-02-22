import React, { useCallback, useMemo, useState } from 'react';
import { Modal, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUniwind } from 'uniwind';
import { Calendar, type DateData } from 'react-native-calendars';
import { Text } from '../../components/text';
import { Button, ButtonText } from '../../components/button';
import { cn } from '../../lib/cn';
import { useCalendarTheme, type CalendarTheme } from './use-calendar-theme';

type MarkedDates = Record<
  string,
  {
    startingDay?: boolean;
    endingDay?: boolean;
    color?: string;
    textColor?: string;
    today?: boolean;
  }
>;

export interface DateRange {
  start: string;
  end: string;
}

export interface DateRangePickerModalProps {
  /** Controlled: selected range */
  value?: DateRange | null;
  /** Controlled: change handler */
  onValueChange?: (range: DateRange | null) => void;
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

function formatRangeDisplay(range: DateRange | null | undefined): string {
  if (!range) return 'Select date range';
  const start = new Date(range.start + 'T12:00:00');
  const end = new Date(range.end + 'T12:00:00');
  const fmt = (d: Date) =>
    d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  return `${fmt(start)} – ${fmt(end)}`;
}

function toLocalDateString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function buildMarkedDates(start: string, end: string, theme: CalendarTheme): MarkedDates {
  const color = theme.selectedDayBackgroundColor;
  const textColor = theme.selectedDayTextColor;
  const marked: MarkedDates = {};
  const [startY, startM, startD] = start.split('-').map(Number);
  const [endY, endM, endD] = end.split('-').map(Number);

  const curr = new Date(startY, startM - 1, startD);
  const e = new Date(endY, endM - 1, endD);

  while (curr.getTime() <= e.getTime()) {
    const key = toLocalDateString(curr);
    marked[key] = {
      startingDay: key === start,
      endingDay: key === end,
      color,
      textColor,
      today: false, // Prefer range style over "today" when end/start date is today
    };
    curr.setDate(curr.getDate() + 1);
  }
  return marked;
}

export function DateRangePickerModal({
  value,
  onValueChange,
  open,
  onOpenChange,
  minDate,
  maxDate,
  theme: customTheme,
  trigger,
  title = 'Select date range',
  confirmLabel = 'Done',
  className,
}: DateRangePickerModalProps) {
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

  const [draftStart, setDraftStart] = useState<string | null>(value?.start ?? null);
  const [draftEnd, setDraftEnd] = useState<string | null>(value?.end ?? null);

  const markedDates = useMemo((): MarkedDates => {
    const color = calendarTheme.selectedDayBackgroundColor;
    const textColor = calendarTheme.selectedDayTextColor;
    if (!draftStart || !draftEnd) {
      if (draftStart) {
        return {
          [draftStart]: {
            startingDay: true,
            endingDay: true,
            color,
            textColor,
            today: false,
          },
        };
      }
      return {};
    }
    const [start, end] = draftStart <= draftEnd ? [draftStart, draftEnd] : [draftEnd, draftStart];
    return buildMarkedDates(start, end, calendarTheme);
  }, [draftStart, draftEnd, calendarTheme]);

  const handleDayPress = useCallback(
    (day: DateData) => {
      const d = day.dateString;
      if (!draftStart || draftEnd) {
        setDraftStart(d);
        setDraftEnd(null);
      } else {
        setDraftEnd(d);
      }
    },
    [draftStart, draftEnd]
  );

  const handleConfirm = useCallback(() => {
    if (draftStart) {
      const start = draftStart;
      const end = draftEnd ?? draftStart;
      onValueChange?.({
        start: start <= end ? start : end,
        end: start <= end ? end : start,
      });
    } else {
      onValueChange?.(null);
    }
    onOpenChange(false);
    setDraftStart(null);
    setDraftEnd(null);
  }, [draftStart, draftEnd, onValueChange, onOpenChange]);

  const handleOpen = useCallback(() => {
    setDraftStart(value?.start ?? null);
    setDraftEnd(value?.end ?? null);
    onOpenChange(true);
  }, [value, onOpenChange]);

  const handleBackdropPress = useCallback(() => {
    onOpenChange(false);
    setDraftStart(null);
    setDraftEnd(null);
  }, [onOpenChange]);

  return (
    <>
      {trigger ? (
        <Pressable
          onPress={handleOpen}
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
                current={draftStart ?? value?.start ?? undefined}
                onDayPress={handleDayPress}
                markedDates={markedDates}
                markingType="period"
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

/** Compact trigger showing formatted range. Use as DateRangePickerModal's trigger prop. */
export function DateRangePickerTrigger({
  value,
  placeholder = 'Select date range',
  className,
}: {
  value?: DateRange | null;
  placeholder?: string;
  className?: string;
}) {
  return (
    <View className={cn('flex-1 flex-row items-center min-w-0', className)}>
      <Text
        className={cn('flex-1 text-base', value ? 'text-foreground' : 'text-muted-foreground')}
        numberOfLines={1}
      >
        {value ? formatRangeDisplay(value) : placeholder}
      </Text>
      <View className="ml-2 shrink-0 h-2 w-2 rotate-45 border-b-2 border-r-2 border-muted-foreground" />
    </View>
  );
}

export { formatRangeDisplay };
