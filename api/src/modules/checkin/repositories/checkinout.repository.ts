import { Repository } from "typeorm";
import { EntityRepository } from "src/common/typeorm/typeorm-ex.decorator";
import { Checkin } from "../entities/checkinout.entity";
import * as fs from "fs";

@EntityRepository(Checkin)
export class CheckinRepository extends Repository<Checkin> {

  async saveBase64ToFile(base64string: String) {
    const base64Data = base64string.replace(/^data:image\/png;base64,/, "")  ;
    const imageName = `${+ new Date()}.png`;
    fs.writeFile(`images/${imageName}`, base64Data, 'base64', function(err) {
      return null;
    });
    return imageName;
  }
}