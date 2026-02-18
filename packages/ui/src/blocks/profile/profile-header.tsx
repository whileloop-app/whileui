import React from 'react';
import { View, Pressable, type ViewProps, type PressableProps } from 'react-native';
import { Text } from '../../components/text';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/avatar';
import { Button, ButtonText } from '../../components/button';
import { cn } from '../../lib/cn';

// ─── Types ───────────────────────────────────────────────────

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

// ─── Component ───────────────────────────────────────────────

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
  return (
    <View className={cn('bg-background', className)} {...props}>
      {/* Cover */}
      <View className={cn('w-full bg-muted', coverUrl ? 'h-32' : 'h-20')}>
        {/* Cover image would go here */}
      </View>

      <View className={cn('px-4 -mt-10')}>
        {/* Avatar Row */}
        <View className="flex-row items-end justify-between">
          <Avatar className="h-20 w-20 border-4 border-background">
            {avatarUrl && <AvatarImage src={avatarUrl} />}
            <AvatarFallback className="text-xl">
              {avatarFallback || name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          {/* Actions */}
          <View className="flex-row gap-2 pb-1">
            {secondaryAction && (
              <Button variant="outline" size="sm" onPress={secondaryAction.onPress}>
                <ButtonText>{secondaryAction.label}</ButtonText>
              </Button>
            )}
            {action && (
              <Button variant={action.variant || 'default'} size="sm" onPress={action.onPress}>
                <ButtonText>{action.label}</ButtonText>
              </Button>
            )}
          </View>
        </View>

        {/* Name */}
        <View className="mt-3 flex-row items-center gap-2">
          <Text className="text-xl font-bold text-foreground">{name}</Text>
          {verified && (
            <View className="rounded-full bg-primary/15 px-1.5 py-0.5">
              <Text className="text-xs text-primary font-semibold">✓</Text>
            </View>
          )}
        </View>

        {/* Username */}
        {username && <Text className="text-muted-foreground">@{username}</Text>}

        {/* Bio */}
        {bio && <Text className="mt-3 text-foreground">{bio}</Text>}

        {/* Stats */}
        {stats && stats.length > 0 && (
          <View className="mt-4 flex-row gap-4">
            {stats.map((stat, index) => (
              <Pressable
                key={index}
                onPress={stat.onPress}
                disabled={!stat.onPress}
                className="flex-row items-center gap-1"
              >
                <Text className="font-semibold text-foreground">{stat.value}</Text>
                <Text className="text-muted-foreground">{stat.label}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
