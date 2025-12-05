'use client'

interface ProfileScoreCardProps {
  score: number
  strengths: string[]
  weaknesses: string[]
  impactScore: number
}

export function ProfileScoreCard({ score, strengths, weaknesses, impactScore }: ProfileScoreCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h3 className="text-white font-semibold mb-6 text-center">Profile Optimization Score</h3>

      <div className="flex justify-center mb-6">
        <div className="relative w-24 h-24">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" stroke="rgba(255,255,255,0.2)" strokeWidth="8" fill="none"/>
            <circle cx="60" cy="60" r="50" stroke="url(#scoreGrad)" strokeWidth="8" fill="none"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    strokeDashoffset={`${2 * Math.PI * 50 * (1 - score / 100)}`}/>
            <defs>
              <linearGradient id="scoreGrad">
                <stop offset="0%" stopColor="#8b5cf6"/>
                <stop offset="100%" stopColor="#3b82f6"/>
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{score}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <h4 className="text-green-400 font-medium mb-2">Strengths ({strengths.length})</h4>
          <ul className="space-y-1">
            {strengths.map((strength, i) => (
              <li key={i} className="text-white/70">• {strength}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-red-400 font-medium mb-2">Areas to Improve ({weaknesses.length})</h4>
          <ul className="space-y-1">
            {weaknesses.map((weakness, i) => (
              <li key={i} className="text-white/70">• {weakness}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg">
        <div className="text-center">
          <p className="text-white/70 text-sm">Potential Score After Optimization</p>
          <p className="text-blue-400 font-semibold text-lg">{impactScore}/100</p>
        </div>
      </div>
    </div>
  )
}
