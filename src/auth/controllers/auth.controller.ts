import { Controller, Body, UseGuards, Post, Req } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { ResponseLogin } from '../auth.types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request) {
    const user = req.user as ResponseLogin;
    const accessToken = this.authService.generateToken(user.token);
    return {
      access_token: accessToken,
    };
  }
}
