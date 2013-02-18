var app = require('http').createServer(handler)
    , io = require('socket.io').listen(app)
    , fs = require('fs');
app.listen(8124);
function handler(req, res) {
    fs.readFile(__dirname + '/chat.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading chat.html');
            }
            res.writeHead(200);
            res.end(data);
        });
}
var userSockets={};
io.sockets.on('connection', function (socket) {
    socket.on('addme', function (username) {
        socket.set()
        socket.username = username;
        socket.emit('chat', 'SERVER', 'You have connected');
        socket.broadcast.emit('chat', 'SERVER', username + ' is on deck');
        userSockets[username] = socket;
    });
    socket.on('sendchat', function (data) {
        io.sockets.emit('chat', socket.username, data);
    });
    socket.on('sendPrivate', function (user,data) {
        if(userSockets[user]!==undefined){
            userSockets[user].emit('chat', socket.username, data);
        }
    });
    socket.on('disconnect', function () {
        delete userSockets[socket.username];
        io.sockets.emit('chat', 'SERVER', socket.username + ' has left the building');
    });
});