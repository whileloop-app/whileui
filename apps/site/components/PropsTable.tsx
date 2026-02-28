import React from 'react';
import { View } from 'react-native';
import { Text, Row, Separator } from '@thewhileloop/whileui';
import type { PropEntry } from '../lib/props-data';

interface PropsTableProps {
  props: PropEntry[];
}

function PropRow({ prop }: { prop: PropEntry }) {
  return (
    <View className="py-3 px-4 gap-1">
      <Row className="items-center gap-2 flex-wrap">
        <Text className="text-sm font-semibold text-foreground" style={{ fontFamily: 'monospace' }}>
          {prop.name}
        </Text>
        <Text
          className="text-xs text-primary bg-accent px-1.5 py-0.5 rounded"
          style={{ fontFamily: 'monospace' }}
        >
          {prop.type}
        </Text>
        {prop.default && <Text className="text-xs text-muted-foreground">= {prop.default}</Text>}
      </Row>
      <Text className="text-sm text-muted-foreground">{prop.description}</Text>
    </View>
  );
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <View className="rounded-lg border border-border overflow-hidden">
      <View className="bg-muted px-4 py-2">
        <Row className="items-center">
          <Text className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
            Prop
          </Text>
        </Row>
      </View>
      {props.map((prop, i) => (
        <View key={prop.name}>
          {i > 0 && <Separator />}
          <PropRow prop={prop} />
        </View>
      ))}
    </View>
  );
}
