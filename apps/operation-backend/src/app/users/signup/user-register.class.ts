import { User } from "@operation-management/database";

export abstract class UserRegister {
    abstract createUser(): Promise<User>;
}