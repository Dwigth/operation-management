import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddMember, LOGS } from '@operation-management/common';
import {
  TeamUsers,
  UserTeamChangesLogs,
  UserTeamDates,
  Teams,
} from '@operation-management/database';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Equal, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { movementLog } from '../utils/log';
import { Logger } from 'winston';

@Injectable()
export class MemberMovementService {
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
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  async moveMember({ member, toTeam }: AddMember): Promise<TeamUsers> {
    const fromTeamUserDb = await this.teamUsersRepo.findOne({
      where: {
        user: Equal(member.id),
      },
      relations: ['team'],
    });

    const user = await this.usersService.findOneById(member.id);
    if (!user) {
      this.logger.info(LOGS.notFoundMessage({
        origin: MemberMovementService.name,
        notFoundObjectName: 'USER',
        specificId: user.id,
      }));
      throw new NotFoundException();
    }

    const { team: previousTeam } = fromTeamUserDb;
    if(previousTeam.id === toTeam.id) {
        this.logger.info('USER CANT CHANGE BECAUSE IS IN THE SAME TEAM')
        throw new ConflictException();
    }

    const userMovementLog = new UserTeamChangesLogs();
    const userTeamDates = new UserTeamDates();
    const teamUser = new TeamUsers();

    userTeamDates.finishDate = member.finishDate;
    userTeamDates.startDate = member.startDate;

    const userTeamDateDb = await this.userTeamDatesRepo.save(userTeamDates);

    teamUser.team = toTeam;
    teamUser.user = user;
    teamUser.userDates = userTeamDateDb;

    const teamUserDb = await this.teamUsersRepo.save(teamUser);

    userMovementLog.toTeam = teamUserDb;
    userMovementLog.log = movementLog(null, teamUserDb);

    if (fromTeamUserDb) {
      userMovementLog.fromTeam = fromTeamUserDb;
      userMovementLog.log = movementLog(fromTeamUserDb, teamUserDb);
      await this.teamUsersRepo.softDelete(fromTeamUserDb.id);
    }

    await this.userTeamChangesLogsRepo.save(userMovementLog);

    return teamUserDb;
  }
}
