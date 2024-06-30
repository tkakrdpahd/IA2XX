const fs = require('fs');
const express = require('express');
const socket = require('socket.io');
const https = require('https');

const key = fs.readFileSync('./key.pem');
const cert = fs.readFileSync('./cert.pem');

const app = express();
const server = https.createServer(
{
	key: key,
	cert: cert
},app).listen(9000);

app.use(express.static('public'));

let connections = [];

console.log("Serving HTML on Port 9000");

let io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket){
	console.log("New Connection!");
	console.log(socket.id);
	io.emit("server-message", "hi");
	connections.push(socket.id);
	console.log(connections.length);
	io.emit("connections", connections);

	socket.on("disconnect", ()=>{
		for(let i = 0; i < connections.length;i++){
			if(connections[i] == socket.id){
				connections.splice(i, 1);
				break;
			}
		}
		io.emit("connections", connections);
	});

	socket.on("clientPos", (data) =>{
		io.emit("serverPos", data);
	})
    socket.on("clientShake", (data) =>{
    	io.emit("serverShake", data);
    })
    socket.on("clientMovement", (data) =>{
    	io.emit("serverMovement", data);
    })

}