'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'

export default function ResumeAnalyzerPage() {
  const [resumeText, setResumeText] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [analysis, setAnalysis] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  async function analyze() {
    setLoading(true)
    const res = await fetch("/api/recruiter/ai/resume-analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resumeText,
        jobDescription
      })
    });
    const data = await res.json();
    setLoading(false)
    if (data.success) setAnalysis(data.analysis);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">AI Resume Analyzer</h1>

      <Card className="p-6 bg-[#1A1D21]">
        <div className="space-y-4">
          <Textarea
            placeholder="Paste resume text here"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            rows={6}
            className="bg-[#111315] border-[#23262B]"
          />
          <Textarea
            placeholder="Paste job description here"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={6}
            className="bg-[#111315] border-[#23262B]"
          />
          <Button onClick={analyze} disabled={loading} className="bg-[#3EFFA8]">
            {loading ? 'Analyzing...' : 'Analyze Resume'}
          </Button>
        </div>
      </Card>

      {analysis && (
        <Card className="p-6 bg-[#1A1D21]">
          <h2 className="text-xl font-bold text-white mb-4">Analysis Results</h2>
          <div className="space-y-2">
            <p className="text-[#C9CFD6]">Skill Match Score: {analysis.skillMatchScore}%</p>
            <p className="text-[#C9CFD6]">Missing Skills: {analysis.missingSkills.join(', ')}</p>
            <p className="text-[#C9CFD6]">Matched Skills: {analysis.matchedSkills.join(', ')}</p>
            <p className="text-[#C9CFD6]">Candidate Summary: {analysis.candidateSummary}</p>
            <p className="text-[#C9CFD6]">Risk Factors: {analysis.riskFactors.join(', ')}</p>
          </div>
        </Card>
      )}
    </div>
  )
}
