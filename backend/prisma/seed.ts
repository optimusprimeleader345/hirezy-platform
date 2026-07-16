const { PrismaClient } = require("@prisma/client");

async function main() {
  const prisma = new PrismaClient();

  try {
    console.log("🌱 Starting database seeding...");

    // 1. Create demo users
    console.log("👥 Creating demo users...");
    const student = await prisma.user.upsert({
      where: { email: "student@hirezy.com" },
      update: {},
      create: {
        email: "student@hirezy.com",
        name: "Alex Johnson",
        role: "student",
        status: "active"
      }
    });

    const recruiter = await prisma.user.upsert({
      where: { email: "recruiter@hirezy.com" },
      update: {},
      create: {
        email: "recruiter@hirezy.com",
        name: "Sarah Chen",
        role: "recruiter",
        status: "active"
      }
    });

    const admin = await prisma.user.upsert({
      where: { email: "admin@hirezy.com" },
      update: {},
      create: {
        email: "admin@hirezy.com",
        name: "Admin User",
        role: "admin",
        status: "active"
      }
    });

    // 2. Create demo gigs
    console.log("💼 Creating demo gigs...");
    const gig1 = await prisma.gig.create({
      data: {
        title: "Full Stack React Developer",
        description: "Build modern web applications using React, Node.js, and PostgreSQL. We're looking for a passionate full-stack developer to join our growing team.",
        recruiterId: recruiter.id,
        budgetMin: 6000,
        budgetMax: 12000,
        skills: JSON.stringify(['React', 'Node.js', 'PostgreSQL', 'TypeScript']),
        status: 'open'
      }
    });

    const gig2 = await prisma.gig.create({
      data: {
        title: "Mobile App Developer",
        description: "Create cross-platform mobile applications using Flutter. Experience with Firebase and REST APIs is required.",
        recruiterId: recruiter.id,
        budgetMin: 8000,
        budgetMax: 16000,
        skills: JSON.stringify(['Flutter', 'Dart', 'Firebase', 'REST APIs']),
        status: 'open'
      }
    });

    const gig3 = await prisma.gig.create({
      data: {
        title: "DevOps Engineer",
        description: "Set up CI/CD pipelines and manage cloud infrastructure. AWS, Docker, and Kubernetes experience required.",
        recruiterId: recruiter.id,
        budgetMin: 9000,
        budgetMax: 18000,
        skills: JSON.stringify(['AWS', 'Docker', 'Kubernetes', 'CI/CD']),
        status: 'open'
      }
    });

    // 3. Create demo applications
    console.log("📝 Creating demo applications...");
    const application1 = await prisma.application.create({
      data: {
        gigId: gig1.id,
        studentId: student.id,
        coverLetter: "I'm excited about this full-stack developer position. I have 2 years of experience with React and Node.js.",
        proposalUrl: "https://drive.google.com/example-proposal-1",
        aiScore: 85.5,
        status: 'interview'
      }
    });

    const application2 = await prisma.application.create({
      data: {
        gigId: gig2.id,
        studentId: student.id,
        coverLetter: "I have strong Flutter experience and would love to work on your mobile app project.",
        aiScore: 78.2,
        status: 'received'
      }
    });

    // 4. Create demo chat messages
    console.log("💬 Creating demo chat messages...");
    await prisma.message.create({
      data: {
        senderId: recruiter.id,
        receiverId: student.id,
        content: "Hi Alex! Thanks for applying to our Full Stack Developer position. Your React experience looks impressive."
      }
    });

    await prisma.message.create({
      data: {
        senderId: student.id,
        receiverId: recruiter.id,
        content: "Thank you Sarah! I'm really excited about the opportunity. When can we schedule the technical interview?"
      }
    });

    await prisma.message.create({
      data: {
        senderId: recruiter.id,
        receiverId: student.id,
        content: "Great! How about tomorrow at 2 PM? We'll do a 45-minute technical interview focused on React and Node.js."
      }
    });

    await prisma.message.create({
      data: {
        senderId: student.id,
        receiverId: recruiter.id,
        content: "Tomorrow at 2 PM works perfect! Looking forward to it."
      }
    });

    // 5. Create demo interviews
    console.log("📅 Creating demo interviews...");
    await prisma.interview.create({
      data: {
        applicationId: application1.id,
        gigId: gig1.id,
        recruiterId: recruiter.id,
        studentId: student.id,
        scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        mode: 'zoom',
        location: 'https://zoom.us/j/123456789',
        status: 'scheduled',
        notes: 'Technical interview covering React fundamentals and Node.js backend development'
      }
    });

    await prisma.interview.create({
      data: {
        applicationId: application1.id,
        gigId: gig1.id,
        recruiterId: recruiter.id,
        studentId: student.id,
        scheduledAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last week
        mode: 'zoom',
        location: 'https://zoom.us/j/987654321',
        status: 'completed',
        notes: 'Technical interview completed. Candidate showed strong knowledge of React hooks and database design.'
      }
    });

    // 6. Create demo career roadmap
    console.log("🗺️ Creating demo career roadmap...");
    await prisma.careerRoadmap.upsert({
      where: { studentId: student.id },
      update: {
        currentStage: "Intermediate",
        completedSteps: JSON.stringify([
          "Complete basic HTML/CSS course",
          "Learn JavaScript fundamentals",
          "Build 3 small React projects",
          "Complete Node.js CRUD application"
        ]),
        nextSteps: JSON.stringify([
          "Learn TypeScript for better job opportunities",
          "Study database design and normalization",
          "Build a full-stack application with authentication"
        ]),
        notes: "Very motivated student with good work ethic. Shows promise in React development."
      },
      create: {
        studentId: student.id,
        currentStage: "Intermediate",
        completedSteps: JSON.stringify([
          "Complete basic HTML/CSS course",
          "Learn JavaScript fundamentals",
          "Build 3 small React projects",
          "Complete Node.js CRUD application"
        ]),
        nextSteps: JSON.stringify([
          "Learn TypeScript for better job opportunities",
          "Study database design and normalization",
          "Build a full-stack application with authentication"
        ]),
        notes: "Very motivated student with good work ethic. Shows promise in React development."
      }
    });

    console.log("✅ Seeder completed successfully!");
    console.log(`👥 Created 3 users: ${student.name}, ${recruiter.name}, ${admin.name}`);
    console.log(`💼 Created 3 gigs for ${recruiter.name}`);
    console.log(`📝 Created 2 applications from ${student.name}`);
    console.log(`💬 Created 4 chat messages`);
    console.log(`📅 Created 1 scheduled and 1 completed interview`);
    console.log(`🗺️ Created career roadmap with 7+ steps for ${student.name}`);

  } catch (error) {
    console.error("❌ Seeding failed:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(console.error);
