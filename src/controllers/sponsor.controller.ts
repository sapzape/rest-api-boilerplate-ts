import { JsonController } from "routing-controllers"

import { SponsorService } from "../services/sponsor.service"

@JsonController("/sponsor")
export class SponsorController {
  constructor(private sponsorService: SponsorService) {}

  public async listAll(): Promise<any> {}

  public async getOneById(): Promise<any> {}

  public async addSponsor(): Promise<any> {}

  public async editSponsor(): Promise<any> {}

  public async deleteSponsor(): Promise<any> {}
}
