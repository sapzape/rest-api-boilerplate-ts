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
  const settings = await createApp()
  if (options && options.migrate) {
    await migrationDB(settings.connection)
  }

  return settings
}

const createApp = async (): Promise<Settings> => {
  let server = new App().app
  let connection = await createDBConnection()

  return { app: server, connection: connection } as Settings
}
