import express from "express"
import routes from "./routes/routes"
import db from "./db"

const app = express()
const PORT = 3000

db.connect()

app.use("/api", routes)

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}/ 에서 실행중입니다.`)
})
