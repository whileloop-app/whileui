import React, { useState } from 'react';
import { View, Pressable as RNPressable } from 'react-native';
import {
  Text,
  Button,
  ButtonText,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Badge,
  BadgeText,
  Alert,
  AlertTitle,
  AlertDescription,
  Avatar,
  AvatarFallback,
  Switch,
  Checkbox,
  Progress,
  Spinner,
  Separator,
  Skeleton,
  Stack,
  Row,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Label,
  Textarea,
  RadioGroup,
  RadioGroupItem,
  FormField,
  FormLabel,
  FormControl,
  FormHint,
  NumericInput,
  DataRow,
  DataRowLeft,
  DataRowRight,
  DataRowLabel,
  DataRowValue,
  SegmentedControl,
  SegmentedControlItem,
  SegmentedControlItemText,
  Toggle,
  ToggleText,
  ToggleGroup,
  ToggleGroupItem,
  ToggleGroupItemText,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  AspectRatio,
  LabeledField,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Pressable,
  useThemeColors,
} from '@thewhileloop/whileui';
import { Feather } from '@expo/vector-icons';

interface DemoEntry {
  preview: React.ReactNode;
  code: string;
  variants?: { title: string; preview: React.ReactNode; code: string }[];
}

function ButtonDemo() {
  return (
    <Row className="flex-wrap gap-3 items-center">
      <Button>
        <ButtonText>Default</ButtonText>
      </Button>
      <Button variant="secondary">
        <ButtonText>Secondary</ButtonText>
      </Button>
      <Button variant="outline">
        <ButtonText>Outline</ButtonText>
      </Button>
      <Button variant="ghost">
        <ButtonText>Ghost</ButtonText>
      </Button>
      <Button variant="destructive">
        <ButtonText>Destructive</ButtonText>
      </Button>
      <Button variant="link">
        <ButtonText>Link</ButtonText>
      </Button>
    </Row>
  );
}

function ButtonSizesDemo() {
  return (
    <Row className="flex-wrap gap-3 items-center">
      <Button size="sm">
        <ButtonText>Small</ButtonText>
      </Button>
      <Button size="default">
        <ButtonText>Default</ButtonText>
      </Button>
      <Button size="lg">
        <ButtonText>Large</ButtonText>
      </Button>
      <Button size="icon">
        <ButtonText>IC</ButtonText>
      </Button>
    </Row>
  );
}

function CardDemo() {
  return (
    <Card className="w-[320px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>A short description of the card content.</CardDescription>
      </CardHeader>
      <CardContent>
        <Text className="text-sm text-muted-foreground">
          This is the card body content. You can put anything here.
        </Text>
      </CardContent>
      <CardFooter>
        <Button size="sm">
          <ButtonText>Action</ButtonText>
        </Button>
      </CardFooter>
    </Card>
  );
}

function InputDemo() {
  const [value, setValue] = useState('');
  return (
    <Stack className="gap-3 w-[300px]">
      <Input placeholder="Enter your email..." value={value} onChangeText={setValue} />
      <Input placeholder="Error state" variant="error" />
      <Input placeholder="Disabled" editable={false} />
    </Stack>
  );
}

function BadgeDemo() {
  return (
    <Row className="flex-wrap gap-2">
      <Badge>
        <BadgeText>Default</BadgeText>
      </Badge>
      <Badge variant="secondary">
        <BadgeText>Secondary</BadgeText>
      </Badge>
      <Badge variant="destructive">
        <BadgeText>Destructive</BadgeText>
      </Badge>
      <Badge variant="outline">
        <BadgeText>Outline</BadgeText>
      </Badge>
      <Badge variant="success">
        <BadgeText>Success</BadgeText>
      </Badge>
    </Row>
  );
}

function AlertDemo() {
  return (
    <Stack className="gap-3 w-[360px]">
      <Alert>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>This is a default alert message.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Operation completed successfully.</AlertDescription>
      </Alert>
    </Stack>
  );
}

function AvatarDemo() {
  return (
    <Row className="gap-3 items-center">
      <Avatar size="sm">
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    </Row>
  );
}

