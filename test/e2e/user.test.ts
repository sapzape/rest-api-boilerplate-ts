import * as nock from "nock"
import request from "supertest"

import { prepareServer, Settings } from "../util/prepare.server"
import { closeDB } from "../util/database.setting"

describe("/user", () => {
  let settings: Settings
  beforeAll(async () => {
    settings = await prepareServer({ migrate: true })
  })
  afterAll(async () => {
    nock.cleanAll()
    await closeDB(settings.connection)
  })

  test("GET: / should return a list of users", async done => {
    const response = await request(settings.app)
      .get("/user/1")
      .expect("Content-Type", /json/)
      .expect(200)

    expect(response.body.id).toBe(1)
    expect(response.body.username).toBe("admin")
    expect(response.body.role).toBe("ADMIN")
    done()
  })
})
