import { MigrationInterface, QueryRunner, getRepository } from "typeorm"
import { Sponsor } from "../../models/Sponsor"

export class CreateSponsor1570810496626 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let sponsor = new Sponsor()
    sponsor.regionCode = 429
    sponsor.organizationName = "sapzapefund"
    sponsor.phone = "1357-8642"
    sponsor.address = "Siheung-si, Gyeonggi-do"
    sponsor.account = "123-4567-891011"
    sponsor.homepage = "www.aaa.bbb"
    const sponsorRepository = getRepository(Sponsor)
    await sponsorRepository.save(sponsor)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
