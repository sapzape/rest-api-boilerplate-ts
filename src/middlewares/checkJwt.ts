import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { JWT_SECRET, EXPIRES_TIME } from "../constants/config.constants"

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers["authorization"]
  let jwtPayload

  try {
    jwtPayload = <any>jwt.verify(token, JWT_SECRET)
    res.locals.jwtPayload = jwtPayload
  } catch (error) {
    return res.status(401).send(error)
  }

  const { userId, username } = jwtPayload
  const newToken = jwt.sign({ userId, username }, JWT_SECRET, {
    expiresIn: EXPIRES_TIME
  })
  res.setHeader("token", newToken)

  return next()
}
