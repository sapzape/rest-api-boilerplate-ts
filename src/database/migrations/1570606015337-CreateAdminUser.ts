import { MigrationInterface, QueryRunner, getRepository, Table } from "typeorm"
import { User } from "../../models/User"

export class CreateAdminUser1570606015337 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const table = new Table({
      name: "user",
      columns: [
        {
          name: "id",
          type: "int",
          length: "25",
          isPrimary: true,
          isNullable: false
        },
        {
          name: "username",
          type: "varchar",
          length: "25",
          isPrimary: false,
          isNullable: false
        },
        {
          name: "password",
          type: "varchar",
          length: "50",
          isPrimary: false,
          isNullable: false
        },
        {
          name: "role",
          type: "varchar",
          length: "25",
          isPrimary: false,
          isNullable: false
        },
        {
          name: "createdAt",
          type: "datetime",
          length: "6",
          isPrimary: false,
          isNullable: false
        },
        {
          name: "updatedAt",
          type: "datetime",
          length: "6",
          isPrimary: false,
          isNullable: false
        }
      ]
    })
    await queryRunner.createTable(table)

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
