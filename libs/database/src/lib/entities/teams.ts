import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AccountTeams } from "./account-teams";
import { TeamUsers } from "./team-users";

@Index("teams_pkey", ["id"], { unique: true })
@Entity("teams", { schema: "public" })
export class Teams {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "team_name",
    nullable: true,
    length: 100,
  })
  teamName: string | null;

  @OneToMany(() => AccountTeams, (accountTeams) => accountTeams.team)
  accountTeams: AccountTeams[];

  @OneToMany(() => TeamUsers, (teamUsers) => teamUsers.team)
  teamUsers: TeamUsers[];
}
