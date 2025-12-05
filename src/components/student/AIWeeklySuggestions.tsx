import { Target, BookOpen, ChevronRight, Zap } from 'lucide-react'
import { AnalyticsCard } from './AnalyticsCard'

const suggestions = [
  {
    icon: Target,
    text: "Apply to 3 relevant gigs",
    color: "text-blue-400"
  },
  {
    icon: BookOpen,
    text: "Solve 2 DSA problems",
    color: "text-green-400"
  },
  {
    icon: Zap,
    text: "Practice interview questions",
    color: "text-orange-400"
  }
]

export function AIWeeklySuggestions() {
  return (
    <AnalyticsCard title="AI Weekly Suggestions">
      <div className="space-y-3">
        {suggestions.map((suggestion, index) => {
          const Icon = suggestion.icon
          return (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-slate-600 hover:border-slate-500 transition-colors">
              <div className={`p-2 rounded-lg bg-slate-700 ${suggestion.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <span className="text-sm text-gray-200">{suggestion.text}</span>
            </div>
          )
        })}
      </div>
    </AnalyticsCard>
  )
}
