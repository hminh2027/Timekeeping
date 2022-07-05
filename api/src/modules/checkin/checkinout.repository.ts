import { Repository } from "typeorm";
import { EntityRepository } from "src/common/typeorm/typeorm-ex.decorator";
import { Checkin } from "./entities/checkinout.entity";

@EntityRepository(Checkin)
export class CheckinRepository extends Repository<Checkin> { }