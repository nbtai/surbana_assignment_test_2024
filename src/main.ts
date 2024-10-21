// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { typeOrmConfig } from './config/ormconfig';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
    // Initialize the TypeORM DataSource
    await typeOrmConfig.initialize();

    const config = new DocumentBuilder()
        .setTitle('Locations API')
        .setDescription('API documentation for managing locations')
        .setVersion('1.0')
        .addTag('locations')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document); // Serve Swagger at /api

    await app.listen(3000);
}
bootstrap();
