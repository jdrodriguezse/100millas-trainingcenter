"use client";

import { useActionState } from "react";
import { saveSiteContent, type ContentActionState } from "@/actions/contenido";
import {
  CONTENT_FIELDS,
  CONTENT_GROUPS,
  type SiteContentMap,
} from "@/lib/content-fields";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Save,
  Globe,
} from "lucide-react";

const initialState: ContentActionState = { success: false, message: "" };

export function ContentManager({ content }: { content: SiteContentMap }) {
  const [state, formAction, pending] = useActionState(
    saveSiteContent,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
            <Globe className="h-6 w-6" />
            Contenido de la web
          </h1>
          <p className="text-sm text-slate-500">
            Edita los textos de la página principal del portal.
          </p>
        </div>
        <Button
          type="submit"
          disabled={pending}
          className="bg-slate-900 hover:bg-slate-800"
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

      {state.message && (
        <div
          className={
            state.success
              ? "flex items-center gap-2 rounded-md border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-700"
              : "flex items-center gap-2 rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-700"
          }
        >
          {state.success ? (
            <CheckCircle2 className="h-4 w-4 shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0" />
          )}
          <span>{state.message}</span>
        </div>
      )}

      {CONTENT_GROUPS.map((group) => {
        const fields = CONTENT_FIELDS.filter((f) => f.group === group);
        if (fields.length === 0) return null;
        return (
          <section
            key={group}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="mb-4 border-b border-slate-100 pb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
              {group}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map((field) => (
                <div
                  key={field.key}
                  className={
                    field.type === "textarea" ? "space-y-2 sm:col-span-2" : "space-y-2"
                  }
                >
                  <Label htmlFor={field.key} className="text-slate-700">
                    {field.label}
                  </Label>
                  {field.type === "textarea" ? (
                    <Textarea
                      id={field.key}
                      name={field.key}
                      defaultValue={content[field.key] ?? field.default}
                      rows={3}
                    />
                  ) : (
                    <Input
                      id={field.key}
                      name={field.key}
                      defaultValue={content[field.key] ?? field.default}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      })}

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={pending}
          className="bg-slate-900 hover:bg-slate-800"
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