function SwitchDemo() {
  const [on, setOn] = useState(false);
  return (
    <Row className="items-center gap-3">
      <Switch checked={on} onCheckedChange={setOn} />
      <Text className="text-sm text-foreground">{on ? 'On' : 'Off'}</Text>
    </Row>
  );
}

function CheckboxDemo() {
  const [checked, setChecked] = useState(false);
  return (
    <Row className="items-center gap-3">
      <Checkbox checked={checked} onCheckedChange={setChecked} />
      <Text className="text-sm text-foreground">Accept terms and conditions</Text>
    </Row>
  );
}

function ProgressDemo() {
  return (
    <Stack className="gap-3 w-[300px]">
      <Progress value={25} size="sm" />
      <Progress value={50} />
      <Progress value={75} size="lg" />
    </Stack>
  );
}

function SpinnerDemo() {
  return (
    <Row className="gap-4 items-center">
      <Spinner size="sm" />
      <Spinner />
      <Spinner size="lg" />
    </Row>
  );
}

function SeparatorDemo() {
  return (
    <Stack className="gap-3 w-[300px]">
      <Text className="text-sm text-foreground">Above</Text>
      <Separator />
      <Text className="text-sm text-foreground">Below</Text>
    </Stack>
  );
}

function SkeletonDemo() {
  return (
    <Stack className="gap-3 w-[300px]">
      <Skeleton className="h-4 w-3/4 rounded" />
      <Skeleton className="h-4 w-1/2 rounded" />
      <Skeleton className="h-20 w-full rounded-lg" />
    </Stack>
  );
}

function TextDemo() {
  return (
    <Stack className="gap-2">
      <Text variant="title" size="xl">
        Title XL
      </Text>
      <Text variant="heading" size="lg">
        Heading LG
      </Text>
      <Text variant="body">Body text — the default.</Text>
      <Text variant="caption" className="text-muted-foreground">
        Caption text for secondary info.
      </Text>
    </Stack>
  );
}

function StackDemo() {
  return (
    <Stack gap="md" className="w-full max-w-xs p-4 bg-muted rounded-lg">
      <View className="h-10 w-full bg-primary rounded-md" />
      <View className="h-10 w-full bg-primary rounded-md" />
      <View className="h-10 w-full bg-primary rounded-md" />
    </Stack>
  );
}

function RowDemo() {
  return (
    <Row gap="md" className="p-4 bg-muted rounded-lg">
      <View className="h-10 w-20 bg-primary rounded-md" />
      <View className="h-10 w-20 bg-primary rounded-md" />
      <View className="h-10 w-20 bg-primary rounded-md" />
    </Row>
  );
}

function TabsDemo() {
  return (
    <Tabs defaultValue="tab1" className="w-[320px]">
      <TabsList>
        <TabsTrigger value="tab1">
          <Text className="text-sm">Account</Text>
        </TabsTrigger>
        <TabsTrigger value="tab2">
          <Text className="text-sm">Settings</Text>
        </TabsTrigger>
        <TabsTrigger value="tab3">
          <Text className="text-sm">Billing</Text>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="p-4">
        <Text className="text-sm text-muted-foreground">Manage your account details.</Text>
      </TabsContent>
      <TabsContent value="tab2" className="p-4">
        <Text className="text-sm text-muted-foreground">Configure your preferences.</Text>
      </TabsContent>
      <TabsContent value="tab3" className="p-4">
        <Text className="text-sm text-muted-foreground">Manage billing and subscriptions.</Text>
      </TabsContent>
    </Tabs>
  );
}

