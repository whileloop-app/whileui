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
import { blocks, blockCategoryLabels } from '../../lib/registry';
import { blockDemos } from '../../lib/block-demos';
import { PreviewCard } from '../../components/PreviewCard';
import { CodeBlock } from '../../components/CodeBlock';

function MobileOnlyNotice({ name }: { name: string }) {
  const colors = useThemeColors();
  return (
    <Card>
      <CardContent className="p-8 items-center">
        <Stack className="items-center gap-4 max-w-sm">
          <View className="h-14 w-14 rounded-full bg-muted items-center justify-center">
            <Feather name="smartphone" size={24} color={colors.mutedForeground} />
          </View>
          <Text className="text-base font-semibold text-foreground text-center">
            Mobile-Only Block
          </Text>
          <Text className="text-sm text-muted-foreground text-center leading-relaxed">
            {name} uses native mobile APIs (gestures, modals, safe areas) that don't translate to
            web. Run the showcase app on iOS or Android to see it in action.
          </Text>
          <Row className="gap-2 mt-1">
            <Badge variant="success">
              <BadgeText>iOS</BadgeText>
            </Badge>
            <Badge variant="success">
              <BadgeText>Android</BadgeText>
            </Badge>
            <Badge variant="outline">
              <BadgeText>Web N/A</BadgeText>
            </Badge>
          </Row>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function BlockDetailPage() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const colors = useThemeColors();

  const block = blocks.find((b) => b.slug === slug);
  const demo = slug ? blockDemos[slug] : undefined;

  if (!block) {
    return (
      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-lg text-muted-foreground">Block not found.</Text>
      </View>
    );
  }

  const importPath = `@thewhileloop/whileui/blocks/${block.category}`;
  const isMobileOnly = block.webSupport === 'mobile-only';

  return (
    <View className="p-6 max-w-4xl self-center w-full gap-8">
      {/* Breadcrumb */}
      <Row className="items-center gap-2">
        <Pressable onPress={() => router.push('/blocks' as any)}>
          <Text className="text-sm text-muted-foreground">Blocks</Text>
        </Pressable>
        <Feather name="chevron-right" size={12} color={colors.mutedForeground} />
        <Text className="text-sm text-foreground font-medium">{block.name}</Text>
      </Row>

      {/* Header */}
      <Stack className="gap-3">
        <Row className="items-center gap-3 flex-wrap">
          <Text className="text-3xl font-bold text-foreground tracking-tight">{block.name}</Text>
          <Badge variant="outline">
            <BadgeText>{blockCategoryLabels[block.category]}</BadgeText>
          </Badge>
          {isMobileOnly && (
            <Badge variant="secondary">
              <BadgeText>Mobile Only</BadgeText>
            </Badge>
          )}
        </Row>
        <Text className="text-base text-muted-foreground leading-relaxed">{block.description}</Text>
        {block.subComponents && block.subComponents.length > 0 && (
          <Row className="flex-wrap gap-2">
            <Text className="text-sm text-muted-foreground font-medium">Sub-components:</Text>
            {block.subComponents.map((sc) => (
              <Badge key={sc} variant="secondary">
                <BadgeText>{sc}</BadgeText>
              </Badge>
            ))}
          </Row>
        )}
      </Stack>

      <Separator />

      {/* Preview */}
      <Stack className="gap-3">
        <Text className="text-xl font-semibold text-foreground">Preview</Text>
        {isMobileOnly && !demo ? (
          <MobileOnlyNotice name={block.name} />
        ) : demo ? (
          <PreviewCard title={block.name} description={block.description} code={demo.code}>
            {demo.preview}
          </PreviewCard>
        ) : (
          <Card>
            <CardContent className="p-8 items-center">
              <Text className="text-sm text-muted-foreground">
                Demo coming soon for {block.name}.
              </Text>
            </CardContent>
          </Card>
        )}
      </Stack>

      {/* Import */}
      <Stack className="gap-3">
        <Text className="text-xl font-semibold text-foreground">Import</Text>
        <CodeBlock
          code={`import { ${block.name}${block.subComponents ? ', ' + block.subComponents.join(', ') : ''} } from '${importPath}';

// Or from the main package:
import { ${block.name} } from '@thewhileloop/whileui';`}
          language="tsx"
        />
      </Stack>

      {/* Platforms */}
      <Stack className="gap-3">
        <Text className="text-xl font-semibold text-foreground">Platform Support</Text>
        <Row className="gap-2">
          <Badge variant="success">
            <BadgeText>iOS</BadgeText>
          </Badge>
          <Badge variant="success">
            <BadgeText>Android</BadgeText>
          </Badge>
          {isMobileOnly ? (
            <Badge variant="outline">
              <BadgeText>Web — Not Supported</BadgeText>
            </Badge>
          ) : (
            <Badge variant="success">
              <BadgeText>Web</BadgeText>
            </Badge>
          )}
        </Row>
      </Stack>

      {/* Prev / Next */}
      {(() => {
        const idx = blocks.indexOf(block);
        const prev = idx > 0 ? blocks[idx - 1] : null;
        const next = idx < blocks.length - 1 ? blocks[idx + 1] : null;
        return (
          <Row className="justify-between pt-4 border-t border-border">
            {prev ? (
              <Pressable
                onPress={() => router.push(`/blocks/${prev.slug}` as any)}
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
                onPress={() => router.push(`/blocks/${next.slug}` as any)}
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
        );
      })()}
    </View>
  );
}
