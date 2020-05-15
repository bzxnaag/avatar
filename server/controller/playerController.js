const Player = require('../models').Player

class playerController {

  static showPlayer(req, res, next) {
    Player.findAll()
    .then(player => {
      res.status(200).json(player)
    })
    .catch(err => {
      next(err)
    })
  }

  static createPlayer(req, res, next) {
    console.log('masuk sini ga')
    Player.create({
      name: req.body.name
    })
    .then(player => {
      res.status(200).json(player)
    })
    .catch(err => {
      next(err)
    })
  }

  static deletePlayer(req, res, next) {
    let {id} = req.params
    Player.findByPk(id)
    .then(player => {
      if(player) {
        return Player.destroy({where: {id: id}})
      } else {
        next({name: 'ERROR_NOT_FOUND'})
      }
    })
    .then(data => {
      res.status(200).json({msg: 'Player Deleted'})
    })
    .catch(err => {
      next(err)
    })
  }

  static editPlayer(req, res, next) {
    let {id} = req.params
    let edit = {
      RoomId: req.body.RoomId
    }
    Player.update(edit, {where: {id}})
    .then(player => {
      if(player == 1) {
        return Player.findByPk(id)
      } else {
        next({name: 'ERROR_NOT_FOUND'})
      }
    })
    .then(updatedPlayer => {
      res.status(200).json(updatedPlayer)
    })
    .catch(err => {
      next(err)
    })
  }

  static outRoom(req, res, next) {
    let {id} = req.params
    let edit = {
      RoomId: null
    }
    Player.update(edit, {where: {id}})
    .then(player => {
      if(player == 1) {
        return Player.findByPk(id)
      } else {
        next({name: 'ERROR_NOT_FOUND'})
      }
    })
    .then(updatedPlayer => {
      res.status(200).json(updatedPlayer)
    })
    .catch(err => {
      next(err)
    })
  }

}

module.exports = playerController