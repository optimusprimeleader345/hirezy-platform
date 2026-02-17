import { Skeleton } from '@/components/ui/SkeletonLoader'

export function MonitoringSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="text-center mb-8">
        <Skeleton className="h-8 w-64 mx-auto mb-2" />
        <Skeleton className="h-4 w-96 mx-auto" />
      </div>

      {/* Main Chart Skeleton */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
        <Skeleton className="h-6 w-48 mb-4" />
        <Skeleton className="h-[300px] w-full rounded-lg" />
      </div>

      {/* Metric Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6"
          >
            <div className="text-center py-6">
              <Skeleton className="h-12 w-12 mx-auto mb-2 rounded-full" />
              <Skeleton className="h-8 w-24 mx-auto mb-2" />
              <Skeleton className="h-4 w-32 mx-auto" />
            </div>
          </div>
        ))}
      </div>

      {/* Secondary Cards Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
      <Skeleton className="h-6 w-48 mb-4" />
      <Skeleton className="h-[300px] w-full rounded-lg" />
    </div>
  )
}

export function MetricCardSkeleton() {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
      <div className="text-center py-6">
        <Skeleton className="h-12 w-12 mx-auto mb-2 rounded-full" />
        <Skeleton className="h-8 w-24 mx-auto mb-2" />
        <Skeleton className="h-4 w-32 mx-auto" />
      </div>
    </div>
  )
}

export function HeatmapSkeleton() {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
      <Skeleton className="h-6 w-48 mb-4" />
      <div className="space-y-2">
        {[1, 2, 3, 4, 5, 6, 7].map((row) => (
          <div key={row} className="flex gap-1">
            <Skeleton className="h-8 w-16" />
            {[1, 2, 3, 4].map((col) => (
              <Skeleton key={col} className="h-8 w-8 rounded-sm" />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}