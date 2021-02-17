// ini sepertinya cara paling aman untuk kirim data berukuran besar
import http from 'http';
import fs from 'fs';
import { join } from 'path';
import { preProcessFile } from 'typescript';

let server = http.createServer();

function serveHomePage(request: any, response: any) {
  response.statusCode = 200;
  response.statusMessage = 'OK';
  response.setHeader('Content-Type', 'text/html');
  response.write('<p>Hello</p>');
  response.end();
}

function serveErrorPage(request: any, response: any, error: any) {
  console.error(error);
  response.statusCode = 500;
  response.statusMessage = 'Something Went Wrong';
  response.setHeader('Content-Type', 'text/plain');
  response.write('Internal Server Error');
  response.end();
}

// ini task nya buat Funtion Pipe
function pipe(readStream: fs.ReadStream, writeStream: any) {
  readStream.on('data', data => {
    let shouldContinue = writeStream.write(data);
    if (shouldContinue === false) {
      console.log('Pausing....');
      readStream.pause();
      // once berarti cuma dipanggil/ Emmit sekali saat memang sudah drain
      writeStream.once('drain', () => {
        console.log('Drained....');
        readStream.resume();
      });
    }
  });

  readStream.on('end', () => {
    console.log('Finished');
    writeStream.end();
  });
}

function serveAssets(request: any, response: any, filePath: string, contentType: string) {
  let readStream = fs.createReadStream(filePath); // readStream ini eventemitter juga

  //   readStream.on('error', (error) => {}) akan dipanggil setiap kita mendapatkan error
  readStream.on('error', error => {
    serveErrorPage(request, response, error);
  });
  response.statusCode = 200;
  response.statusMessage = 'OK';
  response.setHeader('Content-Type', contentType);
  pipe(readStream, response);
}

function serveNotFoundPage(request: any, response: any) {
  response.statusCode = 404;
  response.statusMessage = 'Not Dound';
  response.setHeader('Content-Type', 'text/html');
  response.write('<p>Not Found</p>');
  response.end();
}

server.on('request', (req, res) => {
  switch (req.url) {
    case '/': {
      serveHomePage(req, res);
      break;
    }
    case '/files/indo.jpg': {
      let filePath = join(__dirname, '../assets/indo.jpg');
      const contentType = 'image/jpeg';
      serveAssets(req, res, filePath, contentType);
      break;
    }
    case '/files/video.mp4': {
      let filePath = join(__dirname, '../assets/video.mp4');
      const contentType = 'video/mp4';
      serveAssets(req, res, filePath, contentType);
      break;
    }
    default: {
      serveNotFoundPage(req, res);
    }
  }
});

server.on('error', error => {
  console.log('Some error happened', error);
});

server.on('listening', () => {
  console.log('Server is ready to receive connection');
});

// try to listen port 8000
server.listen(8000);
