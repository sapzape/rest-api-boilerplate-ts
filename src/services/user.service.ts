import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { validate } from "class-validator"

import { User } from "../entity/User"

export class UserService {
  public async listAll(req: Request, res: Response): Promise<any> {
    const userRepository = getRepository(User)
    const users = await userRepository.find({
      select: ["id", "username", "role"]
    })

    return res.send(users)
  }

  public async getOneById(req: Request, res: Response): Promise<any> {
    const id = req.params.id
    try {
      const userRepository = getRepository(User)
      const user = await userRepository.findOneOrFail(id, {
        select: ["id", "username", "role"]
      })
      return res.send(user)
    } catch (error) {
      return res.status(404).send("User not found")
    }
  }

  public async newUser(req: Request, res: Response): Promise<any> {
    let { username, password, role } = req.body
    let user = new User()
    user.username = username
    user.password = password
    user.role = role

    const errors = await validate(user)
    if (errors.length > 0) return res.status(400).send(errors)

    user.hashPassword()

    try {
      const userRepository = getRepository(User)
      await userRepository.save(user)
    } catch (error) {
      return res.status(409).send("username already in use")
    }

    return res.status(201).send("User created")
  }

  public async editUser(req: Request, res: Response): Promise<any> {
    const id = req.params.id
    const { username, role } = req.body
    let user
    try {
      const userRepository = getRepository(User)
      user = await userRepository.findOneOrFail(id)
    } catch (error) {
      return res.status(404).send("User not found")
    }

    user.username = username
    user.role = role
    const errors = await validate(user)
    if (errors.length > 0) return res.status(404).send("validation error")

    try {
      const userRepository = getRepository(User)
      await userRepository.save(user)
    } catch (error) {
      return res.status(409).send("username already in use")
    }

    return res.status(204).send()
  }

  public async deleteUser(req: Request, res: Response): Promise<any> {
    const id = req.params.id
    const userRepository = getRepository(User)
    let user: User

    try {
      user = await userRepository.findOneOrFail(id)
    } catch (error) {
      return res.status(404).send("User not found")
    }

    userRepository.delete(id)
    return res.status(204).send()
  }
}
