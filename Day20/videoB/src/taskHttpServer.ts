import http from 'http';
import fs from 'fs';
import { join } from 'path';

let server = http.createServer();

server.on('error', error => {
  console.log('Some Error Happened', error);
});

server.on('request', (request, response) => {
  if (request.url == '/') {
    response.statusCode = 200;
    response.statusMessage = 'OK';
    response.setHeader('Content-Type', 'text/html');
    response.write('<p>Hello Strangers</p>');
    response.end();
  } else if (request.url == '/api/products') {
    let filePath = join(__dirname, '../assets/product.json');
    let data = fs.readFileSync(filePath);
    response.statusCode = 200;
    response.statusMessage = 'OK';
    response.setHeader('Content-Type', 'application/json');
    response.write(data);
    // response.write('<p>Products</p>');
    response.end();
  } else {
    response.statusCode = 404;
    response.statusMessage = 'Request Not Found';
    response.end();
  }
});

server.listen(8000, () => {
  console.log('Ready to Receive Connection');
});
