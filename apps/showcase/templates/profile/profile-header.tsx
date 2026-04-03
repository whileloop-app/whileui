/**
 * ProfileHeader — Copy-paste template
 * Copy this file into your app and customize. Uses @thewhileloop/whileui primitives.
 */
import { Image, View, Pressable, type ViewProps } from 'react-native';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  ButtonText,
  Text,
  cn,
} from '@thewhileloop/whileui';

export interface ProfileStat {
  label: string;
  value: string | number;
  onPress?: () => void;
}

export interface ProfileHeaderProps extends ViewProps {
  name: string;
  username?: string;
  bio?: string;
  avatarUrl?: string;
  avatarFallback?: string;
  coverUrl?: string;
  stats?: ProfileStat[];
  action?: {
    label: string;
    onPress: () => void;
    variant?: 'default' | 'outline' | 'secondary';
  };
  secondaryAction?: {
    label: string;
    onPress: () => void;
  };
  verified?: boolean;
}

export function ProfileHeader({
  name,
  username,
  bio,
  avatarUrl,
  avatarFallback,
  coverUrl,
  stats,
  action,
  secondaryAction,
  verified,
  className,
  ...props
}: ProfileHeaderProps) {
  const resolvedStats = stats?.slice(0, 3) ?? [];

  return (
    <View
      className={cn(
        'overflow-hidden rounded-3xl border border-border/80 bg-card/70 shadow-lg backdrop-blur-md',
        className
      )}
      {...props}
    >
      <View className={cn('relative w-full bg-secondary/70', coverUrl ? 'h-36' : 'h-28')}>
        {coverUrl ? (
          <Image
            source={{ uri: coverUrl }}
            resizeMode="cover"
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          />
        ) : null}
        <View className="absolute inset-0 bg-background/35" />
      </View>

      <View className={cn('px-4 -mt-10')}>
        <View className="flex-row items-end justify-between">
          <Avatar className="h-20 w-20 border-4 border-card shadow-sm">
            {avatarUrl && <AvatarImage src={avatarUrl} />}
            <AvatarFallback className="text-xl">
              {avatarFallback || name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <View className="flex-row gap-2 pb-2">
            {secondaryAction && (
              <Button variant="secondary" size="sm" onPress={secondaryAction.onPress}>
                <ButtonText>{secondaryAction.label}</ButtonText>
              </Button>
            )}
            {action && (
              <Button
                variant={action.variant || 'default'}
                size="sm"
                className="rounded-full px-4"
                onPress={action.onPress}
              >
                <ButtonText>{action.label}</ButtonText>
              </Button>
            )}
          </View>
        </View>

        <View className="mt-3 flex-row items-center gap-2">
          <Text className="text-xl font-bold text-foreground">{name}</Text>
          {verified && (
            <View className="rounded-full bg-primary/15 px-1.5 py-0.5">
              <Text className="text-xs text-primary font-semibold">✓</Text>
            </View>
          )}
        </View>

        {username && <Text className="text-muted-foreground">@{username}</Text>}
        {bio && <Text className="mt-3 text-foreground/90 leading-relaxed">{bio}</Text>}

        {resolvedStats.length > 0 && (
          <View className="mt-4 mb-4 flex-row items-center rounded-2xl border border-border/70 bg-background/55 px-3 py-2.5">
            {resolvedStats.map((stat, index) => (
              <Pressable
                key={stat.label}
                onPress={stat.onPress}
                disabled={!stat.onPress}
                className={cn(
                  'flex-1 flex-row items-center justify-center gap-1',
                  stat.onPress && 'active:opacity-70'
                )}
              >
                <Text className="font-semibold text-foreground">{stat.value}</Text>
                <Text className="text-muted-foreground">{stat.label}</Text>
              </Pressable>
            ))}
            {resolvedStats.slice(1).map((stat, position) => (
              <View
                key={`divider-${stat.label}`}
                className="absolute top-2.5 bottom-2.5 w-px bg-border/70"
                style={{ left: `${((position + 1) / resolvedStats.length) * 100}%` }}
              />
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
