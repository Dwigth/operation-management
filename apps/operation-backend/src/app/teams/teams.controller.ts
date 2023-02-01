import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ROLES, SWAGGER } from '@operation-management/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { TeamsService } from './teams.service';

const { AUTH, ERRORS } = SWAGGER;

@ApiTags('Teams')
@Controller({
  version: '1',
  path: 'teams',
})
export class TeamsController {
  constructor(private teamsService: TeamsService) {
    //
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.admin, ROLES.super_user)
  @Post('')
  @ApiResponse(ERRORS.ForbiddenResource)
  async create() {
    //
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.admin, ROLES.super_user)
  @Get('')
  @ApiResponse(ERRORS.ForbiddenResource)
  async get() {
    //
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.admin, ROLES.super_user)
  @Post('')
  @ApiResponse(ERRORS.ForbiddenResource)
  async move() {
    //
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.admin, ROLES.super_user)
  @Get('user-movements')
  @ApiResponse(ERRORS.ForbiddenResource)
  async logs() {
    //
  }
}
