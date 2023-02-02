import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiHeader, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ROLES, SignupDTO, UpdateUserDto, SWAGGER, ListQuery } from '@operation-management/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { RegisterService } from './signup/register.service';
import { UsersService } from './users.service';

const { ERRORS, USERS } = SWAGGER;

@ApiTags('Users')
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
  constructor(
    private registerService: RegisterService,
    private userService: UsersService
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.admin, ROLES.super_user)
  @Post('')
  @ApiResponse(USERS.CREATE_USER)
  @ApiResponse(ERRORS.ForbiddenResource)
  async create(@Body() data: SignupDTO) {
    return await this.registerService.createUser(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.admin, ROLES.super_user)
  @Get('')
  @ApiResponse(ERRORS.ForbiddenResource)
  @ApiResponse(ERRORS.NotFound)
  @ApiResponse(USERS.USER)
  @ApiQuery({
    name: 'userId',
    type: 'string'
  })
  async readOneById(@Query('userId') userId: number) {    
    return await this.userService.findOneById(userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.admin, ROLES.super_user)
  @Put('')
  @ApiResponse(ERRORS.ForbiddenResource)
  @ApiResponse(USERS.USER)
  async update(@Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateOne(updateUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.admin, ROLES.super_user)
  @Delete('')
  @ApiResponse(ERRORS.ForbiddenResource)
  @ApiResponse(USERS.DELETE_USER)
  @ApiQuery({
    name: 'userId',
    type: 'string'
  })
  async delete(@Query('userId') userId: number) {
    return await this.userService.deleteOne(userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.admin, ROLES.super_user)
  @Get('list')
  @ApiResponse(ERRORS.ForbiddenResource)
  @ApiResponse(USERS.USERS)
  async list(@Query() userList: ListQuery) {
    return await this.userService.list(userList);
  }
}
