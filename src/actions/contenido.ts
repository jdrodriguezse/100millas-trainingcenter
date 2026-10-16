"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { CONTENT_FIELDS } from "@/lib/content-fields";

export type ContentActionState = {
  success: boolean;
  message: string;
};

export async function saveSiteContent(
  _prev: ContentActionState,
  formData: FormData,
): Promise<ContentActionState> {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return { success: false, message: "No autorizado." };
    }

    const operations = CONTENT_FIELDS.map((field) => {
      const raw = formData.get(field.key);
      const value =
        typeof raw === "string" && raw.trim().length > 0
          ? raw.trim()
          : field.default;
      return prisma.siteSetting.upsert({
        where: { key: field.key },
        update: { value },
        create: { key: field.key, value },
      });
    });

    await prisma.$transaction(operations);

    revalidatePath("/");
    revalidatePath("/admin/contenido");
    return { success: true, message: "Contenido actualizado correctamente." };
  } catch {
    return { success: false, message: "No se pudo guardar el contenido." };
  }
}
