import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PermissionsCapabilities } from "./permissions-capabilities";
import { RolesPermissions } from "./roles-permissions";

@Index("permissions_pkey", ["id"], { unique: true })
@Entity("permissions", { schema: "public" })
export class Permissions {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "permission",
    nullable: true,
    length: 50,
  })
  permission: string | null;

  @OneToMany(
    () => PermissionsCapabilities,
    (permissionsCapabilities) => permissionsCapabilities.permission
  )
  permissionsCapabilities: PermissionsCapabilities[];

  @OneToMany(
    () => RolesPermissions,
    (rolesPermissions) => rolesPermissions.permission
  )
  rolesPermissions: RolesPermissions[];
}
