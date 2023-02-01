import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiHeader, ApiResponse } from '@nestjs/swagger';
import { ROLES, SignupDTO } from '@operation-management/common';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { RegisterService } from './signup/register.service';

@ApiTags('Auth')
@ApiHeader({
  name: 'x-operations-key',
  description: 'Token for auth',
  required: true,
  allowEmptyValue: false,
})
@Controller({
  version: '1',
  path: 'users',
})
export class UsersController {
  constructor(private registerService: RegisterService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.admin, ROLES.super_user)
  @Post('')
  @ApiResponse({
    status: 201,
    schema: { example: { email: 'email@email.com', created: new Date() } },
  })
  @ApiResponse({
    status: 403,
    schema: {
      example: {
        statusCode: 403,
        message: 'Forbidden resource',
        error: 'Forbidden',
      },
    },
  })
  async signup(@Body() data: SignupDTO) {
    return await this.registerService.createUser(data);
  }
}
