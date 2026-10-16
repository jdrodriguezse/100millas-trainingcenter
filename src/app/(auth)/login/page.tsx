import Image from "next/image";
import { redirect } from "next/navigation";
import { needsSetup } from "@/actions/auth";
import { LoginForm } from "@/components/auth/login-form";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const setup = await needsSetup();
  if (setup) {
    redirect("/setup-admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-white p-2 shadow-lg">
            <Image
              src="/logo_empresa.png"
              alt="100 Millas Training Center"
              width={112}
              height={112}
              className="h-full w-full object-contain"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold text-white">
            100 Millas Training Center
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Panel de administración
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
