'use client'

interface CertificationsPanelProps {
  certifications: string[]
}

export function CertificationsPanel({ certifications }: CertificationsPanelProps) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h3 className="text-white font-semibold mb-4">Recommended Certifications ({certifications.length})</h3>
      <div className="space-y-3">
        {certifications.map((cert, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <span className="text-white font-medium text-sm">{cert}</span>
            <button className="px-3 py-1 text-sm bg-green-600/20 text-green-400 rounded hover:bg-green-600/30">
              Add Cert
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
