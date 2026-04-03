import { useCSSVariable } from 'uniwind';

function parseNumber(value: string | number | undefined, fallback: number): number {
  if (value === undefined || value === null) return fallback;
  const parsed = Number.parseFloat(String(value));
  return Number.isFinite(parsed) ? parsed : fallback;
}

function parsePixel(value: string | number | undefined, fallback: number): number {
  return Math.max(0, Math.round(parseNumber(value, fallback)));
}

function parseRatio(
  value: string | number | undefined,
  fallback: number,
  min = 0,
  max = 1
): number {
  const parsed = parseNumber(value, fallback);
  return Math.min(max, Math.max(min, parsed));
}

export interface VisualTokens {
  touchTargetMinSize: number;
  drawerWidthRatio: number;
  drawerMaxWidthWeb: number;
  drawerFrostedInset: number;
  drawerFrostedRadius: number;
  drawerContentTopPadding: number;
  drawerItemFontSize: number;
  drawerBadgeMinWidth: number;
  navSectionTitleFontSize: number;
  navItemBadgeFontSize: number;
  bottomNavBadgeFontSize: number;
  dataRowCompactDescriptionSize: number;
  dataRowRightMaxWidthRatio: number;
  segmentedWrapBasisRatio: number;
  textareaMinHeightDefault: number;
  textareaMinHeightSm: number;
  textareaMinHeightLg: number;
  chatBubbleMaxWidthRatio: number;
  chatSystemBubbleMaxWidthRatio: number;
  smartInputMaxHeight: number;
  formModalContentMinHeightRatio: number;
  sheetTabletBreakpoint: number;
  sheetMaxWidth: number;
  sheetHalfMaxHeightRatio: number;
  sheetHalfMinHeight: number;
  swipeActionWidth: number;
  skeletonShimmerBandWidth: number;
  blurIntensitySubtle: number;
  blurIntensityMedium: number;
  blurIntensityStrong: number;
  blurSaturationPct: number;
  frostedHighlightHeight: number;
  frostedBackdropBlurIntensity: number;
  frostedBackdropBlurScale: number;
  androidExperimentalBlurEnabled: boolean;
}

