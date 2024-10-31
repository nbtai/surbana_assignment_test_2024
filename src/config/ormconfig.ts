// src/config/ormconfig.ts
import { DataSource } from 'typeorm';

export const typeOrmConfig = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    database: process.env.DATABASE_NAME,
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["dist/migrations/*{.ts,.js}"],
    synchronize: true, // Set to false in production
    logging: true, // Optional, helpful for debugging,
});
