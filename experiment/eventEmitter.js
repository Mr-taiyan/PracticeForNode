var events = require('events');
var emitter = new events.EventEmitter();
emitter.on('error', function (message) {
    console.log(message);
});
emitter.emit('error','ceshi');