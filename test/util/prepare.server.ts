import { Application } from "express"
import { Connection } from "typeorm"

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
  server.listen(8888, () => console.log(`Listening on port 8888`))
  //todo(sapzape) need to separate env value
  if (options && options.migrate) {
    await migrationDB(connection)
  }

  return { app: server, connection: connection } as Settings
}
