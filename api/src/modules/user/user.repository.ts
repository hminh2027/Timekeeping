import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    public async checkIfEmailExists(email: string, id?: number): Promise<boolean> {
        let count;

        if(id) {
            count = await this.createQueryBuilder('user')
            .where('user.email = :email', { email })
            .andWhere('user.id <> :id', { id })
            .getCount()
        }
        else {          
            count = await this.createQueryBuilder('user')
            .where('user.email = :email', { email })
            .getCount()
        }

        return count > 0;
    }

    public async checkIfUserExists(id: number): Promise<boolean> {
        const count = await this.createQueryBuilder('user')
        .where('user.id = :id', { id })
        .getCount()

        return count > 0;
    }   
}