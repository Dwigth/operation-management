import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AccountRetrieveDto,
  CreateAccountDto,
  ListQuery,
  UpdateAccountDto,
} from '@operation-management/common';
import { Accounts } from '@operation-management/database';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { Logger } from 'winston';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Accounts)
    private accountsRepo: Repository<Accounts>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  async createOne({
    accountName,
    clientName,
    operationManagerName,
  }: CreateAccountDto) {
    //
    const account = await this.accountsRepo.save({
      accountName,
      clientName,
      operationManagerName,
    });

    return {
      id: account.id,
      created: new Date(),
    };
  }

  async getOne(accountId: number) {
    const account = await this.accountsRepo.findOneBy({
      id: accountId,
    });
    if (!account) {
      this.logger.info(
        `[${UsersService.name}] ACCOUNT WITH ID ${accountId} NOT FOUND`
      );
      throw new NotFoundException();
    }
    return account;
  }

  async updateOne({
    id,
    accountName,
    clientName,
    operationManagerName,
  }: UpdateAccountDto): Promise<Accounts | undefined> {
    const dbAccount = await this.accountsRepo.findOneBy({ id });

    if (!dbAccount) {
      this.logger.info(
        `[${UsersService.name}] ACCOUNT WITH ID ${id} NOT FOUND`
      );
      throw new NotFoundException();
    }
    dbAccount.setAccountName(accountName);
    dbAccount.setClientName(clientName);
    dbAccount.setOperationManagerName(operationManagerName);

    return await this.accountsRepo.save(dbAccount);
  }

  async deleteOne(id: number) {
    const { affected } = await this.accountsRepo.softDelete(id);
    if (affected > 0) {
      return {
        message: 'Successfully deleted',
        deleted: new Date(),
      };
    }
    return {
      message: 'Could not deleted',
      deleted: null,
    };
  }

  async list({ skip, take }: ListQuery): Promise<AccountRetrieveDto[]> {
    return await this.accountsRepo.find({
      skip,
      take,
      select: ['id', 'accountName', 'clientName', 'operationManagerName'],
      order: { id: 'ASC' },
    });
  }
}
