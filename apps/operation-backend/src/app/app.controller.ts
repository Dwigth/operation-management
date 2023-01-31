import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';

@ApiTags('Auth')
@ApiHeader({
  name: 'x-operations-key',
  description: 'Token for auth',
  required: true,
  allowEmptyValue: false,
})
@Controller({
  version: '1',
})
export class AppController {
  constructor(
    private authService: AuthService,
    ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: Request & { user: any}) {
    return this.authService.login(req.user);
  }

}