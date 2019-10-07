import {
  Authorized,
  JsonController,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body
} from "routing-controllers"

import { UserService } from "../services/user.service"
import { User } from "../models/User"

@Authorized()
@JsonController("/user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  public listAll(): Promise<User[]> {
    return this.userService.find()
  }

  @Get("/:id([0-9]+)")
  public getOneById(@Param("id") id: number): Promise<User | undefined> {
    return this.userService.findOneOrFail(id)
  }

  @Post()
  public newUser(@Body() user: User): Promise<User | boolean> {
    return this.userService.create(user)
  }

  @Patch("/:id([0-9]+)")
  public editUser(@Param("id") id: number, @Body() user: User): Promise<User> {
    return this.userService.update(id, user)
  }

  @Delete("/:id([0-9]+)")
  public deleteUser(@Param("id") id: number): Promise<void> {
    return this.userService.delete(id)
  }
}
