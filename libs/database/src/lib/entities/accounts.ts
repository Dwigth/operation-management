import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AccountTeams } from "./account-teams";

@Index("accounts_pkey", ["id"], { unique: true })
@Entity("accounts", { schema: "public" })
export class Accounts {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "account_name",
    nullable: true,
    length: 100,
  })
  accountName: string | null;

  @Column("character varying", {
    name: "client_name",
    nullable: true,
    length: 100,
  })
  clientName: string | null;

  @Column("character varying", {
    name: "operation_manager_name",
    nullable: true,
    length: 100,
  })
  operationManagerName: string | null;

  @OneToMany(() => AccountTeams, (accountTeams) => accountTeams.account)
  accountTeams: AccountTeams[];
}
