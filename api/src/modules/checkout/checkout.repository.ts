import { Repository } from "typeorm";
import { EntityRepository } from "src/common/typeorm/typeorm-ex.decorator";
import { Checkout } from "./checkout.entity";

@EntityRepository(Checkout)
export class CheckoutRepository extends Repository<Checkout> { }