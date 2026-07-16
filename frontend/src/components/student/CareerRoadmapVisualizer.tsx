import { useEffect, useState } from 'react'
import { User, UserCheck, Award, Trophy } from 'lucide-react'
import { AnalyticsCard } from './AnalyticsCard'
import { fetchRoadmap } from '@/utils/api/roadmapClient'

export function CareerRoadmapVisualizer() {
  const [currentStage, setCurrentStage] = useState('Beginner')
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [nextSteps, setNextSteps] = useState<string[]>([])

  useEffect(() => {
    const loadRoadmap = async () => {
      try {
        const data = await fetchRoadmap("demo-student-id")
        setCurrentStage(data.currentStage)
        setCompletedSteps(JSON.parse(data.completedSteps || '[]'))
        setNextSteps(JSON.parse(data.nextSteps || '[]'))
      } catch (error) {
        console.error(error)
      }
    }
    loadRoadmap()
  }, [])

  const roadmap = [
    { stage: 'Beginner', icon: User, active: currentStage === 'Beginner' },
    { stage: 'Intermediate', icon: UserCheck, active: currentStage === 'Intermediate' },
    { stage: 'Advanced', icon: Award, active: currentStage === 'Advanced' },
    { stage: 'Industry Ready', icon: Trophy, active: currentStage === 'Industry Ready' }
  ]
  return (
    <AnalyticsCard title="Career Roadmap">
      <div className="relative p-6 overflow-hidden">
        <div className="flex items-center justify-center bg-gradient-to-r from-[#1A1D21]/50 to-[#141619]/50 rounded-full p-2 backdrop-blur-xl border border-[#23262B]/30 shadow-[inset_0_2px_4px_rgba(255,255,255,0.05)]">
          <div className="flex items-center bg-[#0F1114] rounded-full p-1.5 gap-1 relative overflow-hidden">
            {roadmap.map((item, index) => {
              const Icon = item.icon
              return (
                <div key={item.stage} className={`flex items-center justify-center flex-1 px-4 py-3 rounded-lg text-center transition-all duration-300 ${
                  item.active
                    ? 'bg-gradient-to-r from-[#3EFFA8] to-[#2563EB] text-white shadow-[0_0_20px_rgba(62,255,168,0.4)] relative z-10'
                    : 'bg-[#1A1D21]/30 backdrop-blur-sm text-[#C9CFD6]/70 hover:bg-[#23262B]/40'
                }`}>
                  <div className="flex flex-col items-center gap-2">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-md ${
                      item.active
                        ? 'bg-white/20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]'
                        : 'bg-[#C9CFD6]/10'
                    }`}>
                      <Icon className={`w-4 h-4 ${
                        item.active
                          ? 'text-white'
                          : 'text-[#C9CFD6]'
                      }`} />
                    </div>
                    <div className="text-center">
                      <div className={`text-xs font-semibold leading-tight ${
                        item.active
                          ? 'text-white'
                          : 'text-[#C9CFD6]/80'
                      }`}>
                        {item.stage.split(' ').map((word, i) => (
                          <div key={i} className="whitespace-nowrap">{word}</div>
                        ))}
                      </div>
                      {item.active && (
                        <div className="text-[10px] text-white/80 font-medium mt-1 px-1 py-0.5 bg-white/10 rounded-sm">
                          Current
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </AnalyticsCard>
  )
}
