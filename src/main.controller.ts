import { Application } from "express"
import { DonateService } from "./services/donate.service"

export class Controller {
  private donateService: DonateService

  constructor(private app: Application) {
    this.donateService = new DonateService()
    this.routes()
  }

  public routes() {
    this.app.route("/").get(this.donateService.helloMessage)
  }
}
