import { PartialType } from "@nestjs/swagger";
import { RegisterPayload } from "../../auth/payloads/register.payload";

export class UserPayload extends PartialType(RegisterPayload) {}