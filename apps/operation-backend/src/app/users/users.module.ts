import { User } from '@operation-management/database';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaswordService } from './password/password.service';
import { RegisterService } from './signup/register.service';
import { UsersService } from './users.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([User])
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
})
export class UsersModule {}