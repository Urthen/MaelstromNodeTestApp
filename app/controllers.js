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

function getTokenInfo(token) {
	var options = {
			host: 'prototype.projectmaelstrom.com',
			port: 5000,
			path: "/module/token/info?token=" + token,
			method: 'GET'
		},
		def = deferred();
	http.get(options, function (agent) {
		var data = ''
		agent.on('data', function (chunk) {
			data += chunk;
		});
		agent.on('end', function () {
			def.resolve(JSON.parse(data));
		});
		
	});

	return def.promise;	
}

module.exports = function(app){

	var isProd = process.env.NODE_ENV == 'production',
		apiHost = isProd ? 'http://prototype.projectmaelstrom.com' : 'http://prototype.projectmaelstrom.com:5000',
		selfHost = isProd ? 'http://nodetest.projectmaelstrom.com' : 'http://nodetest.projectmaelstrom.com:4000';

	function renderIndex(req, res) {
		if (req.session.token) {
			getTokenInfo(req.session.token)(function (info) {
				res.render('index', {name: info.name, apiHost: apiHost, selfHost: selfHost});	
			});
		} else {
			res.render('index', {apiHost: apiHost, selfHost: selfHost});
		}
		
	};

	app.get('/', renderIndex);

	app.post('/', renderIndex);

	app.get('/callback', function (req, res) {
		exchangeCode(req.query.code)(function (token) {
			req.session.token = token;
			res.redirect('/')
		});
	});
};
