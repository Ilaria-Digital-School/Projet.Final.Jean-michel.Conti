import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) return true;

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        console.log('RolesGuard: user in request:', user);
        console.log('RolesGuard: required roles:', requiredRoles);
        const hasRole = requiredRoles.some((role) => user.role === role);
        console.log('RolesGuard: hasRole?', hasRole);
        return hasRole;
    }
}