import { ApiProperty } from "@nestjs/swagger";
import { SignupDTO } from "./signup.dto";

export class UserDto extends SignupDTO {
    @ApiProperty()
    id: number;
}

export class UpdateUserDto extends UserDto {}