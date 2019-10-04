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
    this.app.route("/donate").get(this.donateService.getAllDonate)
    this.app.route("/donate").post(this.donateService.addNewDonate)
    this.app
      .route("/donate/:id")
      .put(this.donateService.updateDonate)
      .delete(this.donateService.deleteDonate)
  }
}
