import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovementLogQueryDto } from '@operation-management/common';
import { TeamUsers, UserTeamChangesLogs } from '@operation-management/database';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Equal, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { Logger } from 'winston';

@Injectable()
export class MovementLogsService {
  constructor(
    @InjectRepository(UserTeamChangesLogs)
    private userTeamChangesLogsRepo: Repository<UserTeamChangesLogs>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @InjectRepository(TeamUsers)
    private teamUsersRepo: Repository<TeamUsers>
  ) {}

  async queryLog({ member, teamId }: MovementLogQueryDto) {
    const result = await this.teamUsersRepo.find({
      relations: ['userTeamChangesLogsFrom', 'userTeamChangesLogsTo', 'userDates'],
      where: this.movementLogWhere({ member, teamId }),
      withDeleted: true,
    });
    return result;
  }

  private movementLogWhere({ member, teamId }: MovementLogQueryDto) {
    const where: any = {};
    if (teamId) {
      where.team = {
        id: Equal(+teamId),
      };
    }
    if (member.memberName) {
      where.user = {
        name: ILike(member?.memberName),
      };
    }
    if (member.finishDate) {
      where.userDates = {
        finishDate: Equal(member?.finishDate),
      };
    }

    if (member.startDate) {
      where.userDates = {
        startDate: Equal(member?.startDate),
      };
    }

    return where;
  }
}
