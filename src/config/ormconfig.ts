// src/config/ormconfig.ts
import { DataSource } from 'typeorm';
import { Location } from '../location/entities/location.entity';

export const typeOrmConfig = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [Location],
    synchronize: true, // Set to false in production
    logging: true, // Optional, helpful for debugging
});
