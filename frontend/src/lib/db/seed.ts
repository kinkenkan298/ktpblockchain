import { eq } from "drizzle-orm";
import { db } from ".";
import { user } from "./schema";
import { auth } from "../auth/auth";

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

  try {
    const existingUser = await db
      .select()
      .from(user)
      .where(eq(user.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      console.log("⚠️  User Admin sudah ada. Melewati proses seeding.");
      return;
    }

    console.log("👤 Membuat user admin baru...");

    const newUser = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
        username,
        displayUsername,
        image,
      },
      asResponse: false,
    });

    if (!newUser?.user) {
      throw new Error("Gagal membuat user via Better Auth");
    }

    console.log("✅ User berhasil dibuat. Mengupdate Role...");

    if (isAdmin) {
      await db
        .update(user)
        .set({ role: "admin" })
        .where(eq(user.id, newUser.user.id));
    }

    console.log(`🎉 SUKSES! Admin siap digunakan.`);
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Pass:  ${password}`);
  } catch (error) {
    console.error("❌ Error saat seeding admin:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

async function seed() {
  try {
    console.log("🌱 Starting seed process...");

    await createUser({
      name: "Admin Kecil",
      email: "adminkecil@admin.com",
      password: "admin@1234",
      username: "adminkecil",
      displayUsername: "adminkecil",
      isAdmin: true,
    });

    await createUser({
      name: "Admin Besar",
      email: "adminbesar@admin.com",
      password: "admin@1234",
      username: "adminbesar",
      displayUsername: "adminbesar",
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
