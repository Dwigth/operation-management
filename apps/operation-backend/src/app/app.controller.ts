import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { ROLES, SignupDTO } from '@operation-management/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Roles } from './auth/roles.decorator';
import { RolesGuard } from './auth/roles.guard';

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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.admin, ROLES.super_user)
  @Post('auth/signup')
  async signup(@Body() data: SignupDTO) {
    return this.authService.signup(data);
  }

}