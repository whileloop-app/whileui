import { useCSSVariable } from 'uniwind';
import type { ThemeColors } from '../../lib/theme-colors';
import { useThemeColors } from '../../lib/theme-colors';

/** Theme object for react-native-calendars. Pass to Calendar's theme prop. */
export interface CalendarTheme {
  backgroundColor?: string;
  calendarBackground?: string;
  textSectionTitleColor?: string;
  textSectionTitleDisabledColor?: string;
  selectedDayBackgroundColor?: string;
  selectedDayTextColor?: string;
  todayTextColor?: string;
  todayBackgroundColor?: string;
  dayTextColor?: string;
  textDisabledColor?: string;
  dotColor?: string;
  selectedDotColor?: string;
  arrowColor?: string;
  disabledArrowColor?: string;
  monthTextColor?: string;
  indicatorColor?: string;
  textDayFontFamily?: string;
  textMonthFontFamily?: string;
  textDayHeaderFontFamily?: string;
  textDayFontWeight?: string;
  textMonthFontWeight?: string;
  textDayHeaderFontWeight?: string;
  textDayFontSize?: number;
  textMonthFontSize?: number;
  textDayHeaderFontSize?: number;
  todayButtonFontFamily?: string;
  todayButtonFontWeight?: string;
  todayButtonFontSize?: number;
}

function buildCalendarTheme(c: ThemeColors, fontFamily?: string): CalendarTheme {
  return {
    calendarBackground: c.background,
    textSectionTitleColor: c.mutedForeground,
    selectedDayBackgroundColor: c.primary,
    selectedDayTextColor: c.primaryForeground,
    todayTextColor: c.foreground,
    todayBackgroundColor: c.muted,
    dayTextColor: c.foreground,
    textDisabledColor: c.border,
    disabledArrowColor: c.border,
    dotColor: c.accent,
    selectedDotColor: c.primaryForeground,
    arrowColor: c.foreground,
    monthTextColor: c.foreground,
    ...(fontFamily && {
      textDayFontFamily: fontFamily,
      textMonthFontFamily: fontFamily,
      textDayHeaderFontFamily: fontFamily,
    }),
  };
}

/**
 * Returns a theme object for react-native-calendars based on current Uniwind theme.
 * Derived from useThemeColors; apps can override by passing a custom theme.
 * Only defined custom values override base; undefined keys keep base values.
 */
export function useCalendarTheme(customTheme?: CalendarTheme): CalendarTheme {
  const c = useThemeColors();
  const [fontSans] = useCSSVariable(['--font-sans']);
  const fontFamily = typeof fontSans === 'string' && fontSans ? fontSans : undefined;
  const base = buildCalendarTheme(c, fontFamily);
  if (!customTheme) return base;
  const merged = { ...base };
  for (const [k, v] of Object.entries(customTheme)) {
    if (v !== undefined) merged[k as keyof CalendarTheme] = v;
  }
  return merged;
}
