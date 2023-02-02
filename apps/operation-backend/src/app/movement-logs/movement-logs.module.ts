import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamUsers, User, UserTeamChangesLogs } from '@operation-management/database';
import { MovementLogsController } from './movement-logs.controller';
import { MovementLogsService } from './movement-logs.service';

@Module({
  imports: [TypeOrmModule.forFeature([User,UserTeamChangesLogs,TeamUsers])],
  controllers: [MovementLogsController],
  providers: [MovementLogsService],
  exports: [],
})
export class MovementLogsModule {}
