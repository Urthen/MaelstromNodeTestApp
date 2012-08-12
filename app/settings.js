var express = require("express"),
	passport = require("passport");

exports.boot = function (app) {

	app.configure(function () {
		// Set up incidental settings - see express/connect/node documentation for more information about these.
		app.set("views", __dirname + "/../templates/");
		app.set("view engine", "jade");
		app.set("view options", {"layout": false});
		app.use(express.bodyParser());
		app.use(express.cookieParser());
		app.use(express.session({ secret: 'charybdis'}));

		// Initialize passport and tell it to use the session
		// Note there is no maelstrom-specific information here. That all lies in controllers.js
		app.use(passport.initialize());
		app.use(passport.session());

		// Finally, set up the router, static handlers, and exception handling.
		app.use(app.router);
		app.use(express.static(__dirname + "/../static/"));
		app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	});
};
