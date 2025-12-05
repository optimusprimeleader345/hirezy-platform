import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });

  try {
    const { interviewId, status } = req.body;

    if (!interviewId || !status) {
      return res.status(400).json({ error: "interviewId_and_status_required" });
    }

    if (!["scheduled", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({ error: "invalid_status" });
    }

    const updatedInterview = await prisma.interview.update({
      where: { id: interviewId },
      data: { status },
    });

    return res.status(200).json({ success: true, interview: updatedInterview });
  } catch (error) {
    console.error("Update interview status error:", error);

    if ((error as any).code === 'P2025') {
      return res.status(404).json({ error: "interview_not_found" });
    }

    return res.status(500).json({ error: "internal_error" });
  }
}
