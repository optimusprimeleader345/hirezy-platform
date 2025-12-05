import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });

  try {
    const {
      recruiterId,
      title,
      description,
      budgetMin,
      budgetMax,
      deadline,
      skills
    } = req.body;

    if (!recruiterId || !title || !description) {
      return res.status(400).json({ error: "missing_required_fields" });
    }

    const gig = await prisma.gig.create({
      data: {
        recruiterId,
        title,
        description,
        budgetMin,
        budgetMax,
        deadline: deadline ? new Date(deadline) : null,
        skills: skills || [],
      }
    });

    return res.status(201).json({ success: true, gig });
  } catch (error) {
    console.error("Create gig error:", error);
    return res.status(500).json({ error: "internal_error" });
  }
}
