import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ReqresApiService } from './reqres-api.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [ReqresApiService],
  exports: [ReqresApiService],
})
export class ReqresApiModule {}
