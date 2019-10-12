import "reflect-metadata"
import { createExpressServer, Action, useContainer } from "routing-controllers"
import { Application } from "express"
import bodyParser from "body-parser"
import Container from "typedi"
import * as path from "path"
import * as swaggerUi from "swagger-ui-express"
import basicAuth from "express-basic-auth"

import "./env"
import { checkJwt } from "./middlewares/checkJwt"

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
      controllers: [path.join(__dirname, "..", `${process.env.CONTROLLERS}`)],
      authorizationChecker: async (action: Action) => {
        const token = action.request.headers["authorization"]
        return await checkJwt(token)
      },
      defaults: {
        nullResultCode: 404,
        undefinedResultCode: 204,
        paramOptions: {
          required: true
        }
      }
    })
  }

  private setConfig() {
    this.app.use(bodyParser.json())
  }

  private setSwagger() {
    const swaggerFile = require(path.join(__dirname, "..", `${process.env.SWAGGER_FILE}`))
    swaggerFile.info = {
      title: "REST API Boilerplate using TypeScript",
      description: "",
      version: "1.0.0"
    }

    swaggerFile.servers = [
      {
        url: `${process.env.APP_SCHEMA}://${process.env.APP_HOST}:${process.env.PORT}`
      }
    ]
    this.app.use(
      `${process.env.SWAGGER_ROUTE}`,
      basicAuth({
        users: {
          [`${process.env.SWAGGER_USERNAME}`]: `${process.env.SWAGGER_PASSWORD}`
        },
        challenge: true
      }),
      swaggerUi.serve,
      swaggerUi.setup(swaggerFile)
    )
  }
}

export default App
