import { Application } from "express"
import { Connection } from "typeorm"

import "../../src/env"
import App from "../../src/app"
import { createDBConnection, migrationDB } from "./database.setting"

export interface Settings {
  app: Application
  connection: Connection
}

export const prepareServer = async (options?: { migrate: boolean }) => {
  let server: Application
  let connection = await createDBConnection()
  server = new App().app
  server.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`))
  if (options && options.migrate) {
    await migrationDB(connection)
  }

  return { app: server, connection: connection } as Settings
}
