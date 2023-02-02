import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Accounts,
  AccountTeams,
  Teams,
  TeamUsers,
  User,
  UserTeamChangesLogs,
  UserTeamDates,
} from '@operation-management/database';
import { AccountsModule } from '../accounts/accounts.module';
import { UsersModule } from '../users/users.module';
import { MemberMovementService } from './member-movement.service';
import { MemberService } from './members.service';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Accounts,
      Teams,
      TeamUsers,
      UserTeamChangesLogs,
      UserTeamDates,
      AccountTeams,
    ]),
    UsersModule,
    AccountsModule,
  ],
  controllers: [TeamsController],
  providers: [TeamsService,MemberService, MemberMovementService],
  exports: [],
})
export class TeamsModule {}
