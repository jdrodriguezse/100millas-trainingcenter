"use client";

import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Trophy,
  Globe,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { DefaultSession } from "next-auth";

const navItems = [
  { href: "/admin", label: "Inicio", icon: LayoutDashboard, exact: true },
  { href: "/admin/tryout", label: "Try Out", icon: Trophy, exact: false },
  { href: "/admin/contenido", label: "Contenido", icon: Globe, exact: false },
  { href: "/admin/roles", label: "Roles", icon: ShieldCheck, exact: false },
  { href: "/admin/usuarios", label: "Usuarios", icon: Users, exact: false },
];

export function AdminSidebar({ user }: { user: DefaultSession["user"] }) {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 flex-col border-r border-slate-200 bg-white md:flex">
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-5">
        <div className="relative">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#2b5cff] to-[#e11d2e] blur-md opacity-40" />
          <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 p-1.5 shadow-md">
            <Image
              src="/logo_empresa.png"
              alt="Logo"
              width={56}
              height={56}
              className="h-full w-full object-contain"
            />
          </div>
        </div>
        <div className="leading-tight">
          <p className="font-heading text-base font-semibold tracking-wide text-slate-900">
            100 MILLAS
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
            Training Center
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Administración
        </p>
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{ animationDelay: `${index * 40}ms` }}
              className={cn(
                "group relative flex animate-fade-in items-center gap-3 overflow-hidden rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                active
                  ? "bg-gradient-to-r from-slate-900 to-slate-700 text-white shadow-sm"
                  : "text-slate-600 hover:translate-x-0.5 hover:bg-slate-100 hover:text-slate-900",
              )}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-[#5f8bff] to-[#ff4a55]" />
              )}
              <Icon
                className={cn(
                  "h-4 w-4 transition-transform duration-200 group-hover:scale-110",
                )}
              />
              {item.label}
            </Link>
          );
        })}

        <div className="pt-4">
          <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Sitio
          </p>
          <Link
            href="/"
            target="_blank"
            className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:translate-x-0.5 hover:bg-slate-100 hover:text-slate-900"
          >
            <ExternalLink className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
            Ver sitio público
          </Link>
        </div>
      </nav>

      <div className="border-t border-slate-100 p-4">
        <p className="truncate text-xs text-slate-400">{user?.email}</p>
      </div>
    </aside>
  );
}
