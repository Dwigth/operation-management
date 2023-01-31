import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TeamUsers } from "./team-users";

@Index("user_team_dates_pkey", ["id"], { unique: true })
@Entity("user_team_dates", { schema: "public" })
export class UserTeamDates {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("date", { name: "start_date", nullable: true })
  startDate: string | null;

  @Column("date", { name: "finish_date", nullable: true })
  finishDate: string | null;

  @OneToMany(() => TeamUsers, (teamUsers) => teamUsers.userDates)
  teamUsers: TeamUsers[];
}
