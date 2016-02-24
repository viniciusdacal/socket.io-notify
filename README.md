
# Socket.IO Notify
>node >=4.1.1

A simple notification dispatcher written in nodeJS using socket.io

## How to use

```bash
$ cd socket.io-notify
$ npm install
$ node .

```

### Client side - Javascript

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
##Sending notifications

### bash
```bash
$ curl --request POST 'http://localhost:3000/send' --header notification_secret:NOTIFICATION_SECRET --data 'notification=notificationexample&channel=SOME_CHANNEL'
```
### Server side - PHP

```php

<?php

use Guzzle\Http\Client;


$socketio_host = getenv('SOCKETIO_HOST');
$socketio_port = getenv('SOCKETIO_PORT');
$secret = getenv('NOTIFICATION_SECRET');
$channel = 'some_channel';
$client = new Client;
$request = $client->post($socketio_host.':'.$socketio_port. '/send', [], [
    'notification[description]' => $text,
    'channel' => $channel
]);
$request->setHeader('notification_secret', $secret);
$response = $request->send();
```
