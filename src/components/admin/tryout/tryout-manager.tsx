"use client";

import { useState, useTransition } from "react";
import { updateTryoutStatus, deleteTryout } from "@/actions/tryout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Eye, Loader2, Trash2, Trophy } from "lucide-react";
import { toast } from "sonner";

export type TryoutRow = {
  id: string;
  fullName: string;
  cedula: string;
  birthPlace: string;
  birthDate: string;
  age: number | null;
  phone: string;
  phoneAlt: string | null;
  address: string;
  educationLevel: string;
  email: string;
  isMinor: boolean;
  repName: string | null;
  repCedula: string | null;
  repPhone: string | null;
  repAddress: string | null;
  status: string;
  createdAt: string;
};

const statusOptions = [
  { value: "PENDIENTE", label: "Pendiente" },
  { value: "CONTACTADO", label: "Contactado" },
  { value: "APROBADO", label: "Aprobado" },
  { value: "RECHAZADO", label: "Rechazado" },
];

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div className="space-y-0.5">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="text-sm text-slate-800">{value || "—"}</p>
    </div>
  );
}

function StatusCell({ row }: { row: TryoutRow }) {
  const [pending, startTransition] = useTransition();

  return (
    <Select
      value={row.status}
      onValueChange={(value) => {
        if (!value) return;
        startTransition(async () => {
          const result = await updateTryoutStatus(row.id, value);
          if (result.success) toast.success(result.message);
          else toast.error(result.message);
        });
      }}
      disabled={pending}
    >
      <SelectTrigger className="w-[140px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {statusOptions.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function DeleteButton({ row }: { row: TryoutRow }) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      size="sm"
      variant="outline"
      disabled={pending}
      onClick={() => {
        if (!confirm(`¿Eliminar la inscripción de ${row.fullName}?`)) return;
        startTransition(async () => {
          const result = await deleteTryout(row.id);
          if (result.success) toast.success(result.message);
          else toast.error(result.message);
        });
      }}
    >
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4 text-red-600" />
      )}
    </Button>
  );
}

export function TryoutManager({
  registrations,
}: {
  registrations: TryoutRow[];
}) {
  const [selected, setSelected] = useState<TryoutRow | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e11d2e] to-[#ff4a55] text-white shadow-lg shadow-[#e11d2e]/20">
          <Trophy className="h-6 w-6" />
        </div>
        <div>
          <h1 className="font-heading text-2xl font-semibold uppercase tracking-tight text-slate-900">
            Try Out
          </h1>
          <p className="text-sm text-slate-500">
            Inscripciones recibidas desde la página pública.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Inscripciones
          </CardTitle>
          <CardDescription>
            {registrations.length} inscripción(es) recibida(s).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Cédula</TableHead>
                  <TableHead>Edad</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Grado</TableHead>
                  <TableHead>Representante</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registrations.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      className="py-8 text-center text-sm text-slate-500"
                    >
                      Aún no hay inscripciones.
                    </TableCell>
                  </TableRow>
                ) : (
                  registrations.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {row.fullName}
                          {row.isMinor && (
                            <Badge variant="secondary" className="text-[10px]">
                              Menor
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {row.cedula}
                      </TableCell>
                      <TableCell>{row.age ?? "—"}</TableCell>
                      <TableCell className="text-slate-600">
                        <div className="flex flex-col text-xs">
                          <span>{row.email}</span>
                          <span className="text-slate-400">{row.phone}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs">
                        {row.educationLevel}
                      </TableCell>
                      <TableCell className="text-xs">
                        {row.repName ?? "—"}
                      </TableCell>
                      <TableCell>
                        <StatusCell row={row} />
                      </TableCell>
                      <TableCell className="text-xs text-slate-500">
                        {row.createdAt}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelected(row)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <DeleteButton row={row} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selected?.fullName}</DialogTitle>
            <DialogDescription>
              Detalle de la inscripción al Try Out.
            </DialogDescription>
          </DialogHeader>

          {selected && (
            <div className="space-y-5">
              <div>
                <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Datos personales
                </h4>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <DetailItem label="Cédula" value={selected.cedula} />
                  <DetailItem label="Edad" value={selected.age?.toString()} />
                  <DetailItem
                    label="Fecha de nacimiento"
                    value={selected.birthDate}
                  />
                  <DetailItem
                    label="Lugar de nacimiento"
                    value={selected.birthPlace}
                  />
                  <DetailItem
                    label="Grado de instrucción"
                    value={selected.educationLevel}
                  />
                  <DetailItem label="Correo" value={selected.email} />
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Contacto
                </h4>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <DetailItem label="Teléfono" value={selected.phone} />
                  <DetailItem
                    label="Teléfono opcional"
                    value={selected.phoneAlt}
                  />
                  <DetailItem
                    label="Dirección"
                    value={selected.address}
                  />
                </div>
              </div>

              {selected.isMinor && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Representante legal
                  </h4>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    <DetailItem label="Nombre" value={selected.repName} />
                    <DetailItem label="Cédula" value={selected.repCedula} />
                    <DetailItem label="Teléfono" value={selected.repPhone} />
                    <DetailItem
                      label="Dirección"
                      value={selected.repAddress}
                    />
                  </div>
                </div>
              )}

              <div className="border-t border-slate-100 pt-4">
                <DetailItem label="Estado" value={selected.status} />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
