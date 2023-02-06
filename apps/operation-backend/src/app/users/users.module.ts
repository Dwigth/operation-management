import { Roles, User, UserRoles } from '@operation-management/database';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaswordService } from './password/password.service';
import { RegisterService } from './signup/register.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports:[
    TypeOrmModule.forFeature([User, UserRoles, Roles,])
  ],
  providers: [
    UsersService,
    RegisterService,
    PaswordService,
  ],
  exports: [
    UsersService,
    RegisterService,
    PaswordService,
  ],
  controllers:[UsersController]
})
export class UsersModule {}