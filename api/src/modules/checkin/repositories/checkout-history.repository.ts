import { Repository } from "typeorm";
import { EntityRepository } from "src/common/typeorm/typeorm-ex.decorator";
import { CheckoutHistory } from "../entities/checkout-history.entity";

@EntityRepository(CheckoutHistory)
export class CheckoutHistoryRepository extends Repository<CheckoutHistory> { }