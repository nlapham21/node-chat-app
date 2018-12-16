const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app); // have to do this to hookup socketIO
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

// io vs socket
// io emits to every connection
// socket emits to individual connections

io.on('connection', (socket) => {

    socket.on('mainPage', () => {
        socket.emit('updateRoomList', users.getRoomsList());
    });

    socket.on('join', (params, callback) => {
        var room = params.room.toLowerCase();
        var name = params.name;

        if (!isRealString(name) || !isRealString(room)) {
            return callback('Name and room name are required.');
        }
        if (users.isUsernameTaken(name, room)) {
            return callback('This username is taken, please use another.');
        }

        socket.join(room);
        // socket.leave(params.name) would kick the person out of the socket
        users.removeUser(socket.id);
        users.addUser(socket.id, name, room);
        io.to(room).emit('updateUserList', users.getUserList(room));
        io.emit('updateRoomList', users.getRoomsList());

        // How to target users
        // io.emit -> io.to(params.name).emit
        // socket.broadcast.emit -> socket.broadcase.to(params.name).emit
        // socket.emit (target a specific user)

        socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));
        socket.broadcast.to(room).emit('newMessage', generateMessage('Admin',`${name} has joined`));    
        
        callback();
    });

    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);

        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    socket.on('disconnect', () =>{
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
            io.emit('updateRoomList', users.getRoomsList());
        }
    });
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}\n`);
});

