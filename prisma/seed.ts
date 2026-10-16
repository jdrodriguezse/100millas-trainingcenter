import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminRole = await prisma.role.upsert({
    where: { name: "ADMIN" },
    update: { label: "Administrador" },
    create: { name: "ADMIN", label: "Administrador" },
  });

  const adminCount = await prisma.user.count({
    where: { roleId: adminRole.id },
  });

  if (adminCount > 0) {
    console.log("Ya existe un administrador. No se creó ninguno nuevo.");
    return;
  }

  const email = (process.env.ADMIN_EMAIL || "admin@100millas.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "Admin100Millas!";
  const name = process.env.ADMIN_NAME || "Administrador";

  const hashed = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      roleId: adminRole.id,
    },
  });

  console.log("======================================================");
  console.log(" Administrador creado correctamente");
  console.log("------------------------------------------------------");
  console.log(`  Correo:    ${email}`);
  console.log(`  Contraseña: ${password}`);
  console.log("======================================================");
  console.log(" IMPORTANTE: cambia la contraseña después de entrar.");
  console.log("======================================================");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
