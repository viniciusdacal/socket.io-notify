document.addEventListener("DOMContentLoaded", function(event) {
  var socket = io.connect(window.location.hostname, {
    query: 'notificationKey=NOTIFICATION_KEY'
  });
  socket.on('NEW_NOTIFICATION', function (notification) {
    console.log(notification);
  });

  socket.emit('join', 'SOME_CHANNEL');
});
