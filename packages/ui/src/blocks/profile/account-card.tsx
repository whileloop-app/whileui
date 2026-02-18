import React from 'react';
import { View, Pressable, type ViewProps, type PressableProps } from 'react-native';
import { Text } from '../../components/text';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/avatar';
import { Card } from '../../components/card';
import { cn } from '../../lib/cn';

// ─── Types ───────────────────────────────────────────────────

export interface AccountCardProps extends Omit<PressableProps, 'children'> {
  name: string;
  email?: string;
  avatarUrl?: string;
  avatarFallback?: string;
  badge?: string;
  rightElement?: React.ReactNode;
}

// ─── Component ───────────────────────────────────────────────

export function AccountCard({
  name,
  email,
  avatarUrl,
  avatarFallback,
  badge,
  rightElement,
  className,
  ...props
}: AccountCardProps) {
  return (
    <Pressable
      className={cn('flex-row items-center rounded-xl bg-card p-4 active:opacity-90', className)}
      {...props}
    >
      <Avatar className="h-14 w-14">
        {avatarUrl && <AvatarImage src={avatarUrl} />}
        <AvatarFallback className="text-lg">
          {avatarFallback || name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <View className="ml-4 flex-1">
        <View className="flex-row items-center gap-2">
          <Text className="text-lg font-semibold text-foreground">{name}</Text>
          {badge && (
            <View className="rounded-full bg-primary/10 px-2 py-0.5">
              <Text className="text-xs font-medium text-primary">{badge}</Text>
            </View>
          )}
        </View>
        {email && <Text className="text-sm text-muted-foreground">{email}</Text>}
      </View>

      {rightElement || <Text className="text-xl text-muted-foreground">›</Text>}
    </Pressable>
  );
}
