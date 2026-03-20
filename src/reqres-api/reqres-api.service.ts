import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { UsersResponse } from './reqres-api.types';

@Injectable()
export class ReqresApiService {
  constructor(
    private http: HttpService,
    private config: ConfigService,
  ) {}

  async getUsers() {
    try {
      const { baseUrl, apiKey } = this.getBaseConfig();

      const res = await firstValueFrom(
        this.http.get<UsersResponse>(`${baseUrl}/users`, {
          headers: {
            'x-api-key': apiKey ?? '',
          },
        }),
      );

      return res.data;
    } catch {
      throw new HttpException('External API failed', HttpStatus.BAD_GATEWAY);
    }
  }

  private getBaseConfig() {
    return {
      baseUrl: this.config.get<string>('API_URL'),
      apiKey: this.config.get<string>('API_KEY'),
    };
  }
}
