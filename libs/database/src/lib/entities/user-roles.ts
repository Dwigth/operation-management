import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { Roles } from "./roles";
import { User } from "./user";

@Entity("user_roles", { schema: "public" })
export class UserRoles {
  @ManyToOne(() => Roles, (roles) => roles.userRoles)
  @JoinColumn([{ name: "role_id", referencedColumnName: "id" }])
  role: Roles;

  @ManyToOne(() => User, (user) => user.userRoles)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
