const express = require('express');
const PORT = 5050;
const app = express();

//Bring the socket.io module

const { Server } = require('socket.io');


//Create a httpServer
const httpServer = app.listen(PORT);


//Create a new instance of Socket.io Server

const ioServer = new Server(httpServer);


const staticController = express.static('public-controller');
const staticDisplay = express.static('public-display');

app.use(express.json());

app.use('/controller', staticController);
app.use('/display', staticDisplay);

/*
Set the ioServer to listen to new connections
Set the socket to listen to an event and the message from controller
Broadcast the message to the display
*/

ioServer.on('connection', (socket) => {

    socket.on('myName', (tapPlay) => {
        console.log(tapPlay);
        socket.broadcast.emit('myName', tapPlay);
    });

});


//Cambia la pantalla de instrucciones a juego.