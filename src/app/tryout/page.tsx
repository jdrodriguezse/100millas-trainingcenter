import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, MapPin, Trophy, Users, Zap } from "lucide-react";
import { TryoutForm } from "@/components/landing/tryout-form";
import { getSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Try Out | 100 Millas Training Center",
  description:
    "Inscríbete al Try Out de 100 Millas Training Center y demuestra tu talento.",
};

function toLines(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

export default async function TryoutPage() {
  const c = await getSiteContent();
  const evalItems = toLines(c["registro.evalItems"]);
  const stepsItems = toLines(c["registro.stepsItems"]);

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
            {c["registro.badge"]}
          </span>
          <h1 className="mt-5 text-4xl font-black sm:text-5xl">
            {c["registro.title"]}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            {c["registro.subtitle"]}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-300">
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#5f8bff]" /> {c["registro.date"]}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#5f8bff]" /> {c["registro.place"]}
            </span>
            <span className="inline-flex items-center gap-2">
              <Users className="h-4 w-4 text-[#5f8bff]" /> {c["registro.slots"]}
            </span>
          </div>
        </div>
      </section>

      {/* FORMULARIO */}
      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-20 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <h2 className="mb-1 text-xl font-bold">{c["registro.formTitle"]}</h2>
            <p className="mb-6 text-sm text-slate-400">
              {c["registro.formNote"]}
            </p>
            <TryoutForm />
          </div>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#2b5cff]/15 to-transparent p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold">
              <Zap className="h-5 w-5 text-[#5f8bff]" /> {c["registro.evalTitle"]}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {evalItems.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-lg font-bold">{c["registro.stepsTitle"]}</h3>
            <ol className="mt-4 space-y-3 text-sm text-slate-300">
              {stepsItems.map((step, i) => (
                <li key={i}>
                  <span className="font-bold text-[#5f8bff]">{i + 1}.</span>{" "}
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
