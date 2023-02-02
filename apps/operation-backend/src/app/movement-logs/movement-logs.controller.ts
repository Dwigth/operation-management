import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiTags, ApiHeader, ApiResponse } from "@nestjs/swagger";
import { MovementLogQueryDto, ROLES, SWAGGER } from "@operation-management/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { MovementLogsService } from "./movement-logs.service";

const { ERRORS } = SWAGGER;


@ApiTags('Movement Logs')
@ApiHeader({
  name: 'x-operations-key',
  description: 'Token for auth',
  required: true,
  allowEmptyValue: false,
})
@Controller({
  version: '1',
  path: 'movement-logs',
})
export class MovementLogsController {
    constructor(private movementLogsService: MovementLogsService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.admin, ROLES.super_user)
  @Post('')
  @ApiResponse(ERRORS.ForbiddenResource)
  async search(@Body() dto: MovementLogQueryDto) {    
    return await this.movementLogsService.queryLog(dto);
  }

}