function AccordionDemo() {
  return (
    <Accordion type="single" className="w-[360px]">
      <AccordionItem value="1">
        <AccordionTrigger>
          <Text className="text-sm font-medium text-foreground">What is WhileUI?</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text className="text-sm text-muted-foreground">
            A copy-paste component library for React Native and Web built with Tailwind CSS.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="2">
        <AccordionTrigger>
          <Text className="text-sm font-medium text-foreground">Does it work on web?</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text className="text-sm text-muted-foreground">
            Yes! All components work on iOS, Android, and Web via Expo.
          </Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function TextareaDemo() {
  return <Textarea placeholder="Write something..." className="w-[300px]" />;
}

function LabelDemo() {
  return (
    <Stack className="gap-1">
      <Label>Email address</Label>
      <Input placeholder="you@example.com" />
    </Stack>
  );
}

function RadioGroupDemo() {
  const [value, setValue] = useState('option1');
  return (
    <RadioGroup value={value} onValueChange={setValue}>
      <Row className="items-center gap-2">
        <RadioGroupItem value="option1" />
        <Text className="text-sm text-foreground">Option 1</Text>
      </Row>
      <Row className="items-center gap-2">
        <RadioGroupItem value="option2" />
        <Text className="text-sm text-foreground">Option 2</Text>
      </Row>
      <Row className="items-center gap-2">
        <RadioGroupItem value="option3" />
        <Text className="text-sm text-foreground">Option 3</Text>
      </Row>
    </RadioGroup>
  );
}

function FormFieldDemo() {
  return (
    <Stack className="gap-4 w-[300px]">
      <FormField>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input placeholder="Your name" />
        </FormControl>
        <FormHint>Enter your full name.</FormHint>
      </FormField>
      <FormField invalid>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input placeholder="you@example.com" variant="error" />
        </FormControl>
      </FormField>
    </Stack>
  );
}

function NumericInputDemo() {
  const [val, setVal] = useState<number | null>(5);
  return (
    <Stack className="gap-3 w-full max-w-[280px]">
      <NumericInput value={val} onValueChange={setVal} min={0} max={100} showSteppers />
    </Stack>
  );
}

function DataRowDemo() {
  return (
    <Stack className="w-[320px] gap-1">
      <DataRow>
        <DataRowLeft>
          <DataRowLabel>Status</DataRowLabel>
        </DataRowLeft>
        <DataRowRight>
          <DataRowValue>Active</DataRowValue>
        </DataRowRight>
      </DataRow>
      <DataRow>
        <DataRowLeft>
          <DataRowLabel>Plan</DataRowLabel>
        </DataRowLeft>
        <DataRowRight>
          <DataRowValue>Pro</DataRowValue>
        </DataRowRight>
      </DataRow>
      <DataRow>
        <DataRowLeft>
          <DataRowLabel>Members</DataRowLabel>
        </DataRowLeft>
        <DataRowRight>
          <DataRowValue>12</DataRowValue>
        </DataRowRight>
      </DataRow>
    </Stack>
  );
}

function SegmentedControlDemo() {
  const [value, setValue] = useState('day');
  return (
    <SegmentedControl value={value} onValueChange={setValue}>
      <SegmentedControlItem value="day">
        <SegmentedControlItemText>Day</SegmentedControlItemText>
      </SegmentedControlItem>
      <SegmentedControlItem value="week">
        <SegmentedControlItemText>Week</SegmentedControlItemText>
      </SegmentedControlItem>
      <SegmentedControlItem value="month">
        <SegmentedControlItemText>Month</SegmentedControlItemText>
      </SegmentedControlItem>
    </SegmentedControl>
  );
}

function ViewDemo() {
  return (
    <View className="p-4 bg-muted rounded-lg border border-border">
      <Text className="text-sm text-foreground">
        View is a styled wrapper around React Native's View with className support.
      </Text>
    </View>
  );
}

function PressableDemo() {
  const [count, setCount] = useState(0);
  const [pressed, setPressed] = useState(0);
  return (
    <Stack className="gap-3 items-start">
      <RNPressable
        onPress={() => setCount((c) => c + 1)}
        className="px-4 py-3 rounded-lg bg-primary active:bg-primary/80"
      >
        <Text className="text-sm font-medium text-primary-foreground">Pressed {count} times</Text>
      </RNPressable>
      <Pressable
        onPress={() => setPressed((p) => p + 1)}
        className="px-4 py-3 rounded-lg bg-secondary active:opacity-70"
      >
        <Text className="text-sm font-medium text-secondary-foreground">
          WhileUI Pressable — {pressed} clicks
        </Text>
      </Pressable>
    </Stack>
  );
}

function BoxDemo() {
  return (
    <Row className="gap-3">
      <View className="h-16 w-16 bg-primary rounded-lg" />
      <View className="h-16 w-16 bg-secondary rounded-xl" />
      <View className="h-16 w-16 bg-accent rounded-2xl" />
    </Row>
  );
}

function SelectDemo() {
  return (
    <View className="w-[240px]">
      <Select defaultValue={{ value: 'react', label: 'React Native' }}>
        <SelectTrigger>
          <SelectValue placeholder="Select framework" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="react" label="React Native" />
          <SelectItem value="flutter" label="Flutter" />
          <SelectItem value="swift" label="SwiftUI" />
          <SelectItem value="kotlin" label="Jetpack Compose" />
        </SelectContent>
      </Select>
    </View>
  );
}

function ToggleDemo() {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  return (
    <Row className="gap-2">
      <Toggle pressed={bold} onPressedChange={setBold}>
        <ToggleText>B</ToggleText>
      </Toggle>
      <Toggle pressed={italic} onPressedChange={setItalic} variant="outline">
        <ToggleText>I</ToggleText>
      </Toggle>
    </Row>
  );
}

function ToggleGroupDemo() {
  const [value, setValue] = useState('left');
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(v) => typeof v === 'string' && v && setValue(v)}
    >
      <ToggleGroupItem value="left">
        <ToggleGroupItemText>Left</ToggleGroupItemText>
      </ToggleGroupItem>
      <ToggleGroupItem value="center">
        <ToggleGroupItemText>Center</ToggleGroupItemText>
      </ToggleGroupItem>
      <ToggleGroupItem value="right">
        <ToggleGroupItemText>Right</ToggleGroupItemText>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

function AspectRatioDemo() {
  return (
    <View className="w-[280px]">
      <AspectRatio ratio={16 / 9}>
        <View className="flex-1 bg-muted rounded-lg items-center justify-center">
          <Text className="text-sm text-muted-foreground">16:9</Text>
        </View>
      </AspectRatio>
    </View>
  );
}

function CollapsibleDemo() {
  const [open, setOpen] = useState(false);
  const colors = useThemeColors();
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="w-[320px]">
      <Row className="items-center justify-between p-3 bg-muted rounded-lg">
        <Text className="text-sm font-medium text-foreground">Show details</Text>
        <CollapsibleTrigger>
          <View className="h-8 w-8 items-center justify-center rounded-md active:opacity-70">
            <Feather
              name={open ? 'chevron-up' : 'chevron-down'}
              size={16}
              color={colors.foreground}
            />
          </View>
        </CollapsibleTrigger>
      </Row>
      <CollapsibleContent>
        <View className="p-3 mt-1 bg-card rounded-lg border border-border">
          <Text className="text-sm text-muted-foreground">
            Hidden content revealed by the collapsible trigger.
          </Text>
        </View>
      </CollapsibleContent>
    </Collapsible>
  );
}

function LabeledFieldDemo() {
  return (
    <Stack className="gap-4 w-[300px]">
      <LabeledField label="Username" hint="Letters and numbers only">
        <Input placeholder="johndoe" />
      </LabeledField>
      <LabeledField label="Email" error="Invalid email address" invalid>
        <Input placeholder="you@example.com" variant="error" />
      </LabeledField>
    </Stack>
  );
}

export const demos: Record<string, DemoEntry> = {
  text: {
    preview: <TextDemo />,
    code: `<Text variant="title" size="xl">Title XL</Text>
<Text variant="heading" size="lg">Heading LG</Text>
<Text variant="body">Body text — the default.</Text>
<Text variant="caption">Caption text</Text>`,
  },
  stack: {
    preview: <StackDemo />,
    code: `<Stack gap="md" className="w-full">
  <View className="h-10 w-full bg-primary rounded-md" />
  <View className="h-10 w-full bg-primary rounded-md" />
  <View className="h-10 w-full bg-primary rounded-md" />
</Stack>`,
  },
  row: {
    preview: <RowDemo />,
    code: `<Row gap="md">
  <View className="h-10 w-20 bg-primary rounded-md" />
  <View className="h-10 w-20 bg-primary rounded-md" />
</Row>`,
  },
  button: {
    preview: <ButtonDemo />,
    code: `<Button variant="default">
  <ButtonText>Default</ButtonText>
</Button>
<Button variant="secondary">
  <ButtonText>Secondary</ButtonText>
</Button>
<Button variant="outline">
  <ButtonText>Outline</ButtonText>
</Button>`,
    variants: [
      {
        title: 'Sizes',
        preview: <ButtonSizesDemo />,
        code: `<Button size="sm"><ButtonText>Small</ButtonText></Button>
<Button size="default"><ButtonText>Default</ButtonText></Button>
<Button size="lg"><ButtonText>Large</ButtonText></Button>
      <Button size="lg"><ButtonText>Large+</ButtonText></Button>`,
      },
    ],
  },
  card: {
    preview: <CardDemo />,
    code: `<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    <Text>Card body content.</Text>
  </CardContent>
  <CardFooter>
    <Button size="sm"><ButtonText>Action</ButtonText></Button>
  </CardFooter>
</Card>`,
  },
  input: {
    preview: <InputDemo />,
    code: `<Input placeholder="Enter your email..." />
<Input placeholder="Error state" variant="error" />
<Input placeholder="Disabled" editable={false} />`,
  },
  badge: {
    preview: <BadgeDemo />,
    code: `<Badge><BadgeText>Default</BadgeText></Badge>
<Badge variant="secondary"><BadgeText>Secondary</BadgeText></Badge>
<Badge variant="destructive"><BadgeText>Destructive</BadgeText></Badge>
<Badge variant="outline"><BadgeText>Outline</BadgeText></Badge>
<Badge variant="success"><BadgeText>Success</BadgeText></Badge>`,
  },
  alert: {
    preview: <AlertDemo />,
    code: `<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>Default alert.</AlertDescription>
</Alert>
<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong.</AlertDescription>
</Alert>`,
  },
  avatar: {
    preview: <AvatarDemo />,
    code: `<Avatar size="sm"><AvatarFallback>SM</AvatarFallback></Avatar>
<Avatar><AvatarFallback>MD</AvatarFallback></Avatar>
<Avatar size="lg"><AvatarFallback>LG</AvatarFallback></Avatar>`,
  },
  switch: {
    preview: <SwitchDemo />,
    code: `const [on, setOn] = useState(false);
<Switch checked={on} onCheckedChange={setOn} />`,
  },
  checkbox: {
    preview: <CheckboxDemo />,
    code: `const [checked, setChecked] = useState(false);
<Checkbox checked={checked} onCheckedChange={setChecked} />`,
  },
  progress: {
    preview: <ProgressDemo />,
    code: `<Progress value={25} size="sm" />
<Progress value={50} />
<Progress value={75} size="lg" />`,
  },
  spinner: {
    preview: <SpinnerDemo />,
    code: `<Spinner size="sm" />
<Spinner />
<Spinner size="lg" />`,
  },
  separator: {
    preview: <SeparatorDemo />,
    code: `<Separator />`,
  },
  skeleton: {
    preview: <SkeletonDemo />,
    code: `<Skeleton className="h-4 w-3/4 rounded" />
<Skeleton className="h-4 w-1/2 rounded" />
<Skeleton className="h-20 w-full rounded-lg" />`,
  },
  tabs: {
    preview: <TabsDemo />,
    code: `<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Account</TabsTrigger>
    <TabsTrigger value="tab2">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">...</TabsContent>
  <TabsContent value="tab2">...</TabsContent>
</Tabs>`,
  },
  accordion: {
    preview: <AccordionDemo />,
    code: `<Accordion type="single">
  <AccordionItem value="1">
    <AccordionTrigger>Question?</AccordionTrigger>
    <AccordionContent>Answer.</AccordionContent>
  </AccordionItem>
</Accordion>`,
  },
  textarea: {
    preview: <TextareaDemo />,
    code: `<Textarea placeholder="Write something..." />`,
  },
  label: {
    preview: <LabelDemo />,
    code: `<Label>Email address</Label>
<Input placeholder="you@example.com" />`,
  },
  'radio-group': {
    preview: <RadioGroupDemo />,
    code: `<RadioGroup value={value} onValueChange={setValue}>
  <RadioGroupItem value="option1" />
  <RadioGroupItem value="option2" />
</RadioGroup>`,
  },
  'form-field': {
    preview: <FormFieldDemo />,
    code: `<FormField>
  <FormLabel required>Name</FormLabel>
  <FormControl>
    <Input placeholder="Your name" />
  </FormControl>
  <FormHint>Enter your full name.</FormHint>
</FormField>`,
  },
  'numeric-input': {
    preview: <NumericInputDemo />,
    code: `<NumericInput value={val} onValueChange={setVal}
  min={0} max={100} showSteppers />`,
  },
  'data-row': {
    preview: <DataRowDemo />,
    code: `<DataRow>
  <DataRowLeft><DataRowLabel>Status</DataRowLabel></DataRowLeft>
  <DataRowRight><DataRowValue>Active</DataRowValue></DataRowRight>
</DataRow>`,
  },
  'segmented-control': {
    preview: <SegmentedControlDemo />,
    code: `<SegmentedControl value={value} onValueChange={setValue}>
  <SegmentedControlItem value="day">
    <SegmentedControlItemText>Day</SegmentedControlItemText>
  </SegmentedControlItem>
  ...
</SegmentedControl>`,
  },
  view: {
    preview: <ViewDemo />,
    code: `<View className="p-4 bg-muted rounded-lg">
  <Text>Content inside View</Text>
</View>`,
  },
  pressable: {
    preview: <PressableDemo />,
    code: `<Pressable
  onPress={() => setCount((c) => c + 1)}
  className="px-4 py-3 rounded-lg bg-secondary active:opacity-70"
>
  <Text className="text-secondary-foreground">WhileUI Pressable</Text>
</Pressable>`,
  },
  box: {
    preview: <BoxDemo />,
    code: `<Box className="h-16 w-16 bg-primary rounded-lg" />
<Box className="h-16 w-16 bg-secondary rounded-xl" />`,
  },
  select: {
    preview: <SelectDemo />,
    code: `<Select defaultValue={{ value: 'react', label: 'React Native' }}>
  <SelectTrigger>
    <SelectValue placeholder="Select framework" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="react" label="React Native" />
    <SelectItem value="flutter" label="Flutter" />
  </SelectContent>
</Select>`,
  },
  toggle: {
    preview: <ToggleDemo />,
    code: `const [bold, setBold] = useState(false);
<Toggle pressed={bold} onPressedChange={setBold}>
  <ToggleText>B</ToggleText>
</Toggle>`,
  },
  'toggle-group': {
    preview: <ToggleGroupDemo />,
    code: `<ToggleGroup type="single" value={value} onValueChange={setValue}>
  <ToggleGroupItem value="left">
    <ToggleGroupItemText>Left</ToggleGroupItemText>
  </ToggleGroupItem>
  <ToggleGroupItem value="center">
    <ToggleGroupItemText>Center</ToggleGroupItemText>
  </ToggleGroupItem>
</ToggleGroup>`,
  },
  'aspect-ratio': {
    preview: <AspectRatioDemo />,
    code: `<AspectRatio ratio={16 / 9}>
  <View className="flex-1 bg-muted rounded-lg" />
</AspectRatio>`,
  },
  collapsible: {
    preview: <CollapsibleDemo />,
    code: `<Collapsible open={open} onOpenChange={setOpen}>
  <CollapsibleTrigger>
    <Text>Toggle</Text>
  </CollapsibleTrigger>
  <CollapsibleContent>
    <Text>Hidden content</Text>
  </CollapsibleContent>
</Collapsible>`,
  },
  'labeled-field': {
    preview: <LabeledFieldDemo />,
    code: `<LabeledField label="Username" hint="Letters and numbers only">
  <Input placeholder="johndoe" />
</LabeledField>
<LabeledField label="Email" error="Invalid email" invalid>
  <Input variant="error" />
</LabeledField>`,
  },
  dialog: {
    preview: (
      <View className="w-[360px] p-4 items-center">
        <Text className="text-sm text-muted-foreground text-center">
          Dialog opens as a modal overlay. Tap the trigger below to preview on device — web overlay
          rendering depends on Portal support.
        </Text>
      </View>
    ),
    code: `<Dialog>
  <DialogTrigger>
    <Button><ButtonText>Open Dialog</ButtonText></Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogDescription>Make changes to your profile.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose><ButtonText>Cancel</ButtonText></DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
  },
  'alert-dialog': {
    preview: (
      <View className="w-[360px] p-4 items-center">
        <Text className="text-sm text-muted-foreground text-center">
          AlertDialog presents a confirmation modal with Action/Cancel buttons. Best tested on
          device.
        </Text>
      </View>
    ),
    code: `<AlertDialog>
  <AlertDialogTrigger>
    <Button variant="destructive"><ButtonText>Delete</ButtonText></Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel><ButtonText>Cancel</ButtonText></AlertDialogCancel>
      <AlertDialogAction><ButtonText>Delete</ButtonText></AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
  },
  popover: {
    preview: (
      <View className="w-[360px] p-4 items-center">
        <Text className="text-sm text-muted-foreground text-center">
          Popover floats content anchored to a trigger. Uses @rn-primitives/popover under the hood.
        </Text>
      </View>
    ),
    code: `<Popover>
  <PopoverTrigger>
    <Button><ButtonText>Open Popover</ButtonText></Button>
  </PopoverTrigger>
  <PopoverContent>
    <Text>Popover content</Text>
    <PopoverClose />
  </PopoverContent>
</Popover>`,
  },
  tooltip: {
    preview: (
      <View className="w-[360px] p-4 items-center">
        <Text className="text-sm text-muted-foreground text-center">
          Tooltip shows a hint on hover (web) or long-press (native). Uses @rn-primitives/tooltip.
        </Text>
      </View>
    ),
    code: `<Tooltip>
  <TooltipTrigger>
    <Button><ButtonText>Hover me</ButtonText></Button>
  </TooltipTrigger>
  <TooltipContent>
    <Text>Helpful tooltip text</Text>
  </TooltipContent>
</Tooltip>`,
  },
  'dropdown-menu': {
    preview: (
      <View className="w-[360px] p-4 items-center">
        <Text className="text-sm text-muted-foreground text-center">
          DropdownMenu opens a list of actions from a trigger button. Uses overlay positioning.
        </Text>
      </View>
    ),
    code: `<DropdownMenu>
  <DropdownMenuTrigger>
    <Button><ButtonText>Options</ButtonText></Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuItem key="edit">Edit</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem key="delete">Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
  },
  'context-menu': {
    preview: (
      <View className="w-[360px] p-4 items-center">
        <Text className="text-sm text-muted-foreground text-center">
          ContextMenu appears on long-press (native) or right-click (web).
        </Text>
      </View>
    ),
    code: `<ContextMenu>
  <ContextMenuTrigger>
    <View className="p-6 bg-muted rounded-lg">
      <Text>Long press me</Text>
    </View>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem key="copy">Copy</ContextMenuItem>
    <ContextMenuItem key="paste">Paste</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
  },
  'hover-card': {
    preview: (
      <View className="w-[360px] p-4 items-center">
        <Text className="text-sm text-muted-foreground text-center">
          HoverCard shows rich content on hover. Web-only interaction — on native use Popover
          instead.
        </Text>
      </View>
    ),
    code: `<HoverCard>
  <HoverCardTrigger>
    <Text className="underline">@username</Text>
  </HoverCardTrigger>
  <HoverCardContent>
    <Text>User profile preview</Text>
  </HoverCardContent>
</HoverCard>`,
  },
  menubar: {
    preview: (
      <View className="w-[360px] p-4 items-center">
        <Text className="text-sm text-muted-foreground text-center">
          Menubar provides a horizontal menu bar with dropdown menus — common in desktop apps.
        </Text>
      </View>
    ),
    code: `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem key="new">New</MenubarItem>
      <MenubarItem key="open">Open</MenubarItem>
      <MenubarSeparator />
      <MenubarItem key="save">Save</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
  },
  toast: {
    preview: (
      <View className="w-[360px] p-4 items-center">
        <Text className="text-sm text-muted-foreground text-center">
          Toast shows brief notifications via useToast() hook. Requires ToastProvider wrapping your
          app.
        </Text>
      </View>
    ),
    code: `const { toast } = useToast();

toast({
  title: 'Saved!',
  description: 'Your changes have been saved.',
  variant: 'success',
});`,
  },
};
