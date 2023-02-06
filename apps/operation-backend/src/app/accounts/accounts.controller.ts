import { Controller, Post, UseGuards, Request, Body, Get, Put, Delete, Query } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAccountDto, ListQuery, ROLES, SWAGGER, UpdateAccountDto } from '@operation-management/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AccountsService } from './accounts.service';

const { ACCOUNTS, ERRORS } = SWAGGER;

@ApiTags('Accounts')
@ApiHeader({
    name: 'x-operations-key',
    description: 'Token for auth',
    required: true,
    allowEmptyValue: false,
  })
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
  @ApiResponse(ACCOUNTS.RESPONSES.CREATE)
  async create(@Body() accountDto: CreateAccountDto) { 
    return await this.accountsService.createOne(accountDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.admin, ROLES.super_user)
  @Get('')
  @ApiResponse(ERRORS.ForbiddenResource)
  @ApiResponse(ERRORS.NotFound)
  @ApiResponse(ACCOUNTS.RESPONSES.GET_ONE)
  async get(@Query('accountId') accountId: number) { 
    return await this.accountsService.getOne(accountId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.admin, ROLES.super_user)
  @Put('')
  @ApiResponse(ERRORS.ForbiddenResource)
  @ApiResponse(ERRORS.NotFound)
  @ApiResponse(ACCOUNTS.RESPONSES.GET_ONE)
  async update(@Body() updateDto: UpdateAccountDto) { 
    return await this.accountsService.updateOne(updateDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.admin, ROLES.super_user)
  @Delete('')
  @ApiResponse(ERRORS.ForbiddenResource)
  async delete(@Query('accountId') accountId: number) { 
    return await this.accountsService.deleteOne(accountId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.admin, ROLES.super_user)
  @Get('list')
  @ApiResponse(ERRORS.ForbiddenResource)
  @ApiResponse(ERRORS.NotAuthorized)
  @ApiResponse(ACCOUNTS.RESPONSES.GET_MANY)
  async list(@Query() dto: ListQuery) { 
    return await this.accountsService.list(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.admin, ROLES.super_user)
  @Post('search')
  @ApiResponse(ERRORS.ForbiddenResource)
  @ApiBody({
    schema: {
      type:  'object',
      properties: {
        searchTerms: {type: 'string'}
      }
    }
  })
  async search(@Body('searchTerms') searchTerms: string) {    
    return await this.accountsService.search(searchTerms);
  }

}