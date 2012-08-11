var passport = require('passport'),
	MaelstromStrategy = require('passport-maelstrom').Strategy
	isProd = process.env.NODE_ENV == 'production',
	apiHost = isProd ? 'http://prototype.projectmaelstrom.com' : 'http://prototype.projectmaelstrom.com',
	selfHost = isProd ? 'http://nodetest.projectmaelstrom.com' : 'http://nodetest.projectmaelstrom.com:4000';

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new MaelstromStrategy({
    clientID: process.env.APP_ID,
    clientSecret: process.env.APP_SECRET,
    callbackURL: selfHost + "/auth/maelstrom/callback"
  },
  function(accessToken, refreshToken, profile, done) {
  	console.log("profile:", profile)
  	done(null, profile);
  }
));

module.exports = function(app){
	app.get('/', function renderIndex(req, res) {
		var opts = {name: null, apiHost: apiHost, selfHost: selfHost, appid: app.config.appid};
		if (req.user) {
			opts.name = req.user.name || "Anonymous User";
		}

		res.render('index', opts);
	});

	app.get('/auth/maelstrom', passport.authenticate('maelstrom'));

	app.get('/auth/maelstrom/callback', passport.authenticate('maelstrom', { successRedirect: '/', failureRedirect: '/login' }));

	app.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});

};
