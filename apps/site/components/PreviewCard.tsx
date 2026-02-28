import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { Text, Card, CardContent, Row } from '@thewhileloop/whileui';
import { CodeBlock } from './CodeBlock';

interface PreviewCardProps {
  title: string;
  description?: string;
  code: string;
  children: React.ReactNode;
}

export function PreviewCard({ title, description, code, children }: PreviewCardProps) {
  const [showCode, setShowCode] = useState(false);

  return (
    <View className="gap-3">
      <View className="gap-1">
        <Text className="text-lg font-semibold text-foreground">{title}</Text>
        {description && <Text className="text-sm text-muted-foreground">{description}</Text>}
      </View>

      <Card>
        <CardContent className="p-0">
          <View className="p-6 items-center justify-center min-h-[120px] border-b border-border">
            {children}
          </View>
          <Row className="px-4 py-2 justify-end border-b border-border">
            <Pressable
              onPress={() => setShowCode(!showCode)}
              className="px-3 py-1.5 rounded-md active:opacity-70 bg-secondary"
            >
              <Text className="text-xs font-medium text-secondary-foreground">
                {showCode ? 'Hide Code' : 'View Code'}
              </Text>
            </Pressable>
          </Row>
          {showCode && <CodeBlock code={code} />}
        </CardContent>
      </Card>
    </View>
  );
}
