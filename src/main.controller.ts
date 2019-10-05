import { Application } from "express"
import { checkJwt } from "./middlewares/checkJwt"
import { checkRole } from "./middlewares/checkRole"
import { AuthService } from "./services/auth.service"
import { UserService } from "./services/user.service"

export class Controller {
  // private donateService: DonateService
  private authService: AuthService
  private userService: UserService

  constructor(private app: Application) {
    this.authService = new AuthService()
    this.userService = new UserService()

    this.routes()
  }

  //todo(sapzape) Modify the direction to subtract the route
  public routes() {
    this.authRoute("/auth")
    this.userRoute("/user")
  }

  private authRoute(path: string) {
    this.app.route(`${path}/login`).post(this.authService.login)
    this.app.route(`${path}/change-password`).post([checkJwt], this.authService.changePassword)
  }

  private userRoute(path: string) {
    this.app
      .route(`${path}/`)
      .get([checkJwt, checkRole(["ADMIN"])], this.userService.listAll)
      .post([checkJwt, checkRole(["ADMIN"])], this.userService.newUser)
    this.app
      .route(`${path}/:id([0-9]+)`)
      .get([checkJwt, checkRole(["ADMIN"])], this.userService.getOneById)
      .patch([checkJwt, checkRole(["ADMIN"])], this.userService.editUser)
      .delete([checkJwt, checkRole(["ADMIN"])], this.userService.deleteUser)
  }
}
