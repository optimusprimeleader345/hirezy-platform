import { useQuery } from '@tanstack/react-query'

export interface PlatformAnalytics {
  // Platform Overview
  totalUsers: number
  activeUsers: number
  monthlyGrowth: number
  studentCount: number
  recruiterCount: number
  adminCount: number
  
  // Daily/Monthly Active Users
  dau: number[]
  mau: number[]
  
  // Signup Trend
  signupTrend: Array<{ date: string; count: number }>
  
  // Platform Growth
  platformGrowthData: Array<{
    month: string
    students: number
    recruiters: number
    total: number
  }>
  
  // Gig Stats
  totalGigs: number
  activeGigs: number
  pendingGigs: number
  completedGigs: number
  
  // Application Stats
  totalApplications: number
  applicationsThisMonth: number
  shortlistedCount: number
  interviewsScheduled: number
  
  // Revenue
  totalRevenue: number
  revenueThisMonth: number
  commissionThisMonth: number
  revenueOverview: Array<{
    month: string
    platformRevenue: number
    commission: number
    total: number
  }>
  
  // Support
  openTickets: number
  resolvedTickets: number
  
  // AI Health
  aiPlatformHealth: {
    aiRequestsToday: number
    aiSuccessRate: number
    latencyMs: number
    status: string
  }
  
  // Fraud Detection
  fraudDetectionData: {
    suspiciousAccounts: number
    highRiskActivities: number
    autoFlaggedProposals: number
    lastDetection: string
    status: string
  }
  
  // Skills Trends
  topSkillsTrends: Array<{
    skill: string
    growth: number
    current: number
  }>
  
  // User Activity
  userActivityHeatmap: Array<{
    day: string
    hours: number[]
  }>
  
  // Timestamp
  lastUpdated: string
  error?: string
}

const fetchPlatformAnalytics = async (): Promise<PlatformAnalytics> => {
  const response = await fetch('/api/admin/analytics/platform')
  
  if (!response.ok) {
    throw new Error('Failed to fetch platform analytics')
  }
  
  return response.json()
}

export const useMonitoringData = (refetchInterval = 30000) => {
  return useQuery({
    queryKey: ['platform-analytics'],
    queryFn: fetchPlatformAnalytics,
    refetchInterval,
    staleTime: 15000, // Data is considered fresh for 15 seconds
    retry: 2,
    retryDelay: 1000,
  })
}