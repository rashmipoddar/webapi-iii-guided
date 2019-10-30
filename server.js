const express = require('express'); // importing a CommonJS module

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

function logger(req, res, next) {
  console.log(`${req.method}--${req.url}--${req.originalUrl}--${req.baseUrl}`);
  next();
}

function gateKeeper(req, res, next) {
  // data can come in the body, url parameters, query string, headers
  // new way of reading data sent by the client
  const password = req.headers.password || '';
  if (!password) {
    res.status(400).json({ message: 'Please provide password' });  
  }
  else if (password.toLowerCase() === 'mellon') {
    next();
  } else {
    res.status(401).json({ message: 'You cannot pass!!' });
  }
}

server.use(express.json());
server.use(logger);
server.use(gateKeeper);
server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
