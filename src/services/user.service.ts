import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { validate } from "class-validator"
import { JsonController, Get, Post, Patch, Delete } from "routing-controllers"

import { User } from "../entity/User"
import { VALIDATION_ERROR_MESSAGE } from "../constants/message.constants"

@JsonController("/user")
export class UserService {
  @Get()
  public async listAll(req: Request, res: Response): Promise<any> {
    const userRepository = getRepository(User)
    // const users = await userRepository.find({
    return await userRepository.find({
      select: ["id", "username", "role"]
    })
    // return res.send(users)
  }

  @Get("/:id([0-9]+)")
  public async getOneById(req: Request, res: Response): Promise<any> {
    const id = req.params.id
    try {
      const userRepository = getRepository(User)
      return await userRepository.findOneOrFail(id, {
        select: ["id", "username", "role"]
      })
      // return res.send(user)
    } catch (error) {
      // return res.status(404).send("User not found")
      return "User not found"
    }
  }

  @Post()
  public async newUser(req: Request, res: Response): Promise<any> {
    let { username, password, role } = req.body
    let user = new User()
    user.username = username
    user.password = password
    user.role = role

    const errors = await validate(user)
    // if (errors.length > 0) return res.status(400).send(VALIDATION_ERROR_MESSAGE)
    if (errors.length > 0) return VALIDATION_ERROR_MESSAGE

    user.hashPassword()

    try {
      const userRepository = getRepository(User)
      await userRepository.save(user)
    } catch (error) {
      // return res.status(409).send("username already in use")
      return "username already in use"
    }

    // return res.status(201).send("User created")
    return "User created"
  }

  @Patch("/:id([0-9]+)")
  public async editUser(req: Request, res: Response): Promise<any> {
    const id = req.params.id
    const { username, role } = req.body
    let user
    try {
      const userRepository = getRepository(User)
      user = await userRepository.findOneOrFail(id)
    } catch (error) {
      // return res.status(404).send("User not found")
      return "User not found"
    }

    user.username = username
    user.role = role
    const errors = await validate(user)
    // if (errors.length > 0) return res.status(404).send(VALIDATION_ERROR_MESSAGE)
    if (errors.length > 0) return VALIDATION_ERROR_MESSAGE

    try {
      const userRepository = getRepository(User)
      await userRepository.save(user)
    } catch (error) {
      // return res.status(409).send("username already in use")
      return "username already in use"
    }

    // return res.status(204).send()
    return
  }

  @Delete("/:id([0-9]+)")
  public async deleteUser(req: Request, res: Response): Promise<any> {
    const id = req.params.id
    const userRepository = getRepository(User)
    let user: User

    try {
      user = await userRepository.findOneOrFail(id)
    } catch (error) {
      // return res.status(404).send("User not found")
      return "User not found"
    }

    userRepository.delete(id)
    // return res.status(204).send()
    return
  }
}
