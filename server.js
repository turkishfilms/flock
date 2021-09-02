

var express = require('express')
var app = express()
var p = 3001
var server = app.listen(3001, ()=> console.log(`Running @ Port ${p}`))

app.use(express.static('public'))

var socket = require('socket.io')
var io = socket(server)

io.sockets.on('connection', newCon)

function newCon(socket){
console.log('Challenger Approaching ' + socket.id + '!')

socket.on('SpaceBar', (bar => {socket.broadcast.emit('send', bar)
console.log('broadcasting SpaceBar')}))

}


