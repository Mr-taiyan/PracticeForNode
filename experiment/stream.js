var fs = require('fs');
var data = '';

var readerStream = fs.createReadStream('input.txt');

readerStream.setEncoding('UTF8');

readerStream.on('data', function (chunk) {
    data += chunk;
});

readerStream.on('end', function () {
    console.log(data);
});

readerStream.on('error', function (err) {
    console.log(err.stack);
});

console.log('end');

var data = 'ceshi';

var writerStream = fs.createWriteStream('output.txt');

writerStream.write(data, 'UTF8');

writerStream.end();

writerStream.on('finish', function () {
    console.log('finish');
});

writerStream.on('error', function (err) {
    console.log(err.stack);
});

console.log('end');