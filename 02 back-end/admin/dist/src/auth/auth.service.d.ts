import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private jwtService;
    private usersService;
    private prisma;
    constructor(jwtService: JwtService, usersService: UsersService, prisma: PrismaService);
    register(email: string, password: string): Promise<{
        id: number;
        email: string;
        password: string;
        role: string;
    }>;
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        token: string;
    }>;
}
