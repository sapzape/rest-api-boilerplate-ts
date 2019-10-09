import { User } from "../../../src/models/User"
import { UserService } from "../../../src/services/user.service"
import { RepositoryMock } from "../../util/repository.mock"

describe("UserService", () => {
  test("Find should return a list of users", async done => {
    const repositoryMock = new RepositoryMock()
    const user = new User()
    user.id = 1
    user.username = "admin"
    user.role = "ADMIN"
    repositoryMock.list = [user]
    const userService = new UserService(repositoryMock as any)
    const list = await userService.find()

    expect(list[0].id).toBe(user.id)
    expect(list[0].username).toBe(user.username)
    expect(list[0].role).toBe(user.role)
    done()
  })

  test("Create should returned a create user information", async done => {
    const repositoryMock = new RepositoryMock()
    const user = new User()
    user.id = 3
    user.username = "sapzape"
    user.password = "password"
    user.role = "USER"
    repositoryMock.one = user
    const userService = new UserService(repositoryMock as any)
    const newUser = await userService.create(user)
    const findUser = await userService.findOneOrFail(user.id)

    expect(newUser).toEqual(findUser)
    done()
  })
})
