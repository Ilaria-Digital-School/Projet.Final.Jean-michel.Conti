import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(data: any): Promise<{
        id: number;
        email: string;
        password: string;
        role: string;
    }>;
    findByEmail(email: string): Promise<{
        id: number;
        email: string;
        password: string;
        role: string;
    } | null>;
}
