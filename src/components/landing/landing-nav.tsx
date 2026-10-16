"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Lock, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#programas", label: "Programas" },
  { href: "#tryout", label: "Try Out" },
  { href: "#contacto", label: "Contacto" },
];

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-white/10 bg-[#04060e]/85 py-1 shadow-lg backdrop-blur-xl"
          : "border-b border-transparent bg-transparent py-3",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 scale-110 rounded-full bg-[#2b5cff]/40 blur-md transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white/95 p-1.5 shadow-lg ring-1 ring-white/20">
              <Image
                src="/logo_empresa.png"
                alt="100 Millas Training Center"
                width={44}
                height={44}
                className="h-full w-full object-contain"
                priority
              />
            </div>
          </div>
          <div className="leading-tight">
            <p className="font-heading text-base font-semibold tracking-wide">
              100 MILLAS
            </p>
            <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400">
              Training Center
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative font-medium transition hover:text-white"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-[#5f8bff] to-[#ff4a55] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            aria-label="Acceso administrador"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-500 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
          >
            <Lock className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Admin</span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menú"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 md:hidden",
          open ? "max-h-60 border-t border-white/10 bg-[#04060e]/95" : "max-h-0",
        )}
      >
        <nav className="flex flex-col px-6 py-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/5 py-3 text-sm text-slate-300 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
