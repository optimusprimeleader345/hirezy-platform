'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function CandidateComparison() {
  const candidate1 = { id: '1', name: 'John Doe', role: 'React Developer', skills: ['React', 'JavaScript', 'CSS'] }
  const candidate2 = { id: '2', name: 'Jane Smith', role: 'UI/UX Designer', skills: ['Figma', 'Adobe XD', 'Sketch'] }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#FFFFFF]">Candidate Comparison</h1>
        <p className="text-[#C9CFD6]">Compare multiple candidates side by side</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Candidate 1 */}
        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-5 text-[#E2E8F0] shadow-[0_4px_18px_rgba(0,0,0,0.4)] border-b-2 border-b-[#3EFFA8] hover:transform hover:translate-y-[-4px] hover:shadow-[0_8px_28px_rgba(0,0,0,0.55)] transition-all duration-200">
          <h3 className="text-xl font-bold text-[#FFFFFF] mb-4">{candidate1.name}</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-[#C9CFD6] text-sm">Role</h4>
              <p className="text-[#E2E8F0] font-medium">{candidate1.role}</p>
            </div>
            <div>
              <h4 className="font-medium text-[#C9CFD6] text-sm">Skills</h4>
              <div className="flex flex-wrap gap-1">
                {candidate1.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-[#3EFFA8] text-black rounded-full text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-[#C9CFD6] text-sm">Experience</h4>
              <p className="text-[#E2E8F0] font-medium">3 years</p>
            </div>
            <div>
              <h4 className="font-medium text-[#C9CFD6] text-sm">AI Fit Score</h4>
              <p className="text-3xl font-bold text-[#3EFFA8]">87%</p>
            </div>
            <div>
              <Button className="bg-[#3EFFA8] hover:bg-[#00ff88] text-black">View Portfolio</Button>
            </div>
          </div>
        </Card>

        {/* Candidate 2 */}
        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-5 text-[#E2E8F0] shadow-[0_4px_18px_rgba(0,0,0,0.4)] border-b-2 border-b-[#3EFFA8] hover:transform hover:translate-y-[-4px] hover:shadow-[0_8px_28px_rgba(0,0,0,0.55)] transition-all duration-200">
          <h3 className="text-xl font-bold text-[#FFFFFF] mb-4">{candidate2.name}</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-[#C9CFD6] text-sm">Role</h4>
              <p className="text-[#E2E8F0] font-medium">{candidate2.role}</p>
            </div>
            <div>
              <h4 className="font-medium text-[#C9CFD6] text-sm">Skills</h4>
              <div className="flex flex-wrap gap-1">
                {candidate2.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-[#3EFFA8] text-black rounded-full text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-[#C9CFD6] text-sm">Experience</h4>
              <p className="text-[#E2E8F0] font-medium">5 years</p>
            </div>
            <div>
              <h4 className="font-medium text-[#C9CFD6] text-sm">AI Fit Score</h4>
              <p className="text-3xl font-bold text-[#3EFFA8]">91%</p>
            </div>
            <div>
              <Button className="bg-[#3EFFA8] hover:bg-[#00ff88] text-black">View Portfolio</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
