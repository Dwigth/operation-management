import { ApiProperty } from '@nestjs/swagger';
import { AccountRetrieveDto } from './accounts.dto';
import { UserListDto } from './user.dto';

export class TeamDto {
  @ApiProperty()
  teamName: string;
}

export class TeamMemberDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  startDate: string;

  @ApiProperty()
  finishDate: string;
}

export class CreateTeamDto extends TeamDto {
  @ApiProperty({ required: false, type: () => TeamMemberDto, isArray: true })
  members: TeamMemberDto[];

  @ApiProperty()
  accountId: number;
}

export class MoveMemberDto {
  @ApiProperty({ type: () => TeamMemberDto })
  member: TeamMemberDto;
  @ApiProperty()
  teamId: number | null;
  @ApiProperty({ required: false })
  remove: boolean;
}

export class TeamListDto extends TeamDto {
  id: number;
}

export class TeamWithAccountsDto extends TeamListDto{
  accountTeams: Array<{
    account: AccountRetrieveDto;
  }>;
}

export class TeamWithMembers {
  team: TeamWithAccountsDto;
  members: UserListDto[];
}

export class UpdateTeamDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  teamName: string;
}

export class AssocToAccountDto {
  @ApiProperty()
  teamId: number;
  @ApiProperty()
  accountId: number;
  @ApiProperty({required: false})
  remove: boolean;
}


export class TeamSearchDto {
  @ApiProperty()
  teamName: string;
}