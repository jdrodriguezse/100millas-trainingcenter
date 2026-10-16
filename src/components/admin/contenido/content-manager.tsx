"use client";

import { useState } from "react";
import { useActionState } from "react";
import { saveSiteContent, type ContentActionState } from "@/actions/contenido";
import {
  CONTENT_FIELDS,
  CONTENT_TABS,
  type SiteContentMap,
} from "@/lib/content-fields";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  CheckCircle2,
  Globe,
  Loader2,
  Save,
  ClipboardList,
} from "lucide-react";
import { cn } from "@/lib/utils";

const initialState: ContentActionState = { success: false, message: "" };

const tabIcons: Record<string, typeof Globe> = {
  portal: Globe,
  registro: ClipboardList,
};

export function ContentManager({ content }: { content: SiteContentMap }) {
  const [state, formAction, pending] = useActionState(
    saveSiteContent,
    initialState,
  );
  const [activeTab, setActiveTab] = useState(CONTENT_TABS[0].id);

  return (
    <form action={formAction} className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2b5cff] to-[#e11d2e] text-white shadow-lg shadow-[#2b5cff]/20">
            <Globe className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-heading text-2xl font-semibold uppercase tracking-tight text-slate-900">
              Contenido de la web
            </h1>
            <p className="text-sm text-slate-500">
              Edita los textos del portal por pestañas.
            </p>
          </div>
        </div>
        <Button
          type="submit"
          disabled={pending}
          className="bg-gradient-to-r from-[#2b5cff] to-[#e11d2e] text-white shadow-lg shadow-[#2b5cff]/20 hover:opacity-95"
        >
          {pending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Guardando...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" /> Guardar cambios
            </>
          )}
        </Button>
      </div>

      {/* Pestañas */}
      <div className="sticky top-16 z-20 -mx-1 flex flex-wrap items-center gap-2 border-b border-slate-200 bg-[#f6f7fb]/80 px-1 py-3 backdrop-blur">
        <div className="inline-flex flex-wrap gap-1 rounded-full border border-slate-200 bg-white p-1 shadow-sm">
          {CONTENT_TABS.map((tab) => {
            const Icon = tabIcons[tab.id] ?? Globe;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300",
                  active
                    ? "bg-gradient-to-r from-[#0b1224] to-[#1b2748] text-white shadow-md"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900",
                )}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-slate-400">
          {CONTENT_TABS.find((t) => t.id === activeTab)?.description}
        </p>
      </div>

      {state.message && (
        <div
          className={cn(
            "flex items-center gap-2 rounded-xl border p-3 text-sm",
            state.success
              ? "border-green-500/30 bg-green-500/10 text-green-700"
              : "border-red-500/30 bg-red-500/10 text-red-700",
          )}
        >
          {state.success ? (
            <CheckCircle2 className="h-4 w-4 shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0" />
          )}
          <span>{state.message}</span>
        </div>
      )}

      {/* Todas las pestañas se renderizan (las inactivas ocultas) para no
          perder valores al guardar. */}
      {CONTENT_TABS.map((tab) => (
        <div key={tab.id} className={cn("space-y-6", activeTab !== tab.id && "hidden")}>
          {tab.groups.map((group, gi) => {
            const fields = CONTENT_FIELDS.filter((f) => f.group === group);
            if (fields.length === 0) return null;
            return (
              <section
                key={group}
                style={{ animationDelay: `${gi * 70}ms` }}
                className="animate-fade-up overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"
              >
                <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/60 px-6 py-3">
                  <span className="h-4 w-1 rounded-full bg-gradient-to-b from-[#2b5cff] to-[#e11d2e]" />
                  <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                    {group}
                  </h2>
                </div>
                <div className="grid gap-4 p-6 sm:grid-cols-2">
                  {fields.map((field) => {
                    const isLong =
                      field.type === "textarea" &&
                      field.key.endsWith("Items");
                    return (
                      <div
                        key={field.key}
                        className={cn(
                          "space-y-2",
                          field.type === "textarea" && "sm:col-span-2",
                        )}
                      >
                        <Label
                          htmlFor={field.key}
                          className="font-medium text-slate-700"
                        >
                          {field.label}
                        </Label>
                        {field.type === "textarea" ? (
                          <Textarea
                            id={field.key}
                            name={field.key}
                            rows={isLong ? 5 : 3}
                            defaultValue={content[field.key] ?? field.default}
                            className="border-slate-300 bg-white transition focus-visible:border-[#2b5cff] focus-visible:ring-[#2b5cff]/30"
                          />
                        ) : (
                          <Input
                            id={field.key}
                            name={field.key}
                            defaultValue={content[field.key] ?? field.default}
                            className="h-11 border-slate-300 bg-white transition focus-visible:border-[#2b5cff] focus-visible:ring-[#2b5cff]/30"
                          />
                        )}
                        {field.help && (
                          <p className="text-xs text-slate-400">{field.help}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      ))}

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={pending}
          className="bg-gradient-to-r from-[#2b5cff] to-[#e11d2e] text-white shadow-lg shadow-[#2b5cff]/20 hover:opacity-95"
        >
          {pending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Guardando...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" /> Guardar cambios
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
