const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;
const notificationSecret = process.env.NOTIFICATION_SECRET || 'NOTIFICATION_SECRET';
const notificationKey = process.env.NOTIFICATION_KEY || 'NOTIFICATION_KEY'
const EVENTS = {
    newNotification: 'NEW_NOTIFICATION'
};

server.listen(port, () => console.log('Server listening at port %d', port));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(__dirname + '/public'));

app.post("/send", (req, res) => {
    var data = req.body;
    if (!req.headers || req.headers.apisecret !== notificationSecret) {
        return res.status(401).json('invalid api secret');
    }

    if (data && data.notification && data.channel) {
        io.to(data.channel).emit(EVENTS.newNotification, data.notification);
        return res.status(200).json('ok');
    }
    return res.status(406).json('Missing parameters');
});

io.on('connection', (socket) => {
    socket.on("join", (auth) => {
        if (!auth || !auth.channel || auth.notificationKey !== notificationKey) {
            return;
        }
        socket.join(auth.channel)
    });
});
