import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="admin-panel-bg min-h-screen bg-[#f6f7fb]">
      <div className="flex min-h-screen">
        <AdminSidebar user={session.user} />
        <div className="flex min-w-0 flex-1 flex-col">
          <AdminHeader user={session.user} />
          <main className="flex-1 px-4 py-6 sm:px-6">
            <div className="mx-auto max-w-6xl">{children}</div>
          </main>
          <footer className="border-t border-slate-200/70 px-6 py-4 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} 100 Millas Training Center · Panel de
            administración
          </footer>
        </div>
      </div>
    </div>
  );
}
