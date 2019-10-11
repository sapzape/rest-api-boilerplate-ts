import { JsonController, Post, Body } from "routing-controllers"
import { User } from "../models/User"
import { AuthService } from "../services/auth.service"

@JsonController("/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/login")
  public login(@Body() user: User): Promise<string> {
    return this.authService.createToken(user)
  }

  @Post("/change-password")
  public changePassword(@Body() user: User): Promise<User | boolean> {
    return this.authService.changePassword(user)
  }
}
