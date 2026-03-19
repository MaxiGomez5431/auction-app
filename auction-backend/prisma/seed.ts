// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function seedData(prisma: PrismaClient) {
  console.log("🌱 Sembrando base de datos...");

  // Hash de contraseña para todos los usuarios (123456)
  const adminPassword = await bcrypt.hash("123456", 10);
  const userPassword = await bcrypt.hash("123456", 10);

  // ===========================================
  // 1. CREAR USUARIOS
  // ===========================================

  // Usuario ADMIN
  const admin = await prisma.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {},
    create: {
      email: "admin@gmail.com",
      password: adminPassword,
      username: "Jose Admin",
      isAdmin: true,
      isVerified: true,
    },
  });
  console.log("✅ Usuario admin creado:", admin.email);

  // Usuario verificado 1
  const user1 = await prisma.user.upsert({
    where: { email: "martin@gmail.com" },
    update: {},
    create: {
      email: "martin@gmail.com",
      password: userPassword,
      username: "Martin Coleccionista",
      isVerified: true,
      isAdmin: false,
    },
  });
  console.log("✅ Usuario verificado creado:", user1.email);

  // Usuario verificado 2
  const user2 = await prisma.user.upsert({
    where: { email: "ana@gmail.com" },
    update: {},
    create: {
      email: "ana@gmail.com",
      password: userPassword,
      username: "Ana Arte",
      isVerified: true,
      isAdmin: false,
    },
  });
  console.log("✅ Usuario verificado creado:", user2.email);

  // Usuario no verificado
  const user3 = await prisma.user.upsert({
    where: { email: "pendiente@gmail.com" },
    update: {},
    create: {
      email: "pendiente@gmail.com",
      password: userPassword,
      username: "Usuario Pendiente",
      isVerified: false,
      isAdmin: false,
    },
  });
  console.log("✅ Usuario pendiente creado:", user3.email);

  // ===========================================
  // 2. CREAR ARTWORKS (OBRAS DE ARTE)
  // ===========================================

  const artwork1 = await prisma.artwork.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: "Retrato Flamenco Clásico",
      description:
        "Retrato detallado característico de la pintura flamenca, donde se destaca la precisión en los rasgos faciales, la iluminación suave y el uso de colores oscuros para resaltar la figura principal.",
      imageUrl:
        "https://artinflanders.be/sites/default/files/styles/artwork_cover_image_detail/public/artwork/77c7a2e559434db6bc12d586062eb41ac3bb9a503e4d498486539e4bb83ef4f15ec8686d11014cdab7e27711d61e8ff2.jpg?itok=0Ifc31Yo",
    },
  });

  const artwork2 = await prisma.artwork.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: "Escena Religiosa Renacentista",
      description:
        "Pintura de temática religiosa típica del Renacimiento del norte de Europa, con una composición rica en simbolismo y una atención meticulosa a los detalles arquitectónicos y vestimentas.",
      imageUrl:
        "https://artinflanders.be/sites/default/files/styles/artwork_cover_image_lower_detail/public/artwork/da6f9ef828cd4bb29d489789eeefaa763cf3b167b5164ea18b347587f0d3f3aafd1db9b29ebb416c98e21f0e98767f20.jpg?itok=vc4EeYNI",
    },
  });

  const artwork3 = await prisma.artwork.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: "Composición Barroca",
      description:
        "Obra de estilo barroco que destaca por su dramatismo, contrastes de luz y sombra y dinamismo en las figuras, transmitiendo intensidad emocional y movimiento.",
      imageUrl:
        "https://artinflanders.be/sites/default/files/styles/artwork_cover_image_detail/public/artwork/779bc936bb6548e4bf3c5a620353ab6cd63cea5b9c354875beeeec65abb94df462df4cc16fe64823a0a55857dc8211a3.jpg?itok=-KgU_rVO",
    },
  });

  const artwork4 = await prisma.artwork.upsert({
    where: { id: 4 },
    update: {},
    create: {
      title: "Escena Histórica Europea",
      description:
        "Representación de una escena histórica con gran nivel de detalle, donde se combinan elementos narrativos y una composición equilibrada típica de la pintura clásica europea.",
      imageUrl:
        "https://artinflanders.be/sites/default/files/styles/artwork_cover_image_detail/public/artwork/a4aaa4805232492695179a59cab612366ae7ea027c7049bea32145e79df106d75c14b7e0401d4aafa73045a370660b8b.jpg?itok=i-jM-Q9Z",
    },
  });

  console.log("✅ 4 obras de arte creadas");

  // ===========================================
  // 3. CREAR SUBASTAS
  // ===========================================

  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);

  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const nextWeek = new Date(now);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const lastWeek = new Date(now);
  lastWeek.setDate(lastWeek.getDate() - 7);

  const twoWeeksAgo = new Date(now);
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

  // Subasta ACTIVA (con pujas)
  const auction1 = await prisma.auction.upsert({
    where: { id: 1 },
    update: {},
    create: {
      artworkId: artwork1.id,
      startingPrice: 1000,
      minimumIncrement: 100,
      startTime: lastWeek,
      endTime: nextWeek,
      status: "ACTIVE",
    },
  });

  // Subasta ACTIVA 2 (sin pujas)
  const auction2 = await prisma.auction.upsert({
    where: { id: 2 },
    update: {},
    create: {
      artworkId: artwork2.id,
      startingPrice: 2000,
      minimumIncrement: 200,
      startTime: yesterday,
      endTime: nextWeek,
      status: "ACTIVE",
    },
  });

  // Subasta PROGRAMADA
  const auction3 = await prisma.auction.upsert({
    where: { id: 3 },
    update: {},
    create: {
      artworkId: artwork3.id,
      startingPrice: 3000,
      minimumIncrement: 300,
      startTime: tomorrow,
      endTime: nextWeek,
      status: "SCHEDULED",
    },
  });

  // Subasta FINALIZADA (con pujas)
  const auction4 = await prisma.auction.upsert({
    where: { id: 4 },
    update: {},
    create: {
      artworkId: artwork4.id,
      startingPrice: 5000,
      minimumIncrement: 500,
      startTime: twoWeeksAgo,
      endTime: lastWeek,
      status: "FINISHED",
    },
  });

  console.log("✅ 4 subastas creadas");

  // ===========================================
  // 4. CREAR PUJAS
  // ===========================================

  // Pujas para la subasta activa 1
  const bid1 = await prisma.bid.create({
    data: {
      amount: 1100,
      auctionId: auction1.id,
      userId: user1.id,
    },
  });

  const bid2 = await prisma.bid.create({
    data: {
      amount: 1250,
      auctionId: auction1.id,
      userId: user2.id,
    },
  });

  const bid3 = await prisma.bid.create({
    data: {
      amount: 1400,
      auctionId: auction1.id,
      userId: user1.id,
    },
  });

  const bid4 = await prisma.bid.create({
    data: {
      amount: 1550,
      auctionId: auction1.id,
      userId: user2.id,
    },
  });

  // Actualizar currentBid de la subasta activa (la más alta)
  await prisma.auction.update({
    where: { id: auction1.id },
    data: { currentBidId: bid4.id },
  });

  // Pujas para la subasta finalizada
  const bid5 = await prisma.bid.create({
    data: {
      amount: 5500,
      auctionId: auction4.id,
      userId: user1.id,
    },
  });

  const bid6 = await prisma.bid.create({
    data: {
      amount: 6000,
      auctionId: auction4.id,
      userId: user2.id,
    },
  });

  const bid7 = await prisma.bid.create({
    data: {
      amount: 6800,
      auctionId: auction4.id,
      userId: user1.id,
    },
  });

  // Actualizar currentBid de la subasta finalizada
  await prisma.auction.update({
    where: { id: auction4.id },
    data: { currentBidId: bid7.id },
  });

  console.log("✅ Pujas creadas");

  // ===========================================
  // RESUMEN
  // ===========================================
  console.log("\n📊 ====== RESUMEN ======");
  console.log(`👤 Usuarios: 4 (1 admin, 2 verificados, 1 pendiente)`);
  console.log(`🖼️  Obras: 4`);
  console.log(`🏷️  Subastas: 4 (2 activas, 1 programada, 1 finalizada)`);
  console.log(`💰 Pujas: 7`);
  console.log("\n🔐 Credenciales:");
  console.log(`   Admin: admin@gmail.com / 123456`);
  console.log(`   Usuario: martin@gmail.com / 123456`);
  console.log(`   Usuario: ana@gmail.com / 123456`);
  console.log(`   Pendiente: pendiente@gmail.com / 123456`);
  console.log("========================\n");

  console.log("🌱 Seed completado exitosamente!");
}

async function main() {
  await seedData(prisma);
}

// Si se ejecuta directamente, corre el seed
if (require.main === module) {
  main()
    .catch((e) => {
      console.error("❌ Error en seed:", e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
