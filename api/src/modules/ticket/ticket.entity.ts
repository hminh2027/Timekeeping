import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from "typeorm";
import { Role } from "../role/role.entity";
import { User } from "../user/user.entity";
import { TicketType } from "./ticket-type.entity";

@Entity('ticket')
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    title: string;
    
    @Column()
    content: string;

    @Column()
    startDate: Date;
    
    @Column()
    endDate: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    modifiedAt: Date;

    @Column({ default: false })
    isDeleted: boolean;

    @Column({ default: false })
    isApproved: boolean;

    @ManyToOne(() => User, user => user.tickets, { eager: true })
    @JoinColumn({ name: 'authorId', referencedColumnName: 'id'})
    author: User;

    // @RelationId((ticket: Ticket) => ticket.author)
    // authorId: number;

    @ManyToOne(() => User, user => user.tickets, { eager: true })
    @JoinColumn({ name: 'recipientId', referencedColumnName: 'id'})
    recipient: User;

    // @RelationId((ticket: Ticket) => ticket.recipient)
    // recipientId: number;

    @ManyToOne(() => TicketType, ticket => ticket.tickets, { eager: true })
    @JoinColumn({ name: 'ticketId', referencedColumnName: 'id'})
    ticketType: Ticket;

    @Column()
    recipientId: number;

    @Column()
    authorId: number;

    @Column()
    ticketTypeId: number;

}