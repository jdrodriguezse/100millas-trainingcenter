import { prisma } from "@/lib/prisma";
import {
  TryoutManager,
  type TryoutRow,
} from "@/components/admin/tryout/tryout-manager";

export const dynamic = "force-dynamic";

export default async function TryoutAdminPage() {
  const registrations = await prisma.tryoutRegistration.findMany({
    orderBy: { createdAt: "desc" },
  });

  const data: TryoutRow[] = registrations.map((r) => ({
    id: r.id,
    fullName: r.fullName,
    cedula: r.cedula,
    birthPlace: r.birthPlace,
    birthDate: r.birthDate
      ? r.birthDate.toLocaleDateString("es-DO", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          timeZone: "UTC",
        })
      : "—",
    age: r.age,
    phone: r.phone,
    phoneAlt: r.phoneAlt,
    address: r.address,
    educationLevel: r.educationLevel,
    email: r.email,
    isMinor: r.isMinor,
    repName: r.repName,
    repCedula: r.repCedula,
    repPhone: r.repPhone,
    repAddress: r.repAddress,
    status: r.status,
    createdAt: r.createdAt.toLocaleDateString("es-DO"),
  }));

  return <TryoutManager registrations={data} />;
}
