var express = require("express");

var config = {},
	port = process.env.PORT || 4000;

config.port = port;
config.env = process.env.NODE_ENV;
config.salt = process.env.SALT;
config.appid = process.env.APP_ID;

// Setup Express Application
var app = express.createServer();
app.config = config
require("./app/settings").boot(app, config);

// Setup controllers
require('./app/controllers')(app);

// Good to go, brah
app.listen(port, function () {
	console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});