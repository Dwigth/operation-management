import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockType, repositoryMockFactory } from '@operation-management/common';
import { Accounts, User } from '@operation-management/database';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { Repository } from 'typeorm';

describe('AccountsController', () => {
  let app: TestingModule;
  let accountsService: AccountsService;
  let accountController: AccountsController;
  let userRepo: MockType<Repository<User>>;
  let accountsRepo: MockType<Repository<Accounts>>;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [
        AccountsService,
        {
          provide: getRepositoryToken(Accounts),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
      ],
      imports: [
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
    accountsService = app.get<AccountsService>(AccountsService);
    userRepo = app.get(getRepositoryToken(User));
    accountsRepo = app.get(getRepositoryToken(Accounts));
    accountController = app.get<AccountsController>(AccountsController);
  });

  it('should be defined', () => {
    expect(accountsService).toBeDefined();
    expect(userRepo).toBeDefined();
    expect(accountsRepo).toBeDefined();
  });

  it('should create an account', async () => {
    const account = new Accounts();
    account.id = 1;
    account.accountName = 'Coca Cola';
    account.clientName = 'Coca Cola, Co';
    account.operationManagerName = 'Oso Polar';
    accountsRepo.save.mockReturnValue(account);
    const result = await accountController.create({
      ...account,
    });
    expect(result.id).toBeGreaterThan(0);
    expect(result.created).toBeInstanceOf(Date);
  });
 
  it('should get one account', async () => {
    const result = await accountController.get(1);
  });

});
