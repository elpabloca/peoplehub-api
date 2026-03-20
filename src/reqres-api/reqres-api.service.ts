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

  async getUsers(page = 1): Promise<UsersResponse> {
    try {
      return await this.request<UsersResponse>(`/users?page=${page}`);
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

  private async request<T>(
    endpoint: string,
    method: 'GET' | 'POST' = 'GET',
    data?: unknown,
  ) {
    const res = await firstValueFrom(
      this.http.request<T>({
        url: `${endpoint}`,
        method,
        data,
      }),
    );

    return res.data;
  }
}
