import React from 'react';
import { View, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Text, Badge, BadgeText, Card, CardContent, Row, Stack } from '@thewhileloop/whileui';
import {
  components,
  categoryLabels,
  getComponentsByCategory,
  type RegistryCategory,
} from '../../lib/registry';

export default function ComponentsPage() {
  const router = useRouter();
  const { cat } = useLocalSearchParams<{ cat?: string }>();
  const grouped = getComponentsByCategory();
  const activeCategory = (cat as RegistryCategory) || null;

  const categories = Object.keys(categoryLabels) as RegistryCategory[];

  const filteredComponents = activeCategory
    ? components.filter((c) => c.category === activeCategory)
    : components;

  return (
    <View className="p-6 max-w-5xl self-center w-full gap-6">
      <Stack className="gap-2">
        <Text className="text-3xl font-bold text-foreground tracking-tight">Components</Text>
        <Text className="text-base text-muted-foreground leading-relaxed">
          {components.length} components built with Tailwind Variants. Click any component to see a
          live preview and code.
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
            All ({components.length})
          </Text>
        </Pressable>
        {categories.map((key) => (
          <Pressable
            key={key}
            onPress={() => router.setParams({ cat: key })}
            className={`px-3 py-1.5 rounded-full ${activeCategory === key ? 'bg-primary' : 'bg-secondary'}`}
          >
            <Text
              className={`text-sm font-medium ${activeCategory === key ? 'text-primary-foreground' : 'text-secondary-foreground'}`}
            >
              {categoryLabels[key]} ({grouped[key].length})
            </Text>
          </Pressable>
        ))}
      </Row>

      {/* Component grid */}
      <View className="flex-row flex-wrap gap-3">
        {filteredComponents.map((c) => (
          <Pressable
            key={c.slug}
            onPress={() => router.push(`/components/${c.slug}` as any)}
            className="active:scale-95"
          >
            <Card className="w-[260px]">
              <CardContent className="p-4 gap-2">
                <Row className="items-center justify-between">
                  <Text className="text-base font-semibold text-foreground">{c.name}</Text>
                  <Badge variant="outline" className="px-1.5 py-0">
                    <BadgeText className="text-xs">{c.category}</BadgeText>
                  </Badge>
                </Row>
                <Text className="text-sm text-muted-foreground leading-snug" numberOfLines={2}>
                  {c.description}
                </Text>
                {c.subComponents && c.subComponents.length > 0 && (
                  <Row className="flex-wrap gap-1 mt-1">
                    {c.subComponents.slice(0, 3).map((sc) => (
                      <Badge key={sc} variant="secondary" className="px-1.5 py-0">
                        <BadgeText className="text-xs">{sc}</BadgeText>
                      </Badge>
                    ))}
                    {c.subComponents.length > 3 && (
                      <Badge variant="secondary" className="px-1.5 py-0">
                        <BadgeText className="text-xs">+{c.subComponents.length - 3}</BadgeText>
                      </Badge>
                    )}
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
