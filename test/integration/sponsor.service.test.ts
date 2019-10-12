import { Container } from "typedi"
import { Connection } from "typeorm"

import { Sponsor } from "../../src/models/Sponsor"
import { SponsorService } from "../../src/services/sponsor.service"
import { closeDB, createDBConnection, migrationDB } from "../util/database.setting"

describe("SponsorService", () => {
  let connection: Connection
  beforeAll(async () => {
    connection = await createDBConnection()
    await migrationDB(connection)
  })

  afterAll(async () => await closeDB(connection))

  test("should create a new sponsor in the database", async done => {
    const sponsor = new Sponsor()
    sponsor.regionCode = 429
    sponsor.organizationName = "shovelmanfund"
    sponsor.phone = "2468-9753"
    sponsor.address = "Siheung-si, Gyeonggi-do"
    sponsor.account = "123-4567-891011"
    sponsor.homepage = "www.aaa.bbb"

    const service = Container.get<SponsorService>(SponsorService)
    const newSponsor = await service.create(sponsor)
    expect(newSponsor.regionCode).toBe(sponsor.regionCode)
    expect(newSponsor.organizationName).toBe(sponsor.organizationName)
    expect(newSponsor.phone).toBe(sponsor.phone)
    expect(newSponsor.address).toBe(sponsor.address)
    expect(newSponsor.account).toBe(sponsor.account)
    expect(newSponsor.homepage).toBe(sponsor.homepage)

    const findSponsor = await service.findOneOrFail(newSponsor.id)
    if (findSponsor) {
      expect(findSponsor.regionCode).toBe(sponsor.regionCode)
      expect(findSponsor.organizationName).toBe(sponsor.organizationName)
      expect(findSponsor.phone).toBe(sponsor.phone)
      expect(findSponsor.address).toBe(sponsor.address)
      expect(findSponsor.account).toBe(sponsor.account)
      expect(findSponsor.homepage).toBe(sponsor.homepage)
    } else {
      fail("Test Fail")
    }

    done()
  })
})
