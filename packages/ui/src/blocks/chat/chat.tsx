import React, { useRef, useEffect } from 'react';
import { View, ScrollView, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { Text } from '../../components/text';
import { SmartInput } from '../layout/smart-input';
import { cn } from '../../lib/cn';
import { tv } from '../../lib/tv';

// ─── Types ───────────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  /** Secondary text (small, muted) — timestamps, meta. */
  secondary?: string;
  /** Main content size: sm (small), default, lg (big). */
  contentSize?: 'sm' | 'default' | 'lg';
  /** Reserved: attachments, tags. */
}

export interface ChatSuggestionsProps {
  suggestions: string[];
  onSelect: (text: string) => void;
  className?: string;
}

export interface ChatProps {
  messages: ChatMessage[];
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  placeholder?: string;
  suggestions?: string[];
  onSuggestionPress?: (text: string) => void;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  loading?: boolean;
  header?: React.ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  /** Example message shown in empty state so users see the bubble UI. */
  exampleMessage?: ChatMessage;
  /** Custom message renderer (markdown, code, images). Falls back to ChatMessageBubble. */
  renderMessage?: (message: ChatMessage) => React.ReactNode;
  /** Shown at bottom when loading (typing indicator). */
  loadingIndicator?: React.ReactNode;
  /** Passed to SmartInput. Use false when Chat is in a contained demo. */
  inputSafeArea?: boolean;
  /** Offset for KeyboardAvoidingView when Chat has a header (e.g. StatusBar + header height). */
  keyboardVerticalOffset?: number;
  className?: string;
  messagesClassName?: string;
}

// ─── ChatMessage Variants ────────────────────────────────────

const contentSizeClasses = {
  sm: 'text-sm',
  default: 'text-base',
  lg: 'text-lg',
} as const;

const chatMessageBubbleVariants = tv({
  base: 'max-w-[85%] rounded-2xl px-4 py-3',
  variants: {
    role: {
      user: 'self-end bg-primary',
      assistant: 'self-start bg-muted',
      system: 'self-center bg-muted/50 max-w-[90%]',
    },
  },
  defaultVariants: { role: 'assistant' },
});

// ─── ChatMessage ─────────────────────────────────────────────

export function ChatMessageBubble({
  message,
  contentClassName,
}: {
  message: ChatMessage;
  contentClassName?: string;
}) {
  const role = message.role === 'system' ? 'system' : message.role;
  const isUser = message.role === 'user';
  const sizeClass = contentSizeClasses[message.contentSize ?? 'default'];

  return (
    <View
      accessible
      accessibilityRole="none"
      accessibilityLabel={
        isUser ? 'Your message' : message.role === 'system' ? 'System message' : 'Assistant message'
      }
      className={chatMessageBubbleVariants({ role })}
    >
      <Text
        className={cn(
          'leading-relaxed',
          sizeClass,
          isUser ? 'text-primary-foreground' : 'text-foreground',
          contentClassName
        )}
      >
        {message.content}
      </Text>
      {message.secondary && (
        <Text
          className={cn(
            'mt-1 text-xs',
            isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
          )}
        >
          {message.secondary}
        </Text>
      )}
    </View>
  );
}

// ─── ChatSuggestions ──────────────────────────────────────────

export function ChatSuggestions({ suggestions, onSelect, className }: ChatSuggestionsProps) {
  return (
    <View className={cn('flex-row flex-wrap justify-center gap-2 px-4 py-6', className)}>
      {suggestions.map((text, i) => (
        <Pressable
          key={`${text}-${i}`}
          onPress={() => onSelect(text)}
          accessibilityRole="button"
          accessibilityLabel={`Suggestion: ${text}`}
          className="rounded-full border border-border bg-muted px-4 py-2 active:bg-muted"
        >
          <Text className="text-sm text-foreground">{text}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const EMPTY_SUGGESTIONS: string[] = [];

// ─── Chat ────────────────────────────────────────────────────

export function Chat({
  messages,
  value,
  onChangeText,
  onSend,
  placeholder = 'Message...',
  suggestions = EMPTY_SUGGESTIONS,
  onSuggestionPress,
  leftSlot,
  rightSlot,
  loading = false,
  header,
  emptyTitle,
  emptyDescription,
  exampleMessage,
  renderMessage,
  loadingIndicator,
  inputSafeArea = true,
  keyboardVerticalOffset = 0,
  className,
  messagesClassName,
}: ChatProps) {
  const scrollRef = useRef<ScrollView>(null);
  const isEmpty = messages.length === 0;
  const showSuggestions = isEmpty && suggestions.length > 0;

  useEffect(() => {
    if (!showSuggestions && messages.length > 0) {
      scrollRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages.length, showSuggestions]);

  const defaultRightSlot = rightSlot ?? (
    <ChatSendButton onPress={onSend} disabled={loading || !value.trim()} />
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={{ flex: 1 }}
      className={className}
    >
      {header}
      <ScrollView
        ref={scrollRef}
        className={cn('flex-1', messagesClassName)}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 8,
          justifyContent: showSuggestions ? 'center' : 'flex-end',
        }}
        keyboardShouldPersistTaps="handled"
      >
        {showSuggestions ? (
          <View className="flex-1 justify-center">
            {exampleMessage && (
              <View className="mb-6 px-4">
                {renderMessage ? (
                  renderMessage(exampleMessage)
                ) : (
                  <ChatMessageBubble message={exampleMessage} />
                )}
              </View>
            )}
            {emptyTitle && (
              <Text className="mb-1 text-center text-lg font-medium text-foreground">
                {emptyTitle}
              </Text>
            )}
            {emptyDescription && (
              <Text className="mb-4 text-center text-sm text-muted-foreground">
                {emptyDescription}
              </Text>
            )}
            <ChatSuggestions suggestions={suggestions} onSelect={onSuggestionPress ?? (() => {})} />
          </View>
        ) : (
          <View className="gap-3 px-4 pt-4">
            {messages.map((msg) =>
              renderMessage ? (
                <React.Fragment key={msg.id}>{renderMessage(msg)}</React.Fragment>
              ) : (
                <ChatMessageBubble key={msg.id} message={msg} />
              )
            )}
            {loading && loadingIndicator && <View className="px-4">{loadingIndicator}</View>}
          </View>
        )}
      </ScrollView>
      <SmartInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        leftSlot={leftSlot}
        rightSlot={defaultRightSlot}
        editable={!loading}
        safeArea={inputSafeArea}
      />
    </KeyboardAvoidingView>
  );
}

// ─── ChatSendButton ───────────────────────────────────────────

function ChatSendButton({ onPress, disabled }: { onPress: () => void; disabled?: boolean }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={disabled ? 'Send (disabled)' : 'Send message'}
      className={cn(
        'h-11 w-11 items-center justify-center rounded-full',
        disabled ? 'bg-muted opacity-50' : 'bg-primary active:opacity-90'
      )}
    >
      <Text className="text-lg text-primary-foreground">↑</Text>
    </Pressable>
  );
}
