'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'

export default function CandidateScoringPage() {
  const [resumeText, setResumeText] = useState('')
  const [portfolioLinks, setPortfolioLinks] = useState('')
  const [experience, setExperience] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [score, setScore] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  async function scoreCandidate() {
    setLoading(true)
    const res = await fetch("/api/recruiter/ai/candidate-score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resumeText,
        portfolioLinks,
        experience,
        jobDescription
      })
    });
    const data = await res.json();
    setLoading(false)
    if (data.success) setScore(data.scoring);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">AI Candidate Scoring Engine</h1>

      <Card className="p-6 bg-[#1A1D21]">
        <div className="space-y-4">
          <Textarea
            placeholder="Paste resume text here"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            rows={4}
            className="bg-[#111315] border-[#23262B]"
          />
          <Textarea
            placeholder="Portfolio links"
            value={portfolioLinks}
            onChange={(e) => setPortfolioLinks(e.target.value)}
            rows={2}
            className="bg-[#111315] border-[#23262B]"
          />
          <Textarea
            placeholder="Experience details"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            rows={4}
            className="bg-[#111315] border-[#23262B]"
          />
          <Textarea
            placeholder="Job description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={4}
            className="bg-[#111315] border-[#23262B]"
          />
          <Button onClick={scoreCandidate} disabled={loading} className="bg-[#3EFFA8]">
            {loading ? 'Scoring...' : 'Score Candidate'}
          </Button>
        </div>
      </Card>

      {score && (
        <Card className="p-6 bg-[#1A1D21]">
          <h2 className="text-xl font-bold text-white mb-4">Scoring Results</h2>
          <div className="space-y-2">
            <p className="text-[#C9CFD6]">Overall Score: {score.overallScore}%</p>
            <p className="text-[#C9CFD6]">Final Recommendation: {score.finalRecommendation}</p>
          </div>
        </Card>
      )}
    </div>
  )
}
