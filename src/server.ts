import { createConnection } from "typeorm"
import App from "./App"
import { PORT } from "./constants/config.constants"

createConnection()
  .then(async connection => {
    new App().app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
  })
  .catch(error => console.log(error))
