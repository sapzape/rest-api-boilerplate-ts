import "reflect-metadata"
import express, { Application } from "express"
import bodyParser from "body-parser"
import helmet from "helmet"
import cors from "cors"

import { Controller } from "./main.controller"

class App {
  public app: Application
  public donateController: Controller

  constructor() {
    this.app = express()
    this.setConfig()

    this.donateController = new Controller(this.app)
  }

  private setConfig() {
    this.app.use(bodyParser.json({ limit: "50mb" }))
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))
    this.app.use(helmet())
    this.app.use(cors())
  }
}

export default App
