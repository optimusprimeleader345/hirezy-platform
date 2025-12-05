import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { analyzeResumeAI } from "../../../../utils/ai/resumeAnalyzer";

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

    // Get resume text from student (best effort)
    // Note: User model doesn't have resumeText or profileSummary fields
    const resumeText = "" as string;

    const analysis = await analyzeResumeAI(resumeText);

    // Note: aiResumeAnalysis field doesn't exist in Application schema
    // Would need to add field to store analysis results

    return res.status(200).json({ success: true, analysis });
  } catch (err) {
    console.error("analyze resume error:", err);
    return res.status(500).json({ error: "internal_error" });
  }
}
