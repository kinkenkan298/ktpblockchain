import { eq } from "drizzle-orm";
import { db } from ".";
import { authClient } from "../auth/client";
import { user } from "./schema";

interface AdminUser {
  name: string;
  email: string;
  password: string;
  username: string;
  displayUsername: string;
  image?: string;
}

async function createAdminUser({
  name,
  email,
  password,
  username,
  displayUsername,
  image,
}: AdminUser) {
  const { data: admin_data, error } = await authClient.signUp.email({
    name,
    email,
    image:
      image ||
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
    password,
    username,
    displayUsername,
  });

  if (error) throw new Error(`Failed to create admin user: ${error.message}`);
  if (!admin_data?.user.id) throw new Error("Failed to create admin user");

  await db
    .update(user)
    .set({
      role: "admin",
    })
    .where(eq(user.id, admin_data?.user.id));
}
async function seed() {
  try {
    await createAdminUser({
      name: "Admin Muda",
      email: "admin2@admin.com",
      password: "admin@1234",
      username: "adminmuda",
      displayUsername: "adminmuda",
    });
    await createAdminUser({
      name: "Admin tua",
      email: "admin3@admin.com",
      password: "admin@1234",
      username: "admintua",
      displayUsername: "admintua",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b9a0b1be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
    });
    await createAdminUser({
      name: "Admin kecil",
      email: "admin1@admin.com",
      password: "admin@1234",
      username: "adminkecil",
      displayUsername: "adminkecil",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
    });
    await createAdminUser({
      name: "Admin Biasa",
      email: "admin5@admin.com",
      password: "admin@1234",
      username: "adminbiasa",
      displayUsername: "adminbiasa",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
    });
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
seed()
  .then(() => {
    console.log("✅ Seeding process completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Seeding process failed:", error);
    process.exit(1);
  });
