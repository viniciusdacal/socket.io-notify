
# Socket.IO Notify

A simple notification dispatcher written in nodeJS using socket.io

## How to use

```bash
$ cd socket.io-notify
$ npm install
$ node .

```
##Sending notifications

```bash
$ curl --request POST 'http://localhost:3000/send' --header apisecret:NOTIFICATION_SECRET --data 'notification=notificationexample&channel=SOME_CHANNEL'
```

Client side

```javascript

document.addEventListener("DOMContentLoaded", function(event) {
  var socket = io.connect('127.0.0.1:3000', {
    query: 'notificationKey=NOTIFICATION_KEY'
  });
  socket.on('NEW_NOTIFICATION', function (notification) {
    console.log(notification);
  });

  socket.emit('join', 'SOME_CHANNEL');
});

```
