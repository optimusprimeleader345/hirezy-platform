'use client'

interface GithubOptimizerProps {
  suggestions: string[]
}

export function GithubOptimizer({ suggestions }: GithubOptimizerProps) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h3 className="text-white font-semibold mb-4">GitHub Enhancement Suggestions</h3>
      <div className="space-y-3">
        {suggestions.map((suggestion, i) => (
          <div key={i} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
            <p className="text-white/70 text-sm">{suggestion}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
