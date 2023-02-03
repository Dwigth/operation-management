import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@operation-management/database";
import { UsersModule } from "../users/users.module";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";

@Module({
    imports: [TypeOrmModule.forFeature([User]), UsersModule],
    controllers: [ProfileController],
    providers: [ProfileService],
    exports: [],
})
export class ProfileModule {}