// Make connection 
var socket = io.connect('http://localhost:8080')

//Query 

const message = document.getElementById('message')
const user = document.getElementById('user')
const send = document.getElementById('send')
const output = document.getElementById('output')
const feedback = document.getElementById('feedback')

// Emit events 

send.addEventListener('click',() => {
	socket.emit('chat', {
		message:message.value,
		user:user.value
	})
})

message.addEventListener('keypress',() => {
	if(message.value.length === 0 ){
		socket.emit('typing',user.value)
	}
	else{
		null
	}
	
})

//Listen for events

socket.on('chat',(data) => {
	feedback.innerHTML =''
	output.innerHTML += `<p><strong>${data.user} : </strong>${data.message}</p>`
})

socket.on('typing',(data) => {
	feedback.innerHTML += `<label>${data} is typing...</label>`
})