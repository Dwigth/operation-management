import { ApiProperty } from '@nestjs/swagger';
import { Teams, TeamUsers } from '@operation-management/database';

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

export class AddMembers {
  team: Teams;
  members: TeamMemberDto[];
}

export class AddMember {
  toTeam: Teams;
  member: TeamMemberDto;
}

export class MoveMemberDto {
  @ApiProperty({ type: () => TeamMemberDto })
  member: TeamMemberDto;
  @ApiProperty()
  teamId: number;
}
