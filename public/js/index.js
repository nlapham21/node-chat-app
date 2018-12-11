var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

    socket.emit('createMessage', {
        from: 'nolan21',
        text: 'Hi baby, its nolan.'
    });
});

socket.on('newMessage', function (message) {
    console.log('Got new message', message);
});