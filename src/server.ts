import { createConnection, useContainer as ormUseContainer } from "typeorm"
import App from "./App"
import { PORT } from "./constants/config.constants"
import Container from "typedi"

ormUseContainer(Container)
createConnection()
  .then(async () => {
    new App().app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
  })
  .catch(error => console.log(error))
