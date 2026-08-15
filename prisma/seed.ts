import "dotenv/config";
import { PrismaClient, Categoria, Color } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import bcrypt from "bcryptjs";

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1234",
  database: "anuncios_santodomingo",
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Iniciando seed de la base de datos...\n");

  // ── Clean existing data ─────────────────────────────────
  await prisma.anuncio.deleteMany();
  await prisma.otpCode.deleteMany();
  await prisma.user.deleteMany();

  // ── Create demo users ───────────────────────────────────
  const hashedPassword = await bcrypt.hash("1234", 10);

  const user1 = await prisma.user.create({
    data: {
      nombre: "Carlos Rojas",
      telefono: "994385288",
      password: hashedPassword,
      verificado: true,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      nombre: "María López",
      telefono: "948912502",
      password: hashedPassword,
      verificado: true,
    },
  });

  console.log(`✅ Usuarios creados: ${user1.nombre}, ${user2.nombre}`);

  // ── Create sample ads ───────────────────────────────────
  const hashedPin = await bcrypt.hash("1234", 10);
  const now = new Date();
  const expiraEn = new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000); // 15 days

  const adsData = [
    {
      categoria: Categoria.EMPLEO,
      distrito: "Huánuco Centro",
      titulo: "SE NECESITA MOTORIZADO PARA DELIVERY",
      descripcion:
        "De preferencia joven proactivo para reparto a domicilio en pollería céntrica. Horario de 3:00 PM a 11:00 PM. Trato directo, buena comisión. Razón Jr. 2 de Mayo N° 435.",
      telefono: "994385288",
      color: Color.CELESTE,
      pin: hashedPin,
      expiraEn,
      creadoEn: new Date(now.getTime() - 1000 * 60 * 60 * 2),
      userId: user1.id,
    },
    {
      categoria: Categoria.ALQUILER,
      distrito: "Pillco Marca",
      titulo: "SE ALQUILA CUARTOS DE ESTRENO",
      descripcion:
        "Habitaciones cómodas con baño propio. Acabados modernos, excelente iluminación. Ubicado en Pasaje Los Girasoles, Pillco Marca. Referencia: Altura de Calle Los Ficus.",
      telefono: "948912502",
      color: Color.VERDE,
      pin: hashedPin,
      expiraEn,
      creadoEn: new Date(now.getTime() - 1000 * 60 * 60 * 5),
      userId: user2.id,
    },
    {
      categoria: Categoria.ALQUILER,
      distrito: "Amarilis",
      titulo: "ALQUILO DEPARTAMENTO AMPLIO",
      descripcion:
        "Ubicado estratégicamente en el primer piso con fácil acceso. Jr. José Olaya N° 220 frente a EsSalud - Paucarbamba. Cuenta con sala, cocina, 2 habitaciones grandes.",
      telefono: "949900727",
      color: Color.AMARILLO,
      pin: hashedPin,
      expiraEn,
      creadoEn: new Date(now.getTime() - 1000 * 60 * 60 * 12),
      userId: user2.id,
    },
    {
      categoria: Categoria.EMPLEO,
      distrito: "Otros",
      titulo: "SE NECESITA UNA SEÑORITA",
      descripcion:
        "Para trabajar como ayudante en recreo campestre a las afueras de la ciudad. Con o sin experiencia en atención al cliente. Se brinda almuerzo.",
      telefono: "978953505",
      color: Color.ROSADO,
      pin: hashedPin,
      expiraEn,
      creadoEn: new Date(now.getTime() - 1000 * 60 * 60 * 24),
      userId: user1.id,
    },
    {
      categoria: Categoria.EMPLEO,
      distrito: "Huánuco Centro",
      titulo: "NECESITO REMALLADORES URGENTE",
      descripcion:
        "Con experiencia demostrable en costura y ensamble de prendas. Trabajo inmediato a destajo en taller de confección. Razón Jr. Pachacutec N° 204.",
      telefono: "927236450",
      color: Color.CELESTE,
      pin: hashedPin,
      expiraEn,
      creadoEn: new Date(now.getTime() - 1000 * 60 * 60 * 30),
      userId: user1.id,
    },
    {
      categoria: Categoria.ALQUILER,
      distrito: "Pillco Marca",
      titulo: "SE VENDE CASA CON TERRENO",
      descripcion:
        "Ocasión especial por viaje, terreno total de 252 mt2 listo para construir o habitar. Todos los documentos en regla. Contacto directo.",
      telefono: "964248432",
      color: Color.AMARILLO,
      pin: hashedPin,
      expiraEn,
      creadoEn: new Date(now.getTime() - 1000 * 60 * 60 * 48),
      userId: user2.id,
    },
  ];

  for (const adData of adsData) {
    await prisma.anuncio.create({ data: adData });
  }

  console.log(`✅ ${adsData.length} anuncios de ejemplo creados`);
  console.log("\n🎉 Seed completado exitosamente!");
  console.log("\n📋 Credenciales de prueba:");
  console.log("   Usuario 1: telefono=994385288  password=1234");
  console.log("   Usuario 2: telefono=948912502  password=1234");
  console.log("   PIN de todos los anuncios: 1234\n");
}

main()
  .catch((e) => {
    console.error("❌ Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
