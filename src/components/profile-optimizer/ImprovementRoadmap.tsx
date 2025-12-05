'use client'

export function ImprovementRoadmap() {
  const phases = [
    { name: 'Phase 1: Fix Basics', tasks: 'Update summary and about sections', color: 'bg-red-400' },
    { name: 'Phase 2: Enhance Skills', tasks: 'Add recommended skills and portfolio items', color: 'bg-yellow-400' },
    { name: 'Phase 3: Boost Presence', tasks: 'Improve GitHub and certifications', color: 'bg-blue-400' },
    { name: 'Phase 4: Optimize Impact', tasks: 'Apply all improvements and measure results', color: 'bg-green-400' }
  ]

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h3 className="text-white font-semibold mb-4">Improvement Roadmap</h3>
      <div className="space-y-4">
        {phases.map((phase, i) => (
          <div key={i} className="flex items-start space-x-4">
            <div className={`w-4 h-4 rounded-full ${phase.color} flex-shrink-0 mt-1`}></div>
            <div className="flex-1">
              <h4 className="text-white font-medium text-sm">{phase.name}</h4>
              <p className="text-white/70 text-sm mt-1">{phase.tasks}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
