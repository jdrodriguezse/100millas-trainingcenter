"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import {
  createUser,
  updateUser,
  toggleUserActive,
  deleteUser,
  type UserActionState,
} from "@/actions/usuarios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
import { Loader2, Pencil, Plus, Trash2, Users } from "lucide-react";
import { toast } from "sonner";

export type UserRow = {
  id: string;
  name: string;
  email: string;
  roleId: string;
  roleLabel: string;
  isActive: boolean;
  isSelf: boolean;
};

export type RoleOption = {
  id: string;
  label: string;
};

const initialState: UserActionState = { success: false, message: "" };

function RoleSelect({
  roles,
  defaultValue,
  id = "roleId",
}: {
  roles: RoleOption[];
  defaultValue?: string;
  id?: string;
}) {
  return (
    <select
      id={id}
      name="roleId"
      defaultValue={defaultValue}
      required
      className="flex h-9 w-full rounded-lg border border-slate-300 bg-white px-3 py-1 text-sm shadow-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
    >
      <option value="" disabled>
        Selecciona un rol
      </option>
      {roles.map((role) => (
        <option key={role.id} value={role.id}>
          {role.label}
        </option>
      ))}
    </select>
  );
}

function UserForm({
  user,
  roles,
  onSuccess,
}: {
  user: UserRow | null;
  roles: RoleOption[];
  onSuccess: () => void;
}) {
  const action = user ? updateUser : createUser;
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
      {user && <input type="hidden" name="id" value={user.id} />}

      <div className="space-y-2">
        <Label htmlFor="name">Nombre completo</Label>
        <Input
          id="name"
          name="name"
          defaultValue={user?.name ?? ""}
          placeholder="Ej: Juan Pérez"
          required
        />
      </div>

      {!user && (
        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="correo@ejemplo.com"
            required
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="roleId">Rol</Label>
        <RoleSelect roles={roles} defaultValue={user?.roleId} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">
          {user ? "Nueva contraseña (opcional)" : "Contraseña"}
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder={user ? "Dejar vacío para no cambiarla" : "Mínimo 8 caracteres"}
          required={!user}
        />
      </div>

      <DialogFooter>
        <Button type="submit" disabled={pending}>
          {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {user ? "Guardar cambios" : "Crear usuario"}
        </Button>
      </DialogFooter>
    </form>
  );
}

function DeleteUserDialog({
  user,
  open,
  onOpenChange,
}: {
  user: UserRow | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    if (!user) return;
    startTransition(async () => {
      const result = await deleteUser(user.id);
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
          <DialogTitle>Eliminar usuario</DialogTitle>
          <DialogDescription>
            ¿Seguro que deseas eliminar a{" "}
            <span className="font-semibold">{user?.name}</span>? Esta acción no
            se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={pending}>
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function UsersManager({
  users,
  roles,
}: {
  users: UserRow[];
  roles: RoleOption[];
}) {
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<UserRow | null>(null);
  const [deleting, setDeleting] = useState<UserRow | null>(null);
  const [pendingId, startTransition] = useTransition();

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(user: UserRow) {
    setEditing(user);
    setFormOpen(true);
  }

  function handleToggle(user: UserRow) {
    startTransition(async () => {
      const result = await toggleUserActive(user.id);
      if (result.success) toast.success(result.message);
      else toast.error(result.message);
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Usuarios</h1>
          <p className="text-sm text-slate-500">
            Administra las cuentas y sus roles.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo usuario
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Lista de usuarios
          </CardTitle>
          <CardDescription>
            {users.length} usuario(s) registrado(s) en el sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-slate-200">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Correo</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="py-8 text-center text-sm text-slate-500"
                    >
                      No hay usuarios registrados.
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        {user.name}
                        {user.isSelf && (
                          <span className="ml-2 text-xs text-slate-400">(tú)</span>
                        )}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {user.email}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{user.roleLabel}</Badge>
                      </TableCell>
                      <TableCell>
                        {user.isActive ? (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                            Activo
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-slate-500">
                            Inactivo
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleToggle(user)}
                            disabled={user.isSelf || pendingId}
                          >
                            {user.isActive ? "Desactivar" : "Activar"}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEdit(user)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={user.isSelf}
                            onClick={() => setDeleting(user)}
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
              {editing ? "Editar usuario" : "Crear nuevo usuario"}
            </DialogTitle>
            <DialogDescription>
              {editing
                ? "Modifica la información del usuario."
                : "Agrega una nueva cuenta al sistema."}
            </DialogDescription>
          </DialogHeader>
          <UserForm
            key={editing?.id ?? "new"}
            user={editing}
            roles={roles}
            onSuccess={() => setFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <DeleteUserDialog
        user={deleting}
        open={deleting !== null}
        onOpenChange={(open) => {
          if (!open) setDeleting(null);
        }}
      />
    </div>
  );
}
