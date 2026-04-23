const express = require('express')
const cors = require("cors")
const  router  = require('./routes/routers');
const cookieParser = require('cookie-parser');

const app = express()

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).send("Welcome to NovaAi server...");
});

app.use('/api', router)


app.use((req, res) => {
    res.status(404).send({
        message : 'Route not found',
        success : false
    })
})


module.exports = app