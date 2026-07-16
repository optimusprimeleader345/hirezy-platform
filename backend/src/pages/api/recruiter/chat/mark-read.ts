import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });

  const { user1, user2 } = req.body;

  try {
    await prisma.message.updateMany({
      where: {
        receiverId: user1,
        senderId: user2,
        read: false
      },
      data: { read: true }
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("mark read error:", error);
    return res.status(500).json({ error: "internal_error" });
  }
}
