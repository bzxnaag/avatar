const express = require('express')
const routes = express.Router()
const playerRoutes = require('./player')
const roomRoutes = require('./room')

routes.use('/players', playerRoutes)
routes.use('/rooms', roomRoutes)

module.exports = routes