export interface IUserContextInput {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    admin: boolean;
    email: string;
}

export class UserContext {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    admin: boolean;

    constructor(user: IUserContextInput) {
        this.id = user.id;
        this.username = user.username;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.admin = user.admin;
        this.email = user.email;
    }

    get fullName(): string {
        return this.firstName + ' ' + this.lastName;
    }
}
