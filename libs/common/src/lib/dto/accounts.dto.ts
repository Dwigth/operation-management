import { ApiProperty } from '@nestjs/swagger';
import { ListQuery } from './list.dto';

export class AccountsDto {
  @ApiProperty()
  accountName: string;
  @ApiProperty()
  clientName: string;
  @ApiProperty()
  operationManagerName: string;
}

export class CreateAccountDto extends AccountsDto {}

export class AccountCreatedDto {
  id: number;
  created: Date;
}

export class AccountRetrieveDto extends AccountsDto {
    @ApiProperty()
    id: number;
}

export class UpdateAccountDto extends AccountRetrieveDto {}

export class AccountsListQuery extends ListQuery {}