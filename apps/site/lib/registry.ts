export type RegistryCategory =
  | 'primitives'
  | 'controls'
  | 'display'
  | 'layout'
  | 'overlays'
  | 'feedback'
  | 'forms';
export type BlockCategory =
  | 'navigation'
  | 'layout'
  | 'chat'
  | 'lists'
  | 'commerce'
  | 'media'
  | 'datepicker'
  | 'splash';

export interface RegistryItem {
  slug: string;
  name: string;
  description: string;
  category: RegistryCategory;
  subComponents?: string[];
}

export interface BlockItem {
  slug: string;
  name: string;
  description: string;
  category: BlockCategory;
  subComponents?: string[];
  /** Whether this block renders properly on web */
  webSupport: 'full' | 'mobile-only';
}

export const components: RegistryItem[] = [
  // Primitives
  {
    slug: 'text',
    name: 'Text',
    description:
      'Typography component with semantic variants — caption, body, heading, title, and more.',
    category: 'primitives',
  },
  {
    slug: 'view',
    name: 'View',
    description: 'Base container component with className support.',
    category: 'primitives',
  },
  {
    slug: 'pressable',
    name: 'Pressable',
    description: 'Touch-responsive container with press/hover states.',
    category: 'primitives',
  },
  {
    slug: 'stack',
    name: 'Stack',
    description: 'Vertical layout with configurable gap, alignment, and justify.',
    category: 'primitives',
  },
  {
    slug: 'row',
    name: 'Row',
    description: 'Horizontal layout with configurable gap, alignment, and justify.',
    category: 'primitives',
  },
  {
    slug: 'box',
    name: 'Box',
    description: 'Container with padding and margin variants.',
    category: 'primitives',
  },

  // Controls
  {
    slug: 'button',
    name: 'Button',
    description: '6 variants, 4 sizes. Supports icons, loading state, and asChild composition.',
    category: 'controls',
    subComponents: ['ButtonText', 'ButtonIcon'],
  },
  {
    slug: 'input',
    name: 'Input',
    description: 'Text input with default and error variants. Themed placeholder colors.',
    category: 'controls',
  },
  {
    slug: 'numeric-input',
    name: 'NumericInput',
    description:
      'Numeric input with prefix/suffix slots, optional steppers, and min/max validation.',
    category: 'controls',
  },
  {
    slug: 'textarea',
    name: 'Textarea',
    description: 'Multi-line text input with auto-growing height.',
    category: 'controls',
  },
  {
    slug: 'switch',
    name: 'Switch',
    description: 'Toggle switch — controlled or uncontrolled.',
    category: 'controls',
  },
  {
    slug: 'checkbox',
    name: 'Checkbox',
    description: 'Checkbox with checked, unchecked, and indeterminate states.',
    category: 'controls',
  },
  {
    slug: 'radio-group',
    name: 'RadioGroup',
    description: 'Single-select radio group with RadioGroupItem.',
    category: 'controls',
    subComponents: ['RadioGroupItem'],
  },
  {
    slug: 'select',
    name: 'Select',
    description: 'Dropdown select with groups, labels, and search.',
    category: 'controls',
    subComponents: ['SelectTrigger', 'SelectContent', 'SelectItem'],
  },
  {
    slug: 'segmented-control',
    name: 'SegmentedControl',
    description: 'Single-select segmented control with default and pill variants.',
    category: 'controls',
    subComponents: ['SegmentedControlItem'],
  },
  {
    slug: 'toggle',
    name: 'Toggle',
    description: 'Toggle button with default and outline variants.',
    category: 'controls',
    subComponents: ['ToggleText'],
  },
  {
    slug: 'toggle-group',
    name: 'ToggleGroup',
    description: 'Group of toggle buttons — single or multiple selection.',
    category: 'controls',
    subComponents: ['ToggleGroupItem'],
  },

  // Display
  {
    slug: 'card',
    name: 'Card',
    description: 'Container with header, content, footer sections. Padding variants.',
    category: 'display',
    subComponents: ['CardHeader', 'CardTitle', 'CardDescription', 'CardContent', 'CardFooter'],
  },
  {
    slug: 'badge',
    name: 'Badge',
    description: '5 variants — default, secondary, destructive, outline, success.',
    category: 'display',
    subComponents: ['BadgeText'],
  },
  {
    slug: 'alert',
    name: 'Alert',
    description: 'Contextual alert — default, destructive, success, warning.',
    category: 'display',
    subComponents: ['AlertTitle', 'AlertDescription'],
  },
  {
    slug: 'avatar',
    name: 'Avatar',
    description: 'User avatar with image and fallback. 3 sizes.',
    category: 'display',
    subComponents: ['AvatarImage', 'AvatarFallback'],
  },
  {
    slug: 'data-row',
    name: 'DataRow',
    description: 'Structured data display row with label, value, and description slots.',
    category: 'display',
    subComponents: ['DataRowLabel', 'DataRowValue', 'DataRowDescription'],
  },
  {
    slug: 'separator',
    name: 'Separator',
    description: 'Themed divider — horizontal or vertical.',
    category: 'display',
  },
  {
    slug: 'progress',
    name: 'Progress',
    description: 'Value-based progress bar in 3 sizes.',
    category: 'display',
  },
  {
    slug: 'spinner',
    name: 'Spinner',
    description: 'Activity indicator in 3 sizes.',
    category: 'display',
  },
  {
    slug: 'skeleton',
    name: 'Skeleton',
    description: 'Loading placeholder with pulse or shimmer animation.',
    category: 'display',
  },
  {
    slug: 'aspect-ratio',
    name: 'AspectRatio',
    description: 'Maintains aspect ratio for child content.',
    category: 'display',
  },

  // Layout
  {
    slug: 'tabs',
    name: 'Tabs',
    description: 'Tabbed content with TabsList, TabsTrigger, and TabsContent.',
    category: 'layout',
    subComponents: ['TabsList', 'TabsTrigger', 'TabsContent'],
  },
  {
    slug: 'accordion',
    name: 'Accordion',
    description: 'Expandable sections — single or multiple open.',
    category: 'layout',
    subComponents: ['AccordionItem', 'AccordionTrigger', 'AccordionContent'],
  },
  {
    slug: 'collapsible',
    name: 'Collapsible',
    description: 'Expandable/collapsible content section.',
    category: 'layout',
    subComponents: ['CollapsibleTrigger', 'CollapsibleContent'],
  },

  // Overlays
  {
    slug: 'dialog',
    name: 'Dialog',
    description: 'Modal dialog with header, footer, title, and description.',
    category: 'overlays',
    subComponents: ['DialogTrigger', 'DialogContent', 'DialogHeader', 'DialogTitle'],
  },
  {
    slug: 'alert-dialog',
    name: 'AlertDialog',
    description: 'Confirmation dialog with action and cancel buttons.',
    category: 'overlays',
    subComponents: [
      'AlertDialogTrigger',
      'AlertDialogContent',
      'AlertDialogAction',
      'AlertDialogCancel',
    ],
  },
  {
    slug: 'popover',
    name: 'Popover',
    description: 'Position-aware floating popover.',
    category: 'overlays',
    subComponents: ['PopoverTrigger', 'PopoverContent'],
  },
  {
    slug: 'tooltip',
    name: 'Tooltip',
    description: 'Position-aware tooltip on hover/press.',
    category: 'overlays',
    subComponents: ['TooltipTrigger', 'TooltipContent'],
  },
  {
    slug: 'dropdown-menu',
    name: 'DropdownMenu',
    description: 'Dropdown menu with items, labels, and separators.',
    category: 'overlays',
    subComponents: ['DropdownMenuTrigger', 'DropdownMenuContent', 'DropdownMenuItem'],
  },
  {
    slug: 'context-menu',
    name: 'ContextMenu',
    description: 'Long-press context menu.',
    category: 'overlays',
    subComponents: ['ContextMenuTrigger', 'ContextMenuContent', 'ContextMenuItem'],
  },
  {
    slug: 'hover-card',
    name: 'HoverCard',
    description: 'Card that appears on hover.',
    category: 'overlays',
    subComponents: ['HoverCardTrigger', 'HoverCardContent'],
  },
  {
    slug: 'menubar',
    name: 'Menubar',
    description: 'Horizontal menu bar with nested menus.',
    category: 'overlays',
    subComponents: ['MenubarMenu', 'MenubarTrigger', 'MenubarContent', 'MenubarItem'],
  },

  // Feedback
  {
    slug: 'toast',
    name: 'Toast',
    description: 'Non-blocking notification toasts with variants.',
    category: 'feedback',
    subComponents: ['ToastProvider', 'ToastContainer'],
  },

  // Forms
  {
    slug: 'label',
    name: 'Label',
    description: 'Form field label with font-weight resolution.',
    category: 'forms',
  },
  {
    slug: 'form-field',
    name: 'FormField',
    description: 'Compound form field with label, control, hint, and validation message.',
    category: 'forms',
    subComponents: ['FormLabel', 'FormControl', 'FormHint', 'FormMessage'],
  },
  {
    slug: 'labeled-field',
    name: 'LabeledField',
    description: 'Field wrapper with label, helper text, error, and left/right slots.',
    category: 'forms',
    subComponents: ['LabeledFieldControl'],
  },
];

