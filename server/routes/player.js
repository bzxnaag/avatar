const express = require('express')
const routes = express.Router()
const playerController = require('../controller/playerController')

routes.get('/', playerController.showPlayer)
routes.post('/', playerController.createPlayer)
routes.delete('/:id', playerController.deletePlayer)
routes.put('/:id', playerController.editPlayer)
routes.put('/cancel/:id', playerController.outRoom)

module.exports = routes