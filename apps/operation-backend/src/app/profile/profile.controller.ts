import { Body, Controller, Get, Put, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiHeader, ApiResponse } from '@nestjs/swagger';
import { ROLES, SWAGGER, UpdateUserProfileInfo } from '@operation-management/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ProfileService } from './profile.service';

const { ERRORS, USERS } = SWAGGER;

@ApiTags('Profile')
@ApiHeader({
  name: 'x-operations-key',
  description: 'Token for auth',
  required: true,
  allowEmptyValue: false,
})
@Controller({
  version: '1',
  path: 'profile',
})
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.admin, ROLES.super_user, ROLES.regular)
  @Get('my-data')
  @ApiResponse(ERRORS.ForbiddenResource)
  @ApiResponse(USERS.USER)
  async myData() {
    return await this.profileService.getMyInfo();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.admin, ROLES.super_user, ROLES.regular)
  @Put('my-data')
  @ApiResponse(ERRORS.ForbiddenResource)
  @ApiResponse(USERS.USER)
  async updateMyData(@Body() profileData: UpdateUserProfileInfo) {
    return await this.profileService.updateMyInfo(profileData);
  }
}
