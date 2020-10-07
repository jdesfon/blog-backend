import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { UserRole } from "src/constants";

@Injectable()
export class GqlRoleGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    getRequest(context: ExecutionContext) {
        const role = this.reflector.get<string>('role', context.getHandler());
        const ctx = GqlExecutionContext.create(context);
        const user = ctx.getContext().req.user;

        if (!role) {
            return ctx.getContext().req;
        }

        if (user.role !== role) {
            throw new UnauthorizedException();
        }
        return ctx.getContext().req;
    }
}