import { User } from "src/modules/user/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TicketStatus } from "./ticket-status.entity";
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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    /* RELATIONSHIPS */
    /* N-1 */
    @ManyToOne(() => User, user => user.tickets, { eager: true })
    @JoinColumn({ name: 'authorId', referencedColumnName: 'id'})
    author: User;

    @ManyToOne(() => User, user => user.tickets, { eager: true })
    @JoinColumn({ name: 'recipientId', referencedColumnName: 'id'})
    recipient: User;

    @ManyToOne(() => TicketType, ticket => ticket.tickets, { eager: true })
    @JoinColumn({ name: 'ticketTypeId', referencedColumnName: 'id'})
    ticketType: TicketType;

    @ManyToOne(() => TicketStatus, ticket => ticket.tickets, { eager: true })
    @JoinColumn({ name: 'ticketStatusId', referencedColumnName: 'id'})
    ticketStatus: TicketStatus;

    @Column()
    recipientId: number;

    @Column()
    authorId: number;

    @Column()
    ticketTypeId: number;

    @Column()
    ticketStatusId: number;
}