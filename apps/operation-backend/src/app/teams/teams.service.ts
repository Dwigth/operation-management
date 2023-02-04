import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTeamDto, ListQuery } from '@operation-management/common';
import { AccountTeams, Teams } from '@operation-management/database';
import { Equal, Repository } from 'typeorm';
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

  async getTeam(teamId: number) {
    const team = await this.teamsRepo.findOne({
      where: {
        id: teamId,
      },
    })
    const members = await this.membersService.getMembersOfTeam(teamId);
    return {
      team,
      members
    }
  }

  async getAccountTeams(accountId: number) {
    return await this.accountTeamsRepo.find({
      relations: ['team'],
      where: {
        account: {
          id: Equal(accountId)
        }
      }
    });
  }

  async list({skip, take}: ListQuery) {
    return await this.teamsRepo.find({
      take,
      skip,
    })
  }
}
