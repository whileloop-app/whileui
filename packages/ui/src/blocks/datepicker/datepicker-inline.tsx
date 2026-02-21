import { useMemo } from 'react';
import { View } from 'react-native';
import { useUniwind } from 'uniwind';
import { Calendar, type DateData } from 'react-native-calendars';
import { cn } from '../../lib/cn';
import { useCalendarTheme, type CalendarTheme } from './use-calendar-theme';

export interface DatePickerInlineProps {
  /** Controlled: selected date in YYYY-MM-DD */
  value?: string | null;
  /** Controlled: change handler */
  onValueChange?: (date: string | null) => void;
  /** Minimum selectable date YYYY-MM-DD */
  minDate?: string;
  /** Maximum selectable date YYYY-MM-DD */
  maxDate?: string;
  /** Override calendar theme (hex colors) */
  theme?: CalendarTheme;
  className?: string;
}

export function DatePickerInline({
  value,
  onValueChange,
  minDate,
  maxDate,
  theme: customTheme,
  className,
}: DatePickerInlineProps) {
  const { theme } = useUniwind();
  const calendarTheme = useCalendarTheme(customTheme);

  const markedDates = useMemo(() => {
    if (!value) return undefined;
    return {
      [value]: {
        selected: true,
        disableTouchEvent: false,
        today: false, // Prefer selected style over "today" when selected date is today
      },
    };
  }, [value]);

  const handleDayPress = (day: DateData) => {
    onValueChange?.(day.dateString);
  };

  return (
    <View className={cn('overflow-hidden rounded-xl border border-border', className)}>
      <Calendar
        key={theme}
        current={value ?? undefined}
        onDayPress={handleDayPress}
        markedDates={markedDates}
        minDate={minDate}
        maxDate={maxDate}
        theme={calendarTheme as Record<string, unknown>}
        enableSwipeMonths
      />
    </View>
  );
}
