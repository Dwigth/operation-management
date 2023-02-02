import { ApiProperty } from '@nestjs/swagger';

export class MemberQueryDto {
  @ApiProperty({ required: false })
  memberName: string;

  @ApiProperty({ required: false })
  startDate: string;

  @ApiProperty({ required: false })
  finishDate: string;
}

export class MovementLogQueryDto {
  @ApiProperty({ required: false })
  teamId: number;

  @ApiProperty({ type: () => MemberQueryDto })
  member: MemberQueryDto;
}
