import { Container } from "typedi"
import { Connection, createConnection, useContainer } from "typeorm"

import "../../src/env"

export const createDBConnection = async (): Promise<Connection> => {
  useContainer(Container)
  const connection = await createConnection({
    type: process.env.TEST_TYPEORM_CONNECTION as any,
    database: process.env.TEST_TYPEORM_DATABASE
  })
  return connection
}

export const syncDB = async (connection: Connection) => {
  await connection.dropDatabase()
  return connection.synchronize(true)
}

export const migrationDB = async (connection: Connection) => {
  await connection.dropDatabase()
  return connection.runMigrations()
}

export const closeDB = (connection: Connection) => {
  return connection.close()
}