export function useVisualTokens(): VisualTokens {
  const [
    touchTargetMinSize,
    drawerWidthRatio,
    drawerMaxWidthWeb,
    drawerFrostedInset,
    drawerFrostedRadius,
    drawerContentTopPadding,
    drawerItemFontSize,
    drawerBadgeMinWidth,
    navSectionTitleFontSize,
    navItemBadgeFontSize,
    bottomNavBadgeFontSize,
    dataRowCompactDescriptionSize,
    dataRowRightMaxWidthRatio,
    segmentedWrapBasisRatio,
    textareaMinHeightDefault,
    textareaMinHeightSm,
    textareaMinHeightLg,
    chatBubbleMaxWidthRatio,
    chatSystemBubbleMaxWidthRatio,
    smartInputMaxHeight,
    formModalContentMinHeightRatio,
    sheetTabletBreakpoint,
    sheetMaxWidth,
    sheetHalfMaxHeightRatio,
    sheetHalfMinHeight,
    swipeActionWidth,
    skeletonShimmerBandWidth,
    blurIntensitySubtle,
    blurIntensityMedium,
    blurIntensityStrong,
    blurSaturationPct,
    frostedHighlightHeight,
    frostedBackdropBlurIntensity,
    frostedBackdropBlurScale,
    androidExperimentalBlurEnabled,
  ] = useCSSVariable([
    '--ui-touch-target-min-size',
    '--ui-drawer-width-ratio',
    '--ui-drawer-max-width-web',
    '--ui-drawer-frosted-inset',
    '--ui-drawer-frosted-radius',
    '--ui-drawer-content-top-padding',
    '--ui-drawer-item-font-size',
    '--ui-drawer-badge-min-width',
    '--ui-nav-section-title-font-size',
    '--ui-nav-item-badge-font-size',
    '--ui-bottom-nav-badge-font-size',
    '--ui-data-row-compact-description-size',
    '--ui-data-row-right-max-width-ratio',
    '--ui-segmented-wrap-basis-ratio',
    '--ui-textarea-min-height-default',
    '--ui-textarea-min-height-sm',
    '--ui-textarea-min-height-lg',
    '--ui-chat-bubble-max-width-ratio',
    '--ui-chat-system-bubble-max-width-ratio',
    '--ui-smart-input-max-height',
    '--ui-form-modal-content-min-height-ratio',
    '--ui-sheet-tablet-breakpoint',
    '--ui-sheet-max-width',
    '--ui-sheet-half-max-height-ratio',
    '--ui-sheet-half-min-height',
    '--ui-swipe-action-width',
    '--ui-skeleton-shimmer-band-width',
    '--ui-blur-intensity-subtle',
    '--ui-blur-intensity-medium',
    '--ui-blur-intensity-strong',
    '--ui-blur-saturation-pct',
    '--ui-frosted-highlight-height',
    '--ui-frosted-backdrop-blur-intensity',
    '--ui-frosted-backdrop-blur-scale',
    '--ui-frosted-android-experimental-blur',
  ]);

  return {
    touchTargetMinSize: parsePixel(touchTargetMinSize, 44),
    drawerWidthRatio: parseRatio(drawerWidthRatio, 0.82, 0.4, 1),
    drawerMaxWidthWeb: parsePixel(drawerMaxWidthWeb, 360),
    drawerFrostedInset: parsePixel(drawerFrostedInset, 0),
    drawerFrostedRadius: parsePixel(drawerFrostedRadius, 28),
    drawerContentTopPadding: parsePixel(drawerContentTopPadding, 0),
    drawerItemFontSize: parsePixel(drawerItemFontSize, 15),
    drawerBadgeMinWidth: parsePixel(drawerBadgeMinWidth, 20),
    navSectionTitleFontSize: parsePixel(navSectionTitleFontSize, 11),
    navItemBadgeFontSize: parsePixel(navItemBadgeFontSize, 11),
    bottomNavBadgeFontSize: parsePixel(bottomNavBadgeFontSize, 10),
    dataRowCompactDescriptionSize: parsePixel(dataRowCompactDescriptionSize, 11),
    dataRowRightMaxWidthRatio: parseRatio(dataRowRightMaxWidthRatio, 0.45, 0.2, 1),
    segmentedWrapBasisRatio: parseRatio(segmentedWrapBasisRatio, 0.48, 0.2, 1),
    textareaMinHeightDefault: parsePixel(textareaMinHeightDefault, 80),
    textareaMinHeightSm: parsePixel(textareaMinHeightSm, 60),
    textareaMinHeightLg: parsePixel(textareaMinHeightLg, 120),
    chatBubbleMaxWidthRatio: parseRatio(chatBubbleMaxWidthRatio, 0.85, 0.2, 1),
    chatSystemBubbleMaxWidthRatio: parseRatio(chatSystemBubbleMaxWidthRatio, 0.9, 0.2, 1),
    smartInputMaxHeight: parsePixel(smartInputMaxHeight, 120),
    formModalContentMinHeightRatio: parseRatio(formModalContentMinHeightRatio, 0.4, 0.1, 1),
    sheetTabletBreakpoint: parsePixel(sheetTabletBreakpoint, 600),
    sheetMaxWidth: parsePixel(sheetMaxWidth, 360),
    sheetHalfMaxHeightRatio: parseRatio(sheetHalfMaxHeightRatio, 0.5, 0.1, 1),
    sheetHalfMinHeight: parsePixel(sheetHalfMinHeight, 320),
    swipeActionWidth: parsePixel(swipeActionWidth, 80),
    skeletonShimmerBandWidth: parsePixel(skeletonShimmerBandWidth, 56),
    blurIntensitySubtle: parsePixel(blurIntensitySubtle, 18),
    blurIntensityMedium: parsePixel(blurIntensityMedium, 22),
    blurIntensityStrong: parsePixel(blurIntensityStrong, 28),
    blurSaturationPct: parsePixel(blurSaturationPct, 185),
    frostedHighlightHeight: parsePixel(frostedHighlightHeight, 0),
    frostedBackdropBlurIntensity: parsePixel(frostedBackdropBlurIntensity, 14),
    frostedBackdropBlurScale: parseRatio(frostedBackdropBlurScale, 0.55, 0, 3),
    androidExperimentalBlurEnabled: parseNumber(androidExperimentalBlurEnabled, 1) > 0,
  };
}
