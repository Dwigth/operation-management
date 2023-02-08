import { Repository } from 'typeorm';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<unknown>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
    findOneOrFail: jest.fn((entity) => entity),
    findOneByOrFail: jest.fn((entity) => entity),
    save: jest.fn((entity) => entity),
    softDelete: jest.fn((entity) => entity),
    find: jest.fn((entity) => entity),
    create: jest.fn((entity) => entity),
    findBy: jest.fn((entity) => entity),
    findOneBy: jest.fn((entity) => entity),
  })
);
