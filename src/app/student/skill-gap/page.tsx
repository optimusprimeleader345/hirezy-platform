'use client'

import { Suspense, useState } from 'react'
import { GlassCard } from '@/components/cards/GlassCard'
import { Target, TrendingDown, Book, Calendar, Award, Zap, Lightbulb, CheckCircle } from 'lucide-react'
import { UserSkillsInput } from '@/components/skill-gap/UserSkillsInput'
import { GapScoreCard } from '@/components/skill-gap/GapScoreCard'
import { MissingSkillsList } from '@/components/skill-gap/MissingSkillsList'
import { RecommendedSkillsList } from '@/components/skill-gap/RecommendedSkillsList'
import { PriorityRoadmap } from '@/components/skill-gap/PriorityRoadmap'

export default function SkillGapAIPage() {
  const [userSkills, setUserSkills] = useState<string[]>([])
  const [gapAnalysis, setGapAnalysis] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleSkillsUpdate = (skills: string[]) => {
    setUserSkills(skills)
  }

  const analyzeSkillGap = async () => {
    setIsAnalyzing(true)
    try {
      // Simulate API call
      setTimeout(() => {
        setGapAnalysis({
          gapScore: 65,
          missingSkills: ["React Native", "Docker", "CI/CD Pipelines", "AWS Lambda"],
          recommendedSkills: ["REST APIs", "Postman", "Unit Testing", "MongoDB"],
          difficultyLevel: "Intermediate",
          prioritySkills: ["Docker", "CI/CD"],
          analysis: "You have strong frontend fundamentals but need DevOps expertise to advance to mid-level roles. Focus on cloud deployment technologies."
        })
      }, 2000)
    } catch (error) {
      console.error('Analysis failed:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen space-y-8">
      {/* Hero Section */}
      <GlassCard className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30">
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <Target className="w-16 h-16 text-purple-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Skill Gap AI Analyzer
          </h1>
          <p className="text-white/70 text-lg max-w-3xl mx-auto mb-8">
            Advanced AI-powered analysis to identify your skill gaps against market requirements,
            career goals, and industry standards. Get personalized improvement roadmaps.
          </p>
        </div>
      </GlassCard>

      {/* Skills Input Section */}
      <UserSkillsInput
        onSkillsUpdate={handleSkillsUpdate}
        currentSkills={userSkills}
      />

      {/* Analyze Button */}
      {userSkills.length > 0 && (
        <div className="flex justify-center">
          <button
            onClick={analyzeSkillGap}
            disabled={isAnalyzing}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 flex items-center"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Analyzing Skill Gap...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 mr-2" />
                Analyze My Skill Gap
              </>
            )}
          </button>
        </div>
      )}

      {/* Analysis Results */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        {gapAnalysis && (
          <>
            {/* Gap Score & Overview */}
            <GapScoreCard analysis={gapAnalysis} />

            {/* Skills Analysis Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <MissingSkillsList skills={gapAnalysis.missingSkills} />
              <RecommendedSkillsList skills={gapAnalysis.recommendedSkills} />
            </div>

            {/* Priority Roadmap */}
            <PriorityRoadmap analysis={gapAnalysis} />

            {/* Action Panel */}
            <GlassCard className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-400/30">
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-4">Ready to Bridge Your Skill Gap?</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700">
                    🚀 Start Learning Plan
                  </button>
                  <button className="px-6 py-3 border border-white/20 text-white hover:bg-white/10 rounded-lg">
                    📊 Generate Detailed Report
                  </button>
                  <button className="px-6 py-3 border border-white/20 text-white hover:bg-white/10 rounded-lg">
                    🎯 Find Skill-Building Gigs
                  </button>
                </div>
              </div>
            </GlassCard>
          </>
        )}

        {/* Empty State */}
        {!gapAnalysis && (
          <GlassCard className="text-center py-16">
            <Lightbulb className="w-20 h-20 text-purple-400 mx-auto mb-6" />
            <h3 className="text-xl font-bold text-white mb-4">Enter Your Skills to Get Started</h3>
            <p className="text-white/70 max-w-2xl mx-auto">
              Add your current technical skills above and click "Analyze My Skill Gap" to receive
              AI-powered insights about your skills, missing capabilities, and a personalized
              learning roadmap to reach your career goals.
            </p>
          </GlassCard>
        )}
      </div>
    </div>
  )
}
