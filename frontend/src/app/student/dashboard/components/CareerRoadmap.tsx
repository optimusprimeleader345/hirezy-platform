'use client'

import { useEffect, useState } from 'react'
import { fetchRoadmap, updateRoadmap } from '../../../../utils/api/roadmapClient'

export default function CareerRoadmap() {
  const [loading, setLoading] = useState(true)
  const [currentStage, setCurrentStage] = useState<string>("Beginner")
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [nextSteps, setNextSteps] = useState<string[]>([])

  async function completeStep(step: string) {
    try {
      // Optimistic UI update
      const newCompleted = [...completedSteps, step];
      setCompletedSteps(newCompleted);

      const updated = await updateRoadmap({
        studentId: "demo-student-id",
        completedSteps: newCompleted
      });

      // Refresh AI next steps
      setNextSteps(updated.nextSteps);
      setCurrentStage(updated.currentStage);
    } catch (err) {
      console.error("Failed to update roadmap:", err)
    }
  }

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchRoadmap("demo-student-id")
        setCurrentStage(data.currentStage)
        setCompletedSteps(data.completedSteps)
        setNextSteps(data.nextSteps)
      } catch (err) {
        console.error("Failed to load roadmap:", err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  if (loading) {
    return (
      <div className="rounded-2xl p-6 bg-[#0d0f1a] border border-white/5 shadow-lg">
        <p className="text-gray-400">Loading roadmap…</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl p-6 bg-[#0d0f1a] border border-white/5 shadow-lg">
      <h3 className="text-xl font-semibold text-white">{currentStage}</h3>

      {completedSteps.map(step => (
        <div key={step} className="text-sm text-green-400">✓ {step}</div>
      ))}

      {nextSteps.map(step => (
        <button
          key={step}
          onClick={() => completeStep(step)}
          className="text-left text-sm text-blue-300 hover:text-blue-200 transition cursor-pointer"
        >
          • {step}
        </button>
      ))}
    </div>
  )
}
