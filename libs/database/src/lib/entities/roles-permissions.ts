import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Permissions } from "./permissions";
import { Roles } from "./roles";

@Entity("roles_permissions", { schema: "public" })
export class RolesPermissions {
  @PrimaryColumn()
  id: number|number;

  @ManyToOne(() => Permissions, (permissions) => permissions.rolesPermissions)
  @JoinColumn([{ name: "permission_id", referencedColumnName: "id" }])
  permission: Permissions;

  @ManyToOne(() => Roles, (roles) => roles.rolesPermissions)
  @JoinColumn([{ name: "role_id", referencedColumnName: "id" }])
  role: Roles;
}
