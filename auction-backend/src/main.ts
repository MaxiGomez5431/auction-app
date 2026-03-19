// src/main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PrismaService } from "./prisma/prisma.service";
import { seedData } from "../prisma/seed";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: "http://localhost:3000",
    credentials: true,
  });

  // Obtener PrismaService
  const prismaService = app.get(PrismaService);

  // Ejecutar seed al iniciar (solo si la BD está vacía)
  console.log("🌱 Verificando si es necesario ejecutar seed...");
  try {
    const userCount = await prismaService.user.count();
    if (userCount === 0) {
      await seedData(prismaService);
      console.log("✅ Seed completado exitosamente");
    } else {
      console.log(
        `✅ Base de datos ya tiene ${userCount} usuarios, saltando seed`,
      );
    }
  } catch (error) {
    console.error("❌ Error al ejecutar seed:", error);
  }

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Backend running on http://localhost:${port}`);
  console.log(`📊 Health check: http://localhost:${port}/health`);
  console.log(`🔐 Admin credentials: admin@gmail.com / 123456`);
}
bootstrap();
