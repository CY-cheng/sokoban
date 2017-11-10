'use strict';

let http = require('http');

let serve = (response, fname, datatype) => {
    
    let fs = require('fs');
    
    fs.readFile(fname, (err, data) => {
        
        if (err) {
            console.log(' 檔案讀取錯誤');
        }
        
        else {
            response.writeHead(200, {
                'Content-Type': datatype
            });
            
            response.write(data);
            response.end();
        }
    });
};

http.createServer((request, response) => {
    let fs = require('fs');

    let postData = '';
    
    request.on('data', (chunk) => {
        
        postData += chunk;

        console.log(
            ' 接收的 POST data 片段 k: [' + chunk + '].'
        );
    });

    request.on('end', () => {
        
        switch (request.url) {
            case '/':
                serve(response, '../htdocs/index.html', 'text/html');
                break;
            
            case '/assets/css/styles.css':
                serve(response, '../htdocs/assets/css/styles.css', 'text/css');              
                break;

            case '/assets/png/SokobanClone_byVellidragon.png':
                serve(response, '../htdocs/assets/png/SokobanClone_byVellidragon.png', 'image/png');              
                break;  
                
            case '/favicon.ico':
                serve(response, '../htdocs/assets/ico/favicon.ico', 'image/png');
                break;

            default:
                console.log(' 未定義的存取: ' + request.url);
                response.end();
                break;
        }
    });
    
}).listen(8088);

console.log(' 伺服器啓動，連線 url: http://127.0.0.1:8088/');
