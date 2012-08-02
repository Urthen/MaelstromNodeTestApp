var http = require('http');

module.exports = function(app){

	var isProd = process.env.NODE_ENV == 'production',
		apiHost = isProd ? 'http://prototype.projectmaelstrom.com' : 'http://prototype.projectmaelstrom.com:5000',
		selfHost = isProd ? 'http://nodetest.projectmaelstrom.com' : 'http://nodetest.projectmaelstrom.com:4000';

	function renderIndex(req, res) {
		var user = "",
			credentials = {};
		res.render('index', {user: req.user, apiHost: apiHost, selfHost: selfHost});
	};

	app.get('/', renderIndex);

	app.post('/', renderIndex);

	app.get('/callback', function (req, res) {
		var options = {
				host: 'prototype.projectmaelstrom.com',
				port: 5000,
				path: "/module/token/exchange?code=" + req.query.code,
				method: 'GET'
			};
		console.log("getting", options)
		http.get(options, function (agent) {
			var data = ''
			agent.on('data', function (chunk) {
				data += chunk;
			});
			agent.on('end', function () {
				res.end("Code: " + req.query.code + " exchanged for Token: " + data);
			});
			
		}).on('error', function (e) {
			res.end("Error: " + e.message);
		});
	})
};
