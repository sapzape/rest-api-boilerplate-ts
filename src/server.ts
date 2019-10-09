import "reflect-metadata"
import { createConnection, useContainer as ormUseContainer, ConnectionOptions } from "typeorm"
import Container from "typedi"
import * as path from "path"

import App from "./App"
import "./env"

const connectionOpts: ConnectionOptions = {
  type: process.env.TYPEORM_CONNECTION as any,
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  logging: Boolean(process.env.TYPEORM_LOGGING),
  entities: [`${path.join(__dirname, "..", `${process.env.TYPEORM_ENTITIES}`)}`],
  migrations: [`${path.join(__dirname, "..", `${process.env.TYPEORM_MIGRATIONS}`)}`]
}

ormUseContainer(Container)
createConnection(connectionOpts).then(async () => {
  new App().app.listen(process.env.APP_PORT, () =>
    console.log(`Listening on port ${process.env.APP_PORT}`)
  )
})
