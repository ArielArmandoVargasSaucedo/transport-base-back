import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS
 const corsOptions: CorsOptions = {
  origin: '*', // Permite solicitudes de cualquier origen
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type, Accept, Authorization',
  credentials: true,
};

app.enableCors(corsOptions);

  await app.listen(5000);
}
bootstrap();
