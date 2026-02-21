import React, { useState } from 'react';
import { View, type ViewProps, type ImageProps as RNImageProps } from 'react-native';
import { Image } from 'expo-image';
import { Skeleton } from '../../components/skeleton';
import { cn } from '../../lib/cn';
import { tv, type VariantProps } from '../../lib/tv';

const smartImageVariants = tv({
  base: 'overflow-hidden',
  variants: {
    radius: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full',
    },
    objectFit: {
      cover: 'object-cover',
      contain: 'object-contain',
      fill: 'object-fill',
      'scale-down': 'object-scale-down',
    },
  },
  defaultVariants: {
    radius: 'md',
    objectFit: 'cover',
  },
});

export interface SmartImageProps
  extends Omit<ViewProps, 'className'>, VariantProps<typeof smartImageVariants> {
  className?: string;
  source: RNImageProps['source'];
  alt: string;
  skeleton?: boolean;
  skeletonClassName?: string;
  transition?: number;
  onLoad?: () => void;
  onError?: () => void;
  fallbackSource?: RNImageProps['source'];
}

const SmartImage = React.forwardRef<View, SmartImageProps>(
  (
    {
      className,
      source,
      alt,
      skeleton = true,
      skeletonClassName,
      transition = 200,
      radius,
      objectFit,
      onLoad,
      onError,
      fallbackSource,
      ...props
    },
    ref
  ) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const handleLoad = () => {
      setLoading(false);
      onLoad?.();
    };

    const handleError = () => {
      setLoading(false);
      setError(true);
      onError?.();
    };

    const imageSource = error && fallbackSource ? fallbackSource : source;

    return (
      <View
        ref={ref}
        className={cn(smartImageVariants({ radius, objectFit }), className)}
        {...props}
      >
        {skeleton && loading && (
          <Skeleton
            className={cn(
              'absolute inset-0',
              radius === 'none' && 'rounded-none',
              radius === 'sm' && 'rounded-sm',
              radius === 'md' && 'rounded-md',
              radius === 'lg' && 'rounded-lg',
              radius === 'xl' && 'rounded-xl',
              radius === 'full' && 'rounded-full',
              skeletonClassName
            )}
          />
        )}
        <Image
          source={imageSource}
          alt={alt}
          transition={transition}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'w-full h-full',
            objectFit === 'cover' && 'object-cover',
            objectFit === 'contain' && 'object-contain',
            objectFit === 'fill' && 'object-fill',
            objectFit === 'scale-down' && 'object-scale-down'
          )}
          style={{ opacity: loading && !error ? 0 : 1 }}
        />
      </View>
    );
  }
);

SmartImage.displayName = 'SmartImage';

export { SmartImage, smartImageVariants };
