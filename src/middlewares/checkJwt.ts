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
}
