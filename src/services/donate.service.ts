import { Request, Response } from "express"
import { HELLO_MESSAGE } from "../constants/donateApi.constants"
import { Donate } from "../models/donate.model"
export class DonateService {
  public helloMessage(req: Request, res: Response) {
    return res.status(200).send(HELLO_MESSAGE)
  }
}
