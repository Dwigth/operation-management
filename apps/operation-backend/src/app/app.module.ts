import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from '@operation-management/database';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import { TeamsModule } from './teams/teams.module';
import { MovementLogsModule } from './movement-logs/movement-logs.module';
import { ProfileModule } from './profile/profile.module';


@Module({
  imports: [
    WinstonModule.forRoot({
      levels: {
        error: 0,
        warn: 1,
        info: 2,
      },
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
          ),
        }),
        new winston.transports.File({
          filename: 'travel-backend.log',
        }),
      ],
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities,
      synchronize: false,
      logging: true
    }),
    AuthModule,
    UsersModule,
    AccountsModule,
    TeamsModule,
    MovementLogsModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
