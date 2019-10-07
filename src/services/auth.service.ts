import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { getRepository } from "typeorm"
import { validate } from "class-validator"
import { JsonController, Post } from "routing-controllers"

import { User } from "../entity/User"
import { JWT_SECRET, EXPIRES_TIME } from "../constants/config.constants"
import { VALIDATION_ERROR_MESSAGE } from "../constants/message.constants"

@JsonController("/auth")
export class AuthService {
  @Post("/login")
  public async login(req: Request, res: Response): Promise<any> {
    let { username, password } = req.body
    // if (!(username && password)) return res.status(400).send()
    if (!(username && password)) return

    const userRepository = getRepository(User)
    let user: User

    try {
      user = await userRepository.findOneOrFail({ where: { username } })
    } catch (error) {
      // return res.status(401).send()
      return
    }

    // if (!user.checkCryptPasswordIsValid(password)) return res.status(401).send()
    if (!user.checkCryptPasswordIsValid(password)) return

    const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: EXPIRES_TIME
    })

    // return res.send(token)
    return token
  }

  @Post("/change-password")
  public async changePassword(req: Request, res: Response): Promise<any> {
    const id = res.locals.jwtPayload.userId
    const { oldPassword, newPassword } = req.body
    // if (!(oldPassword && newPassword)) return res.status(400).send()
    if (!(oldPassword && newPassword)) return

    const userRepository = getRepository(User)
    let user: User
    try {
      user = await userRepository.findOneOrFail(id)
    } catch (error) {
      // return res.status(401).send()
      return
    }

    user.password = newPassword
    const errors = await validate(user)
    // if (errors.length > 0) return res.status(400).send(VALIDATION_ERROR_MESSAGE)
    if (errors.length > 0) return VALIDATION_ERROR_MESSAGE

    user.hashPassword()
    userRepository.save(user)

    // return res.status(204).send()
    return
  }
}
