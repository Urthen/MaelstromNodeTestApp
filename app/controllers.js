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
		res.end("Code: " + req.query.code);
	})
};
