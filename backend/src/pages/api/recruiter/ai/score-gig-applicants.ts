import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { computeScoreAI } from "../../../../utils/ai/candidateScorer";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });

  try {
    const { gigId } = req.body;
    if (!gigId) return res.status(400).json({ error: "gigId required" });

    const applications = await prisma.application.findMany({
      where: { gigId },
      include: { student: true }
    });

    const results = [];
    for (const app of applications) {
      const score = await computeScoreAI({
        resumeText: app.coverLetter || "",
        skills: [],
        experienceYears: 0,
        portfolioLinks: []
      });

      // try persist
      try {
        await prisma.application.update({
          where: { id: app.id },
          data: { aiScore: score.overallScore }
        });
      } catch (e) {
        console.warn(`Failed to save score for application ${app.id}:`, e);
      }

      results.push({ applicationId: app.id, overall: score.overallScore });
    }

    return res.status(200).json({ success: true, results });
  } catch (err) {
    console.error("bulk score error:", err);
    return res.status(500).json({ error: "internal_error" });
  }
}
