import { User } from '@operation-management/database';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
import {
  ListQuery,
  UpdateUserDto,
  UserListDto,
} from '@operation-management/common';
import { PaswordService } from './password/password.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private passwordService: PaswordService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}
  async findOne(email: string): Promise<User | undefined> {
    return await this.userRepository.findOneOrFail({
      where: { email },
    });
  }

  async findOneById(id: number): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      this.logger.info(`[${UsersService.name}] USER WITH ID ${id} NOT FOUND`);
      throw new NotFoundException();
    }

    user.hidePassword();
    return user;
  }

  async updateOne({
    id,
    name,
    password,
    email,
  }: UpdateUserDto): Promise<User | undefined> {
    const dbUser = await this.userRepository.findOneByOrFail({ id });
    const { passwordHash: newPassword } =
      <User>(await this.passwordService.createPassword({ user: dbUser, password }));

    dbUser.setEmail(email);
    dbUser.setName(name);
    dbUser.setPassword(newPassword);

    const updatedUser = await this.userRepository.save(dbUser);
    updatedUser.hidePassword();

    return updatedUser;
  }

  async deleteOne(id: number) {
    const { affected } = await this.userRepository.softDelete(id);
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

  async list({ skip, take }: ListQuery): Promise<UserListDto[]> {
    return await this.userRepository.find({
      skip,
      take,
      select: ['id', 'email', 'name'],
      order: { id: 'ASC' },
    });
  }

  async findMany(ids: number[]) {
    return await this.userRepository.find({
      select: ['id', 'name'],
      where: {
        id: In(ids),
      },
    });
  }

  async search(searchTerms: string) {
    return await this.userRepository.find({
      select: ['id','name','email'],
      where: {
        name: ILike(`%${searchTerms}%`),
      },
    });
  }
}
