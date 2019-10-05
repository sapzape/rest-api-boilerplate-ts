import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { validate } from "class-validator"

import { Donate } from "../entity/Donate"
import { VALIDATION_ERROR_MESSAGE } from "../constants/message.constants"

export class DonateService {
  public async listAll(req: Request, res: Response): Promise<any> {}

  public async getListById(req: Request, res: Response): Promise<any> {}

  public async addDonate(req: Request, res: Response): Promise<any> {}

  public async editDonate(req: Request, res: Response): Promise<any> {}

  // public async deleteUser(req: Request, res: Response): Promise<any> {}
}
