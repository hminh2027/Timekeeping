import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contact])],
  exports: [ContactService],
  providers: [ContactService],
})
export class ContactModule {}
