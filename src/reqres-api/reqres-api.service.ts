import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { LoginResponse, UsersResponse } from './reqres-api.types';

@Injectable()
export class ReqresApiService {
  constructor(
    private http: HttpService,
    private config: ConfigService,
  ) {}

  async getUsers(): Promise<UsersResponse> {
    try {
      return await this.request<UsersResponse>('/users');
    } catch {
      throw new HttpException('Error fetching users', HttpStatus.BAD_GATEWAY);
    }
  }

  async getUserById(id: number): Promise<UsersResponse> {
    try {
      return await this.request<UsersResponse>(`/users/${id}`);
    } catch {
      throw new HttpException('Error fetching user', HttpStatus.BAD_GATEWAY);
    }
  }

  async login(email: string, password: string) {
    try {
      return await this.request<LoginResponse>('/login', 'POST', {
        email,
        password,
      });
    } catch {
      throw new HttpException('Login failed', HttpStatus.UNAUTHORIZED);
    }
  }

  private getBaseConfig() {
    return {
      baseUrl: this.config.get<string>('API_URL'),
      apiKey: this.config.get<string>('API_KEY'),
    };
  }

  private async request<T>(
    endpoint: string,
    method: 'GET' | 'POST' = 'GET',
    data?: unknown,
  ) {
    const baseUrl = this.config.get<string>('REQRES_URL_BASE');
    const apiKey = this.config.get<string>('PEOPLE_HUB_REQRES_APY_KEY');

    const res = await firstValueFrom(
      this.http.request<T>({
        url: `${baseUrl}${endpoint}`,
        method,
        data,
        headers: {
          'x-api-key': apiKey ?? '',
          'Content-Type': 'application/json',
        },
      }),
    );

    return res.data;
  }
}
