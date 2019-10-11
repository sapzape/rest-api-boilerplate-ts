import "reflect-metadata"
import { Service } from "typedi"
import { OrmRepository } from "typeorm-typedi-extensions"

import { SponsorRepository } from "../repositories/sponsor.repository"
import { Sponsor } from "../models/Sponsor"

@Service()
export class SponsorService {
  constructor(@OrmRepository() private sponsorRepository: SponsorRepository) {}
  public async find(): Promise<any> {}

  public async findOneOrFail(): Promise<any> {}

  public async create(): Promise<any> {}

  public async update(): Promise<any> {}

  public async delete(): Promise<any> {}
}
