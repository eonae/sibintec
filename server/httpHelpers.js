const fs = require('fs');
const path = require('path');

module.exports = {

  // npm cors
  enableCors(response, request) {
    const origin = 'http://localhost:4200';
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Access-Control-Request-Method', origin);
    response.setHeader('Access-Control-Allow-Headers', 'Content-type');
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    if ( request.method === 'OPTIONS' ) {
      response.writeHead(200);
      response.end();
      return true;
    }
    return false;
  },

  getBodyJson(request) {

    return new Promise((resolve, reject) => {
      
      let data = '';
      request.on('data', chunk => {
        console.log(`chunk: ${chunk}`);
        data += chunk;
      });
      request.on('end', () => {
        try {
          resolve(JSON.parse(data));
        }
        catch (parseError) {
          reject(parseError);
        }
      });
    });
  },

  sendError(response, error) {
    response.statusCode = 500;
    const msg = (typeof(error) === 'string') ? error : JSON.stringify(error);
    response.write(JSON.stringify({ success: false, data: null, error: msg }));
    response.end();
  },
  
  sendJsonData(response, data) {

    response.writeHead(200, { 'Content-Type': 'application/json'});
    response.write(JSON.stringify({ success: true, data, error: null }));
    response.end();
  },

  sendJsonError(response, code, error) {

    response.writeHead(code, { 'Content-Type': 'application/json'});
    response.write(JSON.stringify({ success: false, data: null, error }));
    response.end();
  }
}