import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: "method_not_allowed" });

  try {
    // Accept either gigId (to list applications for a gig) or recruiterId (to list across recruiter's gigs)
    const { gigId, recruiterId, status } = req.query;

    if (gigId && typeof gigId === "string") {
      const apps = await prisma.application.findMany({
        where: { gigId },
        include: {
          student: {
            select: {
              name: true,
              email: true,
              // Note: need to add skills to User model or get from elsewhere
            }
          }
        },
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json({ success: true, applications: apps });
    }

    if (recruiterId && typeof recruiterId === "string") {
      // fetch gigs for recruiter, then applications
      const gigs = await prisma.gig.findMany({
        where: { recruiterId: String(recruiterId) },
        select: { id: true },
      });
      const gigIds = gigs.map((g: { id: string }) => g.id);
      const whereClause: any = { gigId: { in: gigIds } };
      if (status && typeof status === "string") whereClause.status = status;

      const apps = await prisma.application.findMany({
        where: whereClause,
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json({ success: true, applications: apps });
    }

    return res.status(400).json({ error: "missing_query_param_gigId_or_recruiterId" });
  } catch (error) {
    console.error("List applications error:", error);
    return res.status(500).json({ error: "internal_error" });
  }
}
