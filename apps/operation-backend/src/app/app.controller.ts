import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SWAGGER } from '@operation-management/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';

const { AUTH, ERRORS } = SWAGGER;

@ApiTags('Auth')
@Controller({
  version: '1',
})
export class AppController {
  constructor(
    private authService: AuthService,
    ) {}
  
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiBody(AUTH.SCHEMAS.LOGIN)
  @ApiResponse(ERRORS.ForbiddenResource)
  @ApiResponse(AUTH.RESPONSES.LOGIN)
  async login(@Request() req: Request & { user: any}) {
    return this.authService.login(req.user);
  }

}