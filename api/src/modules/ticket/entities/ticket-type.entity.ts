import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ticket } from "./ticket.entity";

@Entity('ticket_types')
export class TicketType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name: string;

    /* RELATIONSHIPS */
    /* 1-N */
    @OneToMany(() => Ticket, ticket => ticket.ticketType)
    tickets: Ticket[];

}