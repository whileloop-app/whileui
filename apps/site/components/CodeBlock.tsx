import React, { useState, useCallback } from 'react';
import { View, Pressable, ScrollView } from 'react-native';
import { Text, Row } from '@thewhileloop/whileui';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'tsx' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {}
  }, [code]);

  return (
    <View className="rounded-lg border border-border bg-muted overflow-hidden">
      <Row className="items-center justify-between px-4 py-2 border-b border-border">
        <Text className="text-xs text-muted-foreground font-medium">{language}</Text>
        <Pressable onPress={handleCopy} className="px-2 py-1 rounded active:opacity-70">
          <Text className="text-xs text-muted-foreground font-medium">
            {copied ? 'Copied!' : 'Copy'}
          </Text>
        </Pressable>
      </Row>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="p-4">
          <Text
            className="text-sm text-foreground font-normal leading-relaxed"
            style={{ fontFamily: 'monospace' }}
          >
            {code}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
