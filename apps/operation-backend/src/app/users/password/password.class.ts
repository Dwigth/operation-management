import { User } from "@operation-management/database";

export type ProvidedPassword = string;
export interface PasswordProps {
    password: ProvidedPassword;
    user: User;
}

export abstract class PaswordManagement {
    abstract createPassword(passwordProps: PasswordProps): Promise<User>;
    abstract validatePassword(passwordProps: PasswordProps): Promise<boolean>;
}