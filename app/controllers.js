/* Require Passport and the Maelstrom strategy. Nothing else required for this trivial example!
 * Don't forget to add your app ID and Secret. They are specified in this way so that if you are deploying with Heroku, you can override them
 * on Heroku with config settings. See Heroku's documentation for more info.
 */
var passport = require('passport'),
	MaelstromStrategy = require('passport-maelstrom').Strategy,
	APP_ID = process.env.APP_ID || "Your App ID here",
	APP_SECRET = process.env.APP_SECRET || "Your App Secret Here";

// The following variables are just an artifact of how I test locally against a dev version of Maelstrom, and are of little importance to an actual implementation.
var isProd = process.env.NODE_ENV == 'production',
	apiHost = isProd ? 'http://prototype.projectmaelstrom.com' : 'http://prototype.projectmaelstrom.com:5000',
	selfHost = isProd ? 'http://nodetest.projectmaelstrom.com' : 'http://nodetest.projectmaelstrom.com:4000';


/* In a real implementation, these next two functions would likely be hitting databases, or at the very least, the session variables.
 * However, for this trivial implementation, we'll simply get and return the raw user object.
 * Don't do it like this in an actual production application!
 */
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

/* Set up the maelstrom strategy with our application ID and secret, as well as let it know how to generate user profiles.
 * As above, normally this would attempt to find a user in your database and create a new one if neccesary based on the information
 * returned by maelstrom. However, implementation details here vary greatly depending on what sort of stack you're running, so I'll
 * leave the actual execution as an exercise to the reader.
 * 
 * Note: authorizationURL and tokenURL don't normally need to be specified - they
 * are another artifact of how I am testing this locally.
 */
passport.use(new MaelstromStrategy({
    clientID: APP_ID,
    clientSecret: APP_SECRET,
    callbackURL: selfHost + "/auth/maelstrom/callback",
    authorizationURL: apiHost + "/module/login",
  	tokenURL: apiHost + "/module/token/exchange",
  	tokenInfoURL: apiHost + "/module/token/info"
  },
  function(accessToken, refreshToken, profile, done) {
  	done(null, profile);
  }
));

/* add a function to the exports that will be called with the app, which will set up the routes.
 * Your application design may vary - there's different ways to get routes set up.
 */
module.exports = function(app){

	/* The index route will display the user name, if provided. The index template itself contains logic to display the login
	 * button or name appropriately.
	 */
	app.get('/', function renderIndex(req, res) {
		res.render('index', {user: req.user || null});
	});

	// This route is called to initiate login, and will redirect to the Maelstrom servers
	app.get('/auth/maelstrom', passport.authenticate('maelstrom'));

	// This route is where the user returns to after login and will store the user information and redirect them to the index page.
	app.get('/auth/maelstrom/callback', passport.authenticate('maelstrom', { successRedirect: '/', failureRedirect: '/login' }));

	// Don't forget to allow users to log out!
	app.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});

};
