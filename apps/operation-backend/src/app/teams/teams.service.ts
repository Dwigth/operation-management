import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTeamDto } from '@operation-management/common';
import { AccountTeams, Teams } from '@operation-management/database';
import { Repository } from 'typeorm';
import { AccountsService } from '../accounts/accounts.service';
import { MemberService } from './members.service';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Teams)
    private teamsRepo: Repository<Teams>,
    @InjectRepository(AccountTeams)
    private accountTeamsRepo: Repository<AccountTeams>,
    private accountService: AccountsService,
    private membersService: MemberService
  ) {}

  async createTeam({ members, teamName, accountId }: CreateTeamDto) {
    const team = await this.teamsRepo.save({ teamName });
    await this.membersService.addUsersToTeam({ members, team });
    const account = await this.accountService.getOne(accountId);
    await this.accountTeamsRepo.save({
      account,
      team,
    });
    return {
      team,
      created: new Date(),
    };
  }
}
