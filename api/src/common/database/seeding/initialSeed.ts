import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { User } from "src/modules/user/user.entity";


export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(User)().create();
  }
}