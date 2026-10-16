import Image from "next/image";
import { redirect } from "next/navigation";
import { needsSetup } from "@/actions/auth";
import { SetupForm } from "@/components/auth/setup-form";

export const dynamic = "force-dynamic";

export default async function SetupAdminPage() {
  const setup = await needsSetup();
  if (!setup) {
    redirect("/login");
  }

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-[#04060e] px-4 py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#2b5cff]/25 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-[#e11d2e]/20 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="mb-7 flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="absolute inset-0 scale-150 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.16),transparent_68%)] blur-2xl" />
            <div className="absolute inset-0 scale-125 rounded-full bg-[#2b5cff]/30 blur-2xl animate-glow" />
            <Image
              src="/logo_empresa.png"
              alt="100 Millas Training Center"
              width={160}
              height={160}
              className="relative h-28 w-28 object-contain drop-shadow-2xl sm:h-36 sm:w-36"
              priority
            />
          </div>
          <h1 className="font-heading text-2xl font-bold tracking-wide text-white sm:text-3xl">
            100 MILLAS
          </h1>
          <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
            Training Center
          </p>
          <p className="mt-4 text-sm text-slate-400">
            Configuración inicial del administrador
          </p>
        </div>

        <SetupForm />

        <p className="mt-6 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} 100 Millas Training Center
        </p>
      </div>
    </main>
  );
}
