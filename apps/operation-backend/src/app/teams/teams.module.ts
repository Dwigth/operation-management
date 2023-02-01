import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounts, User } from '@operation-management/database';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Accounts])],
  controllers: [TeamsController],
  providers: [TeamsService],
  exports: [],
})
export class TeamsModule {}
