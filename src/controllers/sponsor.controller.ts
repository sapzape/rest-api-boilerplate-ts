import {
  Authorized,
  JsonController,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body
} from "routing-controllers"

import { SponsorService } from "../services/sponsor.service"
import { Sponsor } from "../models/Sponsor"

@JsonController("/sponsor")
export class SponsorController {
  constructor(private sponsorService: SponsorService) {}

  @Get()
  public async listAll(): Promise<Sponsor[]> {
    return this.sponsorService.find()
  }

  @Get("/:id([0-9]+)")
  public async getOneById(@Param("id") id: number): Promise<Sponsor | undefined> {
    return this.sponsorService.findOneOrFail(id)
  }

  @Authorized()
  @Post()
  public async newSponsor(@Body() sponsor: Sponsor): Promise<Sponsor | boolean> {
    return this.sponsorService.create(sponsor)
  }

  @Authorized()
  @Patch("/:id([0-9]+)")
  public async editSponsor(@Param("id") id: number, @Body() sponsor: Sponsor): Promise<Sponsor> {
    return this.sponsorService.update(id, sponsor)
  }

  @Authorized()
  @Delete("/:id([0-9]+)")
  public async deleteSponsor(@Param("id") id: number): Promise<void> {
    return this.sponsorService.delete(id)
  }
}
