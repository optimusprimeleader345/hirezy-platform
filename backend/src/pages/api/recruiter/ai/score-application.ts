import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { computeScoreAI } from "../../../../utils/ai/candidateScorer";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });

  try {
    const { applicationId } = req.body;
    if (!applicationId) return res.status(400).json({ error: "applicationId required" });

    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        student: true
      }
    });

    if (!application) return res.status(404).json({ error: "application_not_found" });

    // Note: User model doesn't have resumeText, profileSummary, skills, etc. fields
    // These would need to be added to the User schema if desired
    const resumeText = "";
    const skills: string[] = [];
    const experienceYears = 0;
    const portfolioLinks: string[] = [];

    const score = await computeScoreAI({
      resumeText,
      skills,
      experienceYears,
      portfolioLinks,
      jobDescription: application.gigId ? undefined : undefined
    });

    // store aiScore on application if column exists
    try {
      await prisma.application.update({
        where: { id: applicationId },
        data: { aiScore: score.overallScore }
      });
    } catch (e) {
      // optional: if update fails (schema mismatch), ignore but return score
      console.warn("Unable to persist aiScore to application:", e);
    }

    return res.status(200).json({ success: true, score });
  } catch (err) {
    console.error("score application error:", err);
    return res.status(500).json({ error: "internal_error" });
  }
}
