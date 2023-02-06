import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTeamDto, ListQuery, MoveMemberDto, ROLES, SWAGGER, UpdateTeamDto } from '@operation-management/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { MemberService } from './members.service';
import { TeamsService } from './teams.service';

const { USERS,ERRORS } = SWAGGER;

@ApiTags('Teams')
@ApiHeader({
  name: 'x-operations-key',
  description: 'Token for auth',
  required: true,
  allowEmptyValue: false,
})
@Controller({
  version: '1',
  path: 'teams',
})
export class TeamsController {
  constructor(
    private teamsService: TeamsService,
    private membersService: MemberService,
    ) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.admin, ROLES.super_user)
  @Post('')
  @ApiResponse(ERRORS.ForbiddenResource)
  async create(@Body() createTeamdto: CreateTeamDto) {
    return await this.teamsService.createTeam(createTeamdto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.admin, ROLES.super_user)
  @Get('members')
  @ApiResponse(ERRORS.ForbiddenResource)
  @ApiResponse(USERS.USERS)
  async getMembers(@Query('teamId') teamId: number) { 
    return await this.membersService.getMembersOfTeam(teamId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.admin, ROLES.super_user)
  @Get('')
  @ApiResponse(ERRORS.ForbiddenResource)
  @ApiResponse(USERS.USERS)
  async getTeam(@Query('teamId') teamId: number) { 
    return await this.teamsService.getTeam(teamId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.admin, ROLES.super_user)
  @Get('account')
  @ApiResponse(ERRORS.ForbiddenResource)
  @ApiResponse(USERS.USERS)
  async getAccountTeams(@Query('accountId') accountId: number) { 
    return await this.teamsService.getAccountTeams(accountId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.admin, ROLES.super_user)
  @Post('move-user')
  @ApiResponse(ERRORS.ForbiddenResource)
  async move(@Body() moveMember: MoveMemberDto) {
    return await this.membersService.changeMemberOfTeam(moveMember);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.admin, ROLES.super_user)
  @Get('list')
  @ApiResponse(ERRORS.ForbiddenResource)
  async list(@Query() query: ListQuery) {
    return await this.teamsService.list(query);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.admin, ROLES.super_user)
  @Put('')
  @ApiResponse(ERRORS.ForbiddenResource)
  async update(@Body() body: UpdateTeamDto) {
    return await this.teamsService.update(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.admin, ROLES.super_user)
  @Delete('')
  @ApiResponse(ERRORS.ForbiddenResource)
  async delete(@Query('teamId') teamId: number) {
    return await this.teamsService.delete(teamId);
  }

}
