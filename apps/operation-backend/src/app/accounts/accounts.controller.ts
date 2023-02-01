import { Controller, Post, UseGuards, Request, Body, Get, Put, Delete } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ROLES, SWAGGER } from '@operation-management/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AccountsService } from './accounts.service';

const { AUTH, ERRORS } = SWAGGER;

@ApiTags('Accounts')
@Controller({
  version: '1',
  path: 'accounts'
})
export class AccountsController {
  constructor(private accountsService: AccountsService) {
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
  @Put('')
  @ApiResponse(ERRORS.ForbiddenResource)
  async update() { 
    //
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.admin, ROLES.super_user)
  @Delete('')
  @ApiResponse(ERRORS.ForbiddenResource)
  async delete() { 
    //
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.admin, ROLES.super_user)
  @Get('list')
  @ApiResponse(ERRORS.ForbiddenResource)
  async list() { 
    //
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.admin, ROLES.super_user)
  @Get('members')
  @ApiResponse(ERRORS.ForbiddenResource)
  async getMembers() { 
    //
  }

}