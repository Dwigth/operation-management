import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  accountFactory,
  UpdateAccountDto,
} from '@operation-management/common';
import { Accounts, User } from '@operation-management/database';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { MockType, repositoryMockFactory } from '../app.controller.spec';

describe('AccountsController', () => {
  let app: TestingModule;
  let accountsService: AccountsService;
  let accountController: AccountsController;
  let userRepo: MockType<Repository<User>>;
  let accountsRepo: MockType<Repository<Accounts>>;

  afterEach(() => {
    jest.resetAllMocks();
  });

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
    const account = accountFactory.build();
    accountsRepo.findOneBy.mockReturnValue(account);
    jest
      .spyOn(accountsService, 'getOne')
      .mockResolvedValue(Promise.resolve(<Accounts>account));
    await accountController.get(account.id);
    expect(accountsService.getOne).toHaveBeenCalledTimes(1);
  });

  it('should throw error because account is not found', async () => {
    accountsRepo.findOneBy.mockReturnValue(null);
    try {
      await accountController.get(10000);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should update account', async () => {
    const updateAccountDto = new UpdateAccountDto();
    const accountFact = accountFactory.build();
    updateAccountDto.accountName = 'UPDATED_ACCOUNTNAME_VALUED';
    updateAccountDto.clientName = 'UPDATED_CLIENT_VALUED';
    updateAccountDto.id = accountFact.id;

    const account = new Accounts();
    account.accountName = accountFact.accountName;
    account.id = accountFact.id;
    account.clientName = accountFact.clientName;
    account.operationManagerName = accountFact.operationManagerName;

    accountsRepo.findOneBy.mockReturnValue(account);

    accountsRepo.save.mockReturnValue(<Accounts>updateAccountDto);
    const updatedAccount = await accountController.update(updateAccountDto);
    expect(updatedAccount.accountName).toBe(updateAccountDto.accountName);
    expect(updatedAccount.clientName).toBe(updateAccountDto.clientName);
    expect(updatedAccount.operationManagerName).toBe(
      updateAccountDto.operationManagerName
    );
  });

  it('should not update because account is not found', async () => {
    accountsRepo.findOneBy.mockReturnValue(null);
    try {
      const updateAccountDto = new UpdateAccountDto();
      const accountFact = accountFactory.build();
      updateAccountDto.accountName = 'UPDATED_ACCOUNTNAME_VALUED';
      updateAccountDto.clientName = 'UPDATED_CLIENT_VALUED';
      updateAccountDto.id = accountFact.id;
      await accountController.update(updateAccountDto);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should delete one account', async () => {
    accountsRepo.softDelete.mockReturnValue({ affected: 1});
    const deleteResult = await accountController.delete(1);
    expect(deleteResult.deleted).toBeInstanceOf(Date);
    expect(deleteResult.message).toBe('Successfully deleted');
  });

  it('should not delete one account', async () => {
    accountsRepo.softDelete.mockReturnValue({ affected: 0});
    const deleteResult = await accountController.delete(1);
    expect(deleteResult.deleted).toBe(null);
    expect(deleteResult.message).toBe('Could not deleted');
  });

  it('should list accounts by a queryList', async () => {
    
    accountsRepo.find.mockReturnValue(accountFactory.buildList(2))
    const accounts = await accountController.list({
      skip: 0,
      take: 2
    })
    expect(accounts).toHaveLength(2);
  })

  it('should search by string', async () => {
    accountsRepo.find.mockReturnValue(accountFactory.buildList(1,{
      clientName: 'Coca Cola'
    }))
    expect(await accountController.search('coca')).toHaveLength(1);
  })

});
