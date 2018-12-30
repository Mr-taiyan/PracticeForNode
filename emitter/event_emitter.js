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

const server = net.createServer(client => {
    const id = `${client.remoteAddress}:${client.remotePort}`;
    channel.emit('join', id, client);
    client.on('data', data => {
       data = data.toString();
       channel.emit('broadcast', id, data);
    });
});

server.listen(8080);