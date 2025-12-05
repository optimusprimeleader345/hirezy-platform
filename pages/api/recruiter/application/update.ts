import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });

  try {
    const { applicationId, status, notes, aiScore } = req.body;
    if (!applicationId) return res.status(400).json({ error: "applicationId required" });

    const updateData: any = {};
    if (status) updateData.status = status;
    if (typeof notes === "string") updateData.notes = notes;
    if (typeof aiScore === "number") updateData.aiScore = aiScore;

    const updated = await prisma.application.update({
      where: { id: applicationId },
      data: updateData,
    });

    return res.status(200).json({ success: true, application: updated });
  } catch (error) {
    console.error("Update application error:", error);
    return res.status(500).json({ error: "internal_error" });
  }
}
