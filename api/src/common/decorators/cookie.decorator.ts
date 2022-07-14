import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ReqCookie = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers.cookie;
  },
);
