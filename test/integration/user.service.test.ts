import { Container } from "typedi"
import { Connection } from "typeorm"

import { User } from "../../src/models/User"
import { UserService } from "../../src/services/user.service"
import { closeDB, createDBConnection, migrationDB } from "../util/database.setting"

describe("UserService", () => {
  let connection: Connection
  beforeAll(async () => {
    connection = await createDBConnection()
    await migrationDB(connection)
  })

  afterEach(() => closeDB(connection))

  test("should create a new user in the database", async done => {
    const user = new User()
    user.id = 1
    user.username = "sapzape"
    user.password = "password"
    user.role = "USER"
    const service = Container.get<UserService>(UserService)
    const newUser = await service.create(user)
    expect(newUser.username).toBe(user.username)
    expect(newUser.role).toBe(user.role)

    const findUser = await service.findOneOrFail(newUser.id)
    if (findUser) {
      expect(findUser.username).toBe(user.username)
      expect(findUser.role).toBe(user.role)
    } else {
      fail("Test Fail")
    }

    done()
  })
})
