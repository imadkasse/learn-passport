// roles.guard.ts
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // لا توجد أدوار مطلوبة
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      throw new HttpException('Unauthorized', 401);
    }

    
    if (!requiredRoles.includes(user.role)) {
      throw new HttpException('Access denied: insufficient role', 403);
    }
    return true;
  }
}
