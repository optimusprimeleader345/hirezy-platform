import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });

  try {
    const {
      gigId,
      studentId,
      coverLetter,
      proposalUrl
    } = req.body;

    if (!gigId || !studentId) {
      return res.status(400).json({ error: "missing_required_fields" });
    }

    // Check if gig exists
    const gig = await prisma.gig.findUnique({ where: { id: gigId } });
    if (!gig) return res.status(404).json({ error: "gig_not_found" });

    // Check if student already applied to this gig
    const existingApplication = await prisma.application.findFirst({
      where: {
        studentId,
        gigId
      }
    });

    if (existingApplication) {
      return res.status(409).json({ error: "already_applied" });
    }

    const application = await prisma.application.create({
      data: {
        gigId,
        studentId,
        coverLetter: coverLetter ?? null,
        proposalUrl: proposalUrl ?? null,
        status: "received",
      }
    });

    return res.status(201).json({ success: true, application });
  } catch (error) {
    console.error("Create application error:", error);
    return res.status(500).json({ error: "internal_error" });
  }
}
