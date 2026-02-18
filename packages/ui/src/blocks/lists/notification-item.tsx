import React from 'react';
import { View, Pressable, type PressableProps } from 'react-native';
import { Text } from '../../components/text';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/avatar';
import { cn } from '../../lib/cn';

// ─── Types ───────────────────────────────────────────────────

export interface NotificationItemProps extends Omit<PressableProps, 'children'> {
  icon?: React.ReactNode;
  avatarUrl?: string;
  avatarFallback?: string;
  title: string;
  message: string;
  time: string;
  read?: boolean;
  showDot?: boolean;
}

// ─── Component ───────────────────────────────────────────────

export function NotificationItem({
  icon,
  avatarUrl,
  avatarFallback,
  title,
  message,
  time,
  read = false,
  showDot = true,
  className,
  ...props
}: NotificationItemProps) {
  return (
    <Pressable
      className={cn(
        'flex-row items-start px-4 py-3 active:bg-muted',
        !read && 'bg-primary/5',
        className
      )}
      {...props}
    >
      {/* Avatar or Icon */}
      {avatarUrl || avatarFallback ? (
        <Avatar className="h-10 w-10">
          {avatarUrl && <AvatarImage src={avatarUrl} />}
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      ) : (
        icon && (
          <View className="h-10 w-10 items-center justify-center rounded-full bg-muted">
            {icon}
          </View>
        )
      )}

      {/* Content */}
      <View className="ml-3 flex-1">
        <View className="flex-row items-center justify-between">
          <Text
            className={cn('text-sm', !read ? 'font-semibold text-foreground' : 'text-foreground')}
          >
            {title}
          </Text>
          <View className="flex-row items-center gap-2">
            <Text className="text-xs text-muted-foreground">{time}</Text>
            {!read && showDot && <View className="h-2 w-2 rounded-full bg-primary" />}
          </View>
        </View>
        <Text className="mt-0.5 text-sm text-muted-foreground" numberOfLines={2}>
          {message}
        </Text>
      </View>
    </Pressable>
  );
}
