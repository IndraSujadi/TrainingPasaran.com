// ini sepertinya cara paling aman untuk kirim data berukuran besar
import http from 'http';
import fs from 'fs';
import { join, extname } from 'path';
import { preProcessFile } from 'typescript';

let server = http.createServer();

let assetsDirectory = join(__dirname, '../assets'); // dilakukan agar user tidak bisa akses folder lain

type SupportedType = { [key: string]: string };
const supportedType: SupportedType = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  mp4: 'video.mp4',
  txt: 'text/plain',
  html: 'text/html',
  json: 'application/json',
};

function serveErrorPage(request: any, response: any, error: any) {
  console.error(error);
  response.statusCode = 500;
  response.statusMessage = 'Something Went Wrong';
  response.setHeader('Content-Type', 'text/plain');
  response.write('Internal Server Error');
  response.end();
}

function serveAssets(request: any, response: any, filePath: string) {
  let fileExtension = extname(filePath).slice(1).toLowerCase();
  let contentType = supportedType[fileExtension];
  if (contentType == null) {
    serveNotFoundPage(request, response);
    return;
  }
  let readStream = fs.createReadStream(filePath); // readStream ini eventemitter juga

  readStream.on('error', error => {
    if (error.message.includes('ENOENT')) {
      serveNotFoundPage(request, response);
    } else {
      serveErrorPage(request, response, error);
    }
  });
  response.statusCode = 200;
  response.statusMessage = 'OK';
  response.setHeader('Content-Type', contentType);
  readStream.pipe(response); // ini built in nya jadi gk perlu buat
}

function serveNotFoundPage(request: any, response: any) {
  response.statusCode = 404;
  response.statusMessage = 'Not Found';
  response.setHeader('Content-Type', 'text/html');
  response.write('<p>Not Found</p>');
  response.end();
}

// ini task nya untuk terima kiriman data json dari client
async function processRequestBodyJson(request: any, response: any) {
  let receivedData: string[] = [];
  await request.on('data', (data: Buffer) => {
    receivedData.push(data.toString());
  });
  let jsonData = receivedData.join('');
  let obj = JSON.parse(jsonData);
  console.log(typeof obj);
  console.log(obj.product_name);

  request.on('end', () => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify({ success: true }));
    response.end();
  });
}

server.on('request', (req, res) => {
  if (req.url.startsWith('/files/')) {
    let fileName = req.url.slice(7);
    let filePath = join(assetsDirectory, fileName);
    if (!filePath.startsWith(assetsDirectory + '\\')) {
      serveNotFoundPage(req, res);
      return;
    }

    serveAssets(req, res, filePath);
    return;
  }
  switch (req.url) {
    case '/': {
      let filePath = join(assetsDirectory, 'index.html');
      serveAssets(req, res, filePath);
      break;
    }
    // ini task nya untuk terima kiriman data json dari client
    case '/submit-json': {
      if (req.method === 'POST') {
        processRequestBodyJson(req, res);
      } else {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'text/html');
        res.write('<p>Method not allowed</p>');
        res.end();
      }

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
