import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDTO } from '@operation-management/common';
import { RegisterService } from '../users/signup/register.service';
import { PaswordService } from '../users/password/password.service';
import { User } from '@operation-management/database';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private registerService: RegisterService,
    private passwordService: PaswordService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersService.findOne(email);
    const isValid = await this.passwordService.validatePassword({
      user,
      password: pass,
    });

    if (isValid) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User): Promise<{ accessToken: string; }> {
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async signup(user: SignupDTO) {
    await this.registerService.createUser(user);
    return {
      process: 'finish',
      done: true,
    };
  }
}
