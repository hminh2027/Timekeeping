import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CheckinRepository } from './checkin.repository';
import { CheckinPayload } from './payloads/checkin.payload';
import { SearchQueryDto } from './dto/search.dto';
import { Between } from 'typeorm';


@Injectable()
export class CheckinService {
  constructor(
    private readonly checkinRepository: CheckinRepository
) {}


  async search(userId: number, date: SearchQueryDto) {   
    return await this.checkinRepository.find({ 
      where: {
        createdAt: Between(
          date.fromDate,
          date.toDate
        ),
        userId
      } 
    })
  }

  async checkTodayCheckedin(id) {
    const todayChecked = await this.search(id, {
      fromDate: new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate()),
      toDate: new Date()
    })
    return todayChecked.length > 0
  }

  async create(data: CheckinPayload) {
    const todayChecked = await this.checkTodayCheckedin(data.userId);

    if (todayChecked) {
      throw new NotAcceptableException(
        'You have checked in today.',
      );
    }

    const newCheckin =  await this.checkinRepository.create(data);
    return await this.checkinRepository.save(newCheckin);
  }
}
