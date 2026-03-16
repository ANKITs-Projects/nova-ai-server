const express = require('express')
const  router  = require('./routes/routers');

const app = express()

app.use(express.json())

app.use('/api', router)


app.use((req, res) => {
    res.status(404).send({
        message : 'Route not found',
        success : false
    })
})

module.exports = app