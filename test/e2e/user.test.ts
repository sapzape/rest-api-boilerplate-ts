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
      .get("/user")
      .expect("Content-Type", /json/)
      .expect(200)
    done()
  })
})
