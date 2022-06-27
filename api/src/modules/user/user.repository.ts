import { CustomRepository } from "src/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@CustomRepository(User)
export class UserRepository extends Repository<User> {
    public async checkIfEmailExists(email: string, id?: number): Promise<boolean> {
        let query = `SELECT COUNT(0) AS result FROM user WHERE `;
        let result;
        if(id) {
            query += 'email = ? and id <> ?';
            [{result}] = await this.query(query, [email, id]);       
        }
        else {          
            query += 'email = ?';
            [{result}] = await this.query(query, [email]);
        }
         
        return result > 0;
    }

    public async checkIfUserExists(id: number): Promise<boolean> {
        const query = `SELECT COUNT(0) AS result FROM user WHERE id = ?;`;
        const [{result}] = await this.query(query, [id]);
        return result > 0;
    }   
}