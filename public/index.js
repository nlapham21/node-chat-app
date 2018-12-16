var socket = io();

socket.on('connect', function () {

    socket.emit('mainPage');
});

socket.on('updateRoomList', function (rooms) {
    var ol = jQuery('<ol></ol>');

    rooms.forEach(function (room) {
        var roomButton = jQuery('<button></button>').text(room)
        roomButton.on('click', function () {
            jQuery('[name=room]').val(room)
        });
        ol.append(roomButton);
    });

    jQuery('#rooms').html(ol);
});