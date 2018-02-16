'use strict';

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('..models/users');
    

module.exports = function (passport) {
    console.log(passport, "local-passport")
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

    passport.use(new LocalStrategy(
        function(username, password, done) {
            User.findOne({ "signin.displayName" : username }, function(err, user) {
                console.log(username, password)
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
};