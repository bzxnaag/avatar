const Room = require('../models').Room
const Player = require('../models').Player

class RoomController {

  static createRoom(req, res, next) {
    Room.create({
      name: req.body.name
    })
    .then(room => {
      res.status(200).json(room)
    })
    .catch(err => {
      next(err)
    })
  }

  static deleteRoom(req, res, next) {
    let {id} = req.params
    Room.findByPk(id)
    .then(room => {
      if(room) {
        return Room.destroy({where: {id: id}})
      } else {
        next({name: 'ERROR_NOT_FOUND'})
      }
    })
    .then(data => {
      res.status(200).json({msg: 'Room Deleted'})
    })
    .catch(err => {
      next(err)
    })
  }

  static showRoom(req, res, next) {
    Room.findAll({include:[{model:Player}], order:[['id','ASC']]})
    .then(room => {
      res.status(200).json(room)
    })
    .catch(err => {
      next(err)
    })
  }

  // static showRoom(req, res, next) {
  //   Task.findAll({include:[{model:Player}], order:[['id','ASC']]})
  //   .then(room => {
  //     res.status(200).json(room)
  //   })
  //   .catch(err => {
  //     next(err)
  //   })
  // }
}

module.exports = RoomController