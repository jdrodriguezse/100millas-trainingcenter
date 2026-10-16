"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

export type TryoutActionState = {
  success: boolean;
  message: string;
};

function normalize(value: FormDataEntryValue | null) {
  const text = typeof value === "string" ? value.trim() : "";
  return text.length > 0 ? text : null;
}

function calculateAge(birthDate: Date): number | null {
  if (Number.isNaN(birthDate.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age >= 0 && age < 130 ? age : null;
}

export async function registerTryout(
  _prev: TryoutActionState,
  formData: FormData,
): Promise<TryoutActionState> {
  try {
    const fullName = normalize(formData.get("fullName"));
    const cedula = normalize(formData.get("cedula"));
    const birthPlace = normalize(formData.get("birthPlace"));
    const birthDateRaw = normalize(formData.get("birthDate"));
    const phone = normalize(formData.get("phone"));
    const phoneAlt = normalize(formData.get("phoneAlt"));
    const address = normalize(formData.get("address"));
    const educationLevel = normalize(formData.get("educationLevel"));
    const email = normalize(formData.get("email"));

    const repName = normalize(formData.get("repName"));
    const repCedula = normalize(formData.get("repCedula"));
    const repPhone = normalize(formData.get("repPhone"));
    const repAddress = normalize(formData.get("repAddress"));

    if (
      !fullName ||
      !cedula ||
      !birthPlace ||
      !birthDateRaw ||
      !phone ||
      !address ||
      !educationLevel ||
      !email
    ) {
      return {
        success: false,
        message: "Completa todos los campos obligatorios marcados con *.",
      };
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return { success: false, message: "El correo electrónico no es válido." };
    }

    const birthDate = new Date(birthDateRaw);
    const age = calculateAge(birthDate);
    if (age === null) {
      return { success: false, message: "La fecha de nacimiento no es válida." };
    }

    const isMinor = age < 18;

    if (isMinor && (!repName || !repCedula || !repPhone || !repAddress)) {
      return {
        success: false,
        message:
          "Al ser menor de edad, los datos del representante legal son obligatorios.",
      };
    }

    await prisma.tryoutRegistration.create({
      data: {
        fullName,
        cedula,
        birthPlace,
        birthDate,
        age,
        phone,
        phoneAlt,
        address,
        educationLevel,
        email,
        isMinor,
        repName: isMinor ? repName : null,
        repCedula: isMinor ? repCedula : null,
        repPhone: isMinor ? repPhone : null,
        repAddress: isMinor ? repAddress : null,
      },
    });

    revalidatePath("/admin/tryout");
    return {
      success: true,
      message: "¡Inscripción recibida! Pronto nos pondremos en contacto contigo.",
    };
  } catch {
    return {
      success: false,
      message: "No se pudo enviar la inscripción. Intenta de nuevo.",
    };
  }
}

export async function updateTryoutStatus(
  id: string,
  status: string,
): Promise<TryoutActionState> {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return { success: false, message: "No autorizado." };
    }

    await prisma.tryoutRegistration.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/admin/tryout");
    return { success: true, message: "Estado actualizado." };
  } catch {
    return { success: false, message: "No se pudo actualizar el estado." };
  }
}

export async function deleteTryout(id: string): Promise<TryoutActionState> {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return { success: false, message: "No autorizado." };
    }

    await prisma.tryoutRegistration.delete({ where: { id } });

    revalidatePath("/admin/tryout");
    return { success: true, message: "Inscripción eliminada." };
  } catch {
    return { success: false, message: "No se pudo eliminar la inscripción." };
  }
}
