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

    // Map mode to schema values: zoom | meet | in-person | other
    const validModes = ["zoom", "meet", "in-person", "other"];
    const mappedMode = mode === "online" ? "zoom" : mode === "offline" ? "in-person" : mode;
    if (!validModes.includes(mappedMode)) {
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

    // Get application to fetch recruiterId and studentId
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: { gig: true }
    });

    if (!application) {
      return res.status(404).json({ error: "application_not_found" });
    }

    const interview = await prisma.interview.create({
      data: {
        applicationId,
        gigId: application.gigId,
        recruiterId: application.gig.recruiterId,
        studentId: application.studentId,
        scheduledAt: interviewDateTime,
        mode: mappedMode,
        location: meetingLink || null,
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
