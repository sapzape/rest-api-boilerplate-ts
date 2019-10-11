import "reflect-metadata"
import { Service } from "typedi"
import { OrmRepository } from "typeorm-typedi-extensions"
import jwt from "jsonwebtoken"

import { UserRepository } from "../repositories/user.repository"
import { User } from "../models/User"
import "../env"

@Service()
export class AuthService {
  constructor(@OrmRepository() private userRepository: UserRepository) {}

  public async createToken(user: User): Promise<string> {
    const one = await this.userRepository.findOneOrFail(user.id)
    const token = jwt.sign(
      { userId: one.id, username: one.username },
      <string>process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_TIME
      }
    )
    return token
  }

  public async changePassword(user: User): Promise<User | boolean> {
    const one = await this.userRepository.findOneOrFail(user.id)
    one.password = user.password
    one.hashPassword()
    return await this.userRepository.save(one)
  }
}
