export interface PropEntry {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export const propsData: Record<string, PropEntry[]> = {
  button: [
    {
      name: 'variant',
      type: "'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link'",
      default: "'default'",
      description: 'Visual style variant.',
    },
    {
      name: 'size',
      type: "'default' | 'sm' | 'lg' | 'icon'",
      default: "'default'",
      description: 'Button size.',
    },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction.' },
    { name: 'onPress', type: '() => void', description: 'Press handler.' },
    { name: 'className', type: 'string', description: 'Additional Tailwind classes.' },
  ],
  input: [
    {
      name: 'variant',
      type: "'default' | 'error'",
      default: "'default'",
      description: 'Input variant.',
    },
    { name: 'placeholder', type: 'string', description: 'Placeholder text.' },
    { name: 'value', type: 'string', description: 'Controlled value.' },
    { name: 'onChangeText', type: '(text: string) => void', description: 'Text change handler.' },
    {
      name: 'editable',
      type: 'boolean',
      default: 'true',
      description: 'Whether input is editable.',
    },
  ],
  card: [
    {
      name: 'variant',
      type: "'default' | 'flat'",
      default: "'default'",
      description: 'Card style — bordered or flat.',
    },
    { name: 'className', type: 'string', description: 'Additional Tailwind classes.' },
  ],
  badge: [
    {
      name: 'variant',
      type: "'default' | 'secondary' | 'destructive' | 'outline' | 'success'",
      default: "'default'",
      description: 'Badge variant.',
    },
    { name: 'className', type: 'string', description: 'Additional Tailwind classes.' },
  ],
  alert: [
    {
      name: 'variant',
      type: "'default' | 'destructive' | 'success' | 'warning'",
      default: "'default'",
      description: 'Alert variant.',
    },
    { name: 'className', type: 'string', description: 'Additional Tailwind classes.' },
  ],
  avatar: [
    {
      name: 'size',
      type: "'sm' | 'default' | 'lg'",
      default: "'default'",
      description: 'Avatar size.',
    },
    { name: 'className', type: 'string', description: 'Additional Tailwind classes.' },
  ],
  switch: [
    { name: 'checked', type: 'boolean', description: 'Controlled checked state.' },
    { name: 'onCheckedChange', type: '(checked: boolean) => void', description: 'Change handler.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction.' },
  ],
  checkbox: [
    { name: 'checked', type: 'boolean', description: 'Controlled checked state.' },
    { name: 'onCheckedChange', type: '(checked: boolean) => void', description: 'Change handler.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction.' },
  ],
  progress: [
    { name: 'value', type: 'number', description: 'Progress value (0–100).' },
    {
      name: 'size',
      type: "'sm' | 'default' | 'lg'",
      default: "'default'",
      description: 'Bar height.',
    },
  ],
  spinner: [
    {
      name: 'size',
      type: "'sm' | 'default' | 'lg'",
      default: "'default'",
      description: 'Spinner size.',
    },
    { name: 'color', type: 'string', description: 'Hex color override.' },
  ],
  separator: [
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: 'Divider direction.',
    },
  ],
  skeleton: [
    {
      name: 'className',
      type: 'string',
      description: 'Size/shape via Tailwind (h-*, w-*, rounded-*).',
    },
  ],
  text: [
    {
      name: 'variant',
      type: "'body' | 'caption' | 'heading' | 'title' | 'label'",
      default: "'body'",
      description: 'Semantic text variant.',
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'",
      default: "'base'",
      description: 'Font size.',
    },
    { name: 'className', type: 'string', description: 'Additional Tailwind classes.' },
  ],
  tabs: [
    { name: 'defaultValue', type: 'string', description: 'Initially selected tab.' },
    { name: 'value', type: 'string', description: 'Controlled selected tab.' },
    { name: 'onValueChange', type: '(value: string) => void', description: 'Tab change handler.' },
  ],
  accordion: [
    {
      name: 'type',
      type: "'single' | 'multiple'",
      default: "'single'",
      description: 'Allow one or many open at once.',
    },
    { name: 'defaultValue', type: 'string | string[]', description: 'Initially open item(s).' },
  ],
  textarea: [
    { name: 'placeholder', type: 'string', description: 'Placeholder text.' },
    { name: 'value', type: 'string', description: 'Controlled value.' },
    { name: 'onChangeText', type: '(text: string) => void', description: 'Text change handler.' },
  ],
  'radio-group': [
    { name: 'value', type: 'string', description: 'Controlled selected value.' },
    { name: 'onValueChange', type: '(value: string) => void', description: 'Change handler.' },
  ],
  'numeric-input': [
    { name: 'value', type: 'number | null', description: 'Controlled numeric value.' },
    {
      name: 'onValueChange',
      type: '(value: number | null) => void',
      description: 'Change handler.',
    },
    { name: 'min', type: 'number', description: 'Minimum value.' },
    { name: 'max', type: 'number', description: 'Maximum value.' },
    { name: 'showSteppers', type: 'boolean', default: 'false', description: 'Show +/- buttons.' },
  ],
  'segmented-control': [
    { name: 'value', type: 'string', description: 'Controlled selected value.' },
    { name: 'onValueChange', type: '(value: string) => void', description: 'Change handler.' },
    {
      name: 'variant',
      type: "'default' | 'pill'",
      default: "'default'",
      description: 'Visual style.',
    },
  ],
  toggle: [
    { name: 'pressed', type: 'boolean', description: 'Controlled pressed state.' },
    { name: 'onPressedChange', type: '(pressed: boolean) => void', description: 'Change handler.' },
    {
      name: 'variant',
      type: "'default' | 'outline'",
      default: "'default'",
      description: 'Visual style.',
    },
  ],
  select: [
    { name: 'value', type: 'string', description: 'Controlled selected value.' },
    { name: 'onValueChange', type: '(value: string) => void', description: 'Change handler.' },
    { name: 'placeholder', type: 'string', description: 'Placeholder when no selection.' },
  ],
  label: [
    { name: 'children', type: 'string | ReactNode', description: 'Label text.' },
    { name: 'className', type: 'string', description: 'Additional Tailwind classes.' },
  ],
  'form-field': [
    { name: 'invalid', type: 'boolean', default: 'false', description: 'Show error styling.' },
  ],
  'data-row': [{ name: 'className', type: 'string', description: 'Additional Tailwind classes.' }],
  stack: [
    {
      name: 'gap',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      default: "'sm'",
      description: 'Gap between children.',
    },
    {
      name: 'align',
      type: "'start' | 'center' | 'end' | 'stretch'",
      description: 'Cross-axis alignment.',
    },
  ],
  row: [
    {
      name: 'gap',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      default: "'sm'",
      description: 'Gap between children.',
    },
    {
      name: 'align',
      type: "'start' | 'center' | 'end' | 'stretch'",
      description: 'Cross-axis alignment.',
    },
  ],
};
