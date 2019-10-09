import "reflect-metadata"
import { Service } from "typedi"
import { OrmRepository } from "typeorm-typedi-extensions"

import { DonateRepository } from "../repositories/donate.repository"
import { Donate } from "../models/Donate"

@Service()
export class DonateService {
  constructor(@OrmRepository() private donateRepository: DonateRepository) {}

  public async listAll(): Promise<any> {}

  public async getListById(): Promise<any> {}

  public async addDonate(): Promise<any> {}

  public async editDonate(): Promise<any> {}

  // public async deleteUser(): Promise<any> {}
}
