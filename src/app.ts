import "reflect-metadata"
import { createExpressServer, Action } from "routing-controllers"
import { Application } from "express"
import bodyParser from "body-parser"
import { AuthService } from "./services/auth.service"
import { UserService } from "./services/user.service"

class App {
  public app: Application

  constructor() {
    this.app = createExpressServer({
      controllers: [AuthService, UserService],
      authorizationChecker: async (action: Action, roles: string[]) => {
        return true
      },
      currentUserChecker: async (action: Action) => {
        return true
      }
    })
    this.setConfig()
  }

  private setConfig() {
    this.app.use(bodyParser.json())
  }
}

export default App
