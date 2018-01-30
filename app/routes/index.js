var path = process.cwd(),
    bP = require('body-parser'),
    urlEncPar = bP.urlencoded({extended: true}),
    check = require('./exports');
    

module.exports = function(app) {
  app.set("json spaces", 2);
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
          
          check(req.path, req.body, function forward(err, results) {
            if(err) return console.error(err, "error");
            res.json(results);
          });  
        });
  
    app.route('/poll-vault')
        .get(function(req, res) {
          res.sendFile(path + '/public/poll-vault.html');
        });
  
    app.route('/signup')
        .get(function(req, res) {
          res.sendFile(path + '/public/signup.html');
        })
        .post(urlEncPar, function(req, res, results) {
          check(req.path, req.body, function forward(err, results) {
            if (err) return res.send({"Error": err});
            res.redirect(results);
          });   
        });
};

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
  
 /*
 console.log(req.path)
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
 }*/
  
   /*
    var regEx = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm;
    var form = req.body,
        email = form.email,
        password = form.password;
    
    if(email !== "" && !email.match(regEx)) {
      res.send("Your email doesn't appear valid.");  
    } else
    if(password !== form.confirm || password === "" && password.length >= 4) {
      res.send("Your password doesn't match or isn't long enough, please try again.");
    } else {
      //err = "Your email and password have been saved.";
      res.redirect('/poll-creation');
    }   
    */  
    
/*
    .post('/signup', passport.authenticate('local', { 
      successRedirect: '/poll-creation',
      failureRedirect: '/signup',
      failureFlash: true})
          );*/    