import { PartialType } from "@nestjs/swagger";
import { CreateTicketPayload } from "./create-ticket.payload";

export class UpdateTicketPayload extends PartialType(CreateTicketPayload) {}