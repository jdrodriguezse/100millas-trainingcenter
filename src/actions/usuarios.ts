"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import bcrypt from "bcryptjs";

export type UserActionState = {
  success: boolean;
  message: string;
};

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("No autorizado");
  }
}

export async function createUser(
  _prev: UserActionState,
  formData: FormData,
): Promise<UserActionState> {
  try {
    await requireAdmin();

    const name = ((formData.get("name") as string) ?? "").trim();
    const email = ((formData.get("email") as string) ?? "").trim().toLowerCase();
    const password = (formData.get("password") as string) ?? "";
    const roleId = (formData.get("roleId") as string) ?? "";

    if (!name || !email || !password || !roleId) {
      return { success: false, message: "Todos los campos son obligatorios." };
    }
    if (password.length < 8) {
      return { success: false, message: "La contraseña debe tener al menos 8 caracteres." };
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return { success: false, message: "El correo electrónico no es válido." };
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return { success: false, message: "Ya existe un usuario con ese correo." };
    }

    const role = await prisma.role.findUnique({ where: { id: roleId } });
    if (!role) {
      return { success: false, message: "El rol seleccionado no existe." };
    }

    const hashed = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: { name, email, password: hashed, roleId },
    });

    revalidatePath("/admin/usuarios");
    return { success: true, message: `Usuario "${name}" creado correctamente.` };
  } catch {
    return { success: false, message: "No se pudo crear el usuario." };
  }
}

export async function updateUser(
  _prev: UserActionState,
  formData: FormData,
): Promise<UserActionState> {
  try {
    await requireAdmin();

    const id = (formData.get("id") as string) ?? "";
    const name = ((formData.get("name") as string) ?? "").trim();
    const roleId = (formData.get("roleId") as string) ?? "";
    const password = (formData.get("password") as string) ?? "";

    if (!id || !name || !roleId) {
      return { success: false, message: "El nombre y el rol son obligatorios." };
    }

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return { success: false, message: "El usuario no existe." };
    }

    const data: {
      name: string;
      roleId: string;
      password?: string;
    } = { name, roleId };

    if (password) {
      if (password.length < 8) {
        return { success: false, message: "La nueva contraseña debe tener al menos 8 caracteres." };
      }
      data.password = await bcrypt.hash(password, 10);
    }

    await prisma.user.update({ where: { id }, data });

    revalidatePath("/admin/usuarios");
    return { success: true, message: "Usuario actualizado correctamente." };
  } catch {
    return { success: false, message: "No se pudo actualizar el usuario." };
  }
}

export async function toggleUserActive(id: string): Promise<UserActionState> {
  try {
    await requireAdmin();

    const session = await auth();
    if (session?.user?.id === id) {
      return { success: false, message: "No puedes desactivar tu propia cuenta." };
    }

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return { success: false, message: "El usuario no existe." };
    }

    await prisma.user.update({
      where: { id },
      data: { isActive: !user.isActive },
    });

    revalidatePath("/admin/usuarios");
    return {
      success: true,
      message: user.isActive ? "Usuario desactivado." : "Usuario activado.",
    };
  } catch {
    return { success: false, message: "No se pudo cambiar el estado del usuario." };
  }
}

export async function deleteUser(id: string): Promise<UserActionState> {
  try {
    await requireAdmin();

    const session = await auth();
    if (session?.user?.id === id) {
      return { success: false, message: "No puedes eliminar tu propia cuenta." };
    }

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return { success: false, message: "El usuario no existe." };
    }

    await prisma.user.delete({ where: { id } });

    revalidatePath("/admin/usuarios");
    return { success: true, message: "Usuario eliminado correctamente." };
  } catch {
    return { success: false, message: "No se pudo eliminar el usuario." };
  }
}
