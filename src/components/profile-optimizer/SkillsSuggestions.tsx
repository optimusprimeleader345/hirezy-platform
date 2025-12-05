'use client'

interface SkillsSuggestionsProps {
  skills: string[]
}

export function SkillsSuggestions({ skills }: SkillsSuggestionsProps) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h3 className="text-white font-semibold mb-4">Recommended Skills ({skills.length})</h3>
      <div className="space-y-3">
        {skills.map((skill, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <span className="text-white font-medium">{skill}</span>
            <button className="px-3 py-1 text-sm bg-purple-600/20 text-purple-400 rounded hover:bg-purple-600/30">
              Add Skill
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
