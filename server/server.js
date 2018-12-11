const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var {generateMessage} = require('./utils/message');


const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

var app = express();
// have to do this to hookup socketIO
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

// io vs socket
// io emits to every connection
// socket emits to individual connections

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));
    socket.broadcast.emit('newMessage', generateMessage('Admin','New user has joined'));

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);

        io.emit('newMessage', generateMessage(message.from, message.text));

        // Sends to everyone except person who sent it
        // socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
    });
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}\n`);
});

