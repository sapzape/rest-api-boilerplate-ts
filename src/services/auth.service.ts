import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { getRepository } from "typeorm"
import { validate } from "class-validator"

import { User } from "../entity/User"
import { JWT_SECRET } from "../constants/config.constants"

export class AuthService {
  public async login(req: Request, res: Response): Promise<any> {
    let { username, password } = req.body
    if (!(username && password)) return res.status(400).send()

    const userRepository = getRepository(User)
    let user: User

    try {
      user = await userRepository.findOneOrFail({ where: { username } })
    } catch (error) {
      return res.status(401).send()
    }

    if (!user.checkCryptPasswordIsValid(password)) return res.status(401).send()

    const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: "1h"
    })

    return res.send(token)
  }

  public async changePassword(req: Request, res: Response): Promise<any> {
    const id = res.locals.jwtPayload.userId
    const { oldPassword, newPassword } = req.body
    if (!(oldPassword && newPassword)) return res.status(400).send()

    const userRepository = getRepository(User)
    let user: User
    try {
      user = await userRepository.findOneOrFail(id)
    } catch (error) {
      return res.status(401).send()
    }

    user.password = newPassword
    const errors = await validate(user)
    if (errors.length > 0) return res.status(400).send(errors)

    user.hashPassword()
    userRepository.save(user)

    return res.status(204).send()
  }
}
