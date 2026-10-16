"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

export type RoleActionState = {
  success: boolean;
  message: string;
};

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("No autorizado");
  }
}

function normalizeName(value: string) {
  return value
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "_")
    .replace(/[^A-Z0-9_]/g, "");
}

export async function createRole(
  _prev: RoleActionState,
  formData: FormData,
): Promise<RoleActionState> {
  try {
    await requireAdmin();

    const name = normalizeName((formData.get("name") as string) ?? "");
    const label = ((formData.get("label") as string) ?? "").trim();

    if (!name || !label) {
      return { success: false, message: "El nombre y la etiqueta son obligatorios." };
    }
    if (name.length < 2) {
      return { success: false, message: "El nombre del rol es demasiado corto." };
    }

    const exists = await prisma.role.findUnique({ where: { name } });
    if (exists) {
      return { success: false, message: `El rol "${name}" ya existe.` };
    }

    await prisma.role.create({ data: { name, label } });

    revalidatePath("/admin/roles");
    return { success: true, message: `Rol "${label}" creado correctamente.` };
  } catch {
    return { success: false, message: "No se pudo crear el rol." };
  }
}

export async function updateRole(
  _prev: RoleActionState,
  formData: FormData,
): Promise<RoleActionState> {
  try {
    await requireAdmin();

    const id = (formData.get("id") as string) ?? "";
    const name = normalizeName((formData.get("name") as string) ?? "");
    const label = ((formData.get("label") as string) ?? "").trim();

    if (!id || !name || !label) {
      return { success: false, message: "Todos los campos son obligatorios." };
    }

    const current = await prisma.role.findUnique({ where: { id } });
    if (!current) {
      return { success: false, message: "El rol no existe." };
    }

    if (current.name === "ADMIN" && name !== "ADMIN") {
      return { success: false, message: "No se puede cambiar el nombre del rol ADMIN." };
    }

    const duplicate = await prisma.role.findFirst({
      where: { name, NOT: { id } },
    });
    if (duplicate) {
      return { success: false, message: `Ya existe un rol con el nombre "${name}".` };
    }

    await prisma.role.update({ where: { id }, data: { name, label } });

    revalidatePath("/admin/roles");
    return { success: true, message: "Rol actualizado correctamente." };
  } catch {
    return { success: false, message: "No se pudo actualizar el rol." };
  }
}

export async function deleteRole(id: string): Promise<RoleActionState> {
  try {
    await requireAdmin();

    const role = await prisma.role.findUnique({
      where: { id },
      include: { _count: { select: { users: true } } },
    });

    if (!role) {
      return { success: false, message: "El rol no existe." };
    }
    if (role.name === "ADMIN") {
      return { success: false, message: "No se puede eliminar el rol ADMIN." };
    }
    if (role._count.users > 0) {
      return {
        success: false,
        message: `No se puede eliminar: hay ${role._count.users} usuario(s) con este rol.`,
      };
    }

    await prisma.role.delete({ where: { id } });

    revalidatePath("/admin/roles");
    return { success: true, message: "Rol eliminado correctamente." };
  } catch {
    return { success: false, message: "No se pudo eliminar el rol." };
  }
}
