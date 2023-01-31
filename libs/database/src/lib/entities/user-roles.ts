import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Roles } from "./roles";
import { User } from "./user";

@Entity("user_roles", { schema: "public" })
export class UserRoles {
  
  
  @ManyToOne(() => Roles, (roles) => roles.userRoles)
  @JoinColumn([{ name: "role_id", referencedColumnName: "id" }])
  role: Roles;
  
  @PrimaryColumn({type: 'integer', name: 'user_id'})
  @ManyToOne(() => User, (user) => user.userRoles)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
