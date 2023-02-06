import { ApiProperty } from '@nestjs/swagger';
import { SignupDTO } from './signup.dto';

export class UserDto extends SignupDTO {
  @ApiProperty()
  id: number;
}

export class UpdateUserDto extends UserDto {}

export class UserListDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
}

export class UserRetrieveDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  englishLevel: string;
  @ApiProperty()
  technicalKnowledge: string;
  @ApiProperty()
  cvLink: string;
  @ApiProperty()
  password: string;
}
export class UpdateUserProfileInfo extends UserRetrieveDto {

}

