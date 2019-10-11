import { MigrationInterface, QueryRunner, getRepository, Table } from "typeorm"
import { User } from "../../models/User"

export class CreateAdminUser1570606015337 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let user = new User()
    user.id = 1
    user.username = "admin"
    user.password = "admin"
    user.hashPassword()
    user.role = "ADMIN"
    const userRepository = getRepository(User)
    await userRepository.save(user)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
