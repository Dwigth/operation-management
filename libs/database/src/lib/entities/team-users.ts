import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Teams } from "./teams";
import { UserTeamDates } from "./user-team-dates";
import { User } from "./user";
import { UserTeamChangesLogs } from "./user-team-changes-logs";

@Index("team_users_pkey", ["id"], { unique: true })
@Entity("team_users", { schema: "public" })
export class TeamUsers {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @ManyToOne(() => Teams, (teams) => teams.teamUsers)
  @JoinColumn([{ name: "team_id", referencedColumnName: "id" }])
  team: Teams;

  @ManyToOne(() => UserTeamDates, (userTeamDates) => userTeamDates.teamUsers)
  @JoinColumn([{ name: "user_dates_id", referencedColumnName: "id" }])
  userDates: UserTeamDates;

  @ManyToOne(() => User, (user) => user.teamUsers)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;

  @OneToMany(
    () => UserTeamChangesLogs,
    (userTeamChangesLogs) => userTeamChangesLogs.fromTeam
  )
  userTeamChangesLogsFrom: UserTeamChangesLogs[];

  @OneToMany(
    () => UserTeamChangesLogs,
    (userTeamChangesLogs) => userTeamChangesLogs.toTeam
  )
  userTeamChangesLogsTo: UserTeamChangesLogs[];
}
