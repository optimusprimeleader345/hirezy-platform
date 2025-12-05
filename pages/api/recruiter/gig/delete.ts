import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") return res.status(405).json({ error: "method_not_allowed" });

  try {
    const { gigId } = req.body;

    if (!gigId) {
      return res.status(400).json({ error: "missing_gigId" });
    }

    await prisma.application.deleteMany({
      where: { gigId },
    });

    const deleted = await prisma.gig.delete({
      where: { id: gigId }
    });

    return res.status(200).json({ success: true, deleted });
  } catch (error) {
    console.error("Delete gig error:", error);
    return res.status(500).json({ error: "internal_error" });
  }
}
