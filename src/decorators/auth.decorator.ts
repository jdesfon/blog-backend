import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/modules/auth/guards/graphql-auth.guard';
import { GqlRoleGuard } from 'src/modules/auth/guards/graphql-role.guard';
import { UserRoleType } from 'src/modules/database/entities/user.entity';

export function Auth(role: UserRoleType) {
  return applyDecorators(
    SetMetadata('role', role),
    UseGuards(GqlAuthGuard, GqlRoleGuard),
  );
}