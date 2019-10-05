import { Request, Response, NextFunction } from "express"
import { getRepository } from "typeorm"
import { User } from "../entity/User"

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = res.locals.jwtPayload.userId
    const userRepository = getRepository(User)
    let user: User
    try {
      user = await userRepository.findOneOrFail(id)
    } catch (error) {
      return res.status(401).send()
    }

    if (roles.indexOf(user.role) < 0) return res.status(401).send()
    return next()
  }
}
