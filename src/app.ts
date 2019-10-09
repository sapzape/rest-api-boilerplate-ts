import "reflect-metadata"
import { createExpressServer, Action, useContainer } from "routing-controllers"
import { Application } from "express"
import bodyParser from "body-parser"
import Container from "typedi"
import * as path from "path"
import * as swaggerUi from "swagger-ui-express"
import basicAuth from "express-basic-auth"

import { AuthController } from "./controllers/auth.controller"
import { UserController } from "./controllers/user.controller"

class App {
  public app: Application

  constructor() {
    this.createExpressServer()
    this.setConfig()
    this.setSwagger()
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

  private setSwagger() {
    const swaggerFile = require(path.join(__dirname, "..", "/src/swagger.json"))
    swaggerFile.info = {
      title: "util-donate",
      description: "",
      version: "1.0.0"
    }

    swaggerFile.servers = [
      {
        //todo(sapzape) need to separate env value
        url: `http://localhost:8080`
      }
    ]
    //todo(sapzape) need to separate env value
    this.app.use(
      "/swagger",
      basicAuth({
        users: {
          ["admin"]: "admin"
        },
        challenge: true
      }),
      swaggerUi.serve,
      swaggerUi.setup(swaggerFile)
    )
  }
}

export default App
