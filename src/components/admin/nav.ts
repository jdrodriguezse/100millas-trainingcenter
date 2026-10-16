import {
  LayoutDashboard,
  ShieldCheck,
  Trophy,
  Users,
  Globe,
  type LucideIcon,
} from "lucide-react";

export type AdminNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  exact: boolean;
};

export const ADMIN_NAV: AdminNavItem[] = [
  { href: "/admin", label: "Inicio", icon: LayoutDashboard, exact: true },
  { href: "/admin/tryout", label: "Try Out", icon: Trophy, exact: false },
  { href: "/admin/contenido", label: "Contenido", icon: Globe, exact: false },
  { href: "/admin/roles", label: "Roles", icon: ShieldCheck, exact: false },
  { href: "/admin/usuarios", label: "Usuarios", icon: Users, exact: false },
];
