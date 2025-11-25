import { db } from ".";
import { user } from "./schema";

interface AdminUser {
  name: string;
  email: string;
  password: string;
  username: string;
  displayUsername: string;
  image?: string;
  isAdmin?: boolean;
}

async function createUser({
  name,
  email,
  password,
  username,
  displayUsername,
  image,
  isAdmin = false,
}: AdminUser) {
  console.log(`Creating user: ${email}...`);

  const users = await db
    .insert(user)
    .values({
      id: crypto.randomUUID(),
      name,
      email,
      image,
      username,
      displayUsername,
      role: isAdmin ? "admin" : "user",
      emailVerified: false,
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-15"),
    })
    .$returningId();
}

async function seed() {
  try {
    console.log("🌱 Starting seed process...");

    await createUser({
      name: "Admin Muda",
      email: "admin2@admin.com",
      password: "admin@1234",
      username: "adminmuda",
      displayUsername: "adminmuda",
      isAdmin: true,
    });

    await createUser({
      name: "Admin Tua",
      email: "admin3@admin.com",
      password: "admin@1234",
      username: "admintua",
      displayUsername: "admintua",
      isAdmin: true,
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b9a0b1be?auto=format&fit=crop&w=150&q=80",
    });
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed()
  .then(() => {
    console.log("✅ Seeding process completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Unhandled seeding error:", error);
    process.exit(1);
  });
