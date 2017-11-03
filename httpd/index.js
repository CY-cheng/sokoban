'use strict';

let http = require('http');

http.createServer((request, response) => {
    request.on('end', () => {
        console.log('Request method: ' + request.method);
        console.log('Request url: ' + request.url);
    });
    response.writeHead(200, {
        'Content-Type': 'text/plain'
    });

    response.end('Hello World!\n');
}).listen(8088);

console.log('Server running at http://127.0.0.1:8088/');