import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Estableciendo el prefijo global 
    app.setGlobalPrefix('api/v2');

    // Validación general de la app
    app.useGlobalPipes(new ValidationPipe({
        // Habilitando los DTOs
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        }
    }));

    // Escuchando el PORT
    await app.listen(process.env.PORT || 3000);
    console.log(`App running on PORT: ${process.env.PORT}`);
}
bootstrap();
