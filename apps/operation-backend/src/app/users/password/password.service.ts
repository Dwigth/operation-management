import { Injectable, Logger } from "@nestjs/common";
import { PasswordProps, PaswordManagement } from "./password.class";
import * as crypto from 'crypto';
import { ConfigService } from "@nestjs/config";
import { User } from "@operation-management/database";

@Injectable()
export class PaswordService implements PaswordManagement {
    private logger = new Logger(PaswordService.name);
    private iterations = 1000;
    private keylens = 64;
    private salt: string;

    constructor(private config: ConfigService) {
        this.salt = this.config.get('SALT');
    }

    private validateProps({ user, password }: PasswordProps): boolean {
        if (!user) {
            this.logger.debug('[User] not defined')
            return false;
        }
        if (!password) {
            this.logger.debug('[Password] not defined')
            return false;
        }
        return true;
    }

    createPassword({ user, password }: PasswordProps): Promise<User | Error> {
        if (!this.validateProps({ user, password })) {
            return Promise.reject(new Error("Not valid properties"))
        }
        user.passwordHash = crypto.pbkdf2Sync(password, this.salt,
            this.iterations, this.keylens, `sha512`).toString(`hex`);
        return Promise.resolve(user);
    }

    validatePassword({ user, password }: PasswordProps): Promise<boolean> {
        if (!this.validateProps({ user, password })) return Promise.resolve(false);
        const hash = crypto.pbkdf2Sync(password, this.salt,
            this.iterations, this.keylens, `sha512`).toString(`hex`);
        const isValid = user.passwordHash === hash;
        return Promise.resolve(isValid);
    }

}