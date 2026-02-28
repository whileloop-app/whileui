import React from 'react';
import { View, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Text, Badge, BadgeText, Card, CardContent, Row, Stack } from '@thewhileloop/whileui';
import {
  blocks,
  blockCategoryLabels,
  getBlocksByCategory,
  type BlockCategory,
} from '../../lib/registry';

export default function BlocksPage() {
  const router = useRouter();
  const { cat } = useLocalSearchParams<{ cat?: string }>();
  const grouped = getBlocksByCategory();
  const activeCategory = (cat as BlockCategory) || null;

  const categories = Object.keys(blockCategoryLabels) as BlockCategory[];

  const filteredBlocks = activeCategory
    ? blocks.filter((b) => b.category === activeCategory)
    : blocks;

  return (
    <View className="p-6 max-w-5xl self-center w-full gap-6">
      <Stack className="gap-2">
        <Text className="text-3xl font-bold text-foreground tracking-tight">Blocks</Text>
        <Text className="text-base text-muted-foreground leading-relaxed">
          {blocks.length} pre-built screen compositions. Ready to drop into your app and customize.
        </Text>
      </Stack>

      {/* Category filter */}
      <Row className="flex-wrap gap-2">
        <Pressable
          onPress={() => router.setParams({ cat: '' })}
          className={`px-3 py-1.5 rounded-full ${!activeCategory ? 'bg-primary' : 'bg-secondary'}`}
        >
          <Text
            className={`text-sm font-medium ${!activeCategory ? 'text-primary-foreground' : 'text-secondary-foreground'}`}
          >
            All ({blocks.length})
          </Text>
        </Pressable>
        {categories.map((key) => {
          const count = grouped[key].length;
          if (count === 0) return null;
          return (
            <Pressable
              key={key}
              onPress={() => router.setParams({ cat: key })}
              className={`px-3 py-1.5 rounded-full ${activeCategory === key ? 'bg-primary' : 'bg-secondary'}`}
            >
              <Text
                className={`text-sm font-medium ${activeCategory === key ? 'text-primary-foreground' : 'text-secondary-foreground'}`}
              >
                {blockCategoryLabels[key]} ({count})
              </Text>
            </Pressable>
          );
        })}
      </Row>

      {/* Blocks grid */}
      <View className="flex-row flex-wrap gap-3">
        {filteredBlocks.map((b) => (
          <Pressable
            key={b.slug}
            onPress={() => router.push(`/blocks/${b.slug}` as any)}
            className="active:scale-95"
          >
            <Card className="w-[280px]">
              <CardContent className="p-4 gap-2">
                <Row className="items-center justify-between">
                  <Text className="text-base font-semibold text-foreground">{b.name}</Text>
                  <Row className="gap-1">
                    {b.webSupport === 'mobile-only' && (
                      <Badge variant="secondary" className="px-1.5 py-0">
                        <BadgeText className="text-xs">Mobile</BadgeText>
                      </Badge>
                    )}
                    <Badge variant="outline" className="px-1.5 py-0">
                      <BadgeText className="text-xs">{blockCategoryLabels[b.category]}</BadgeText>
                    </Badge>
                  </Row>
                </Row>
                <Text className="text-sm text-muted-foreground leading-snug" numberOfLines={2}>
                  {b.description}
                </Text>
                {b.subComponents && b.subComponents.length > 0 && (
                  <Row className="flex-wrap gap-1 mt-1">
                    {b.subComponents.map((sc) => (
                      <Badge key={sc} variant="secondary" className="px-1.5 py-0">
                        <BadgeText className="text-xs">{sc}</BadgeText>
                      </Badge>
                    ))}
                  </Row>
                )}
              </CardContent>
            </Card>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
