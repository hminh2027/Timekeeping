import { User } from "src/modules/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TicketType } from "./ticket-type.entity";

@Entity('tickets')
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    title: string;
    
    @Column({ length: 255 })
    content: string;

    @Column()
    startDate: Date;
    
    @Column()
    endDate: Date;

    @Column({ default: false })
    isApproved: boolean;

    /* N-1 relationships */
    @ManyToOne(() => User, user => user.tickets, { eager: true })
    @JoinColumn({ name: 'authorId', referencedColumnName: 'id'})
    author: User;

    @ManyToOne(() => User, user => user.tickets, { eager: true })
    @JoinColumn({ name: 'recipientId', referencedColumnName: 'id'})
    recipient: User;

    @ManyToOne(() => TicketType, ticket => ticket.tickets, { eager: true })
    @JoinColumn({ name: 'ticketTypeId', referencedColumnName: 'id'})
    ticketType: Ticket;

    @Column()
    recipientId: number;

    @Column()
    authorId: number;

    @Column()
    ticketTypeId: number;

}