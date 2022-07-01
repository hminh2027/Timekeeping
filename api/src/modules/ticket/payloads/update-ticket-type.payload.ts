import { PartialType } from "@nestjs/swagger";
import { CreateTicketTypePayload } from "./create-ticket-type.payload";

export class UpdateTicketTypePayload extends PartialType(CreateTicketTypePayload) {}