import Link from "next/link";
import {
  Zap,
  Target,
  Dumbbell,
  Trophy,
  Shield,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  ChevronDown,
  Flame,
  Clock,
  Users,
  Star,
} from "lucide-react";
import { getSiteContent } from "@/lib/site-content";
import { LandingNav } from "@/components/landing/landing-nav";
import { Reveal } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";

export const dynamic = "force-dynamic";

const programIcons = [Zap, Target, Dumbbell, Shield, Trophy, Star];

export default async function Home() {
  const c = await getSiteContent();

  const programs = programIcons.map((icon, i) => ({
    icon,
    title: c[`program.${i + 1}.title`],
    text: c[`program.${i + 1}.text`],
  }));

  const stats = [1, 2, 3, 4].map((i) => ({
    value: c[`stat.${i}.value`],
    label: c[`stat.${i}.label`],
  }));

  return (
    <main className="relative min-h-dvh overflow-x-hidden font-sans text-white">
      {/* FONDO DEL PORTAL (imagen FONDO) */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/fondo.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04060e]/85 via-[#04060e]/92 to-[#04060e]" />
      </div>

      <LandingNav />

      {/* HERO */}
      <section className="relative flex min-h-dvh items-center justify-center overflow-hidden pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/fondo.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04060e]/70 via-[#04060e]/55 to-[#04060e]" />

        {/* Orbes decorativos */}
        <div className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-[#2b5cff]/20 blur-3xl animate-float" />
        <div
          className="pointer-events-none absolute -right-24 bottom-1/4 h-72 w-72 rounded-full bg-[#e11d2e]/20 blur-3xl animate-float"
          style={{ animationDelay: "1.5s" }}
        />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
          <span className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-[#ff3b46]/40 bg-[#ff3b46]/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff8a90]">
            <Flame className="h-3.5 w-3.5" />
            {c["hero.badge"]}
          </span>

          <h1 className="animate-fade-up font-heading text-4xl font-semibold uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">
            {c["hero.titlePrefix"]}{" "}
            <span className="text-gradient-fire">{c["hero.titleHighlight"]}</span>
          </h1>

          <p
            className="animate-fade-up mt-6 max-w-2xl text-base text-slate-300 sm:text-lg"
            style={{ animationDelay: "120ms" }}
          >
            {c["hero.subtitle"]}
          </p>

          {/* BOTONES */}
          <div
            className="animate-fade-up mt-10 flex flex-col items-center gap-4 sm:flex-row"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              href="/tryout"
              className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#e11d2e] to-[#ff4a55] px-9 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_40px_-8px_rgba(225,29,46,0.9)] transition-transform duration-300 hover:scale-[1.04] hover:shadow-[0_0_60px_-6px_rgba(255,74,85,1)] sm:w-auto"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
              <Trophy className="h-5 w-5" />
              {c["hero.ctaText"]}
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#programas"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/40 hover:bg-white/10 sm:w-auto"
            >
              {c["hero.ctaSecondary"]}
            </a>
          </div>

          <p
            className="animate-fade-in mt-5 inline-flex items-center gap-2 text-xs text-slate-400"
            style={{ animationDelay: "360ms" }}
          >
            <Users className="h-3.5 w-3.5" />
            {c["hero.note"]}
          </p>
        </div>

        <a
          href="#programas"
          aria-label="Desplázate"
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-slate-400 transition hover:text-white"
        >
          <ChevronDown className="h-6 w-6 animate-bounce-slow" />
        </a>
      </section>

      {/* STATS */}
      <section className="relative border-y border-white/5 bg-white/[0.03] backdrop-blur-sm">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-12 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={`stat-${i}`} delay={i * 90} className="text-center">
              <p className="font-heading text-4xl font-semibold text-white sm:text-5xl">
                <CountUp value={s.value} />
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-slate-400">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROGRAMAS */}
      <section id="programas" className="mx-auto max-w-6xl px-6 py-24">
        <Reveal className="mb-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#5f8bff]">
            {c["programs.eyebrow"]}
          </p>
          <h2 className="mt-3 font-heading text-4xl font-semibold uppercase sm:text-5xl">
            {c["programs.title"]}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            {c["programs.subtitle"]}
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={`program-${i}`} delay={(i % 3) * 110}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#2b5cff]/50 hover:shadow-[0_16px_40px_-20px_rgba(43,92,255,0.6)]">
                  <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#2b5cff] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#2b5cff] to-[#5f8bff] shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-white">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {p.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* TRY OUT */}
      <section id="tryout" className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-[#e11d2e]/20 via-transparent to-[#2b5cff]/20" />
        <Reveal className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#e11d2e] to-[#ff4a55] shadow-[0_0_40px_-6px_rgba(225,29,46,0.9)] animate-glow">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <h2 className="font-heading text-4xl font-semibold uppercase sm:text-6xl">
            {c["tryout.title"]}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            {c["tryout.subtitle"]}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-300">
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#5f8bff]" /> {c["tryout.date"]}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#5f8bff]" /> {c["tryout.place"]}
            </span>
            <span className="inline-flex items-center gap-2">
              <Users className="h-4 w-4 text-[#5f8bff]" /> {c["tryout.slots"]}
            </span>
          </div>

          <Link
            href="/tryout"
            className="group relative mt-10 inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#e11d2e] to-[#ff4a55] px-10 py-5 text-base font-bold uppercase tracking-wider text-white shadow-[0_0_50px_-8px_rgba(225,29,46,0.95)] transition-transform duration-300 hover:scale-[1.05] sm:w-auto"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
            <Flame className="h-6 w-6" />
            {c["hero.ctaText"]}
            <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>

      {/* CONTACTO / FOOTER */}
      <footer
        id="contacto"
        className="relative border-t border-white/10 bg-black/50 backdrop-blur-sm"
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3">
          <Reveal>
            <div className="leading-tight">
              <p className="font-heading text-xl font-semibold tracking-wide">
                100 MILLAS
              </p>
              <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400">
                Training Center
              </p>
            </div>
            <p className="mt-4 text-sm text-slate-400">
              {c["footer.description"]}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
              Contacto
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#5f8bff]" /> {c["contact.phone"]}
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#5f8bff]" /> {c["contact.email"]}
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-[#5f8bff]" />{" "}
                {c["contact.address"]}
              </li>
            </ul>
          </Reveal>

          <Reveal delay={200}>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
              Síguenos
            </h3>
            <div className="mt-4 flex gap-3">
              <a
                href={c["social.instagram"]}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:-translate-y-0.5 hover:border-[#2b5cff] hover:text-white"
                aria-label="Instagram"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>
              <a
                href={c["social.facebook"]}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:-translate-y-0.5 hover:border-[#2b5cff] hover:text-white"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.25-1.5 1.55-1.5H16.7V4.6c-.29-.04-1.3-.13-2.47-.13-2.44 0-4.11 1.49-4.11 4.23v2.2H7.4V14h2.72v8h3.38z" />
                </svg>
              </a>
            </div>
            <Link
              href="/tryout"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#e11d2e]/50 bg-[#e11d2e]/10 px-5 py-2.5 text-sm font-semibold text-[#ff8a90] transition hover:bg-[#e11d2e]/20"
            >
              <Trophy className="h-4 w-4" /> Inscríbete al Try Out
            </Link>
          </Reveal>
        </div>
        <div className="border-t border-white/10 py-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} {c["footer.copyright"]}. Todos los
          derechos reservados.
        </div>
      </footer>
    </main>
  );
}
