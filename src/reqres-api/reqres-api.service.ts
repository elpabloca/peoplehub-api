import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import {
  LoginResponse,
  UsersReqresResponse,
  UserReqresResponse,
} from './reqres-api.types';

@Injectable()
export class ReqresApiService {
  constructor(private http: HttpService) {}

  async getUsers(page = 1): Promise<UsersReqresResponse> {
    try {
      return await this.requestApi<UsersReqresResponse>(`/users?page=${page}`);
    } catch {
      throw new HttpException('Error fetching users', HttpStatus.BAD_GATEWAY);
    }
  }

  async getUserById(id: number): Promise<UserReqresResponse> {
    try {
      return await this.requestApi<UserReqresResponse>(`/users/${id}`);
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
