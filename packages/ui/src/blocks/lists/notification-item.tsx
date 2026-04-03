import React from 'react';
import { View, Pressable, type PressableProps } from 'react-native';
import { Text } from '../../components/text';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/avatar';
import { Skeleton } from '../../components/skeleton';
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
  /** Show a skeleton placeholder instead of content. */
  loading?: boolean;
}

// ─── Skeleton ─────────────────────────────────────────────────

function NotificationItemSkeleton({ className }: { className?: string }) {
  return (
    <View className={cn('flex-row items-start px-4 py-3', className)}>
      <Skeleton className="h-10 w-10 rounded-full" />
      <View className="ml-3 flex-1 gap-2">
        <View className="flex-row items-center justify-between">
          <Skeleton className="h-3.5 w-1/3 rounded-md" />
          <Skeleton className="h-3 w-12 rounded-md" />
        </View>
        <Skeleton className="h-3 w-4/5 rounded-md" />
      </View>
    </View>
  );
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
  loading = false,
  className,
  ...props
}: NotificationItemProps) {
  if (loading) {
    return <NotificationItemSkeleton className={className} />;
  }

  return (
    <Pressable
      className={cn(
        'flex-row items-start px-4 py-3 active:bg-muted',
        !read && 'bg-primary-soft-subtle',
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
