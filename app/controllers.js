module.exports = function(app){

	function renderIndex(req, res) {
		var user = "",
			credentials = {};

		res.render('index', {user: req.user});
	};

	app.get('/', renderIndex);

	app.post('/', renderIndex);
};
