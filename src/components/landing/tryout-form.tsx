"use client";

import { useActionState, useState } from "react";
import { registerTryout, type TryoutActionState } from "@/actions/tryout";
import { EDUCATION_LEVELS } from "@/lib/tryout-options";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Trophy,
  UserRound,
  Users,
} from "lucide-react";

const initialState: TryoutActionState = { success: false, message: "" };

const fieldClass =
  "border-white/15 bg-white/5 text-white placeholder:text-slate-500";
const labelClass = "text-slate-200";
const selectClass =
  "flex h-9 w-full rounded-lg border border-white/15 bg-white/5 px-3 py-1 text-sm text-white outline-none focus:border-[#5f8bff] focus:ring-1 focus:ring-[#5f8bff]";

function calculateAge(value: string): number | null {
  if (!value) return null;
  const birth = new Date(value);
  if (Number.isNaN(birth.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age >= 0 && age < 130 ? age : null;
}

export function TryoutForm() {
  const [state, formAction, pending] = useActionState(
    registerTryout,
    initialState,
  );

  const [birthDate, setBirthDate] = useState("");
  const age = calculateAge(birthDate);
  const isMinor = age !== null && age < 18;

  if (state.success) {
    return (
      <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-8 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-green-400" />
        <h3 className="text-xl font-bold text-white">¡Inscripción enviada!</h3>
        <p className="mt-2 text-sm text-slate-300">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-8">
      {/* DATOS PERSONALES */}
      <section className="space-y-4">
        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#8fb8ff]">
          <UserRound className="h-4 w-4" /> Datos personales
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="fullName" className={labelClass}>
              Nombres y apellidos *
            </Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="Ej: Juan Pérez Gómez"
              required
              className={fieldClass}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cedula" className={labelClass}>
              Cédula de identidad *
            </Label>
            <Input
              id="cedula"
              name="cedula"
              placeholder="000-0000000-0"
              required
              className={fieldClass}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="birthPlace" className={labelClass}>
              Lugar de nacimiento *
            </Label>
            <Input
              id="birthPlace"
              name="birthPlace"
              placeholder="Ej: Santo Domingo"
              required
              className={fieldClass}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="birthDate" className={labelClass}>
              Fecha de nacimiento *
            </Label>
            <Input
              id="birthDate"
              name="birthDate"
              type="date"
              required
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className={fieldClass}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age" className={labelClass}>
              Edad (automática)
            </Label>
            <Input
              id="age"
              name="age"
              readOnly
              tabIndex={-1}
              value={age === null ? "" : `${age} años`}
              placeholder="Se calcula automáticamente"
              className={`${fieldClass} cursor-not-allowed opacity-80`}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="educationLevel" className={labelClass}>
              Grado de instrucción *
            </Label>
            <select
              id="educationLevel"
              name="educationLevel"
              required
              defaultValue=""
              className={selectClass}
            >
              <option value="" disabled className="bg-slate-900">
                Selecciona una opción
              </option>
              {EDUCATION_LEVELS.map((level) => (
                <option key={level} value={level} className="bg-slate-900">
                  {level}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className={labelClass}>
              Correo electrónico *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="correo@ejemplo.com"
              required
              className={fieldClass}
            />
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="space-y-4">
        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#8fb8ff]">
          <Users className="h-4 w-4" /> Contacto
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="phone" className={labelClass}>
              Teléfono *
            </Label>
            <Input
              id="phone"
              name="phone"
              placeholder="(809) 000-0000"
              required
              className={fieldClass}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneAlt" className={labelClass}>
              Teléfono opcional
            </Label>
            <Input
              id="phoneAlt"
              name="phoneAlt"
              placeholder="(829) 000-0000"
              className={fieldClass}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="address" className={labelClass}>
              Dirección de habitación *
            </Label>
            <Textarea
              id="address"
              name="address"
              rows={2}
              placeholder="Calle, número, sector, ciudad"
              required
              className={fieldClass}
            />
          </div>
        </div>
      </section>

      {/* REPRESENTANTE LEGAL */}
      {isMinor && (
        <section className="space-y-4 rounded-2xl border border-[#5f8bff]/30 bg-[#2b5cff]/10 p-5">
          <div>
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#8fb8ff]">
              <UserRound className="h-4 w-4" /> Representante legal
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              El atleta es menor de edad ({age} años). Complete los datos del
              representante legal.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="repName" className={labelClass}>
                Nombres y apellidos del representante *
              </Label>
              <Input
                id="repName"
                name="repName"
                placeholder="Ej: María Gómez"
                required
                className={fieldClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="repCedula" className={labelClass}>
                Cédula del representante *
              </Label>
              <Input
                id="repCedula"
                name="repCedula"
                placeholder="000-0000000-0"
                required
                className={fieldClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="repPhone" className={labelClass}>
                Teléfono del representante *
              </Label>
              <Input
                id="repPhone"
                name="repPhone"
                placeholder="(809) 000-0000"
                required
                className={fieldClass}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="repAddress" className={labelClass}>
                Dirección del representante *
              </Label>
              <Textarea
                id="repAddress"
                name="repAddress"
                rows={2}
                placeholder="Calle, número, sector, ciudad"
                required
                className={fieldClass}
              />
            </div>
          </div>
        </section>
      )}

      {state.message && !state.success && (
        <div className="flex items-center gap-2 rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      <Button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-gradient-to-r from-[#e11d2e] to-[#ff4a55] py-6 text-base font-black uppercase tracking-wide text-white shadow-[0_0_40px_-8px_rgba(225,29,46,0.9)] hover:scale-[1.02]"
      >
        {pending ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Enviando...
          </>
        ) : (
          <>
            <Trophy className="mr-2 h-5 w-5" /> Enviar inscripción
          </>
        )}
      </Button>
      <p className="text-center text-xs text-slate-500">
        Al enviar aceptas ser contactado por 100 Millas Training Center.
      </p>
    </form>
  );
}
