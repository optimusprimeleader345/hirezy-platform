import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * Returns timeline events for a gig or application or user.
 * Query params:
 * - gigId (optional)
 * - applicationId (optional)
 * - userId (optional) // returns events involving this user
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: "method_not_allowed" });

  try {
    const { gigId, applicationId, userId } = req.query;

    // Collect events:
    const events: any[] = [];

    if (applicationId && typeof applicationId === "string") {
      const app = await prisma.application.findUnique({ where: { id: applicationId } });
      if (app) {
        events.push({ type: "application", time: app.createdAt, payload: app });
      }
      const interviews = await prisma.interview.findMany({ where: { applicationId }, orderBy: { scheduledAt: "asc" } });
      interviews.forEach(i => events.push({ type: "interview", time: i.scheduledAt, payload: i }));
      if (userId && typeof userId === "string") {
        const messages = await prisma.message.findMany({
          where: { OR: [{ senderId: userId }, { receiverId: userId }] },
          orderBy: { createdAt: "asc" }
        });
        messages.forEach(m => events.push({ type: "message", time: m.createdAt, payload: m }));
      }
    } else if (gigId && typeof gigId === "string") {
      const apps = await prisma.application.findMany({ where: { gigId }, orderBy: { createdAt: "asc" } });
      apps.forEach(a => events.push({ type: "application", time: a.createdAt, payload: a }));
      const interviews = await prisma.interview.findMany({ where: { gigId }, orderBy: { scheduledAt: "asc" } });
      interviews.forEach(i => events.push({ type: "interview", time: i.scheduledAt, payload: i }));
    } else if (userId && typeof userId === "string") {
      const apps = await prisma.application.findMany({ where: { studentId: String(userId) } });
      apps.forEach(a => events.push({ type: "application", time: a.createdAt, payload: a }));
      const interviews = await prisma.interview.findMany({ where: { studentId: String(userId) } });
      interviews.forEach(i => events.push({ type: "interview", time: i.scheduledAt, payload: i }));
      const messages = await prisma.message.findMany({
        where: { OR: [{ senderId: String(userId) }, { receiverId: String(userId) }] },
        orderBy: { createdAt: "asc" }
      });
      messages.forEach(m => events.push({ type: "message", time: m.createdAt, payload: m }));
    } else {
      return res.status(400).json({ error: "missing_query_param" });
    }

    // sort events by time ascending
    events.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

    return res.status(200).json({ success: true, timeline: events });
  } catch (err) {
    console.error("timeline error:", err);
    return res.status(500).json({ error: "internal_error" });
  }
}
