var express = require("express")

exports.boot = function (app, config) {

	app.configure(function () {
		app.set("views", __dirname + "/../templates/");
		app.set("view engine", "jade");
		app.set("view options", {"layout": false});
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(express.cookieParser());
		app.use(express.session({ secret: config.salt}));
		app.use(express.csrf());
		app.dynamicHelpers({
			token: function(req, res) {
				return req.session._csrf;
			},
			info: function(req, res) {
				return req.flash('info');
			},
			error: function(req, res) {
				return req.flash('error');
			}
		});
		app.use(app.router);
	});

	app.configure('development', function(){
		app.use(express.static(__dirname + "/../static/"));
		app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	});

	app.configure('production', function(){
		app.use(express.static(__dirname + "/../static/"));
		app.use(express.errorHandler());
	});

};
