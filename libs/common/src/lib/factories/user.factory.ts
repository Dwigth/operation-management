import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';
import { User } from '@operation-management/database';

type LoginUser = Omit<
  User,
  | 'englishLevel'
  | 'technicalKnowledge'
  | 'cvLink'
  | 'teamUsers'
  | 'userRoles'
  | 'updated'
  | 'deletedAt'
  | 'setEmail'
  | 'setName'
  | 'setPassword'
  | 'setEnglishLevel'
  | 'setTechnicalKnowledge'
  | 'setCvLink'
  | 'hidePassword'
>;

export const userFactory = Factory.define<LoginUser>(({ sequence }) => ({
  id: sequence,
  email: faker.internet.email(),
  name: faker.name.fullName(),
  passwordHash:
    'b966474f8f661b37312977e6762ceff60f0f96bb4a36136160064a6d8260c5f48037c3767940dbafd99a7811927f2ba74fd520268ee9304d1b1b35badf5d474b',
}));
