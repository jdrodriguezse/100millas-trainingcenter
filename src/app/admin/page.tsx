import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Users, UserCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const session = await auth();

  const [roleCount, userCount, activeUserCount] = await Promise.all([
    prisma.role.count(),
    prisma.user.count(),
    prisma.user.count({ where: { isActive: true } }),
  ]);

  const stats = [
    {
      title: "Usuarios",
      value: userCount,
      icon: Users,
      description: "Total de usuarios registrados",
    },
    {
      title: "Usuarios activos",
      value: activeUserCount,
      icon: UserCheck,
      description: "Usuarios con acceso habilitado",
    },
    {
      title: "Roles",
      value: roleCount,
      icon: ShieldCheck,
      description: "Roles definidos en el sistema",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Bienvenido, {session?.user?.name}
        </h1>
        <p className="text-sm text-slate-500">
          Resumen general del sistema de 100 Millas Training Center.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">
                  {stat.value}
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
