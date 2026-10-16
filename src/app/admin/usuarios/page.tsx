import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  UsersManager,
  type RoleOption,
  type UserRow,
} from "@/components/admin/usuarios/users-manager";

export const dynamic = "force-dynamic";

export default async function UsuariosPage() {
  const session = await auth();

  const [users, roles] = await Promise.all([
    prisma.user.findMany({
      include: { role: true },
      orderBy: [{ createdAt: "asc" }],
    }),
    prisma.role.findMany({ orderBy: { label: "asc" } }),
  ]);

  const userRows: UserRow[] = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    roleId: user.roleId,
    roleLabel: user.role.label,
    isActive: user.isActive,
    isSelf: user.id === session?.user?.id,
  }));

  const roleOptions: RoleOption[] = roles.map((role) => ({
    id: role.id,
    label: role.label,
  }));

  return <UsersManager users={userRows} roles={roleOptions} />;
}
