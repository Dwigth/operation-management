export interface MemberQuery {
  memberName?: string;
  startDate?: string;
  finishDate?: string;
}

export interface MovementLogQuery {
  teamId?: number;
  member?: MemberQuery;
}


export interface MovementTeam {
  team: {
    teamName: string;
  };
}

export interface MovementLog {
  log: string;
  fromTeam: MovementTeam;
  toTeam: MovementTeam;
}

export interface MovementLogResult {
  id: number;
  userDate: {
    startDate: string;
    finishDate: string;
  };
  userTeamChangesLogsFrom: MovementLog[];
  userTeamChangesLogsTo: MovementLog[];
}
