import { ConfigModule } from '@nestjs/config';
import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  MockType,
  repositoryMockFactory,
  SignupDTO,
  SignupUserCreatedDTO,
} from '@operation-management/common';
import { User, UserRoles, Roles } from '@operation-management/database';
import { Repository } from 'typeorm';
import { PaswordService } from '../password/password.service';
import { RegisterService } from './register.service';

describe('Register', () => {
  let app: TestingModule;
  let registerService: RegisterService;
  let passwordService: PaswordService;
  let userRepo: MockType<Repository<User>>;
  let userRoleRepo: MockType<Repository<UserRoles>>;
  let roleRepo: MockType<Repository<Roles>>;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(UserRoles),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Roles),
          useFactory: repositoryMockFactory,
        },
        RegisterService,
        PaswordService,
      ],
      imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        })
      ],
    }).compile();
    registerService = app.get<RegisterService>(RegisterService);
    passwordService = app.get<PaswordService>(PaswordService);
    userRepo = app.get(getRepositoryToken(User));
    userRoleRepo = app.get(getRepositoryToken(UserRoles));
    roleRepo = app.get(getRepositoryToken(Roles));
  });

  it('should register a user', async () => {
    //
    const userToRegister: SignupDTO = {
      email: 'user.to.register@arkusnexus.com',
      name: 'User To Register',
      password: 'SUPER SECRET PASSWORD',
    };

    const role = new Roles();
    role.id = 3;
    role.name = 'REGULAR';

    roleRepo.findOneBy.mockReturnValue(role)

    expect(await registerService.createUser(userToRegister)).toHaveProperty('created')
  });
});
