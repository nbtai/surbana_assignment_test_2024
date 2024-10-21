import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationModule } from './location/location.module';
import { typeOrmConfig } from './config/ormconfig';
import { DataSourceOptions } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (): Promise<DataSourceOptions> => {
        return {
          ...typeOrmConfig.options, // Ensure you're spreading the correct options
        };
      },
    }),
    LocationModule,
  ],
})
export class AppModule {}
