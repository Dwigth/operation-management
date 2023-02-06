import {
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Accounts } from "./accounts";
import { Teams } from "./teams";

@Index("account_teams_pkey", ["id"], { unique: true })
@Entity("account_teams", { schema: "public" })
export class AccountTeams {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @ManyToOne(() => Accounts, (accounts) => accounts.accountTeams)
  @JoinColumn([{ name: "account_id", referencedColumnName: "id" }])
  account: Accounts;

  @ManyToOne(() => Teams, (teams) => teams.accountTeams)
  @JoinColumn([{ name: "team_id", referencedColumnName: "id" }])
  team: Teams;

  @UpdateDateColumn({
    name:'updated_date'
  })
  updated: Date;

  @DeleteDateColumn({
    name: 'deleted_date'
  })
  deletedAt: Date;
}
