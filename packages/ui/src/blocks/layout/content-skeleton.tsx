import { View, type ViewProps } from 'react-native';
import { Skeleton } from '../../components/skeleton';
import { cn } from '../../lib/cn';

// ─── Types ───────────────────────────────────────────────────

export interface ContentSkeletonProps extends ViewProps {
  /** Layout preset. `list` = avatar + lines rows, `card` = card with image/body, `generic` = simple page lines. */
  variant?: 'list' | 'card' | 'generic';
  /** Number of list rows (list variant only). Default 4. */
  rows?: number;
}

// ─── Component ───────────────────────────────────────────────

function ListRow() {
  return (
    <View className="flex-row items-center gap-3 border-b border-border pb-4 mb-4">
      <Skeleton className="h-12 w-12 rounded-full shrink-0" />
      <View className="flex-1 gap-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </View>
    </View>
  );
}

function ListVariant({ className, rows = 4, ...props }: ContentSkeletonProps) {
  return (
    <View className={cn('p-4', className)} {...props}>
      {Array.from({ length: rows }).map((_, i) => (
        <ListRow key={i} />
      ))}
    </View>
  );
}

function CardVariant({ className, ...props }: ContentSkeletonProps) {
  return (
    <View
      className={cn('rounded-xl overflow-hidden bg-card border border-border', className)}
      {...props}
    >
      <Skeleton className="aspect-video w-full" />
      <View className="p-4 gap-3">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </View>
    </View>
  );
}

function GenericVariant({ className, ...props }: ContentSkeletonProps) {
  return (
    <View className={cn('p-4 gap-4', className)} {...props}>
      <Skeleton className="h-6 w-1/2" />
      <View className="gap-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/5" />
      </View>
    </View>
  );
}

export function ContentSkeleton({
  variant = 'list',
  rows = 4,
  className,
  ...props
}: ContentSkeletonProps) {
  if (variant === 'list') {
    return <ListVariant rows={rows} className={className} {...props} />;
  }
  if (variant === 'card') {
    return <CardVariant className={className} {...props} />;
  }
  return <GenericVariant className={className} {...props} />;
}
