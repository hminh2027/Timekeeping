import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CheckoutRepository } from './checkout.repository';
import { CheckoutPayload } from './payloads/checkout.payload';
import { Between } from 'typeorm';
import { SearchQueryDto } from '../checkin/dto/search.dto';


@Injectable()
export class CheckoutService {
  constructor(
    private readonly checkoutRepository: CheckoutRepository
) {}


  async search(userId: number, date: SearchQueryDto) {   
    return await this.checkoutRepository.find({ 
      where: {
        createdAt: Between(
          date.fromDate,
          date.toDate
        ),
        userId
      } 
    })
  }

  async checkTodayCheckedout(id) {
    const todayChecked = await this.search(id, {
      fromDate: new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate()),
      toDate: new Date()
    })
    return todayChecked.length > 0
  }

  async create(data: CheckoutPayload) {
    const todayChecked = await this.checkTodayCheckedout(data.userId);

    if (todayChecked) {
      throw new NotAcceptableException(
        'You have checked out today.',
      );
    }

    const newCheckout =  await this.checkoutRepository.create(data);
    return await this.checkoutRepository.save(newCheckout);
  }
}
