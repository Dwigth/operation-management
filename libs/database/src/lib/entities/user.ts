import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { TeamUsers } from "./team-users";
import { UserRoles } from "./user-roles";

@Index("user_pkey", ["id"], { unique: true })
@Entity("user", { schema: "public" })
export class User {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name", nullable: true, length: 100 })
  name: string | null;

  @Column("character varying", { name: "email", nullable: true, length: 100 })
  email: string | null;

  @Column("character varying", {
    name: "password_hash",
    nullable: true,
    length: 128,
  })
  passwordHash: string | null;

  @Column("character varying", {
    name: "english_level",
    nullable: true,
    length: 2,
  })
  englishLevel: string | null;

  @Column("text", { name: "technical_knowledge", nullable: true })
  technicalKnowledge: string | null;

  @Column("text", { name: "cv_link", nullable: true })
  cvLink: string | null;

  @OneToMany(() => TeamUsers, (teamUsers) => teamUsers.user)
  teamUsers: TeamUsers[];

  @OneToMany(() => UserRoles, (userRoles) => userRoles.user)
  userRoles: UserRoles[];

  @UpdateDateColumn({
    name:'updated_date'
  })
  updated: Date;

  @DeleteDateColumn({
    name: 'deleted_date'
  })
  deletedAt: Date;

  
  public setEmail(newEmail : string) {
    if(newEmail) this.email = newEmail;
  }

  
  public setName(newName : string) {
    if(newName) this.name = newName;
  }

  public setPassword(newPassword : string) {
    if(newPassword) this.passwordHash = newPassword;
  }
  
  public hidePassword() {
    this.passwordHash = 'NON_READABLE_FROM_CLIENT';
  }
  
  
}
 