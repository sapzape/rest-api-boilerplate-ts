import "reflect-metadata"
import { Service } from "typedi"
import { OrmRepository } from "typeorm-typedi-extensions"
import { validate } from "class-validator"
import jwt from "jsonwebtoken"

import { UserRepository } from "../repositories/user.repository"
import { User } from "../models/User"
import { JWT_SECRET, EXPIRES_TIME } from "../constants/config.constants"

@Service()
export class AuthService {
  constructor(@OrmRepository() private userRepository: UserRepository) {}

  public async createToken(user: User): Promise<string> {
    const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: EXPIRES_TIME
    })
    return token
  }

  public async changePassword(newPassword: string, user: User): Promise<User | boolean> {
    user.password = newPassword
    const errors = await validate(user)
    if (errors.length > 0) return false

    user.hashPassword()

    const updateUser = await this.userRepository.save(user)
    return updateUser
  }
}
