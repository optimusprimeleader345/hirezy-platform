'use client'

import { Suspense, useState } from 'react'
import { GlassCard } from '@/components/cards/GlassCard'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Upload, FileText, Shield, Target, Brain, Zap, Folder, Edit3, AlertTriangle, Download } from 'lucide-react'
import { StrengthScoreCard } from '@/components/resume-ai/StrengthScoreCard'
import { ATSReport } from '@/components/resume-ai/ATSReport'
import { MissingSkills } from '@/components/resume-ai/MissingSkills'
import { AchievementRewriter } from '@/components/resume-ai/AchievementRewriter'
import { PortfolioSuggestions } from '@/components/resume-ai/PortfolioSuggestions'
import { ResumeAutoFix } from '@/components/resume-ai/ResumeAutoFix'
import { ResumeExportButtons } from '@/components/resume-ai/ResumeExportButtons'
import { SectionGenerator } from '@/components/resume-ai/SectionGenerator'

export default function ResumeAIPage() {
  const [resumeText, setResumeText] = useState('')

  return (
    <div className="min-h-screen space-y-8">
      {/* Hero Section */}
      <GlassCard className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30">
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <Brain className="w-16 h-16 text-purple-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Resume AI
          </h1>
          <p className="text-white/70 text-lg max-w-3xl mx-auto mb-8">
            Transform your resume with AI-powered optimization, ATS compliance checks,
            achievement rewriting, and job-matching features. Get a professional edge instantly.
          </p>

          {/* Resume Input */}
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="space-y-2">
              <label className="text-white font-medium text-sm">Paste or upload your resume</label>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume content here, or upload a file..."
                className="w-full h-40 bg-white/10 border border-white/20 rounded-lg p-4 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 scrollbar-thin scrollbar-thumb-white/20"
              />
            </div>

            <div className="flex gap-3 justify-center">
              <Button className="px-6">
                <Upload className="w-4 h-4 mr-2" />
                Upload Resume
              </Button>
              {resumeText && (
                <Button variant="outline" className="px-6">
                  Analyze Resume
                </Button>
              )}
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Tabbed Features */}
      <Tabs defaultValue="strength" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8 bg-white/5 border border-white/10">
          <TabsTrigger value="strength" className="data-[state=active]:bg-purple-600/20 data-[state=active]:text-white">
            <Target className="w-4 h-4 mr-1" />
            Strength Score
          </TabsTrigger>
          <TabsTrigger value="ats" className="data-[state=active]:bg-purple-600/20 data-[state=active]:text-white">
            <Shield className="w-4 h-4 mr-1" />
            ATS Check
          </TabsTrigger>
          <TabsTrigger value="skills" className="data-[state=active]:bg-purple-600/20 data-[state=active]:text-white">
            <Zap className="w-4 h-4 mr-1" />
            Missing Skills
          </TabsTrigger>
          <TabsTrigger value="achievements" className="data-[state=active]:bg-purple-600/20 data-[state=active]:text-white">
            <Edit3 className="w-4 h-4 mr-1" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="portfolio" className="data-[state=active]:bg-purple-600/20 data-[state=active]:text-white">
            <Folder className="w-4 h-4 mr-1" />
            Portfolio
          </TabsTrigger>
        </TabsList>

        <div className="space-y-8">
          {/* First Row - Strength Score & ATS Report */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StrengthScoreCard resumeText={resumeText} />
            <ATSReport resumeText={resumeText} />
          </div>

          <TabsContent value="strength" className="mt-0">
            <div className="space-y-6">
              <ResumeAutoFix resumeText={resumeText} onResumeUpdate={setResumeText} />
              <ResumeExportButtons resumeText={resumeText} />
            </div>
          </TabsContent>

          <TabsContent value="ats" className="mt-0">
            <div className="space-y-6">
              <SectionGenerator resumeText={resumeText} />
              <GlassCard title="Red Flag Detector">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2" />
                      <span className="text-white font-medium">Resume Red Flags Detected</span>
                    </div>
                    <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs">3 Issues</span>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-white/5 border border-yellow-500/20 rounded-lg p-3">
                      <div className="text-white/80 font-medium mb-1">Weak Action Verbs</div>
                      <div className="text-white/60 text-sm">Found 5 instances of "worked on" - use stronger verbs like "developed", "optimized", "implemented"</div>
                    </div>
                    <div className="bg-white/5 border border-yellow-500/20 rounded-lg p-3">
                      <div className="text-white/80 font-medium mb-1">Missing Metrics</div>
                      <div className="text-white/60 text-sm">Several achievements lack quantifiable results - add percentages, numbers, or scale</div>
                    </div>
                    <div className="bg-white/5 border border-yellow-500/20 rounded-lg p-3">
                      <div className="text-white/80 font-medium mb-1">Repetitive Language</div>
                      <div className="text-white/60 text-sm">"Responsible for" is repeated 4 times - vary your language</div>
                    </div>
                  </div>

                  <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                    Fix All Issues (AI)
                  </Button>
                </div>
              </GlassCard>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="mt-0">
            <MissingSkills resumeText={resumeText} />
          </TabsContent>

          <TabsContent value="achievements" className="mt-0">
            <AchievementRewriter resumeText={resumeText} />
          </TabsContent>

          <TabsContent value="portfolio" className="mt-0">
            <PortfolioSuggestions resumeText={resumeText} />
          </TabsContent>
        </div>
      </Tabs>

      {/* Job Matching Feature */}
      <GlassCard title="Job-Match Resume Rewrite">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-white font-medium text-sm">Target Job Description</label>
              <textarea
                placeholder="Paste the job description you want to apply for..."
                className="w-full h-32 bg-white/10 border border-white/20 rounded-lg p-4 text-white placeholder-white/50 focus:outline-none focus:border-purple-400"
              />
            </div>
            <div className="space-y-2">
              <label className="text-white font-medium text-sm">Resume Preview</label>
              <textarea
                value={resumeText}
                readOnly
                className="w-full h-32 bg-white/5 border border-white/20 rounded-lg p-4 text-white/80 text-sm"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <FileText className="w-4 h-4 mr-2" />
              Generate Job-Matched Resume
            </Button>
            <Button variant="outline">Preview Changes</Button>
          </div>
        </div>
      </GlassCard>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
          <Zap className="w-4 h-4 mr-2" />
          One-Click Full Optimize
        </Button>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Optimized Resume
        </Button>
        <Button variant="outline">
          <Shield className="w-4 h-4 mr-2" />
          Check ATS Compatibility
        </Button>
      </div>
    </div>
  )
}
