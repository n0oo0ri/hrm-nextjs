import prisma from "../src/lib/prisma";
import bcrypt from "bcryptjs";

async function seedUsers() {
  const hashedAdminPassword = await bcrypt.hash("admin123", 10);
  const hashedTeacherPassword = await bcrypt.hash("teacher123", 10);
  const hashedStudentPassword = await bcrypt.hash("student123", 10);
  const hashedParentPassword = await bcrypt.hash("parent123", 10);

  // Create or update Admin User
  const admin = await prisma.user.upsert({
    where: { email: "admin@school.com" },
    update: { password: hashedAdminPassword },
    create: {
      email: "admin@school.com",
      name: "Admin User",
      password: hashedAdminPassword,
      role: "admin",
    },
  });
  console.log("✓ Admin created:", admin.email);

  // Create or update Teacher User
  const teacher = await prisma.user.upsert({
    where: { email: "teacher@school.com" },
    update: { password: hashedTeacherPassword },
    create: {
      email: "teacher@school.com",
      name: "John Teacher",
      password: hashedTeacherPassword,
      role: "teacher",
    },
  });
  console.log("✓ Teacher created:", teacher.email);

  // Create or update Student User
  const student = await prisma.user.upsert({
    where: { email: "student@school.com" },
    update: { password: hashedStudentPassword },
    create: {
      email: "student@school.com",
      name: "Jane Student",
      password: hashedStudentPassword,
      role: "student",
    },
  });
  console.log("✓ Student created:", student.email);

  // Create or update Parent User
  const parent = await prisma.user.upsert({
    where: { email: "parent@school.com" },
    update: { password: hashedParentPassword },
    create: {
      email: "parent@school.com",
      name: "Bob Parent",
      password: hashedParentPassword,
      role: "parent",
    },
  });
  console.log("✓ Parent created:", parent.email);

  console.log("\n✅ All users seeded successfully!");
}

seedUsers()
  .catch((e) => {
    console.error("Error seeding users:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
