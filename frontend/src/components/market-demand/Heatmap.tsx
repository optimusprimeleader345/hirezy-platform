'use client'

interface HeatmapData {
  [skill: string]: {
    [region: string]: number
  }
}

interface HeatmapProps {
  data: HeatmapData
  currentRegion?: string
}

const skills = ['React', 'Python', 'TypeScript', 'AWS', 'Docker', 'Node.js']
const regions = ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 'Pune']

export function Heatmap({ data, currentRegion = 'Bangalore' }: HeatmapProps) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h3 className="text-white font-semibold mb-4">Skill Demand Heatmap</h3>
      <p className="text-white/60 text-sm mb-6">
        Demand intensity by region (darker = higher demand)
      </p>

      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Header */}
          <div className="flex mb-2">
            <div className="w-24 flex-shrink-0 text-xs text-white/60 font-medium">Skill</div>
            {regions.map(region => (
              <div key={region} className="flex-1 text-xs text-white/60 text-center">
                {region.slice(0, 6)}
              </div>
            ))}
          </div>

          {/* Rows */}
          {skills.map(skill => (
            <div key={skill} className="flex items-center mb-2">
              <div className="w-24 flex-shrink-0 text-sm text-white font-medium truncate">
                {skill}
              </div>
              {regions.map(region => {
                const intensity = data[region.toLowerCase()]?.[skill.toLowerCase()] || 0
                const maxIntensity = 100
                const opacity = Math.min(intensity / maxIntensity, 1)

                // Color mapping: green for high, blue for medium, purple for low
                let color = 'rgba(239, 68, 68' // red
                if (intensity > 80) color = 'rgba(34, 197, 94' // green
                else if (intensity > 65) color = 'rgba(59, 130, 246' // blue
                else if (intensity > 50) color = 'rgba(168, 85, 247' // purple

                return (
                  <div
                    key={`${region}-${skill}`}
                    className="flex-1 h-8 rounded mx-1 flex items-center justify-center text-xs font-bold text-white"
                    style={{
                      backgroundColor: `${color}, ${opacity})`,
                      transition: 'opacity 0.3s ease'
                    }}
                    title={`${region} - ${skill}: ${intensity}%`}
                  >
                    {intensity > 50 ? intensity : ''}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center space-x-6 text-xs text-white/60">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded mr-2" style={{ backgroundColor: '#22c55e' }}></div>
          High Demand
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded mr-2" style={{ backgroundColor: '#3b82f6' }}></div>
          Medium Demand
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded mr-2" style={{ backgroundColor: '#a855f7' }}></div>
          Low Demand
        </div>
      </div>
    </div>
  )
}
