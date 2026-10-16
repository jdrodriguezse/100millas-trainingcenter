# 100 Millas Training Center

Sistema web de gestión para la academia de béisbol **100 Millas Training Center**.

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Estilos:** Tailwind CSS v4 + shadcn/ui (Base UI)
- **Base de datos:** PostgreSQL (Neon) con Prisma ORM
- **Autenticación:** Auth.js (NextAuth v5) con credenciales y roles
- **Deploy:** Vercel (automático con `git push`)

---

## Requisitos

- Node.js 20 o superior
- Cuenta en GitHub
- Cuenta en [Neon](https://neon.tech) (base de datos gratuita)
- Cuenta en [Vercel](https://vercel.com) (hosting gratuito)

---

## Desarrollo local

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Copia `.env.example` a `.env` y coloca tus valores:

```bash
copy .env.example .env
```

Edita `.env`:

```env
DATABASE_URL="postgresql://USUARIO:PASSWORD@HOST/neondb?sslmode=require"
AUTH_SECRET="un-secreto-muy-seguro"
AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="100 Millas Training Center"
```

Para generar un `AUTH_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 3. Crear las tablas en la base de datos

```bash
npm run db:push
```

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). La primera vez te llevará a
`/setup-admin` para crear el primer administrador.

---

## Primer uso

1. Al entrar por primera vez, el sistema muestra la pantalla **Configuración inicial**.
2. Crea el primer usuario administrador (nombre, correo y contraseña).
3. Inicia sesión en `/login`.
4. En el panel podrás:
   - **Roles:** crear, editar y eliminar roles.
   - **Usuarios:** crear usuarios, asignarles rol, activar/desactivar, eliminar.

---

## Despliegue en producción (Neon + Vercel)

### Paso 1: Base de datos en Neon

1. Crea una cuenta en [https://neon.tech](https://neon.tech).
2. Crea un proyecto (región `AWS us-east-1` o la más cercana).
3. Copia el **Connection string** (formato `postgresql://...`).

### Paso 2: Subir el código a GitHub

```bash
git init
git add .
git commit -m "Base del sistema 100 Millas Training Center"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/100-millas-training-center.git
git push -u origin main
```

### Paso 3: Conectar con Vercel

1. Entra a [https://vercel.com](https://vercel.com) e inicia sesión con GitHub.
2. **Add New → Project** y selecciona el repositorio.
3. En **Environment Variables** agrega:
   - `DATABASE_URL` = tu cadena de conexión de Neon
   - `AUTH_SECRET` = tu secreto seguro
   - `AUTH_URL` = `https://tu-dominio.com` (o la URL de Vercel)
4. Presiona **Deploy**.

### Paso 4: Crear las tablas en producción

Desde tu PC, apuntando a la base de datos de producción:

```bash
npm run db:push
```

### Paso 5: Dominio propio

1. Compra un dominio (ej: Namecheap, GoDaddy, Cloudflare).
2. En Vercel: **Project → Settings → Domains → Add** y sigue las instrucciones
   (agregar los registros DNS que te indique).

---

## Actualizaciones (deploys)

Cada vez que hagas cambios:

```bash
git add .
git commit -m "Descripción del cambio"
git push
```

Vercel detecta el push y **despliega automáticamente** en 1-2 minutos.

---

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compilar para producción |
| `npm run start` | Iniciar la versión compilada |
| `npm run lint` | Revisar el código |
| `npm run db:push` | Aplicar el esquema a la base de datos |
| `npm run db:studio` | Abrir Prisma Studio (ver datos) |

---

## Estructura del proyecto

```
src/
├── actions/            # Server Actions (lógica del servidor)
├── app/
│   ├── (auth)/login/   # Página de inicio de sesión
│   ├── admin/          # Panel de administración (protegido)
│   ├── api/auth/       # Ruta de Auth.js
│   └── setup-admin/    # Configuración inicial
├── components/
│   ├── admin/          # Componentes del panel
│   ├── auth/           # Formularios de autenticación
│   └── ui/             # Componentes de shadcn/ui
├── lib/                # auth, prisma, utilidades
└── types/              # Tipos compartidos
prisma/
└── schema.prisma       # Modelos de base de datos
```

---

## Modelos de datos

- **Role:** roles del sistema (ADMIN, ENTRENADOR, ALUMNO, etc.).
- **User:** usuarios con correo, contraseña y rol asignado.

Próximamente: Alumnos, Grupos, Asistencias, Pagos, Evaluaciones.
