var http = require('http'),
	deferred = require('deferred');

function exchangeCode(code) {
	var options = {
			host: 'prototype.projectmaelstrom.com',
			port: 5000,
			path: "/module/token/exchange?code=" + code,
			method: 'GET'
		},
		def = deferred();
	http.get(options, function (agent) {
		var data = ''
		agent.on('data', function (chunk) {
			data += chunk;
		});
		agent.on('end', function () {
			def.resolve(data);
		});
		
	});

	return def.promise;
}

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
		exchangeCode(req.query.code)(function(token){
			res.send(req.query.code + " exchanged to token " + token);
		})
	});
};
