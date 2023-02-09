import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';
import { Accounts } from '@operation-management/database';

type Account = Omit<
  Accounts,
  | 'deletedAt'
  | 'updated'
  | 'accountTeams'
  | 'setAccountName'
  | 'setClientName'
  | 'setOperationManagerName'
>;

export const accountFactory = Factory.define<Account>(({ sequence }) => ({
  id: sequence,
  clientName: faker.company.name(),
  accountName: faker.address.cityName(),
  operationManagerName: faker.name.fullName(),
  accountTeams: [],
}));
