import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: "method_not_allowed" });

  const { user1, user2 } = req.query;

  if (!user1 || !user2) {
    return res.status(400).json({ error: "missing_query_params" });
  }

  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: String(user1), receiverId: String(user2) },
          { senderId: String(user2), receiverId: String(user1) }
        ]
      },
      orderBy: { createdAt: "asc" }
    });

    return res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("get messages error:", error);
    return res.status(500).json({ error: "internal_error" });
  }
}
