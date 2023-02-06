import { SignupDTO, SignupUserCreatedDTO } from '@operation-management/common';
import { Roles, User, UserRoles } from '@operation-management/database';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaswordService } from '../password/password.service';

@Injectable()
export class RegisterService {
  private logger = new Logger(RegisterService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private passwrdService: PaswordService,
    @InjectRepository(UserRoles)
    private userRolesRepo: Repository<UserRoles>,
    @InjectRepository(Roles)
    private rolesRepo: Repository<Roles>
  ) {}

  async createUser({
    email,
    password,
    name,
  }: SignupDTO): Promise<SignupUserCreatedDTO> {
    this.logger.debug(email, password);
    const user = this.userRepository.create({
      email,
      name,
    });
    const userInstance = await this.passwrdService.createPassword({
      user,
      password,
    });
    this.logger.debug({ ...userInstance });
    const role = await this.rolesRepo.findOneBy({ id: 3 });
    const createdUser = await this.userRepository.save(userInstance);
    await this.userRolesRepo.save({
        role,
        user: createdUser,
    })
    return Promise.resolve({
      email,
      created: new Date(),
    });
  }
}
