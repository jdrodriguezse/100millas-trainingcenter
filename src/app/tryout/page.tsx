import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, MapPin, Trophy, Users, Zap } from "lucide-react";
import { TryoutForm } from "@/components/landing/tryout-form";

export const metadata = {
  title: "Try Out | 100 Millas Training Center",
  description:
    "Inscríbete al Try Out de 100 Millas Training Center y demuestra tu talento.",
};

export default function TryoutPage() {
  return (
    <main className="min-h-dvh bg-[#04060e] text-white">
      {/* NAVBAR */}
      <header className="border-b border-white/5 bg-[#04060e]/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 scale-150 rounded-full bg-[#2b5cff]/35 blur-lg" />
              <Image
                src="/logo_empresa.png"
                alt="100 Millas Training Center"
                width={44}
                height={44}
                className="relative h-11 w-11 object-contain drop-shadow-lg"
              />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-extrabold tracking-tight">100 MILLAS</p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400">
                Training Center
              </p>
            </div>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Volver al inicio
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('/fondo.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04060e]/70 to-[#04060e]" />
        <div className="relative mx-auto max-w-6xl px-6 py-16 text-center">
          <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#e11d2e] to-[#ff4a55] shadow-[0_0_40px_-6px_rgba(225,29,46,0.9)]">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#ff3b46]/40 bg-[#ff3b46]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#ff8a90]">
            Inscripciones abiertas
          </span>
          <h1 className="mt-5 text-4xl font-black sm:text-5xl">
            Participa en nuestro Try Out
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Completa el formulario y asegura tu lugar. Nuestro equipo de
            entrenadores evaluará tu velocidad, mecánica y fundamentos.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-300">
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#5f8bff]" /> Próxima fecha por
              confirmar
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#5f8bff]" /> Nuestras
              instalaciones
            </span>
            <span className="inline-flex items-center gap-2">
              <Users className="h-4 w-4 text-[#5f8bff]" /> Cupos limitados
            </span>
          </div>
        </div>
      </section>

      {/* FORMULARIO */}
      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-20 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <h2 className="mb-1 text-xl font-bold">Formulario de inscripción</h2>
            <p className="mb-6 text-sm text-slate-400">
              Los campos marcados con * son obligatorios.
            </p>
            <TryoutForm />
          </div>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#2b5cff]/15 to-transparent p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold">
              <Zap className="h-5 w-5 text-[#5f8bff]" /> ¿Qué evaluamos?
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>• Velocidad de pitcheo (MPH) y mecánica.</li>
              <li>• Control y comando en el strike zone.</li>
              <li>• Defensa y fundamentos de la posición.</li>
              <li>• Bateo: contacto y poder.</li>
              <li>• Actitud, disciplina y potencial.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-lg font-bold">¿Cómo funciona?</h3>
            <ol className="mt-4 space-y-3 text-sm text-slate-300">
              <li>
                <span className="font-bold text-[#5f8bff]">1.</span> Envía tu
                inscripción.
              </li>
              <li>
                <span className="font-bold text-[#5f8bff]">2.</span> Te
                contactamos con la fecha y hora.
              </li>
              <li>
                <span className="font-bold text-[#5f8bff]">3.</span> Asiste al
                Try Out con tu equipo.
              </li>
              <li>
                <span className="font-bold text-[#5f8bff]">4.</span> Recibe la
                evaluación de los entrenadores.
              </li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
