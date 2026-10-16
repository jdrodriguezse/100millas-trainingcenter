import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  ShieldCheck,
  Users,
  UserCheck,
  Trophy,
  ArrowRight,
  ClipboardList,
  Dumbbell,
  CreditCard,
  Gauge,
  Layers,
  Globe,
  ExternalLink,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export const dynamic = "force-dynamic";

const upcoming = [
  { label: "Alumnos", icon: Users },
  { label: "Grupos", icon: Layers },
  { label: "Asistencias", icon: ClipboardList },
  { label: "Pagos", icon: CreditCard },
  { label: "Evaluaciones MPH", icon: Gauge },
  { label: "Entrenadores", icon: Dumbbell },
];

export default async function AdminDashboard() {
  const session = await auth();

  const [roleCount, userCount, activeUserCount, tryoutCount, pendingTryout] =
    await Promise.all([
      prisma.role.count(),
      prisma.user.count(),
      prisma.user.count({ where: { isActive: true } }),
      prisma.tryoutRegistration.count(),
      prisma.tryoutRegistration.count({ where: { status: "PENDIENTE" } }),
    ]);

  const stats = [
    {
      title: "Usuarios",
      value: userCount,
      icon: Users,
      description: "Total de usuarios registrados",
      color: "from-[#2b5cff] to-[#5f8bff]",
    },
    {
      title: "Usuarios activos",
      value: activeUserCount,
      icon: UserCheck,
      description: "Con acceso habilitado",
      color: "from-[#0ea5a5] to-[#2dd4bf]",
    },
    {
      title: "Roles",
      value: roleCount,
      icon: ShieldCheck,
      description: "Roles definidos",
      color: "from-[#7c3aed] to-[#a78bfa]",
    },
    {
      title: "Inscripciones Try Out",
      value: tryoutCount,
      icon: Trophy,
      description: `${pendingTryout} pendiente(s)`,
      color: "from-[#e11d2e] to-[#ff4a55]",
    },
  ];

  const quickLinks = [
    {
      href: "/admin/tryout",
      label: "Ver inscripciones Try Out",
      description: "Gestiona los atletas interesados.",
      icon: Trophy,
    },
    {
      href: "/admin/contenido",
      label: "Editar contenido de la web",
      description: "Actualiza los textos del portal.",
      icon: Globe,
    },
    {
      href: "/admin/usuarios",
      label: "Gestionar usuarios",
      description: "Crea cuentas y asigna roles.",
      icon: Users,
    },
    {
      href: "/admin/roles",
      label: "Gestionar roles",
      description: "Define los roles del sistema.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Banner de bienvenida */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0b1224] via-[#111a35] to-[#0b1224] p-7 sm:p-9">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('/fondo.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#04060e]/85 to-transparent" />
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-[#2b5cff]/30 blur-3xl animate-float" />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8fb8ff]">
            Panel de administración
          </p>
          <h1 className="mt-2 font-heading text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl">
            Bienvenido, {session?.user?.name?.split(" ")[0]}
          </h1>
          <p className="mt-2 max-w-xl text-sm text-slate-300">
            Resumen general del sistema de 100 Millas Training Center.
          </p>
          <Link
            href="/"
            target="_blank"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm transition hover:border-white/40 hover:bg-white/10"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Ver sitio público
          </Link>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Reveal key={stat.title} delay={i * 90}>
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div
                  className={`pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br ${stat.color} opacity-10 transition-transform duration-500 group-hover:scale-150`}
                />
                <div className="relative flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <p className="relative mt-3 font-heading text-4xl font-semibold text-slate-900">
                  {stat.value}
                </p>
                <p className="relative mt-1 text-xs text-slate-400">
                  {stat.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Accesos rápidos */}
      <div>
        <h2 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wider text-slate-500">
          Accesos rápidos
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((link, i) => {
            const Icon = link.icon;
            return (
              <Reveal key={link.href} delay={i * 80}>
                <Link
                  href={link.href}
                  className="group flex h-full items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-slate-900 hover:shadow-lg"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-[#2b5cff] group-hover:to-[#e11d2e]">
                    <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">
                      {link.label}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {link.description}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-slate-900" />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Próximos módulos */}
      <Reveal>
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 p-6">
          <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-slate-500">
            Próximos módulos
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Áreas en desarrollo para completar la gestión de la academia.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {upcoming.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.label}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm"
                >
                  <Icon className="h-5 w-5 text-slate-400 transition-colors group-hover:text-slate-700" />
                  <span className="text-xs font-medium text-slate-500">
                    {m.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
