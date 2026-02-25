import { AuthService } from './auth.service';
import type { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    getLogin(): Promise<{
        title: string;
        description: string;
    }>;
    getRegister(): Promise<{
        title: string;
        description: string;
    }>;
    login(body: any, res: Response): Promise<void>;
    logout(res: Response): Promise<void>;
    register(body: any, res: Response): Promise<void>;
    getMe(req: any): Promise<{
        userId: any;
        role: any;
    }>;
}
