import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@operation-management/database';
import { Repository } from 'typeorm';
import { matchRoles } from './match-roles';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const { userId } = request.user as { userId: number };
    const { userRoles } = await this.userRepo.findOneOrFail({
      select: ['userRoles'],
      where: { id: userId },
      relations: ['userRoles.role'],
    });
    return matchRoles(roles, userRoles);
  }
}
