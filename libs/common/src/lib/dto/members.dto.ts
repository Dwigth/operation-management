import { Teams } from "@operation-management/database";
import { TeamMemberDto } from "./teams.dto";

export class AddMembers {
    team: Teams;
    members: TeamMemberDto[];
  }
  
  export class MoveMember {
    toTeam: Teams;
    member: TeamMemberDto;
  }
