import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  MockType,
  repositoryMockFactory,
  userFactory,
} from '@operation-management/common';
import { Roles, User, UserRoles } from '@operation-management/database';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { AuthService } from './auth/auth.service';
import { PaswordService } from './users/password/password.service';
import { RegisterService } from './users/signup/register.service';
import { UsersService } from './users/users.service';
import * as winston from 'winston';
import { ConfigModule } from '@nestjs/config';
import { Repository } from 'typeorm';
import { PassportModule } from '@nestjs/passport';

describe('App Controller', () => {
  let app: TestingModule;
  let authService: AuthService;
  let usersService: UsersService;
  let registerService: RegisterService;
  let passwordService: PaswordService;
  let jwtService: JwtService;
  let appController: AppController;
  let userRepo: MockType<Repository<User>>;
  let rolesRepo: MockType<Repository<Roles>>;
  let userRolesRepo: MockType<Repository<UserRoles>>;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AuthService,
        UsersService,
        RegisterService,
        PaswordService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Roles),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(UserRoles),
          useFactory: repositoryMockFactory,
        },
      ],
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
          isGlobal: true,
        }),
        PassportModule,
        JwtModule.register({
          secret: 'MY_JWT_SECRET',
          signOptions: { expiresIn: '1d' },
        }),
        WinstonModule.forRoot({
          levels: {
            error: 0,
            warn: 1,
            info: 2,
          },
          transports: [
            new winston.transports.File({
              filename: 'travel-backend.log',
            }),
          ],
        }),
      ],
    }).compile();

    authService = app.get(AuthService);
    usersService = app.get(UsersService);
    registerService = app.get(RegisterService);
    passwordService = app.get(PaswordService);
    jwtService = app.get(JwtService);
    appController = app.get(AppController);
    userRepo = app.get(getRepositoryToken(User));
    rolesRepo = app.get(getRepositoryToken(Roles));
    userRolesRepo = app.get(getRepositoryToken(UserRoles));
  });

  it('should be define', () => {
    expect(authService).toBeDefined();
    expect(usersService).toBeDefined();
    expect(registerService).toBeDefined();
    expect(passwordService).toBeDefined();
    expect(jwtService).toBeDefined();
    expect(appController).toBeDefined();
    expect(userRepo).toBeDefined();
    expect(rolesRepo).toBeDefined();
    expect(userRolesRepo).toBeDefined();
  });

  it('should login', async () => {
    const user = new User();
    const { id, email, name, passwordHash } = userFactory.build();
    user.id = id;
    user.setEmail(email);
    user.setName(name);
    user.setPassword(passwordHash);

    userRepo.findOneByOrFail.mockReturnValue(user);
    type CustomRequest = Request & { user: User };
    const request = { user } as CustomRequest;
    expect(await appController.login(request)).toHaveProperty('accessToken');
  });

  it('should not login', async () => {
    userRepo.findOneByOrFail.mockReturnValue(null);
    type CustomRequest = Request & { user: User };
    const request = { user: null } as CustomRequest;
    try {
      await appController.login(request);
    } catch (error) {
      expect(error.message).toStrictEqual(
        "Cannot read properties of null (reading 'email')"
      );
    }
  });
});
