'use client'

import { useState } from 'react'
import { GlassCard } from '@/components/cards/GlassCard'
import { FileText, Target, Award, GitBranch, Book, Trophy, MapPin } from 'lucide-react'
import { ProfileInput } from '@/components/profile-optimizer/ProfileInput'
import { ProfileScoreCard } from '@/components/profile-optimizer/ProfileScoreCard'
import { SummaryRewriter } from '@/components/profile-optimizer/SummaryRewriter'
import { SkillsSuggestions } from '@/components/profile-optimizer/SkillsSuggestions'
import { GithubOptimizer } from '@/components/profile-optimizer/GithubOptimizer'
import { CertificationsPanel } from '@/components/profile-optimizer/CertificationsPanel'
import { ImprovementRoadmap } from '@/components/profile-optimizer/ImprovementRoadmap'

export default function ProfileOptimizerPage() {
  const [profileData, setProfileData] = useState<any>(null)
  const [analysis, setAnalysis] = useState<any>(null)

  const handleProfileUpdate = (data: any) => {
    setProfileData(data)
  }

  const analyzeProfile = async () => {
    // Simulate API call
    const mockAnalysis = {
      score: 78,
      strengths: ['Good frontend skills', 'Clear project experience'],
      weaknesses: ['Weak GitHub presence', 'Limited certifications'],
      recommendedSkills: ['TypeScript', 'AWS', 'Docker'],
      improvedSummary: 'Passionate full-stack developer with 2+ years of experience building scalable web applications...',
      improvedAbout: 'I specialize in modern web development with expertise in React, Node.js, and cloud technologies...',
      githubSuggestions: ['Add README badges', 'Improve documentation', 'Update project screenshots'],
      certificationSuggestions: ['AWS Cloud Practitioner', 'Meta Frontend Developer'],
      impactScore: 82
    }
    setAnalysis(mockAnalysis)
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
      {/* Hero Section */}
      <GlassCard className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30">
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <Trophy className="w-16 h-16 text-purple-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Profile Optimization AI
          </h1>
          <p className="text-white/70 text-lg max-w-3xl mx-auto mb-8">
            Get AI-powered analysis and improvements for your professional profile.
            Enhance summaries, add skills, optimize GitHub, and boost career visibility.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center px-3 py-1 bg-white/10 rounded-full">
              🤖 AI Analysis & Scoring
            </div>
            <div className="flex items-center px-3 py-1 bg-white/10 rounded-full">
              ✍️ LinkedIn Summary Enhancement
            </div>
            <div className="flex items-center px-3 py-1 bg-white/10 rounded-full">
              📊 GitHub Optimization
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Profile Input */}
      <ProfileInput onUpdate={handleProfileUpdate} />

      {/* Analyze Button */}
      {profileData && (
        <div className="flex justify-center">
          <button
            onClick={analyzeProfile}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 flex items-center"
          >
            <Target className="w-5 h-5 mr-2" />
            Analyze & Optimize Profile
          </button>
        </div>
      )}

      {/* Analysis Results */}
      {analysis && (
        <>
          {/* Profile Score */}
          <ProfileScoreCard
            score={analysis.score}
            strengths={analysis.strengths}
            weaknesses={analysis.weaknesses}
            impactScore={analysis.impactScore}
          />

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Summary Rewriter */}
              <SummaryRewriter
                original={profileData?.summary || 'No summary provided'}
                improved={analysis.improvedSummary}
              />

              {/* Skills Suggestions */}
              <SkillsSuggestions skills={analysis.recommendedSkills} />

              {/* Certifications */}
              <CertificationsPanel certifications={analysis.certificationSuggestions} />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* GitHub Optimizer */}
              <GithubOptimizer suggestions={analysis.githubSuggestions} />

              {/* Improvement Roadmap */}
              <ImprovementRoadmap />

              {/* Export */}
              <GlassCard title="Profile Enhancement Summary">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Current Score:</span>
                    <span className="text-white font-bold">{analysis.score}/100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Potential Score:</span>
                    <span className="text-green-400 font-bold">{analysis.impactScore}/100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Improvement Potential:</span>
                    <span className="text-blue-400 font-bold">+{analysis.impactScore - analysis.score} points</span>
                  </div>
                  <button className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700">
                    Apply All Improvements
                  </button>
                </div>
              </GlassCard>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
