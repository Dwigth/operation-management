import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AssocToAccountDto,
  CreateTeamDto,
  ListQuery,
  TeamListDto,
} from '@operation-management/common';
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
    });
    const members = await this.membersService.getMembersOfTeam(teamId);
    return {
      team,
      members,
    };
  }

  async getAccountTeams(accountId: number) {
    return (
      await this.accountTeamsRepo.find({
        relations: ['team'],
        where: {
          account: {
            id: Equal(accountId),
          },
        },
      })
    )
      .filter((result) => result.team != null)
      .map((result) => result.team);
  }

  async list({ skip, take }: ListQuery) {
    return await this.teamsRepo.find({
      take,
      skip,
    });
  }

  async update({ id, teamName }: TeamListDto) {
    const team = await this.teamsRepo.findOneBy({ id });
    if (!team) {
      throw new NotFoundException();
    }

    team.teamName = teamName;
    const { affected } = await this.teamsRepo.update(id, team);
    if (affected > 0) {
      return {
        message: 'Team updated',
        updated: new Date(),
      };
    }
    throw new ConflictException();
  }

  async delete(teamId: number) {
    const team = await this.teamsRepo.findOneBy({ id: teamId });
    if (!team) {
      throw new NotFoundException();
    }

    const { affected } = await this.teamsRepo.softDelete(teamId);
    if (affected > 0) {
      return {
        message: 'Team deleted',
        deleted: new Date(),
      };
    }
    throw new ConflictException();
  }

  async assocToAccount({ accountId, teamId, remove }: AssocToAccountDto) {
    const account = await this.accountService.getOne(accountId);
    const team = await this.teamsRepo.findOneBy({ id: teamId });

    if (!account || !team) {
      throw new NotFoundException();
    }

    // get last relation if has one softdelete
    const lastAccountTeamHad = await this.accountTeamsRepo.findOneBy({
      team: Equal(team.id),
    });

    if(lastAccountTeamHad) {
      await this.accountTeamsRepo.softDelete(lastAccountTeamHad.id);
    }

    const accountTeam = await this.accountTeamsRepo.findOneBy({
      account: Equal(account.id),
      team: Equal(team.id),
    });

    if (remove) {
      await this.accountTeamsRepo.softDelete(accountTeam.id);
      return {
        message: 'Team has been deassociated with this account',
        removed: new Date(),
      };
    }

    if (accountTeam) {
      return {
        message: 'Relation already created',
      };
    }

    await this.accountTeamsRepo.save({
      account,
      team,
    });

    return {
      message: 'Team has been associated with the team successfully',
      associated: new Date(),
    };
  }
}
