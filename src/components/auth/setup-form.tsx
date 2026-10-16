"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setupAdmin } from "@/actions/auth";
import type { ActionState } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Eye, EyeOff, Loader2, Lock, Mail, ShieldCheck, User } from "lucide-react";
import { toast } from "sonner";

const initialState: ActionState = { success: false, message: "" };

export function SetupForm() {
  const [state, formAction, pending] = useActionState(setupAdmin, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      const timer = setTimeout(() => router.push("/login"), 1500);
      return () => clearTimeout(timer);
    }
  }, [state, router]);

  const fieldClass =
    "h-12 border-white/10 bg-slate-950/60 pl-11 text-base text-white placeholder:text-slate-500 focus-visible:border-[#5f8bff] focus-visible:ring-[#2b5cff]/30 md:text-base";

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl sm:p-7">
      <div className="mb-6 space-y-1 text-center">
        <h2 className="font-heading text-xl font-semibold tracking-wide text-white">
          Crear administrador
        </h2>
        <p className="text-sm text-slate-400">
          Crea la primera cuenta para empezar a usar el sistema.
        </p>
      </div>

      <form action={formAction} className="space-y-4" noValidate>
        <div className="space-y-2">
          <Label htmlFor="name" className="text-slate-300">
            Nombre completo
          </Label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              id="name"
              name="name"
              placeholder="Juan Pérez"
              autoComplete="name"
              required
              className={fieldClass}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-300">
            Correo electrónico
          </Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              placeholder="admin@100millas.com"
              autoComplete="email"
              autoCapitalize="none"
              autoCorrect="off"
              required
              className={fieldClass}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-slate-300">
            Contraseña
          </Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Mínimo 8 caracteres"
              autoComplete="new-password"
              required
              className={`${fieldClass} pr-11`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2b5cff]/40"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm" className="text-slate-300">
            Confirmar contraseña
          </Label>
          <div className="relative">
            <ShieldCheck className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              id="confirm"
              name="confirm"
              type={showPassword ? "text" : "password"}
              placeholder="Repite la contraseña"
              autoComplete="new-password"
              required
              className={fieldClass}
            />
          </div>
        </div>

        {state.message && !state.success && (
          <div className="flex items-center gap-2 rounded-lg border border-red-500/25 bg-red-500/10 p-3 text-sm text-red-300">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{state.message}</span>
          </div>
        )}

        <Button
          type="submit"
          disabled={pending}
          className="h-12 w-full bg-gradient-to-r from-[#2b5cff] to-[#e11d2e] text-base font-semibold text-white shadow-lg shadow-[#2b5cff]/25 transition hover:brightness-110 disabled:opacity-60 md:text-base"
        >
          {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Crear administrador
        </Button>
      </form>
    </div>
  );
}
