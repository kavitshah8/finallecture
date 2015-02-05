module.exports = function(app) {
  var express = require('express');
  var serverRouter = express.Router();

  serverRouter.get('/', function(req, res) {
    res.send({
      'server': []
    });
  });

  serverRouter.post('/', function(req, res) {
    console.log("Hello");
    res.status(201).end();
  });

  serverRouter.get('/:id', function(req, res) {
    res.send({
      'server': {
        id: req.params.id
      }
    });
  });

  serverRouter.put('/:id', function(req, res) {
    res.send({
      'server': {
        id: req.params.id
      }
    });
  });

  serverRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/server', serverRouter);

  // client-side authentication
  var currentToken;

  app.post('/auth.json', function(req, res) {

    var body = req.body,
        username = body.username,
        password = body.password;

    if (username === 'root' && password === 'root') {
      currentToken = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      res.send({
        success: true,
        token: currentToken 
      });
    } else {
      res.send({
        success: false,
        message: 'Invalid username/password' 
      });
    }

  });

  function validTokenProvided(req, res) {

    var userToken = req.body.token || req.param('token') || req.headers.token;

    if (!currentToken || userToken != currentToken) {
      res.status(401).send({ 
        error: 'Invalid token. You provided: ' + userToken + ' token.'
      });
      
      return false;
    }

    return true;
  }

};
