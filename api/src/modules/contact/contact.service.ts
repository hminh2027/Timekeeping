import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>
  ) { }

  async create(payload: CreateContactDto): Promise<Contact> {
    const newUser = this.contactRepository.create(payload);
    return await this.contactRepository.save(newUser);
  }

  async update(userId: number, payload: UpdateContactDto): Promise<void> {
    this.contactRepository.createQueryBuilder()
    .update(Contact)
    .set(payload)
    .where('userId = :userId', { userId })
    .execute();
  }

  async remove(userId: number): Promise<void> {
    this.contactRepository.createQueryBuilder()
    .delete()
    .from(Contact)
    .where('userId = :userId', { userId })
    .execute();
  }
}
