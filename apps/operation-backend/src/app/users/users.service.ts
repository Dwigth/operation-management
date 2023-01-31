import { User } from '@operation-management/database';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}
  async findOne(email: string): Promise<User | undefined> {
    return await this.userRepository.findOneOrFail({
      where: { email },
      relations: ['categories'],
    });
  }
}
