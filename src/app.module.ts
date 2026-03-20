import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Env } from './env.model';

import { UsersModule } from './users/users.module';
import { ReqresApiModule } from './reqres-api/reqres-api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: undefined,
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Env>) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST', { infer: true }),
        port: configService.get('POSTGRES_PORT', { infer: true }),
        username: configService.get('POSTGRES_USER', { infer: true }),
        password: configService.get('POSTGRES_PASSWORD', { infer: true }),
        database: configService.get('POSTGRES_DB', { infer: true }),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    UsersModule,
    ReqresApiModule,
  ],
})
export class AppModule {}
