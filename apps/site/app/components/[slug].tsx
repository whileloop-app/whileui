import React from 'react';
import { View, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import {
  Text,
  Badge,
  BadgeText,
  Card,
  CardContent,
  Row,
  Stack,
  Separator,
  useThemeColors,
} from '@thewhileloop/whileui';
import { components, categoryLabels } from '../../lib/registry';
import { demos } from '../../lib/demos';
import { propsData } from '../../lib/props-data';
import { PreviewCard } from '../../components/PreviewCard';
import { CodeBlock } from '../../components/CodeBlock';
import { PropsTable } from '../../components/PropsTable';

export default function ComponentDetailPage() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const colors = useThemeColors();

  const component = components.find((c) => c.slug === slug);
  const demo = slug ? demos[slug] : undefined;
  const props = slug ? propsData[slug] : undefined;

  if (!component) {
    return (
      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-lg text-muted-foreground">Component not found.</Text>
      </View>
    );
  }

  const idx = components.indexOf(component);
  const prev = idx > 0 ? components[idx - 1] : null;
  const next = idx < components.length - 1 ? components[idx + 1] : null;

  return (
    <View className="p-6 max-w-4xl self-center w-full gap-8">
      {/* Breadcrumb */}
      <Row className="items-center gap-2">
        <Pressable onPress={() => router.push('/components' as any)}>
          <Text className="text-sm text-muted-foreground">Components</Text>
        </Pressable>
        <Feather name="chevron-right" size={12} color={colors.mutedForeground} />
        <Text className="text-sm text-foreground font-medium">{component.name}</Text>
      </Row>

      {/* Header */}
      <Stack className="gap-2">
        <Row className="items-center gap-3">
          <Text className="text-3xl font-bold text-foreground tracking-tight">
            {component.name}
          </Text>
          <Badge variant="outline">
            <BadgeText>{categoryLabels[component.category]}</BadgeText>
          </Badge>
        </Row>
        <Text className="text-base text-muted-foreground leading-relaxed">
          {component.description}
        </Text>
        {component.subComponents && component.subComponents.length > 0 && (
          <Row className="flex-wrap gap-1.5 mt-1">
            {component.subComponents.map((sc) => (
              <Badge key={sc} variant="secondary">
                <BadgeText>{sc}</BadgeText>
              </Badge>
            ))}
          </Row>
        )}
      </Stack>

      <Separator />

      {/* Import */}
      <Stack className="gap-2">
        <Text className="text-lg font-semibold text-foreground">Import</Text>
        <CodeBlock
          code={`import { ${component.name}${component.subComponents ? ', ' + component.subComponents.join(', ') : ''} } from '@thewhileloop/whileui';`}
          language="tsx"
        />
      </Stack>

      {/* Usage / Live Preview */}
      {demo && (
        <Stack className="gap-6">
          <PreviewCard title="Usage" description="Interactive live preview." code={demo.code}>
            {demo.preview}
          </PreviewCard>

          {demo.variants?.map((variant, i) => (
            <PreviewCard key={i} title={variant.title} code={variant.code}>
              {variant.preview}
            </PreviewCard>
          ))}
        </Stack>
      )}

      {/* API Reference */}
      {props && props.length > 0 && (
        <Stack className="gap-3">
          <Text className="text-lg font-semibold text-foreground">API Reference</Text>
          <Text className="text-sm text-muted-foreground">
            {component.name} accepts all standard React Native props plus the following:
          </Text>
          <PropsTable props={props} />
        </Stack>
      )}

      {/* Platform */}
      <Stack className="gap-2">
        <Text className="text-lg font-semibold text-foreground">Platform Support</Text>
        <Row className="gap-2">
          <Badge variant="success">
            <BadgeText>iOS</BadgeText>
          </Badge>
          <Badge variant="success">
            <BadgeText>Android</BadgeText>
          </Badge>
          <Badge variant="success">
            <BadgeText>Web</BadgeText>
          </Badge>
        </Row>
      </Stack>

      {/* Prev / Next Navigation */}
      <Row className="justify-between pt-4 border-t border-border">
        {prev ? (
          <Pressable
            onPress={() => router.push(`/components/${prev.slug}` as any)}
            className="active:opacity-70"
          >
            <Text className="text-xs text-muted-foreground">Previous</Text>
            <Row className="items-center gap-1">
              <Feather name="arrow-left" size={14} color={colors.primary} />
              <Text className="text-sm font-medium text-primary">{prev.name}</Text>
            </Row>
          </Pressable>
        ) : (
          <View />
        )}
        {next ? (
          <Pressable
            onPress={() => router.push(`/components/${next.slug}` as any)}
            className="items-end active:opacity-70"
          >
            <Text className="text-xs text-muted-foreground">Next</Text>
            <Row className="items-center gap-1">
              <Text className="text-sm font-medium text-primary">{next.name}</Text>
              <Feather name="arrow-right" size={14} color={colors.primary} />
            </Row>
          </Pressable>
        ) : (
          <View />
        )}
      </Row>
    </View>
  );
}
