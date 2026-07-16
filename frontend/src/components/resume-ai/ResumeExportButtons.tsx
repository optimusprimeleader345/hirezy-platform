'use client'

import { GlassCard } from '@/components/cards/GlassCard'
import { Download, FileText, File, Code } from 'lucide-react'

interface Props {
  resumeText: string
}

export function ResumeExportButtons({ resumeText }: Props) {
  const handleExport = async (format: string) => {
    // Placeholder - in real implementation would call export APIs
    console.log(`Exporting as ${format}:`, resumeText.substring(0, 100))

    // Simulate download
    alert(`Resume exported as ${format.toUpperCase()}!`)
  }

  return (
    <GlassCard>
      <div className="space-y-4">
        <div className="flex items-center">
          <Download className="w-5 h-5 mr-2 text-purple-400" />
          <h3 className="text-white font-semibold">Export Options</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => handleExport('pdf')}
            className="flex items-center justify-center p-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg transition-colors"
          >
            <FileText className="w-5 h-5 mr-2 text-red-400" />
            <span className="text-white text-sm">PDF</span>
          </button>

          <button
            onClick={() => handleExport('docx')}
            className="flex items-center justify-center p-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg transition-colors"
          >
            <File className="w-5 h-5 mr-2 text-blue-400" />
            <span className="text-white text-sm">DOCX</span>
          </button>

          <button
            onClick={() => handleExport('txt')}
            className="flex items-center justify-center p-3 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg transition-colors"
          >
            <Code className="w-5 h-5 mr-2 text-green-400" />
            <span className="text-white text-sm">TXT</span>
          </button>
        </div>
      </div>
    </GlassCard>
  )
}
