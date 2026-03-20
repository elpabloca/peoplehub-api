import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { LoginResponse, UsersResponse } from './reqres-api.types';

@Injectable()
export class ReqresApiService {
  constructor(private http: HttpService) {}

  async getUsers(page = 1): Promise<UsersResponse> {
    try {
      return await this.requestApi<UsersResponse>(`/users?page=${page}`);
    } catch {
      throw new HttpException('Error fetching users', HttpStatus.BAD_GATEWAY);
    }
  }

  async getUserById(id: number): Promise<UsersResponse> {
    try {
      return await this.requestApi<UsersResponse>(`/users/${id}`);
    } catch {
      throw new HttpException('Error fetching user', HttpStatus.BAD_GATEWAY);
    }
  }

  async login(email: string, password: string) {
    try {
      return await this.requestApi<LoginResponse>('/login', 'POST', {
        email,
        password,
      });
    } catch {
      throw new HttpException('UnAuthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  private async requestApi<T>(
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
