import { Container } from "typedi"
import { Connection, createConnection, useContainer } from "typeorm"

export const createDBConnection = async (): Promise<Connection> => {
  useContainer(Container)
  const connection = await createConnection({
    type: "sqlite",
    database: "database.sqlite",
    logging: false,
    entities: ["src/models/**/*.ts"],
    migrations: ["src/migration/**/*.ts"]
  })
  return connection
}

export const syncDB = async (connection: Connection) => {
  //todo(sapzape) need to separate DB env
  // await connection.dropDatabase()
  return connection.synchronize(true)
}

export const migrationDB = async (connection: Connection) => {
  //todo(sapzape) need to separate DB env
  // await connection.dropDatabase()
  return connection.runMigrations()
}

export const closeDB = (connection: Connection) => {
  return connection.close()
}
