import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Users } from './users.entity';

export const GetUser = createParamDecorator(
  (_, ctx: ExecutionContext): Users => {
    const req = ctx.switchToHttp().getResponse();
    return req.user;
  },
);
