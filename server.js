require("dotenv").config({path: './.env'})

require('./src/config/dbConfig')


const app = require("./src/app")

const port  = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is started at PORT: ${port}`)
})

