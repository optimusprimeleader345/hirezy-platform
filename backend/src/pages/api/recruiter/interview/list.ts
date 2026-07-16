import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: "method_not_allowed" });

  try {
    const { recruiterId, studentId, status } = req.query;

    const where: any = {};
    if (recruiterId && typeof recruiterId === "string") where.recruiterId = recruiterId;
    if (studentId && typeof studentId === "string") where.studentId = studentId;
    if (status && typeof status === "string") where.status = status;

    const interviews = await prisma.interview.findMany({
      where,
      orderBy: { scheduledAt: "desc" }
    });

    return res.status(200).json({ success: true, interviews });
  } catch (error) {
    console.error("list interviews error:", error);
    return res.status(500).json({ error: "internal_error" });
  }
}
