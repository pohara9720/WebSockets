var express = require('express')
var app = express()
var socket = require('socket.io')

//Render static files
app.use(express.static('views'))

//Setup Sockets
var io = socket(server)

var server = app.listen(8080,() => {
	console.log('App listening on 8080')
})


io.listen(server)

io.on('connection',(socket) => {
	console.log('Made socket connection',socket.id)

	//Handle chat
	socket.on('chat',(data) => {
		io.sockets.emit('chat',data)
	})

	//Handle typing
	socket.on('typing',(data) => {
		socket.broadcast.emit('typing',data)
	})
})

