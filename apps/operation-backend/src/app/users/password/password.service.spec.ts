import { ConfigModule } from '@nestjs/config';
import { TestingModule, Test } from '@nestjs/testing';
import { User } from '@operation-management/database';
import { PasswordProps } from './password.class';
import { PaswordService } from './password.service';

describe('Password', () => {
  //
  let app: TestingModule;
  let passwordService: PaswordService;
  let userWithHashedPassword: User;
  const password = '123456789';


  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [PaswordService],
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
          isGlobal: true,
        }),
      ],
    }).compile();
    passwordService = app.get<PaswordService>(PaswordService);
  });

  it('should generate a password', async () => {
    const user = new User();
    user.passwordHash = '';
    const userWithNewPassword = <User>await passwordService.createPassword({
      user,
      password,
    });
    userWithHashedPassword = userWithNewPassword;
    expect(userWithNewPassword).toBeInstanceOf(User);
    expect(userWithNewPassword.passwordHash).toHaveLength(128);
  });

  it('should return error', async () => {
    try {
      await passwordService.createPassword({} as PasswordProps)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toStrictEqual('Not valid properties')
    }
  });

  it('should validate password', async() => {
    console.log(userWithHashedPassword);
    
    expect (await passwordService.validatePassword({
      user: userWithHashedPassword,
      password
    })).toBeTruthy()
  })

  it('should return false validation password', async () => {
    expect(await passwordService.validatePassword({
      user: userWithHashedPassword,
      password: '123456723d788'
    })).toBeFalsy()
  })
});
