require("dotenv").config({path: './.env'})

const connectDB = require('./src/config/dbConfig')


const app = require("./src/app")

connectDB();

// const port  = process.env.PORT || 8000

// app.listen(port, () => {
//     console.log(`Server is started at PORT: ${port}`)
// })

module.exports = app;

