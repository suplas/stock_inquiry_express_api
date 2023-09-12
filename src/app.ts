import express from "express"
import routes from "./routes/baseRoutes"
import routes2 from "./routes/krxRoutes"
import routes3 from "./routes/kisRoutes"
import db from "./db"

const app = express()
const PORT = 3000

//db.connect()

app.use("/api", routes)
app.use("/krx/api", routes2)
app.use("/kis/api", routes3)

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}/ 에서 실행중입니다.`)
})
