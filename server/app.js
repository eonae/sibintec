const http = require('http');
const { login, balance } = require('./handlers');
const { sendError, enableCors } = require('./httpHelpers');

const routes = [
  { url: '/login', handler: login },
  { url: '/balance', handler: balance }
];

http.createServer(async (req, res) => {
  
  const methodOptions = enableCors(res, req);
  if (methodOptions) {
    return;
  }
  const match = routes.find(r => r.url == req.url);
  
  if (match) {
    try {
      await match.handler(req, res);
    }
    catch (error) {
      console.log(error);
      sendError(res, error);
    }

  } else {
    res.statusCode = 404;
    res.end();
  }

}).listen(8000);

console.log('Server is up.');