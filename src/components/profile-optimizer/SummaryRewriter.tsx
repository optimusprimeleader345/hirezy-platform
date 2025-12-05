'use client'

interface SummaryRewriterProps {
  original: string
  improved: string
}

export function SummaryRewriter({ original, improved }: SummaryRewriterProps) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h3 className="text-white font-semibold mb-4">Summary Enhancement</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-white font-medium mb-3">Original</h4>
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-white/70 text-sm">{original || 'No summary provided'}</p>
          </div>
        </div>

        <div>
          <h4 className="text-white font-medium mb-3">AI Enhanced</h4>
          <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
            <p className="text-green-400 text-sm">{improved}</p>
          </div>
        </div>
      </div>

      <button className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700">
        Apply Enhanced Summary
      </button>
    </div>
  )
}
