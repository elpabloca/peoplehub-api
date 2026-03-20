import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ReqresApiService } from 'src/reqres-api/reqres-api.service';
import { Payload } from '../auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly reqresApi: ReqresApiService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.reqresApi.login(email, password);
    if (!user?.token) {
      throw new UnauthorizedException('Unauthorized desde validate');
    }
    return user;
  }

  generateToken(token: string) {
    const payload: Payload = { sub: token };
    return this.jwtService.sign(payload);
  }
}
