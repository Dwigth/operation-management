export class SignupDTO {
    name: string;
    email: string;
    password: string;
}

export class SignupUserCreatedDTO {
    email: string;
    created: Date;
}