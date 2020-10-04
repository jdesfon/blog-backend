import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

/* 
    Reference documentation here
    https://docs.nestjs.com/guards
 */

function matchRoles(roles: string[], userRoles: string[]) {
    for (const role of roles) {
        if (userRoles.includes(role)) {
            return true;
        }
    }
    return false;
}

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return matchRoles(roles, user.roles);
    }
}