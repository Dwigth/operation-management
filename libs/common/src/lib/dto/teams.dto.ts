import { UserListDto } from "./user.dto";

export class TeamDto {
  teamName: string;
}

export class TeamMembersDto {
    users: UserListDto[];
}