import "reflect-metadata"
import { createExpressServer, Action, useContainer } from "routing-controllers"
import { Application } from "express"
import bodyParser from "body-parser"
import Container from "typedi"

import { AuthController } from "./controllers/auth.controller"
import { UserController } from "./controllers/user.controller"

class App {
  public app: Application

  constructor() {
    this.createExpressServer()
    this.setConfig()
  }

  private createExpressServer() {
    useContainer(Container)
    this.app = createExpressServer({
      controllers: [AuthController, UserController],
      authorizationChecker: async (action: Action, roles: string[]) => {
        return true
      },
      currentUserChecker: async (action: Action) => {
        return true
      }
    })
  }

  private setConfig() {
    this.app.use(bodyParser.json())
  }
}

export default App
