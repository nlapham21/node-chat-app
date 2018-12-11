const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

var app = express();
// have to do this to hookup socketIO
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'kristin21',
        text: 'Hi munchkin',
        createdAt: 123123
    });

    socket.on('createMessage', (newMessage) => {
        console.log('createMessage', newMessage);
    });
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}\n`);
});
