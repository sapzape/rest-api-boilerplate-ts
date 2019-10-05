import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { validate } from "class-validator"

import { SponsorOrganization } from "../entity/SponsorOrganization"
import { VALIDATION_ERROR_MESSAGE } from "../constants/message.constants"

export class SponsorOrganizationService {
  public async listAll(req: Request, res: Response): Promise<any> {}

  public async getOneById(req: Request, res: Response): Promise<any> {}

  public async addSponsor(req: Request, res: Response): Promise<any> {}

  public async editSponsor(req: Request, res: Response): Promise<any> {}

  public async deleteSponsor(req: Request, res: Response): Promise<any> {}
}
