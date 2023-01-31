import { SignupDTO, SignupUserCreatedDTO } from "@operation-management/common";
import { User } from "@operation-management/database";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PaswordService } from "../password/password.service";

@Injectable()
export class RegisterService {
    private logger = new Logger(RegisterService.name);

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private passwrdService: PaswordService,
        ) { }

    async createUser({ email, password, }: SignupDTO): Promise<SignupUserCreatedDTO> {
        this.logger.debug(email,password)
        const user = this.userRepository.create({
            email,
        });
        const userInstance = await this.passwrdService.createPassword({ user, password});
        this.logger.debug({...userInstance});
        await this.userRepository.save(userInstance);
        return Promise.resolve({
            email,
            created: new Date()
        })
    }

}