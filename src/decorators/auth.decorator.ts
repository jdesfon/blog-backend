import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../modules/auth/guards/graphql-auth.guard';
import { GqlRoleGuard } from '../modules/auth/guards/graphql-role.guard';
import { UserRoleType } from '../modules/database/entities/user.entity';

export function Auth(role: UserRoleType) {
  return applyDecorators(
    SetMetadata('role', role),
    UseGuards(GqlAuthGuard, GqlRoleGuard),
  );
}