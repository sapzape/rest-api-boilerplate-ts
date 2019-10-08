import { useContainer as routingUseContainer } from "routing-controllers"
import { createConnection, useContainer as ormUseContainer } from "typeorm"
import App from "./App"
import { PORT } from "./constants/config.constants"
import Container from "typedi"

routingUseContainer(Container)
ormUseContainer(Container)
createConnection()
  .then(async connection => {
    new App().app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
  })
  .catch(error => console.log(error))
