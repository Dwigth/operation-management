import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RolesPermissions } from "./roles-permissions";
import { UserRoles } from "./user-roles";

@Index("roles_pkey", ["id"], { unique: true })
@Entity("roles", { schema: "public" })
export class Roles {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "role", nullable: true, length: 12 })
  name: string | null;

  @OneToMany(
    () => RolesPermissions,
    (rolesPermissions) => rolesPermissions.role
  )
  rolesPermissions: RolesPermissions[];

  @OneToMany(() => UserRoles, (userRoles) => userRoles.role)
  userRoles: UserRoles[];
}
