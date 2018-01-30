'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var User = new Schema({
  date: {
    time: Date
  },
  google: {
    id: String,
    displayName: String,
    username: String,
  },
  github: {
    id: String,
    displayName: String,
    username: String
  },
  signin: {
    username: String,
    email: String,
    password: String
  },
  poll: [{
      question: String,
      answers: [{
        options: String,
        votes: Number
      }]             
  }]
});
   
module.exports = mongoose.model('User', User);

/*
var User = new Schema({
  
	github: {
		id: String,
		displayName: String,
		username: String,
    publicRepos: Number
	},
   nbrClicks: {
      clicks: Number
   },
   
});

module.exports = mongoose.model('User', User);*/