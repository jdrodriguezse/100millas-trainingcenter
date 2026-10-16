"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ADMIN_NAV } from "@/components/admin/nav";
import type { DefaultSession } from "next-auth";

export function AdminSidebar({ user }: { user: DefaultSession["user"] }) {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col bg-gradient-to-b from-[#0a1020] via-[#0d1530] to-[#0a1020] text-white md:flex">
      {/* Marca */}
      <div className="relative flex items-center gap-3 border-b border-white/10 px-5 py-5">
        <div className="relative">
          <div className="absolute inset-0 scale-150 rounded-full bg-[#2b5cff]/40 blur-lg" />
          <Image
            src="/logo_empresa.png"
            alt="Logo"
            width={52}
            height={52}
            className="relative h-12 w-12 object-contain drop-shadow-lg"
          />
        </div>
        <div className="leading-tight">
          <p className="font-heading text-base font-semibold tracking-wide">
            100 MILLAS
          </p>
          <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">
            Training Center
          </p>
        </div>
        <span className="absolute right-5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.6)]" />
      </div>

      <nav className="scrollbar-thin flex-1 space-y-1 overflow-y-auto px-3 py-5">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
          Administración
        </p>
        {ADMIN_NAV.map((item, index) => {
          const Icon = item.icon;
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{ animationDelay: `${index * 55}ms` }}
              className={cn(
                "group relative flex animate-slide-in items-center gap-3 overflow-hidden rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300",
                active
                  ? "bg-gradient-to-r from-[#2b5cff] to-[#e11d2e] text-white shadow-lg shadow-[#2b5cff]/30"
                  : "text-slate-300 hover:translate-x-1 hover:bg-white/[0.06] hover:text-white",
              )}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-white/80" />
              )}
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300",
                  active
                    ? "bg-white/20"
                    : "bg-white/[0.04] group-hover:bg-white/10",
                )}
              >
                <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              </span>
              {item.label}
            </Link>
          );
        })}

        <div className="pt-5">
          <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            Sitio
          </p>
          <Link
            href="/"
            target="_blank"
            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 transition-all duration-300 hover:translate-x-1 hover:bg-white/[0.06] hover:text-white"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] transition-all duration-300 group-hover:bg-white/10">
              <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            </span>
            Ver sitio público
          </Link>
        </div>
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-white/[0.04] px-3 py-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#2b5cff] to-[#e11d2e] text-xs font-bold text-white">
            {user?.name?.[0]?.toUpperCase() ?? "A"}
          </span>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-white">
              {user?.name ?? "Administrador"}
            </p>
            <p className="truncate text-[11px] text-slate-400">{user?.email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
