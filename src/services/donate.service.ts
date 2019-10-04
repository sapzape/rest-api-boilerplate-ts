import { Request, Response } from "express"
import { MongooseDocument } from "mongoose"
import { Donate } from "../models/donate.model"
import { HELLO_MESSAGE } from "../constants/donateApi.constants"

export class DonateService {
  public helloMessage(req: Request, res: Response) {
    return res.status(200).send(HELLO_MESSAGE)
  }

  public getAllDonate(req: Request, res: Response) {
    Donate.find({}, (error: Error, donate: MongooseDocument) => {
      if (error) res.send(error)
      res.json(donate)
    })
  }

  public addNewDonate(req: Request, res: Response) {
    const newDonate = new Donate(req.body)
    newDonate.save((error: Error, donate: MongooseDocument) => {
      if (error) res.send(error)
      res.json(donate)
    })
  }

  public deleteDonate(req: Request, res: Response) {
    const donateId = req.params.id
    Donate.findByIdAndDelete(donateId, (error: Error, deleted: any) => {
      if (error) res.send(error)
      const message = deleted ? "Deleted successfully" : "Donate info not found"
      res.send(message)
    })
  }

  public updateDonate(req: Request, res: Response) {
    const donateId = req.params.id
    Donate.findByIdAndUpdate(donateId, req.body, (error: Error, donate: any) => {
      if (error) res.send(error)
      const message = donate ? "Updated successfully" : "Donate info not found"
      res.send(message)
    })
  }
}
