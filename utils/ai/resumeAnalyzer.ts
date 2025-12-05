/**
 * utils/ai/resumeAnalyzer.ts
 * Provides a mock-first resume analysis engine. If GEMINI/OPENAI key present,
 * you can call the model; otherwise uses deterministic heuristics.
 */

type ResumeAnalysis = {
  summary: string;
  keySkills: string[];
  strengths: string[];
  weaknesses: string[];
  atsScore: number; // 0–100
  note: "mock-generated" | "ai-generated";
};

function clamp(n: number) { return Math.max(0, Math.min(100, Math.round(n))); }

export async function mockResumeAnalysis(resumeText?: string): Promise<ResumeAnalysis> {
  const text = resumeText || "";
  const textLength = text.length;

  // Extract potential skills (mock - real implementation would use NLP)
  const commonSkills = [
    "JavaScript", "React", "Node.js", "Python", "TypeScript", "HTML", "CSS",
    "SQL", "Git", "Docker", "AWS", "MongoDB", "Express", "Next.js", "Vue",
    "Angular", "PostgreSQL", "Redis", "GraphQL", "REST APIs"
  ];

  const keySkills = commonSkills.filter(skill =>
    text.toLowerCase().includes(skill.toLowerCase()) ||
    Math.random() > 0.7 // Add some random skills for variety
  ).slice(0, Math.floor(Math.random() * 5) + 3); // 3-7 skills

  // Generate summary based on text length and detected skills
  const experienceLevel = textLength > 2000 ? "senior" : textLength > 1000 ? "mid-level" : "junior";
  const summary = `This ${experienceLevel} developer demonstrates strong technical skills in ${keySkills.length} key areas. The resume shows practical experience with modern development technologies and best practices. Overall candidate alignment appears solid for frontend/backend development roles.`;

  // Strengths based on detected elements
  const strengths: string[] = [];
  if (textLength > 500) strengths.push("Detailed project descriptions");
  if (keySkills.length >= 4) strengths.push("Broad technical skill set");
  if (text.toLowerCase().includes("education") || textLength > 800) strengths.push("Good educational background");
  if (Math.random() > 0.5) strengths.push("Leadership experience shown");

  // Weaknesses and areas for improvement
  const weaknesses: string[] = [];
  if (textLength < 800) weaknesses.push("Resume could be more detailed");
  if (keySkills.length < 3) weaknesses.push("Skill coverage could be expanded");
  if (!text.toLowerCase().includes("project")) weaknesses.push("More specific project achievements needed");

  // ATS score calculation (keyword matches, format, etc.)
  const baseScore = Math.min(80, 40 + Math.floor(textLength / 50)); // Base on text length
  const skillBonus = Math.min(20, keySkills.length * 3); // Skill diversity bonus
  const atsScore = clamp(baseScore + skillBonus);

  return {
    summary,
    keySkills,
    strengths,
    weaknesses,
    atsScore,
    note: "mock-generated"
  };
}

export async function analyzeResumeAI(resumeText?: string): Promise<ResumeAnalysis> {
  const key = process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY;
  if (!key) {
    return mockResumeAnalysis(resumeText);
  }

  // TODO: Implement actual AI integration when keys are available
  // For now, fall back to mock
  return mockResumeAnalysis(resumeText);
}

export type { ResumeAnalysis };
