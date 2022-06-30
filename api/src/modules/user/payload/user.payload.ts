import { PartialType } from "@nestjs/swagger";
import { RegisterPayload } from "../../auth/payload/register.payload";

export class UserPayload extends PartialType(RegisterPayload) {}