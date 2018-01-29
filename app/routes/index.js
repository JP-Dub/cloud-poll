var path = process.cwd(),
    bP = require('body-parser'),
    urlEncPar = bP.urlencoded({extended: true});

module.exports = function(app) {
  /*
  	function isLoggedIn (req, res, next) {
		  if (req.isAuthenticated()) {
			  return next();
		  } else {
			  res.redirect('/');
		  }
	  }*/

    app.route('/')
        .get(function(req, res) {
        res.sendFile(path + '/public/index.html');
    });
  
    app.route('/poll-creation')
        .get(function(req, res) {
            res.sendFile(path + '/public/poll-creation.html'); 
        }).post(urlEncPar, function(req, res, next) {
        
        var reg = /(^\w)(.+)($\b|.)/g;
        var form = req.body,
            answers = form.answers,
            question = form.question;
        console.log(answers, question)
        function repairSent(match, p1, p2) {
          return p1.toUpperCase() + p2.toLowerCase();
        }
    
        var results = question.replace(reg, repairSent) + "?";
        if(results) {
        next();
        }
    });
  
  app.get('/poll-vault', function(req, res) {
    res.sendFile(path + '/public/poll-vault.html');
  });
  
  app.get('/signup', function(req, res) {
    res.sendFile(path + '/public/signup.html');
  })/*
    .post('/signup', passport.authenticate('local', { 
      successRedirect: '/poll-creation',
      failureRedirect: '/signup',
      failureFlash: true})
          );*/
  
   .post( '/signup', urlEncPar, function(req, res, results) {
    var reg = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm;
    var form = req.body,
        email = form.email,
        password = form.password,
        err = "";
    
    if(!email.match(reg)) {
      err = "Your email doesn't appear valid.";  
    } else
    if(password !== form.confirm || password === "") {
      err = "Your password doesn't match.";
    } else {
      err = "Your email and password have been saved.";
      res.redirect('/poll');
    }   
    res.send(err);
    });
  
 /* 
  app.get('/signin', function(req, res) {
      res.sendFile(path + '/public/signin.html');
  })   
    .post( '/signup', urlEncPar, function(req, res, results) {
    var form = req.body,
        email = form.email,
        password = form.password,
        err = "";
    
    if(email === "database" && password === "database") {
      res.redirect('/poll');
    }   
    res.send(err);  
  });
  */
}