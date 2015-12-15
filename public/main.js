document.addEventListener("DOMContentLoaded", function(event) {
  var socket = io();

  socket.on('NEW_NOTIFICATION', function (notification) {
    console.log(notification);
  });

  socket.emit('join', 'SOME_CHANNEL');
});