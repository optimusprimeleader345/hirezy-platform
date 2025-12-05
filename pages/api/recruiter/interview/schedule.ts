import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });

  try {
    const { applicationId, date, time, mode, meetingLink, notes } = req.body;

    if (!applicationId || !date || !time || !mode) {
      return res.status(400).json({ error: "missing_required_fields" });
    }

    if (!["online", "offline"].includes(mode)) {
      return res.status(400).json({ error: "invalid_mode" });
    }

    // Validate date and time formats
    const interviewDateTime = new Date(`${date}T${time}`);
    if (isNaN(interviewDateTime.getTime())) {
      return res.status(400).json({ error: "invalid_date_time" });
    }

    // Check if interview can be scheduled
    if (interviewDateTime < new Date()) {
      return res.status(400).json({ error: "interview_cannot_be_in_past" });
    }

    const interview = await prisma.interview.create({
      data: {
        applicationId,
        date: interviewDateTime,
        mode,
        meetingLink: meetingLink || null,
        notes: notes || null,
        status: "scheduled",
      },
    });

    return res.status(201).json({ success: true, interview });
  } catch (error) {
    console.error("Schedule interview error:", error);
    return res.status(500).json({ error: "internal_error" });
  }
}
