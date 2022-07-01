import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ticket } from "./ticket.entity";

@Entity('ticket_status')
export class TicketStatus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name: string;

    /* RELATIONSHIPS */
    /* 1-N */
    @OneToMany(() => Ticket, ticket => ticket.ticketStatus)
    tickets: Ticket[];
}