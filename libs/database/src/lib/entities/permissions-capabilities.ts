import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { Capabilities } from "./capabilities";
import { Permissions } from "./permissions";

@Entity("permissions_capabilities", { schema: "public" })
export class PermissionsCapabilities {
  @ManyToOne(
    () => Capabilities,
    (capabilities) => capabilities.permissionsCapabilities
  )
  @JoinColumn([{ name: "capability_id", referencedColumnName: "id" }])
  capability: Capabilities;

  @ManyToOne(
    () => Permissions,
    (permissions) => permissions.permissionsCapabilities
  )
  @JoinColumn([{ name: "permission_id", referencedColumnName: "id" }])
  permission: Permissions;
}
