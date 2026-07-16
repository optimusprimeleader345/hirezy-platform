import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const recruiter = await prisma.user.upsert({
    where: { email: "recruiter@hirezy.com" },
    update: {},
    create: {
      email: "recruiter@hirezy.com",
      name: "Demo Recruiter",
      role: "recruiter",
    },
  });

  console.log("Recruiter seeded:", recruiter.id);
}

main().catch(console.error).finally(() => process.exit());
