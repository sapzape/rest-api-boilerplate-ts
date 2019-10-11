import jwt from "jsonwebtoken"
import "../env"

export const checkJwt = (token: string) => {
  let payload
  try {
    payload = <any>jwt.verify(token, <string>process.env.JWT_SECRET)
  } catch (error) {
    return false
  }
  return true

  // const { userId, username } = payload
  // const newToken = jwt.sign({ userId, username }, <string>process.env.JWT_SECRET, {
  //   expiresIn: process.env.JWT_EXPIRES_TIME
  // })

  // return newToken
}
