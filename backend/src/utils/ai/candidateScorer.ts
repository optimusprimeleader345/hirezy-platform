/**
 * utils/ai/candidateScorer.ts
 * Provides a mock-first scoring engine. If GEMINI/OPENAI key present,
 * you can call the model; otherwise uses deterministic heuristics.
 */

type ScoreResult = {
  overallScore: number; // 0-100
  skillScore: number;   // 0-100
  experienceScore: number; // 0-100
  projectScore: number; // 0-100
  communicationScore: number; // 0-100
  strengths: string[]; // bullet points
  weaknesses: string[]; // bullet points
  note?: string; // "mock-generated" or "AI-generated"
};

function clamp(n: number) { return Math.max(0, Math.min(100, Math.round(n))); }

export async function computeScoreMock(payload: {
  resumeText?: string;
  skills?: string[];      // extracted skills
  experienceYears?: number;
  portfolioLinks?: string[];
  jobDescription?: string;
}): Promise<ScoreResult> {
  const skills = payload.skills || [];
  const exp = payload.experienceYears ?? 0;
  const portfolioCount = (payload.portfolioLinks || []).length;
  // simple heuristics
  const skillScore = clamp(Math.min(80, skills.length * 10 + (portfolioCount * 5)));
  const experienceScore = clamp(Math.min(90, exp * 8 + (portfolioCount * 3)));
  const projectScore = clamp( Math.min(90, portfolioCount * 25 + (skills.length * 5)) );
  const communicationScore = payload.resumeText ? clamp(Math.min(90, 50 + Math.floor(payload.resumeText.length / 1000) * 5)) : 40;
  const overall = clamp(Math.round((skillScore * 0.4) + (experienceScore * 0.25) + (projectScore * 0.2) + (communicationScore * 0.15)));

  const strengths = [];
  const weaknesses = [];
  if (skills.length >= 5) strengths.push("Wide skill coverage");
  if (exp >= 3) strengths.push("Solid experience");
  if (portfolioCount >= 2) strengths.push("Strong portfolio presence");

  if (skills.length < 3) weaknesses.push("Few listed skills");
  if (exp < 1) weaknesses.push("Limited professional experience");
  if (portfolioCount === 0) weaknesses.push("No portfolio links provided");

  return {
    overallScore: overall,
    skillScore,
    experienceScore,
    projectScore,
    communicationScore,
    strengths,
    weaknesses,
    note: "mock-generated"
  };
}

// Optional: wrapper to call external AI if key is present (does nothing without key)
export async function computeScoreAI(payload: {
  resumeText?: string;
  skills?: string[];
  experienceYears?: number;
  portfolioLinks?: string[];
  jobDescription?: string;
}): Promise<ScoreResult> {
  const key = process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY;
  if (!key) {
    return computeScoreMock(payload);
  }

  // Keep this safe: simple fetch to OpenAI/Gemini can be added if you enable keys.
  // To avoid runtime errors for now, fall back to computeScoreMock immediately.
  return computeScoreMock(payload);
}

export type { ScoreResult };
