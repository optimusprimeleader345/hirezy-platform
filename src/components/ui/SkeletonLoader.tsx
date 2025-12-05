'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  variant?: 'default' | 'circular' | 'rectangular' | 'text'
  width?: string | number
  height?: string | number
  animation?: boolean
}

export function Skeleton({
  className,
  variant = 'default',
  width,
  height,
  animation = true,
  ...props
}: SkeletonProps & React.HTMLAttributes<HTMLDivElement>) {
  const baseClasses = cn(
    'bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800',
    animation && 'animate-pulse',
    className
  )

  const getVariantClasses = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full'
      case 'rectangular':
        return 'rounded'
      case 'text':
        return 'rounded h-4'
      default:
        return 'rounded-md'
    }
  }

  const getDimensions = () => {
    let style: React.CSSProperties = {}

    if (width) {
      style.width = typeof width === 'number' ? `${width}px` : width
    }

    if (height) {
      style.height = typeof height === 'number' ? `${height}px` : height
    }

    return style
  }

  return (
    <div
      className={cn(baseClasses, getVariantClasses())}
      style={getDimensions()}
      {...props}
    />
  )
}

interface SkeletonLoaderProps {
  lines?: number
  showAvatar?: boolean
  showTitle?: boolean
  className?: string
}

export function SkeletonLoader({
  lines = 3,
  showAvatar = false,
  showTitle = true,
  className
}: SkeletonLoaderProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {showAvatar && <Skeleton variant="circular" width={48} height={48} />}
      {showTitle && <Skeleton variant="text" height={24} width="60%" className="mb-2" />}
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          height={16}
          width={index === lines - 1 ? '40%' : '100%'}
          className="mb-1"
        />
      ))}
    </div>
  )
}

// Optimized loading state for cards
export function CardSkeletonLoader({ className }: { className?: string }) {
  return (
    <div className={cn('p-6 space-y-3', className)}>
      <Skeleton height={20} width="70%" />
      <Skeleton height={16} width="90%" />
      <Skeleton height={16} width="50%" />
    </div>
  )
}

// Table row skeleton for data tables
export function TableRowSkeleton({ columns = 4 }: { columns?: number }) {
  return (
    <tr>
      {Array.from({ length: columns }).map((_, index) => (
        <td key={index} className="px-4 py-3">
          <Skeleton height={16} className={index === 0 ? 'w-24' : 'w-16'} />
        </td>
      ))}
    </tr>
  )
}

// Chart area skeleton
export function ChartSkeleton({ height = 300 }: { height?: number }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <Skeleton width={120} height={24} />
        <Skeleton width={80} height={32} />
      </div>
      <div className="flex-1 p-4">
        <Skeleton className="w-full" height={height - 100} />
      </div>
    </div>
  )
}

// Existing exports (for backward compatibility)
interface SkeletonStatsProps {
  count?: number
  className?: string
}

export function SkeletonStats({ count = 4, className }: SkeletonStatsProps) {
  return <SkeletonLoader lines={count} showAvatar={false} showTitle={true} className={className} />
}

interface SkeletonCardProps {
  className?: string
}

export function SkeletonCard({ className }: SkeletonCardProps) {
  return <CardSkeletonLoader className={className} />
}

interface SkeletonListProps {
  count?: number
  className?: string
}

export function SkeletonList({ count = 3, className }: SkeletonListProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonLoader key={index} lines={2} showTitle={true} showAvatar={false} />
      ))}
    </div>
  )
}
