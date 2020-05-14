require ('dotenv').config()
const express = require('express')
const cors = require('cors')
const port = 3000
const app = express()
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(routes)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`listening on ${port}`)
})

module.exports = app