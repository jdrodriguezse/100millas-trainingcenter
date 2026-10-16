import {
  LayoutDashboard,
  Users,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { DefaultSession } from "next-auth";

const navItems = [
  { href: "/admin", label: "Inicio", icon: LayoutDashboard },
  { href: "/admin/roles", label: "Roles", icon: ShieldCheck },
  { href: "/admin/usuarios", label: "Usuarios", icon: Users },
];

export function AdminSidebar({ user }: { user: DefaultSession["user"] }) {
  return (
    <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white md:flex">
      <div className="flex items-center gap-3 border-b border-slate-200 p-4">
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-slate-100 p-0.5">
          <Image
            src="/logo_empresa.png"
            alt="Logo"
            width={40}
            height={40}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-bold text-slate-900">100 Millas</p>
          <p className="text-xs text-slate-500">Training Center</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-slate-200 p-4">
        <p className="text-xs text-slate-400">
          {user?.email}
        </p>
      </div>
    </aside>
  );
}
