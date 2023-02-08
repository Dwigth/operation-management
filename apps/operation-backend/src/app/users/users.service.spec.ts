import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Roles, User, UserRoles } from '@operation-management/database';
import { PaswordService } from './password/password.service';
import { RegisterService } from './signup/register.service';
import { UsersService } from './users.service';
import { WinstonModule } from 'nest-winston';
import { ConfigModule } from '@nestjs/config';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import * as winston from 'winston';
import { MockType, repositoryMockFactory } from '@operation-management/common';

describe('UserService', () => {
  let app: TestingModule;
  let userService: UsersService;
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
        UsersService,
        RegisterService,
        PaswordService,
      ],
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
          isGlobal: true,
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
    userService = app.get<UsersService>(UsersService);
    registerService = app.get<RegisterService>(RegisterService);
    passwordService = app.get<PaswordService>(PaswordService);
    userRepo = app.get(getRepositoryToken(User));
    userRoleRepo = app.get(getRepositoryToken(UserRoles));
    roleRepo = app.get(getRepositoryToken(Roles));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(registerService).toBeDefined();
    expect(passwordService).toBeDefined();
  });

  it('should get one user by its email', async () => {
    const email = 'test@arkusnexus.com';
    const mockUser = new User();
    mockUser.email = email;
    userRepo.findOneOrFail.mockReturnValue(mockUser);
    expect(await userService.findOne(mockUser.email)).toEqual(mockUser);
    expect(userRepo.findOneOrFail).toHaveBeenCalledWith({
      where: { email: mockUser.email },
    });
  });

  it('should get one user by id', async () => {
    const user = new User();
    user.id = 1;
    userRepo.findOne.mockReturnValue(user);
    const retrievedUser = await userService.findOneById(user.id);
    expect(retrievedUser).toEqual(user);
    expect(retrievedUser.passwordHash).toBe('NON_READABLE_FROM_CLIENT');
    expect(userRepo.findOne).toBeCalledWith({
      where: { id: user.id },
    });
  });

  it('should throw error because user is not found', async () => {
    userRepo.findOne.mockReturnValue(null);
    expect(
      async () => await userService.findOneById(1000)
    ).rejects.toThrowError(NotFoundException);
  });

  it('should update user', async () => {
    const originalUser = new User();
    originalUser.id = 1;
    originalUser.name = 'User Original';
    originalUser.email = 'user.original@arkusnexus.com';
    originalUser.passwordHash = '123456789';
    userRepo.findOneByOrFail.mockReturnValue(originalUser);

    const updatedUser = new User();
    updatedUser.id = originalUser.id;
    updatedUser.email = 'updated.user@arkusnexus.com';
    updatedUser.name = 'Updated User';
    updatedUser.passwordHash = '1478956';

    jest
      .spyOn(passwordService, 'createPassword')
      .mockResolvedValue(Promise.resolve(updatedUser));

    const updatedUserDb = await userService.updateOne({
      id: originalUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      password: updatedUser.passwordHash,
    });

    expect(passwordService.createPassword).toHaveBeenCalledWith({
      user: originalUser,
      password: updatedUser.passwordHash,
    });

    updatedUser.passwordHash = 'NON_READABLE_FROM_CLIENT';

    expect(updatedUserDb).toStrictEqual(updatedUser);
  });

  it('should delete a user', async () => {
    userRepo.softDelete.mockReturnValue({ affected: 1 });
    const { deleted } = await userService.deleteOne(1);
    expect(deleted).toBeInstanceOf(Date);
  });

  it('should not delete a user', async () => {
    userRepo.softDelete.mockReturnValue({ affected: 0 });
    const { deleted } = await userService.deleteOne(1);
    expect(deleted).toBe(null);
  });

  it('should list users', async () => {
    const users = new Array(10).fill(new User(),0,10);
    
    userRepo.find.mockReturnValue(users);
    expect(await userService.list({ skip: 0, take: 10 })).toHaveLength(10);
  })

  it('should find many', async () => {
    expect(await userService.findMany([1,2,3])).toHaveLength(10);
  })

  it('should find by term', async () => {
    expect(await userService.search('user_name')).toHaveLength(10);
  })

});
