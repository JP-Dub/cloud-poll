'use strict';

var routes = require('./app/routes/index.js'),
    session = require('express-session'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    express = require('express'),
    app = express();

//require('./config/passport')(passport);
require('dotenv').load();

var options = {
	useMongoClient: true
};

mongoose.connect(process.env.MONGO_URI, options);
mongoose.Promise = global.Promise;


app.use('/public', express.static(process.cwd() + '/public'));

app.use(passport.initialize());
app.use(passport.session());

routes(app);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});