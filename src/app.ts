import "reflect-metadata"
import {
  createExpressServer,
  useContainer as routingUseContainer,
  Action
} from "routing-controllers"
import { Container } from "typedi"
import { useContainer as ormUseContainer } from "typeorm"
import { Application } from "express"
import bodyParser from "body-parser"
import { AuthController } from "./controllers/auth.controller"
import { UserController } from "./controllers/user.controller"

class App {
  public app: Application

  constructor() {
    this.iocLoader()
    this.createExpressServer()
    this.setConfig()
  }

  private iocLoader() {
    routingUseContainer(Container)
    ormUseContainer(Container)
  }

  private createExpressServer() {
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
