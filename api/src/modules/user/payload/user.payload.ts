import { OmitType } from '@nestjs/swagger';
import { RegisterPayload } from '../../auth/payloads/register.payload';

export class UserPayload extends OmitType(RegisterPayload, [
  'email',
  'resetToken',
  'password',
]) {}
