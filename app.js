var express = require("express"),
	port = process.env.PORT || 4000,
	app = express.createServer();

// Setup settings
require("./app/settings").boot(app);

// Setup controllers
require('./app/controllers')(app);

// Good to go! Told you it was easy...
app.listen(port, function () {
	console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});