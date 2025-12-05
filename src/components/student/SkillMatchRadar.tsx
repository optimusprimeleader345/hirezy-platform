import { ChartWrapper } from '@/components/Chart/ChartWrapper'
import { AnalyticsCard } from './AnalyticsCard'

const radarData = [
  { skill: 'React', value: 80 },
  { skill: 'Communication', value: 70 },
  { skill: 'Problem Solving', value: 90 },
  { skill: 'Teamwork', value: 65 },
  { skill: 'Python', value: 85 }
]

export function SkillMatchRadar() {
  return (
    <AnalyticsCard title="Your Skill Match Profile">
      <ChartWrapper
        title=""
        data={radarData}
        dataKey="value"
        type="radar"
        colors={['#3B82F6']}
        className="h-80"
      />
    </AnalyticsCard>
  )
}
