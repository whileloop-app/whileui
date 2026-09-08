import React, { useState, useRef } from 'react';
import {
  View,
  ScrollView,
  Pressable,
  useWindowDimensions,
  type ViewProps,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { Text } from '../../components/text';
import { Button, ButtonText } from '../../components/button';
import { cn } from '../../lib/cn';
import { useVisualTokens } from '../../lib/visual-tokens';
import { surfacePadding, typographyStyle } from '../../lib/recipes';

// ─── Types ───────────────────────────────────────────────────

export interface OnboardingSlide {
  key: string;
  title: string;
  description: string;
  image?: React.ReactNode;
}

export interface OnboardingScreenProps extends ViewProps {
  slides: OnboardingSlide[];
  onComplete: () => void;
  onSkip?: () => void;
  completeLabel?: string;
  nextLabel?: string;
  skipLabel?: string;
  showSkip?: boolean;
}

// ─── Component ───────────────────────────────────────────────

export function OnboardingScreen({
  slides,
  onComplete,
  onSkip,
  completeLabel = 'Get Started',
  nextLabel = 'Next',
  skipLabel = 'Skip',
  showSkip = true,
  className,
  ...props
}: OnboardingScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const { width } = useWindowDimensions();
  const visual = useVisualTokens();

  const isLastSlide = currentIndex === slides.length - 1;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const goToNext = () => {
    if (isLastSlide) {
      onComplete();
    } else {
      scrollViewRef.current?.scrollTo({ x: (currentIndex + 1) * width, animated: true });
    }
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    } else {
      onComplete();
    }
  };

  return (
    <View className={cn('flex-1 bg-background', className)} {...props}>
      {/* Skip Button */}
      {showSkip && !isLastSlide && (
        <View className="absolute right-4 top-12 z-10">
          <Pressable onPress={handleSkip}>
            <Text className="text-muted-foreground">{skipLabel}</Text>
          </Pressable>
        </View>
      )}

      {/* Slides */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className="flex-1"
      >
        {slides.map((slide) => (
          <View
            key={slide.key}
            style={{ width, padding: surfacePadding(visual, 'lg') }}
            className="flex-1 items-center justify-center"
          >
            {slide.image && <View className="mb-8">{slide.image}</View>}
            <Text
              className="mb-4 text-center font-bold text-foreground"
              style={typographyStyle(visual, 'headline')}
            >
              {slide.title}
            </Text>
            <Text
              className="max-w-sm text-center text-muted-foreground"
              style={typographyStyle(visual, 'body')}
            >
              {slide.description}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Bottom */}
      <View className="pb-12" style={{ paddingHorizontal: surfacePadding(visual, 'lg') }}>
        {/* Dots */}
        <View className="mb-6 flex-row justify-center gap-2">
          {slides.map((_, index) => (
            <View
              key={index}
              className={cn(
                'h-2 rounded-full',
                index === currentIndex ? 'w-6 bg-primary' : 'w-2 bg-muted'
              )}
            />
          ))}
        </View>

        {/* Button */}
        <Button onPress={goToNext} className="w-full">
          <ButtonText>{isLastSlide ? completeLabel : nextLabel}</ButtonText>
        </Button>
      </View>
    </View>
  );
}
