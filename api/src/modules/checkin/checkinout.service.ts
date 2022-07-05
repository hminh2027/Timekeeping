import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CheckinRepository } from './checkinout.repository';
import { SearchQueryDto } from './dto/search.dto';
import { Between, DataSource } from 'typeorm';
import { CheckinoutPayload } from './payloads/checkinout.payload';
import { CheckOutHistoryService } from './checkout-history.service';
import { Checkin } from './entities/checkinout.entity';
import { CheckoutHistory } from './entities/checkout-history.entity';

@Injectable()
export class CheckinService {
  constructor(
    private readonly checkinRepository: CheckinRepository,
    private readonly checkoutHistoryService: CheckOutHistoryService,
    private readonly dataSource: DataSource
  ) {}

  async getByUserId(id: number) {
    return await this.checkinRepository.findOne({
      where: {
        createdAt: Between(
          new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
          new Date()
        ),
        userId: id
      }
    })
  }

  async search(userId: number, data: SearchQueryDto) {
    if(!data.fromDate || !data.toDate) {
      return await this.checkinRepository.find({ where: {userId} });
    }

    return await this.checkinRepository.find({ 
      where: {
        createdAt: Between(
          data.fromDate,
          data.toDate
        ),
        userId
      } 
    });
  }

  async checkTodayCheckedin(id) {
    const todayChecked = await this.search(id, {
      fromDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
      toDate: new Date()
    })
    return todayChecked.length > 0
  }

  async create(data: CheckinoutPayload) {
    const todayChecked = await this.checkTodayCheckedin(data.userId);

    if (todayChecked) {
      throw new NotAcceptableException(
        'You have checked in today.',
      );
    }

    const newCheckin =  await this.checkinRepository.create({
      checkinImage: data.image,
      checkinLatitude: data.latitude,
      checkinLongitude: data.longitude,
      userId: data.userId
    });

    return await this.checkinRepository.save(newCheckin);
  }

  async update(data: CheckinoutPayload) {
    const checkedInToday = await this.getByUserId(data.userId);
    if(!checkedInToday) {
      throw new NotAcceptableException(
        'You have not checked in today. Please check in.',
      );
    }

    // dùng transaction đi!
    const checkinUpdated = await this.checkinRepository.save({
      id: checkedInToday.id,
      checkoutImage: data.image,
      checkoutLatitude: data.latitude,
      checkoutLongitude: data.longitude
    });

    await this.checkoutHistoryService.create(checkinUpdated.id);

    return checkinUpdated;

    // const runner = await this.dataSource.createQueryRunner();
    // await runner.connect();
    // await runner.startTransaction();
    

    // try {

      
    //   // const checkinUpdated = await runner.manager.save({
    //   //   id: checkedInToday.id,
    //   //   checkoutImage: data.image,
    //   //   checkoutLatitude: data.latitude,
    //   //   checkoutLongitude: data.longitude
    //   // })

      

      

    // } catch (err) {
    //   await runner.rollbackTransaction();

    // } finally {
    //   await runner.release();
    // }
    
  }
}
