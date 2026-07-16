import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });

  try {
    const { interviewId, status, notes, scheduledAt } = req.body;
    if (!interviewId) return res.status(400).json({ error: "interviewId required" });

    const updateData: any = {};
    if (status) updateData.status = status;
    if (typeof notes === "string") updateData.notes = notes;
    if (scheduledAt) updateData.scheduledAt = new Date(scheduledAt);

    const updated = await prisma.interview.update({
      where: { id: interviewId },
      data: updateData
    });

    return res.status(200).json({ success: true, interview: updated });
  } catch (error) {
    console.error("update interview error:", error);
    return res.status(500).json({ error: "internal_error" });
  }
}
