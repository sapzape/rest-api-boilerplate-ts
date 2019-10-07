import "reflect-metadata"
import { Service } from "typedi"
import { OrmRepository } from "typeorm-typedi-extensions"
import { validate } from "class-validator"

import { UserRepository } from "../repositories/user.repository"
import { User } from "../models/User"

@Service()
export class UserService {
  constructor(@OrmRepository() private userRepository: UserRepository) {}

  public async find(): Promise<User[]> {
    console.log("?????")
    return await this.userRepository.find({
      select: ["id", "username", "role"]
    })
  }

  public async findOneOrFail(id: number): Promise<User | undefined> {
    return await this.userRepository.findOneOrFail(id, {
      select: ["id", "username", "role"]
    })
  }

  public async create(user: User): Promise<User | boolean> {
    const errors = await validate(user)
    if (errors.length > 0) return false

    user.hashPassword()
    const newUser = await this.userRepository.save(user)
    return newUser
  }

  public async update(id: number, user: User): Promise<User> {
    user.id = id
    return await this.userRepository.save(user)
  }

  public async delete(id: number): Promise<void> {
    await this.userRepository.delete(id)
    return
  }
}
