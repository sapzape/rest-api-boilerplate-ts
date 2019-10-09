import { EntityRepository, Repository } from "typeorm"
import { Sponsor } from "../models/Sponsor"

@EntityRepository(Sponsor)
export class SponsorRepository extends Repository<Sponsor> {}
