"use strict";
const net = require('net');
const events = require('events');
const channel = new events.EventEmitter();

channel.clients = {};
channel.subscriptions = {};
channel.on('join', function (id, client) {
    this.clients[id] = client;
    console.log(id);
    this.subscriptions[id] = (senderId, message) => {
        // console.log(senderId);
        if (id !== senderId) {
            this.clients[id].write(message);
        }
    };
    this.on('broadcast', this.subscriptions[id]);
});
channel.on('leave', function(id) {
    channel.removeListener('broadcast', this.subscriptions[id]);
    channel.emit('broadcast', id, `${id} has left from chatroom.\n`);
});
channel.on('shutdown', id => {
    channel.emit('broadcast', '', 'everyone has been kicked out by ' + id + '\n');
    channel.removeAllListeners('broadcast');
});

const server = net.createServer(client => {
    const id = `${client.remoteAddress}:${client.remotePort}`;
    channel.emit('join', id, client);
    client.on('data', data => {
       data = data.toString();
       if (data === 'shutdown\r\n') {
           channel.emit('shutdown', id);
       }
       channel.emit('broadcast', id, data);
    });
    client.on('close', () => {
        console.log(id);
        channel.emit('leave', id);
    });
});

server.listen(8080);