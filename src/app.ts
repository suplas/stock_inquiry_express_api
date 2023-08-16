import express from "express"
import routes from "./routes/routes"
import routes2 from "./routes/routes2"
import db from "./db"

const app = express()
const PORT = 3010

db.connect()

app.use("/api", routes)
app.use("/cat", routes2);

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}/ 에서 실행중입니다.`)
})
