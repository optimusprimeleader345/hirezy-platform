// Advanced Analytics Mock Data for MNC-Level Dashboard
// Historical recruitment data with trends, forecasts, and predictive metrics

export interface MonthlyAnalytics {
  month: string;
  year: number;
  gigsCreated: number;
  applicationsReceived: number;
  shortlisted: number;
  interviewed: number;
  hired: number;
  timeToFill: number; // days
  costPerHire: number; // USD
  qualityOfHire: number; // 0-100 score
}

export interface SourceOfHire {
  source: string;
  count: number;
  percentage: number;
  cost: number;
}

export interface RecruitmentFunnel {
  stage: string;
  count: number;
  percentage: number;
  color: string;
}

export interface SkillDemand {
  skill: string;
  demand: number; // 0-100
  trend: 'up' | 'down' | 'stable';
  monthsData: number[];
}

export interface PredictiveMetrics {
  avgTimeToFillForecast: number;
  recommendedGigsNextMonth: number;
  talentMarketTrend: 'hot' | 'balanced' | 'cold';
  confidenceLevel: number;
}

export interface BudgetAnalytics {
  totalBudget: number;
  spent: number;
  remaining: number;
  avgCostPerHire: number;
  projectedSpending: number;
  efficiency: number; // hires per $1000
}

export interface TeamPerformance {
  recruiter: string;
  hires: number;
  timeToFill: number;
  qualityScore: number;
  efficiency: number;
}

export interface GeographicData {
  country: string;
  applications: number;
  hires: number;
  avgSalary: number;
  timeToFill: number;
}

export interface DepartmentData {
  department: string;
  openPositions: number;
  filled: number;
  timeToFill: number;
  budget: number;
}

// 12 months of historical data
export const historicalAnalytics: MonthlyAnalytics[] = [
  { month: 'Jan', year: 2025, gigsCreated: 8, applicationsReceived: 156, shortlisted: 45, interviewed: 23, hired: 12, timeToFill: 21, costPerHire: 8500, qualityOfHire: 82 },
  { month: 'Feb', year: 2025, gigsCreated: 12, applicationsReceived: 203, shortlisted: 58, interviewed: 31, hired: 18, timeToFill: 19, costPerHire: 7800, qualityOfHire: 85 },
  { month: 'Mar', year: 2025, gigsCreated: 15, applicationsReceived: 234, shortlisted: 62, interviewed: 35, hired: 22, timeToFill: 17, costPerHire: 7200, qualityOfHire: 88 },
  { month: 'Apr', year: 2025, gigsCreated: 10, applicationsReceived: 189, shortlisted: 52, interviewed: 28, hired: 16, timeToFill: 23, costPerHire: 8900, qualityOfHire: 79 },
  { month: 'May', year: 2025, gigsCreated: 14, applicationsReceived: 267, shortlisted: 71, interviewed: 42, hired: 26, timeToFill: 16, costPerHire: 6800, qualityOfHire: 91 },
  { month: 'Jun', year: 2025, gigsCreated: 18, applicationsReceived: 312, shortlisted: 83, interviewed: 51, hired: 32, timeToFill: 15, costPerHire: 6500, qualityOfHire: 93 },
  { month: 'Jul', year: 2025, gigsCreated: 22, applicationsReceived: 378, shortlisted: 95, interviewed: 58, hired: 35, timeToFill: 14, costPerHire: 6200, qualityOfHire: 95 },
  { month: 'Aug', year: 2025, gigsCreated: 16, applicationsReceived: 294, shortlisted: 78, interviewed: 46, hired: 29, timeToFill: 18, costPerHire: 7300, qualityOfHire: 87 },
  { month: 'Sep', year: 2025, gigsCreated: 20, applicationsReceived: 345, shortlisted: 88, interviewed: 55, hired: 33, timeToFill: 16, costPerHire: 6900, qualityOfHire: 89 },
  { month: 'Oct', year: 2025, gigsCreated: 25, applicationsReceived: 412, shortlisted: 102, interviewed: 67, hired: 41, timeToFill: 13, costPerHire: 5800, qualityOfHire: 96 },
  { month: 'Nov', year: 2025, gigsCreated: 28, applicationsReceived: 467, shortlisted: 118, interviewed: 74, hired: 45, timeToFill: 12, costPerHire: 5400, qualityOfHire: 97 },
  { month: 'Dec', year: 2025, gigsCreated: 30, applicationsReceived: 489, shortlisted: 125, interviewed: 78, hired: 47, timeToFill: 11, costPerHire: 5200, qualityOfHire: 98 },
];

export const sourceOfHireData: SourceOfHire[] = [
  { source: 'LinkedIn', count: 89, percentage: 45, cost: 450 },
  { source: 'Company Website', count: 52, percentage: 26, cost: 120 },
  { source: 'Indeed', count: 34, percentage: 17, cost: 380 },
  { source: 'Referral', count: 18, percentage: 9, cost: 50 },
  { source: 'GitHub', count: 6, percentage: 3, cost: 0 },
];

export const recruitmentFunnelData: RecruitmentFunnel[] = [
  { stage: 'Applied', count: 989, percentage: 100, color: '#ef4444' },
  { stage: 'Shortlisted', count: 274, percentage: 27.7, color: '#f97316' },
  { stage: 'Interviewed', count: 165, percentage: 16.7, color: '#eab308' },
  { stage: 'Hired', count: 101, percentage: 10.2, color: '#22c55e' },
];

