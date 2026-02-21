import React from 'react';
import { View, ScrollView, Pressable, Dimensions, type ViewProps } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Text } from '../../components/text';
import { Spinner } from '../../components/spinner';
import { cn } from '../../lib/cn';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export interface FormModalScreenProps extends Omit<ViewProps, 'className'> {
  className?: string;
  title: string;
  subtitle?: string;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  onClose?: () => void;
  loading?: boolean;
  saving?: boolean;
  savingText?: string;
  scrollEnabled?: boolean;
  children: React.ReactNode;
}

function FormModalScreen({
  className,
  title,
  subtitle,
  leftSlot,
  rightSlot,
  onClose,
  loading = false,
  saving = false,
  savingText = 'Saving...',
  scrollEnabled = true,
  children,
  ...props
}: FormModalScreenProps) {
  const content = loading ? (
    <SafeAreaView style={{ flex: 1 }} className="bg-background" edges={['top']}>
      <View style={{ flex: 1 }} className="items-center justify-center">
        <Spinner />
      </View>
    </SafeAreaView>
  ) : (
    <SafeAreaView
      style={{ flex: 1 }}
      className={cn('bg-background', className)}
      edges={['top']}
      {...props}
    >
      <View className="flex-row items-center px-4 py-3 border-b border-border">
        <View className="w-12">
          {leftSlot ? (
            leftSlot
          ) : onClose ? (
            <Pressable
              onPress={onClose}
              disabled={saving}
              className="p-2 -m-2 active:opacity-50 min-w-[44px] min-h-[44px] items-center justify-center"
              accessibilityRole="button"
              accessibilityLabel="Close"
            >
              <Text className="text-foreground text-xl font-medium">×</Text>
            </Pressable>
          ) : null}
        </View>

        <View className="flex-1 items-center">
          <Text variant="title" className="text-center">
            {title}
          </Text>
          {subtitle && (
            <Text variant="caption" className="text-center text-muted-foreground">
              {subtitle}
            </Text>
          )}
        </View>

        <View className="w-12 items-end">{rightSlot}</View>
      </View>

      {saving && (
        <View className="bg-primary px-4 py-2 flex-row items-center justify-center gap-2">
          <Spinner size="sm" />
          <Text className="text-primary-foreground text-sm">{savingText}</Text>
        </View>
      )}

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, minHeight: SCREEN_HEIGHT * 0.4 }}
        scrollEnabled={!saving && scrollEnabled}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );

  // Wrap in SafeAreaProvider so layout works inside Modal (which renders outside app tree)
  return (
    <SafeAreaProvider style={{ flex: 1, minHeight: SCREEN_HEIGHT }}>{content}</SafeAreaProvider>
  );
}

export { FormModalScreen };
