module.exports = function(app) {
  var globSync   = require('glob').sync;
  var mocks      = globSync('./mocks/**/*.js', { cwd: __dirname }).map(require);
  var proxies    = globSync('./proxies/**/*.js', { cwd: __dirname }).map(require);
  var bodyParser = require('body-parser');    

  // Log proxy requests
  var morgan  = require('morgan');
  app.use(morgan('dev'));

  // Contains key-value pairs of data submitted in the request body.
	app.use(bodyParser.json()); // for parsing application/json
	app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  mocks.forEach(function(route) { route(app); });
  proxies.forEach(function(route) { route(app); });

};
