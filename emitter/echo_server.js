const net = require('net');

const server = net.createServer(socket => {
    socket.on('data', data => {
        console.log(data);
        socket.write(data);
    });
});

server.listen(8080);