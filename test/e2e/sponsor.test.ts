import * as nock from "nock"
import request from "supertest"

import { prepareServer, Settings } from "../util/prepare.server"
import { closeDB } from "../util/database.setting"

describe("/sponsor", () => {
  let settings: Settings
  let token: string
  beforeAll(async () => {
    settings = await prepareServer({ migrate: true })
    const response = await request(settings.app)
      .post("/auth/login")
      .send({ id: 1, username: "admin", password: "admin", role: "ADMIN" })
      .set("Accept", "application/json")
    token = response.body
  })
  afterAll(async () => {
    nock.cleanAll()
    await closeDB(settings.connection)
  })

  test("GET: / should return a list of sponsors", async done => {
    const response = await request(settings.app)
      .get("/sponsor/1")
      .set("Authorization", token)
      .expect("Content-Type", /json/)
      .expect(200)

    expect(response.body.regionCode).toBe(429)
    expect(response.body.organizationName).toBe("sapzapefund")
    expect(response.body.phone).toBe("1357-8642")
    expect(response.body.address).toBe("Siheung-si, Gyeonggi-do")
    expect(response.body.account).toBe("123-4567-891011")
    expect(response.body.homepage).toBe("www.aaa.bbb")
    done()
  })
})
