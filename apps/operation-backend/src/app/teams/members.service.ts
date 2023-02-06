import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AddMembers,
  MoveMemberDto,
  UserListDto,
} from '@operation-management/common';
import {
  Teams,
  TeamUsers,
  UserTeamChangesLogs,
  UserTeamDates,
} from '@operation-management/database';
import { Equal, Raw, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { movementLog } from '../utils/log';
import { MemberMovementService } from './member-movement.service';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(TeamUsers)
    private teamUsersRepo: Repository<TeamUsers>,
    @InjectRepository(UserTeamChangesLogs)
    private userTeamChangesLogsRepo: Repository<UserTeamChangesLogs>,
    @InjectRepository(UserTeamDates)
    private userTeamDatesRepo: Repository<UserTeamDates>,
    private usersService: UsersService,
    @InjectRepository(Teams)
    private teamsRepo: Repository<Teams>,
    private memberMovement: MemberMovementService
  ) {}

  async addUsersToTeam({ members, team }: AddMembers): Promise<TeamUsers[]> {
    const usersId = members.flatMap((m) => m.id);
    return await Promise.all(
      (
        await this.usersService.findMany(usersId)
      ).map(async (user) => {
        const member = members.find((m) => m.id === user.id);
        if (!member) {
          return;
        }
        return await this.memberMovement.moveMember({
          member,
          toTeam: team,
        });
      })
    );
  }

  async getMembersOfTeam(id: number) {
    const team = await this.teamsRepo.findOneBy({ id });
    const teamUsers = await this.teamUsersRepo.find({
      where: {
        team: Equal(team.id),
      },
      select: ['user'],
      relations: ['user'],
    });

    const teamMembers: Array<UserListDto> = teamUsers.map(
      ({ user }: TeamUsers) => {
        const userDto = new UserListDto();
        userDto.email = user.email;
        userDto.id = user.id;
        userDto.name = user.name;
        return userDto;
      }
    );

    return teamMembers;
  }

  async changeMemberOfTeam({ member, teamId, remove }: MoveMemberDto) {
    if(remove) {
      await this.memberMovement.moveMember({
        toTeam: null,
        member,
      })

      return {
        message:  `User was remove`,
        moved: new Date()
      }
    }

    if(teamId === null) {
      throw new ConflictException('TeamId is not set');
      
    }

    const team = await this.teamsRepo.findOneBy({ id: teamId });    
    if (!team) {
      throw new NotFoundException();
    }

    const memberMoved = await this.memberMovement.moveMember({
      member,
      toTeam: team,
    });

    return {
      message: `User ${memberMoved.user.name} was changed to the ${memberMoved.team.teamName} team`,
      moved: new Date(),
    };
  }
}
