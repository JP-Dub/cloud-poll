'use strict';

var routes = require('./app/routes/index.js'),
    session = require('express-session'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    express = require('express'),
    flash = require('req-flash'),
    app = express();


require('dotenv').load();
require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI, {useMongoClient : true});
mongoose.Promise = global.Promise;

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});