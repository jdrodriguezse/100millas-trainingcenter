"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import {
  createRole,
  updateRole,
  deleteRole,
  type RoleActionState,
} from "@/actions/roles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Loader2, Pencil, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { toast } from "sonner";

export type RoleRow = {
  id: string;
  name: string;
  label: string;
  userCount: number;
  isSystem: boolean;
};

const initialState: RoleActionState = { success: false, message: "" };

function RoleForm({
  role,
  onSuccess,
}: {
  role: RoleRow | null;
  onSuccess: () => void;
}) {
  const action = role ? updateRole : createRole;
  const [state, formAction, pending] = useActionState(action, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      onSuccess();
    } else if (state.message) {
      toast.error(state.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <form action={formAction} className="space-y-4">
      {role && <input type="hidden" name="id" value={role.id} />}

      <div className="space-y-2">
        <Label htmlFor="label">Nombre visible</Label>
        <Input
          id="label"
          name="label"
          defaultValue={role?.label ?? ""}
          placeholder="Ej: Entrenador"
          required
        />
        <p className="text-xs text-slate-500">
          Es el nombre que verás en el panel (ej: Entrenador, Alumno, Padre).
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Código del rol</Label>
        <Input
          id="name"
          name="name"
          defaultValue={role?.name ?? ""}
          placeholder="Ej: ENTRENADOR"
          disabled={role?.isSystem}
          required
        />
        <p className="text-xs text-slate-500">
          Identificador interno en mayúsculas (se genera automáticamente si dejas
          el nombre visible).
          {role?.isSystem && " El rol del sistema no puede cambiar su código."}
        </p>
      </div>

      <DialogFooter>
        <Button type="submit" disabled={pending}>
          {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {role ? "Guardar cambios" : "Crear rol"}
        </Button>
      </DialogFooter>
    </form>
  );
}

function DeleteRoleDialog({
  role,
  open,
  onOpenChange,
}: {
  role: RoleRow | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    if (!role) return;
    startTransition(async () => {
      const result = await deleteRole(role.id);
      if (result.success) {
        toast.success(result.message);
        onOpenChange(false);
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar rol</DialogTitle>
          <DialogDescription>
            ¿Seguro que deseas eliminar el rol{" "}
            <span className="font-semibold">{role?.label}</span>? Esta acción no
            se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={pending}
          >
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function RolesManager({ roles }: { roles: RoleRow[] }) {
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<RoleRow | null>(null);
  const [deleting, setDeleting] = useState<RoleRow | null>(null);

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(role: RoleRow) {
    setEditing(role);
    setFormOpen(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#a78bfa] text-white shadow-lg shadow-[#7c3aed]/20">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-heading text-2xl font-semibold uppercase tracking-tight text-slate-900">
              Roles
            </h1>
            <p className="text-sm text-slate-500">
              Administra los roles disponibles en el sistema.
            </p>
          </div>
        </div>
        <Button
          onClick={openCreate}
          className="bg-gradient-to-r from-[#2b5cff] to-[#e11d2e] text-white shadow-lg shadow-[#2b5cff]/20 hover:opacity-95"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nuevo rol
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" />
            Lista de roles
          </CardTitle>
          <CardDescription>
            Los roles permiten asignar permisos a los usuarios del sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-slate-200">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre visible</TableHead>
                  <TableHead>Código</TableHead>
                  <TableHead>Usuarios</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="py-8 text-center text-sm text-slate-500"
                    >
                      No hay roles registrados.
                    </TableCell>
                  </TableRow>
                ) : (
                  roles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell className="font-medium">
                        {role.label}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{role.name}</Badge>
                      </TableCell>
                      <TableCell>{role.userCount}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEdit(role)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={role.isSystem}
                            onClick={() => setDeleting(role)}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
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

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing ? "Editar rol" : "Crear nuevo rol"}
            </DialogTitle>
            <DialogDescription>
              {editing
                ? "Modifica la información del rol."
                : "Agrega un nuevo rol al sistema."}
            </DialogDescription>
          </DialogHeader>
          <RoleForm
            key={editing?.id ?? "new"}
            role={editing}
            onSuccess={() => setFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <DeleteRoleDialog
        role={deleting}
        open={deleting !== null}
        onOpenChange={(open) => {
          if (!open) setDeleting(null);
        }}
      />
    </div>
  );
}
