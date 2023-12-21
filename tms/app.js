const express = require("express")
const cors = require("cors")
const dbConnection = require("./src/utils/dbConnection")
const router = require("./src/routes/Api")
const app = express()
const port = 8000


//middleware
app.use(cors())
app.use(express.json());

//database connection
dbConnection()


app.use("/api/v1", router)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    }
)