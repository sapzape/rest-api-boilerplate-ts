import "reflect-metadata"
import { Service } from "typedi"
import { OrmRepository } from "typeorm-typedi-extensions"

import { SponsorRepository } from "../repositories/sponsor.repository"
import { Sponsor } from "../models/Sponsor"

@Service()
export class SponsorService {
  constructor(@OrmRepository() private sponsorRepository: SponsorRepository) {}
  public async listAll(): Promise<any> {}

  public async getOneById(): Promise<any> {}

  public async addSponsor(): Promise<any> {}

  public async editSponsor(): Promise<any> {}

  public async deleteSponsor(): Promise<any> {}
}
