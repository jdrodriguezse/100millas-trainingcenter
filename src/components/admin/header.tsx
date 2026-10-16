"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ADMIN_NAV } from "@/components/admin/nav";
import { ExternalLink, LogOut, Menu, User, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DefaultSession } from "next-auth";

export function AdminHeader({ user }: { user: DefaultSession["user"] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const current = ADMIN_NAV.find((item) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href),
  );

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/70 bg-white/75 px-4 backdrop-blur-xl sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <div className="leading-tight">
            <p className="font-heading text-sm font-semibold uppercase tracking-wider text-slate-800">
              {current?.label ?? "Panel de administración"}
            </p>
            <p className="hidden text-[11px] text-slate-400 sm:block">
              Panel de administración
            </p>
          </div>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="ghost" className="flex items-center gap-2" />}
        >
          <Avatar className="h-9 w-9 ring-2 ring-[#2b5cff]/20 transition-transform hover:scale-105">
            <AvatarFallback className="bg-gradient-to-br from-[#2b5cff] to-[#e11d2e] text-xs text-white">
              {initials || <User className="h-4 w-4" />}
            </AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium sm:inline">
            {user?.name}
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span>{user?.name}</span>
              <span className="text-xs font-normal text-slate-500">
                {user?.email}
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={() => logout()}>
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Menú móvil */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-slate-900/50 transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <aside
          className={cn(
            "absolute left-0 top-0 flex h-full w-72 flex-col bg-gradient-to-b from-[#0a1020] via-[#0d1530] to-[#0a1020] text-white shadow-2xl transition-transform duration-300",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 scale-150 rounded-full bg-[#2b5cff]/40 blur-lg" />
                <Image
                  src="/logo_empresa.png"
                  alt="Logo"
                  width={44}
                  height={44}
                  className="relative h-10 w-10 object-contain drop-shadow-lg"
                />
              </div>
              <div className="leading-tight">
                <p className="font-heading text-sm font-semibold tracking-wide">
                  100 MILLAS
                </p>
                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">
                  Training Center
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="scrollbar-thin flex-1 space-y-1 overflow-y-auto px-3 py-5">
            {ADMIN_NAV.map((item) => {
              const Icon = item.icon;
              const active = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300",
                    active
                      ? "bg-gradient-to-r from-[#2b5cff] to-[#e11d2e] text-white shadow-lg shadow-[#2b5cff]/30"
                      : "text-slate-300 hover:bg-white/[0.06] hover:text-white",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg",
                      active ? "bg-white/20" : "bg-white/[0.04]",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 transition-all duration-300 hover:bg-white/[0.06] hover:text-white"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04]">
                <ExternalLink className="h-4 w-4" />
              </span>
              Ver sitio público
            </Link>
          </nav>

          <div className="border-t border-white/10 p-4">
            <button
              type="button"
              onClick={() => logout()}
              className="flex w-full items-center gap-2 rounded-xl bg-white/[0.04] px-3 py-2.5 text-sm font-medium text-red-300 transition hover:bg-red-500/10"
            >
              <LogOut className="h-4 w-4" /> Cerrar sesión
            </button>
          </div>
        </aside>
      </div>
    </header>
  );
}
