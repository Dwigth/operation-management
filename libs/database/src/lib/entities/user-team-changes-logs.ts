import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TeamUsers } from "./team-users";

@Index("user_team_changes_logs_pkey", ["id"], { unique: true })
@Entity("user_team_changes_logs", { schema: "public" })
export class UserTeamChangesLogs {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "log", nullable: true })
  log: string | null;

  @ManyToOne(() => TeamUsers, (teamUsers) => teamUsers.userTeamChangesLogsFrom)
  @JoinColumn([{ name: "from_team", referencedColumnName: "id" }])
  fromTeam: TeamUsers;

  @ManyToOne(() => TeamUsers, (teamUsers) => teamUsers.userTeamChangesLogsTo)
  @JoinColumn([{ name: "to_team", referencedColumnName: "id" }])
  toTeam: TeamUsers;
}
