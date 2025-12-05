import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: "method_not_allowed" });

  try {
    const { recruiterId } = req.query;

    if (!recruiterId || typeof recruiterId !== "string") {
      return res.status(400).json({ error: "missing_recruiterId" });
    }

    const gigs = await prisma.gig.findMany({
      where: { recruiterId },
      include: {
        applications: true
      },
      orderBy: { createdAt: "desc" }
    });

    return res.status(200).json({ success: true, gigs });
  } catch (error) {
    console.error("List gigs error:", error);
    return res.status(500).json({ error: "internal_error" });
  }
}
