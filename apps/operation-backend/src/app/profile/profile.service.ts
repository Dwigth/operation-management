import {
  ConflictException,
  Inject,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserProfileInfo } from '@operation-management/common';
import { User } from '@operation-management/database';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { PaswordService } from '../users/password/password.service';

type JWTRequest = Request & { user: { userId: number } };

@Injectable({
  scope: Scope.REQUEST,
})
export class ProfileService {
  constructor(
    @Inject(REQUEST) private request: JWTRequest,
    private userService: UsersService,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private passwordService: PaswordService
  ) {}

  private validateRequestUser(userId: number) {
    const { user: requestUser } = this.request;
    if (requestUser.userId !== +userId) {
      throw new UnauthorizedException();
    }
  }

  async getMyInfo(userId: number) {
    this.validateRequestUser(userId);
    return await this.userService.findOneById(userId);
  }

  async updateMyInfo({
    id,
    cvLink,
    email,
    englishLevel,
    name,
    password,
    technicalKnowledge,
  }: UpdateUserProfileInfo) {
    this.validateRequestUser(id);
    let dbUser = await this.userRepo.findOneBy({ id });
    dbUser.setName(name);
    dbUser.setEmail(email);
    dbUser.setEnglishLevel(englishLevel);
    dbUser.setCvLink(cvLink);
    dbUser.setTechnicalKnowledge(technicalKnowledge);
    if (password) {
      dbUser = await this.passwordService.createPassword({
        user: dbUser,
        password,
      });
    }
    const { affected } = await this.userRepo.update(id, dbUser);
    if (affected > 0) {
      dbUser.hidePassword();
      return dbUser;
    }
    throw new ConflictException('Could not update');
  }
}
