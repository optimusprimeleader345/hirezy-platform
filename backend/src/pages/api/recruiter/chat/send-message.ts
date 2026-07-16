import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });

  const { senderId, receiverId, content } = req.body;

  if (!senderId || !receiverId || !content) {
    return res.status(400).json({ error: "missing_fields" });
  }

  try {
    const message = await prisma.message.create({
      data: { senderId, receiverId, content }
    });
    return res.status(201).json({ success: true, message });
  } catch (error) {
    console.error("send message error:", error);
    return res.status(500).json({ error: "internal_error" });
  }
}
