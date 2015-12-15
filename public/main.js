document.addEventListener("DOMContentLoaded", function(event) {
  var socket = io.connect('127.0.0.1:3000', {
    query: 'notificationKey=NOTIFICATION_KEY'
  });
  socket.on('NEW_NOTIFICATION', function (notification) {
    console.log(notification);
  });

  socket.emit('join', 'SOME_CHANNEL');
});
