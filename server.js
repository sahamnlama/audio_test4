var express = require('express'),
    app = express(),
    http = require('http'),
    socketIO = require('socket.io'),
    server, io;

app.use(express.static(__dirname));



server = http.Server(app);
server.listen(process.env.PORT||5000);

console.log('Listening on port 5000');

io = socketIO(server);

app.get('/s', function (req, res) {
  //res.send('sender.html')

  res.sendfile(__dirname + '/sender.html');
})

app.get('/r', function (req, res) {
  //res.send('sender.html')

  res.sendfile(__dirname + '/reciever.html');
})

io.on('connection', function (socket) {

    socket.on('make-offer', function (data) {
        socket.broadcast.emit('offer-made', {
            offer: data.offer,
            socket: socket.id
        });
    });

    socket.on('make-answer', function (data) {
        socket.to(data.to).emit('answer-made', {
            socket: socket.id,
            answer: data.answer
        });
    });

});
