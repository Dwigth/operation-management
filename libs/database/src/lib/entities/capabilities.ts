import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PermissionsCapabilities } from "./permissions-capabilities";

@Index("capabilities_pkey", ["id"], { unique: true })
@Entity("capabilities", { schema: "public" })
export class Capabilities {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "action", nullable: true, length: 20 })
  action: string | null;

  @OneToMany(
    () => PermissionsCapabilities,
    (permissionsCapabilities) => permissionsCapabilities.capability
  )
  permissionsCapabilities: PermissionsCapabilities[];
}
