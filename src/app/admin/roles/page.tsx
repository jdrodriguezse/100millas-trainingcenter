import { prisma } from "@/lib/prisma";
import { RolesManager, type RoleRow } from "@/components/admin/roles/roles-manager";

export const dynamic = "force-dynamic";

export default async function RolesPage() {
  const roles = await prisma.role.findMany({
    include: { _count: { select: { users: true } } },
    orderBy: [{ name: "asc" }],
  });

  const data: RoleRow[] = roles.map((role) => ({
    id: role.id,
    name: role.name,
    label: role.label,
    userCount: role._count.users,
    isSystem: role.name === "ADMIN",
  }));

  return <RolesManager roles={data} />;
}
