import { JsonController } from "routing-controllers"

import { DonateService } from "../services/donate.service"

@JsonController("/donate")
export class DonateController {
  constructor(private donateServiceService: DonateService) {}

  public async getListById(): Promise<any> {}

  public async addDonate(): Promise<any> {}

  public async editDonate(): Promise<any> {}

  // public async deleteUser(): Promise<any> {}
}
