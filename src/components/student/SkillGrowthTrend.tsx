import { ChartWrapper } from '@/components/Chart/ChartWrapper'
import { AnalyticsCard } from './AnalyticsCard'

const skillData = [
  { month: 'Jan', React: 40, Python: 30 },
  { month: 'Feb', React: 55, Python: 45 },
  { month: 'Mar', React: 62, Python: 52 },
  { month: 'Apr', React: 70, Python: 65 },
  { month: 'May', React: 78, Python: 73 }
]

export function SkillGrowthTrend() {
  return (
    <AnalyticsCard className="col-span-full lg:col-span-2">
      <ChartWrapper
        title="Skill Growth Over Time"
        data={skillData}
        dataKeys={['React', 'Python']}
        colors={['#60A5FA', '#34D399']}
        type="line"
        className="h-80"
      />
    </AnalyticsCard>
  )
}
