require("dotenv").config()

require('./src/config/dbConfig')

const express  = require("express")


const app = express()



const port  = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is started at PORT: ${port}`)
})