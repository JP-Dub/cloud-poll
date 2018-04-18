'use strict';

var GitHubStrategy = require('passport-github').Strategy,
	LocalStrategy = require('passport-local').Strategy,
    User = require('../models/users'),
    configAuth = require('./auth');

module.exports = function (passport) {
	
	passport.serializeUser(function (user, done) {
		//console.log(user, " user is serialized")
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
		  //console.log(user, " user has been deserialized")
			done(err, user);
		});
	});
	
	passport.use(new GitHubStrategy({
		clientID: configAuth.githubAuth.clientID,
		clientSecret: configAuth.githubAuth.clientSecret,
		callbackURL: configAuth.githubAuth.callbackURL
	},
	function (token, refreshToken, profile, done) {
		process.nextTick(function () {
			User.findOne({ 'github.id': profile.id }, function (err, user) {
				if (err) return done(err);
				//console.log(user, "user")
				if (user) {
					console.log("user confirmed")
					return done(null, user);
				} else {
					console.log("creating new user")
					var newUser = new User();

					newUser.github.id = profile.id;
					newUser.github.username = profile.username;
					newUser.github.displayName = profile.displayName;

					newUser.save(function (err) {
						if (err) return console.error(err);
						return done(null, newUser);
					});
				}
			});
		});
	}));
	
	passport.use(new LocalStrategy(
        function(username, password, done) {
            User.findOne({ "signin.displayName" : username }, function(err, user) {
                if (err) return done(err); 
                
                if (!user) {
                    return done(null, false, { message: 'Username not found. Please return to previous page to re-try or sign-up for a new account.' });
                }
                
                if (user.signin.password !== password) {
                    return done(null, false, { message: 'Incorrect password. Please return to previous page to re-try.' });
                }
                
                return done(null, user);
            });
        }
    ));
};




/*
local strategy for signed up users
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'passwd'
  },
  function(username, password, done) {
    // ...
  }
));


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
*/