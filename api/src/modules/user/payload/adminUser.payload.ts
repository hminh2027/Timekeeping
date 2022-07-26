import { OmitType } from '@nestjs/swagger';
import { RegisterPayload } from '../../auth/payloads/register.payload';

export class AdminUserPayload extends OmitType(RegisterPayload, [
  'email',
  'resetToken',
]) {}
