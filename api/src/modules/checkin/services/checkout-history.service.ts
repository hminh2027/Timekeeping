import { Injectable } from "@nestjs/common";
import { CheckoutHistoryRepository } from "../checkout-history.repository";

@Injectable()
export class CheckOutHistoryService {
  constructor(private readonly historyRepository: CheckoutHistoryRepository) {}

  async create(id: number) {
    const history = await this.historyRepository.create({checkinId: id});
    return await this.historyRepository.save(history);
  }

  async getLastestCheckout(id) {
    return await this.historyRepository.findOne({
      where: { checkinId: id },
      order: { createdAt: 'DESC' }
    })
  }
}