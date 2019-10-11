import "reflect-metadata"
import { Service } from "typedi"
import { OrmRepository } from "typeorm-typedi-extensions"

import { SponsorRepository } from "../repositories/sponsor.repository"
import { Sponsor } from "../models/Sponsor"

@Service()
export class SponsorService {
  constructor(@OrmRepository() private sponsorRepository: SponsorRepository) {}
  public async find(): Promise<Sponsor[]> {
    return await this.sponsorRepository.find({
      select: ["id", "regionCode", "organizationName"]
    })
  }

  public async findOneOrFail(id: number): Promise<Sponsor | undefined> {
    return await this.sponsorRepository.findOneOrFail(id, {
      select: ["id", "regionCode", "organizationName", "phone", "address", "homepage"]
    })
  }

  public async create(sponsor: Sponsor): Promise<Sponsor> {
    const newSponsor = await this.sponsorRepository.save(sponsor)
    return newSponsor
  }

  public async update(id: number, sponsor: Sponsor): Promise<Sponsor> {
    sponsor.id = id
    return await this.sponsorRepository.save(sponsor)
  }

  public async delete(id: number): Promise<void> {
    await this.sponsorRepository.delete(id)
    return
  }
}
