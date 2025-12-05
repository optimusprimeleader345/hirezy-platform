'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { CalendarDays, DollarSign, Plus, X, CheckCircle } from 'lucide-react'

export default function PostGigPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [budget, setBudget] = useState('')
  const [deadline, setDeadline] = useState('')
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState('')
  const [showToast, setShowToast] = useState(false)

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill('')
    }
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/recruiter/gig/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recruiterId: "demo-recruiter-1",
        title,
        description,
        budgetMin: Number(budget) || null,
        budgetMax: null,
        deadline: deadline ? new Date(deadline) : null,
        skills
      })
    });

    const data = await res.json();
    if (data.success) {
      alert("Gig posted successfully!");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#FFFFFF]">Create New Gig</h1>
        <p className="text-[#C9CFD6]">Post a new job opportunity and reach talented freelancers</p>
      </div>

      <Card style={{
        background: '#1A1D21',
        border: '1px solid #23262B',
        borderRadius: '12px',
        padding: '20px',
        color: '#C9CFD6',
        boxShadow: '0 4px 20px rgba(0,0,0,0.35)'
      }}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#FFFFFF] mb-2">Title</label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. React Frontend Developer"
              className="w-full bg-[#111315] border-[#23262B] text-[#C9CFD6] placeholder-[#8A8F98] focus:ring-[#3EFFA8] focus:border-[#3EFFA8]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#FFFFFF] mb-2">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the project requirements, deliverables, and expectations..."
              rows={6}
              className="w-full bg-[#111315] border-[#23262B] text-[#C9CFD6] placeholder-[#8A8F98] focus:ring-[#3EFFA8] focus:border-[#3EFFA8]"
              required
            />
            <Button size="sm" className="mt-2 bg-[#3EFFA8] hover:bg-[#00ff88] text-black border-[#3EFFA8]">
              AI Description Cleaner
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#FFFFFF] mb-2">Budget</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8A8F98] w-4 h-4" />
                <Input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="5000"
                  className="pl-10 bg-[#111315] border-[#23262B] text-[#C9CFD6] placeholder-[#8A8F98] focus:ring-[#3EFFA8] focus:border-[#3EFFA8]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#FFFFFF] mb-2">Deadline</label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8A8F98] w-4 h-4" />
                <Input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="pl-10 bg-[#111315] border-[#23262B] text-[#C9CFD6] focus:ring-[#3EFFA8] focus:border-[#3EFFA8]"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#FFFFFF] mb-2">Required Skills</label>
            <div className="flex gap-2 mb-3">
              <Input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                className="flex-1 bg-[#111315] border-[#23262B] text-[#C9CFD6] placeholder-[#8A8F98] focus:ring-[#3EFFA8] focus:border-[#3EFFA8]"
              />
              <Button type="button" onClick={addSkill} className="bg-[#3EFFA8] hover:bg-[#00ff88] text-black border-[#3EFFA8]">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#3EFFA8] text-black cursor-pointer hover:bg-[#00ff88]"
                  onClick={() => removeSkill(skill)}
                >
                  {skill}
                  <X className="w-3 h-3 ml-1" />
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="bg-[#3EFFA8] hover:bg-[#00ff88] text-black">
              Create Gig
            </Button>
            <Button type="button" className="bg-transparent border-[#23262B] text-[#C9CFD6] hover:bg-[#111315]">
              Save Draft
            </Button>
          </div>
        </form>
      </Card>

      {showToast && (
        <div className="fixed bottom-4 right-4 bg-[#3EFFA8] text-black px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          Gig posted successfully!
        </div>
      )}
    </div>
  )
}