export const blocks: BlockItem[] = [
  // Navigation
  {
    slug: 'app-shell',
    name: 'AppShell',
    description: 'Layout shell with header, footer, and bottom nav slots.',
    category: 'navigation',
    webSupport: 'mobile-only',
  },
  {
    slug: 'navigation-sidebar',
    name: 'NavigationSidebar',
    description: 'Sidebar with grouped sections, badges, and active state.',
    category: 'navigation',
    webSupport: 'full',
  },
  {
    slug: 'header',
    name: 'Header',
    description: 'Top app bar with title, back button, and action slots.',
    category: 'navigation',
    webSupport: 'full',
  },
  {
    slug: 'bottom-nav',
    name: 'BottomNav',
    description: 'Bottom tab navigation bar.',
    category: 'navigation',
    webSupport: 'mobile-only',
  },
  {
    slug: 'floating-bottom-nav',
    name: 'FloatingBottomNav',
    description: 'Elevated floating bottom navigation.',
    category: 'navigation',
    webSupport: 'mobile-only',
  },
  {
    slug: 'tab-bar',
    name: 'TabBar',
    description: 'Horizontal tab bar with indicator.',
    category: 'navigation',
    webSupport: 'full',
  },
  {
    slug: 'drawer-menu',
    name: 'DrawerMenu',
    description: 'Slide-out drawer with sections, header, and footer.',
    category: 'navigation',
    webSupport: 'mobile-only',
  },

  // Layout
  {
    slug: 'action-bar',
    name: 'ActionBar',
    description: 'Sticky bottom action row with safe-area padding.',
    category: 'layout',
    webSupport: 'full',
  },
  {
    slug: 'confirm-action-sheet',
    name: 'ConfirmActionSheet',
    description: 'Destructive confirmation bottom sheet.',
    category: 'layout',
    webSupport: 'mobile-only',
  },
  {
    slug: 'sheet',
    name: 'Sheet',
    description: 'Bottom sheet modal with header, content, and footer.',
    category: 'layout',
    subComponents: ['SheetHeader', 'SheetContent', 'SheetFooter'],
    webSupport: 'mobile-only',
  },
  {
    slug: 'form-modal-screen',
    name: 'FormModalScreen',
    description: 'Modal scaffold for forms with loading/saving states.',
    category: 'layout',
    webSupport: 'mobile-only',
  },
  {
    slug: 'content-skeleton',
    name: 'ContentSkeleton',
    description: 'Loading placeholder variants — list, card, generic.',
    category: 'layout',
    webSupport: 'full',
  },
  {
    slug: 'page-skeleton',
    name: 'PageSkeleton',
    description: 'Full-page loading skeleton variants.',
    category: 'layout',
    webSupport: 'full',
  },
  {
    slug: 'error-boundary',
    name: 'ErrorBoundary',
    description: 'React error boundary with fallback UI.',
    category: 'layout',
    webSupport: 'full',
  },
  {
    slug: 'empty-state',
    name: 'EmptyState',
    description: 'Empty content placeholder with action.',
    category: 'layout',
    webSupport: 'full',
  },
  {
    slug: 'error-state',
    name: 'ErrorState',
    description: 'Error display with retry button.',
    category: 'layout',
    webSupport: 'full',
  },
  {
    slug: 'loading-screen',
    name: 'LoadingScreen',
    description: 'Full-screen loading indicator.',
    category: 'layout',
    webSupport: 'full',
  },
  {
    slug: 'pull-to-refresh-scroll-view',
    name: 'PullToRefreshScrollView',
    description: 'Themed ScrollView with pull-to-refresh.',
    category: 'layout',
    webSupport: 'mobile-only',
  },
  {
    slug: 'smart-input',
    name: 'SmartInput',
    description: 'Keyboard-aware compose input with left/center/right slots.',
    category: 'layout',
    webSupport: 'mobile-only',
  },
  {
    slug: 'onboarding-screen',
    name: 'OnboardingScreen',
    description: 'Multi-step onboarding flow with slides.',
    category: 'layout',
    webSupport: 'mobile-only',
  },

  // Chat
  {
    slug: 'chat',
    name: 'Chat',
    description: 'AI-style chat interface with messages, suggestions, and input.',
    category: 'chat',
    webSupport: 'mobile-only',
  },
  {
    slug: 'chat-message-bubble',
    name: 'ChatMessageBubble',
    description: 'Message bubble for user, assistant, or system roles.',
    category: 'chat',
    webSupport: 'full',
  },
  {
    slug: 'chat-suggestions',
    name: 'ChatSuggestions',
    description: 'Suggestion chips for empty chat state.',
    category: 'chat',
    webSupport: 'full',
  },

  // Lists
  {
    slug: 'list-item',
    name: 'ListItem',
    description: 'List row with icon, title, subtitle, and action.',
    category: 'lists',
    webSupport: 'full',
  },
  {
    slug: 'notification-item',
    name: 'NotificationItem',
    description: 'Notification row with timestamp and metadata.',
    category: 'lists',
    webSupport: 'full',
  },
  {
    slug: 'swipeable-item',
    name: 'SwipeableItem',
    description: 'Swipe-to-reveal actions list item.',
    category: 'lists',
    webSupport: 'mobile-only',
  },
  {
    slug: 'timeline-feed',
    name: 'TimelineFeed',
    description: 'Vertical feed with connecting timeline lines.',
    category: 'lists',
    webSupport: 'full',
  },

  // Commerce
  {
    slug: 'product-card',
    name: 'ProductCard',
    description: 'Product card with image, price, rating, and stock status.',
    category: 'commerce',
    webSupport: 'full',
  },
  {
    slug: 'pricing-card',
    name: 'PricingCard',
    description: 'Pricing tier card with feature list.',
    category: 'commerce',
    webSupport: 'full',
  },
  {
    slug: 'checkout-summary',
    name: 'CheckoutSummary',
    description: 'Cart summary with line items and totals.',
    category: 'commerce',
    webSupport: 'full',
  },
  {
    slug: 'metric-card',
    name: 'MetricCard',
    description: 'Stats/progress card with value, label, and trend.',
    category: 'commerce',
    webSupport: 'full',
  },

  // Media
  {
    slug: 'smart-image',
    name: 'SmartImage',
    description: 'Image with aspect ratio and loading placeholder.',
    category: 'media',
    webSupport: 'full',
  },

  // Datepicker
  {
    slug: 'date-picker-modal',
    name: 'DatePickerModal',
    description: 'Bottom sheet calendar date picker.',
    category: 'datepicker',
    webSupport: 'mobile-only',
  },
  {
    slug: 'date-picker-inline',
    name: 'DatePickerInline',
    description: 'Inline calendar for forms and dashboards.',
    category: 'datepicker',
    webSupport: 'full',
  },
  {
    slug: 'date-range-picker-modal',
    name: 'DateRangePickerModal',
    description: 'Range selection calendar with period marking.',
    category: 'datepicker',
    webSupport: 'mobile-only',
  },

  // Splash
  {
    slug: 'splash-screen',
    name: 'SplashScreen',
    description: 'Branded splash with fade/scale/slide animations.',
    category: 'splash',
    webSupport: 'mobile-only',
  },
  {
    slug: 'minimal-splash',
    name: 'MinimalSplash',
    description: 'Minimal monochrome splash screen.',
    category: 'splash',
    webSupport: 'mobile-only',
  },
  {
    slug: 'branded-splash',
    name: 'BrandedSplash',
    description: 'Splash with brand imagery and tagline.',
    category: 'splash',
    webSupport: 'mobile-only',
  },
];

export const categoryLabels: Record<RegistryCategory, string> = {
  primitives: 'Primitives',
  controls: 'Controls',
  display: 'Display',
  layout: 'Layout',
  overlays: 'Overlays & Menus',
  feedback: 'Feedback',
  forms: 'Forms',
};

export const blockCategoryLabels: Record<BlockCategory, string> = {
  navigation: 'Navigation',
  layout: 'Layout',
  chat: 'Chat',
  lists: 'Lists',
  commerce: 'Commerce',
  media: 'Media',
  datepicker: 'Date Picker',
  splash: 'Splash',
};

export function getComponentsByCategory() {
  const grouped: Record<RegistryCategory, RegistryItem[]> = {
    primitives: [],
    controls: [],
    display: [],
    layout: [],
    overlays: [],
    feedback: [],
    forms: [],
  };
  for (const c of components) grouped[c.category].push(c);
  return grouped;
}

export function getBlocksByCategory() {
  const grouped: Record<BlockCategory, BlockItem[]> = {
    navigation: [],
    layout: [],
    chat: [],
    lists: [],
    commerce: [],
    media: [],
    datepicker: [],
    splash: [],
  };
  for (const b of blocks) grouped[b.category].push(b);
  return grouped;
}
