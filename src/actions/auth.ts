"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

export type ActionState = {
  success: boolean;
  message: string;
};

export async function needsSetup(): Promise<boolean> {
  const adminRole = await prisma.role.findUnique({ where: { name: "ADMIN" } });
  if (!adminRole) return true;
  const adminCount = await prisma.user.count({ where: { roleId: adminRole.id } });
  return adminCount === 0;
}

export async function setupAdmin(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;
  const confirm = formData.get("confirm") as string;

  if (!name || !email || !password || !confirm) {
    return { success: false, message: "Todos los campos son obligatorios." };
  }
  if (password.length < 8) {
    return { success: false, message: "La contraseña debe tener al menos 8 caracteres." };
  }
  if (password !== confirm) {
    return { success: false, message: "Las contraseñas no coinciden." };
  }

  const already = await needsSetup();
  if (!already) {
    return { success: false, message: "El administrador ya fue configurado." };
  }

  const adminRole = await prisma.role.upsert({
    where: { name: "ADMIN" },
    update: {},
    create: { name: "ADMIN", label: "Administrador" },
  });

  const hashed = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      roleId: adminRole.id,
    },
  });

  revalidatePath("/setup-admin");
  return { success: true, message: "Administrador creado correctamente. Ya puedes iniciar sesión." };
}

export async function login(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, message: "Ingresa tu correo y contraseña." };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/admin",
    });
    return { success: true, message: "Sesión iniciada." };
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, message: "Credenciales incorrectas." };
    }
    throw error;
  }
}

export async function logout() {
  await signOut({ redirectTo: "/login" });
}