export const skillDemandData: SkillDemand[] = [
  { skill: 'React', demand: 95, trend: 'up', monthsData: [88, 90, 92, 94, 93, 95, 95, 96, 94, 95, 96, 97] },
  { skill: 'TypeScript', demand: 92, trend: 'up', monthsData: [85, 87, 89, 91, 90, 92, 93, 94, 93, 92, 94, 95] },
  { skill: 'Node.js', demand: 88, trend: 'stable', monthsData: [86, 87, 88, 87, 88, 89, 88, 87, 88, 89, 88, 88] },
  { skill: 'Python', demand: 85, trend: 'up', monthsData: [78, 80, 82, 84, 83, 85, 86, 87, 86, 85, 87, 87] },
  { skill: 'AWS', demand: 90, trend: 'up', monthsData: [82, 84, 86, 88, 87, 89, 91, 92, 91, 90, 92, 93] },
  { skill: 'Docker', demand: 87, trend: 'stable', monthsData: [85, 86, 87, 86, 87, 87, 88, 87, 86, 87, 88, 89] },
];

export const predictiveMetrics: PredictiveMetrics = {
  avgTimeToFillForecast: 13,
  recommendedGigsNextMonth: 26,
  talentMarketTrend: 'hot',
  confidenceLevel: 87,
};

export const budgetAnalytics: BudgetAnalytics = {
  totalBudget: 250000,
  spent: 185000,
  remaining: 65000,
  avgCostPerHire: 6500,
  projectedSpending: 215000,
  efficiency: 0.15, // 15 hires per $10k spent
};

export const teamPerformanceData: TeamPerformance[] = [
  { recruiter: 'Sarah Johnson', hires: 28, timeToFill: 14, qualityScore: 92, efficiency: 0.18 },
  { recruiter: 'Mike Chen', hires: 22, timeToFill: 16, qualityScore: 88, efficiency: 0.15 },
  { recruiter: 'Emma Rodriguez', hires: 31, timeToFill: 12, qualityScore: 95, efficiency: 0.22 },
  { recruiter: 'David Kim', hires: 20, timeToFill: 18, qualityScore: 85, efficiency: 0.12 },
];

export const geographicData: GeographicData[] = [
  { country: 'United States', applications: 378, hires: 52, avgSalary: 95000, timeToFill: 14 },
  { country: 'India', applications: 234, hires: 28, avgSalary: 65000, timeToFill: 12 },
  { country: 'United Kingdom', applications: 156, hires: 21, avgSalary: 85000, timeToFill: 16 },
  { country: 'Germany', applications: 98, hires: 15, avgSalary: 78000, timeToFill: 18 },
  { country: 'Canada', applications: 123, hires: 19, avgSalary: 88000, timeToFill: 15 },
];

export const departmentData: DepartmentData[] = [
  { department: 'Engineering', openPositions: 25, filled: 18, timeToFill: 16, budget: 85000 },
  { department: 'Design', openPositions: 8, filled: 6, timeToFill: 12, budget: 24000 },
  { department: 'Product', openPositions: 12, filled: 9, timeToFill: 14, budget: 45000 },
  { department: 'Marketing', openPositions: 6, filled: 4, timeToFill: 10, budget: 18000 },
  { department: 'Sales', openPositions: 15, filled: 11, timeToFill: 8, budget: 35000 },
];

// KPI Calculations
export const calculateKPITrend = (current: number, previous: number) => {
  const diff = ((current - previous) / previous) * 100;
  return {
    change: diff,
    direction: diff > 0 ? 'up' : diff < 0 ? 'down' : 'stable',
    formatted: `${diff > 0 ? '+' : ''}${diff.toFixed(1)}%`,
  };
};

export const getCurrentMonthMetrics = () => {
  const currentMonth = historicalAnalytics[historicalAnalytics.length - 1];
  const previousMonth = historicalAnalytics[historicalAnalytics.length - 2];

  return {
    currentMonth,
    previousMonth,
    trends: {
      hires: calculateKPITrend(currentMonth.hired, previousMonth.hired),
      applications: calculateKPITrend(currentMonth.applicationsReceived, previousMonth.applicationsReceived),
      timeToFill: calculateKPITrend(currentMonth.timeToFill, previousMonth.timeToFill),
      costPerHire: calculateKPITrend(currentMonth.costPerHire, previousMonth.costPerHire),
    },
  };
};

export const getIndustryBenchmarks = () => ({
  avgTimeToFill: 28, // days
  avgCostPerHire: 8500, // USD
  avgOfferAcceptance: 75, // percentage
  avgTimeToOffer: 12, // days
});

// Chart Data Transformers
export const getTimeToFillData = () => {
  return historicalAnalytics.map(month => ({
    month: month.month,
    timeToFill: month.timeToFill,
    benchmark: getIndustryBenchmarks().avgTimeToFill,
  }));
};

export const getHiresApplicationsData = () => {
  return historicalAnalytics.map(month => ({
    month: month.month,
    hires: month.hired,
    applications: month.applicationsReceived,
  }));
};

export const getCostEfficiencyData = () => {
  return historicalAnalytics.map(month => ({
    month: month.month,
    costPerHire: month.costPerHire,
    benchmark: getIndustryBenchmarks().avgCostPerHire,
  }));
};
