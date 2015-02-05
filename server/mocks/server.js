module.exports = function(app) {
  var express = require('express');
  var serverRouter = express.Router();

  serverRouter.get('/', function(req, res) {
    res.send({
      'server': []
    });
  });

  serverRouter.post('/', function(req, res) {
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
};
