require ('dotenv').config()
const express = require('express')
const cors = require('cors')
const port = 3000
const app = express()
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(routes)
app.use(errorHandler)
let rooms = []

io.on('connection', socket => {
  console.log('user connected')
  socket.on('attack', element => {
      socket.broadcast.emit('enemy attacking', element)
  })
  socket.on('nyawa', nyawa => {
      socket.broadcast.emit('nyawa musuh', nyawa)
  })
  socket.on('kalah', () => {
    socket.broadcast.emit('menang')
  })
  socket.on('rooms', roomsClient => {
    rooms = roomsClient
    socket.broadcast.emit('rooms server', rooms)
  })
  socket.on('join room', roomName => {
    socket.join(roomName)
  })
  socket.on('players full', roomName => {
    console.log('pemain penuh')
    io.in(roomName).emit('start game')
  })

  socket.on('disconnect', () => {
      console.log('user disconnected')
  })
})

http.listen(port, () => {
  console.log('listen to port '+port)
})
// app.listen(port, () => {
//   console.log(`listening on ${port}`)
// })

module.exports = app