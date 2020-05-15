const express = require('express')
const routes = express.Router()
const roomController = require('../controller/roomController')

routes.post('/', roomController.createRoom)
routes.delete('/:id', roomController.deleteRoom)
routes.get('/', roomController.showRoom)

module.exports = routes