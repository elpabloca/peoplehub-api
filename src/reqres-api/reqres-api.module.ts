import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ReqresApiService } from './reqres-api.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Env } from 'src/env.model';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<Env>) => ({
        baseURL: configService.get('REQRES_URL_BASE'),
        timeout: configService.get('REQRES_TIMEOUT'),
        headers: {
          'x-api-key': configService.get<string>('REQRES_API_KEY'),
          'Content-Type': 'application/json',
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  providers: [ReqresApiService],
  exports: [ReqresApiService],
})
export class ReqresApiModule {}
