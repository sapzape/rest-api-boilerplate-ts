import { Container } from "typedi"
import { Connection, createConnection, useContainer, ConnectionOptions } from "typeorm"
import * as path from "path"

import "../../src/env"

export const createDBConnection = async (): Promise<Connection> => {
  const connectionOpts: ConnectionOptions = {
    type: process.env.TEST_TYPEORM_CONNECTION as any,
    database: process.env.TEST_TYPEORM_DATABASE,
    entities: [`${path.join(__dirname, "../..", `${process.env.TYPEORM_ENTITIES}`)}`],
    migrations: [`${path.join(__dirname, "../..", `${process.env.TYPEORM_MIGRATIONS}`)}`]
  }

  useContainer(Container)
  return await createConnection(connectionOpts)
}

export const syncDB = async (connection: Connection) => {
  await connection.dropDatabase()
  return connection.synchronize(true)
}

export const migrationDB = async (connection: Connection) => {
  await connection.dropDatabase()
  await connection.synchronize(true)
  return connection.runMigrations()
}

export const closeDB = (connection: Connection) => {
  return connection.close()
}
