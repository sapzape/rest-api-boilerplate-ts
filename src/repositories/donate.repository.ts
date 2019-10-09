import { EntityRepository, Repository } from "typeorm"
import { Donate } from "../models/Donate"

@EntityRepository(Donate)
export class DonateRepository extends Repository<Donate> {}
